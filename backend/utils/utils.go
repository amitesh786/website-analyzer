package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"sykell/test/models"

	"github.com/PuerkitoBio/goquery"
	"gorm.io/datatypes"
)

// AnalyzeURL takes a page URL, fetches its HTML content,
// analyzes structural metadata, links, and login form presence,
// and returns a structured ProcessResult or an error.
func AnalyzeURL(pageURL string) (models.ProcessResult, error) {
	var result models.ProcessResult

	if pageURL == "" {
		return result, fmt.Errorf("URL is empty")
	}

	resp, err := http.Get(pageURL)
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return result, err
	}

	result.URL = pageURL
	result.HTMLVersion = getHTMLVersion(doc)
	result.PageTitle = doc.Find("title").Text()

	// Count heading tags (h1–h6)
	headingsMap := countHeadings(doc)
	headingsJSON, err := json.Marshal(headingsMap)
	if err != nil {
		headingsJSON = []byte("{}")
	}
	result.HeadingsCount = datatypes.JSON(headingsJSON)

	// Analyze internal, external, and broken links
	internal, external, brokenLinks := countLinks(doc, pageURL)

	result.InternalLinks = internal
	result.ExternalLinks = external

	brokenLinksJSON, err := json.Marshal(brokenLinks)
	if err != nil {
		brokenLinksJSON = []byte("[]")
	}
	result.InaccessibleLinks = datatypes.JSON(brokenLinksJSON)

	// Check for presence of login forms
	result.HasLoginForm = checkLoginForm(doc)

	return result, nil
}

// getHTMLVersion determines the HTML version by inspecting the document's doctype.
func getHTMLVersion(doc *goquery.Document) string {
	if goquery.NodeName(doc.Selection) == "html" {
		if doctype := doc.Nodes[0].FirstChild; doctype != nil && doctype.Type == 10 {
			if doctype.Data == "html" {
				return "HTML5"
			} else {
				return "Older HTML Version"
			}
		}
	}
	return "Unknown"
}

// countHeadings returns a map of how many heading tags (h1–h6) exist in the page.
func countHeadings(doc *goquery.Document) map[string]int {
	headings := map[string]int{
		"h1": 0,
		"h2": 0,
		"h3": 0,
		"h4": 0,
		"h5": 0,
		"h6": 0,
	}
	for heading := range headings {
		headings[heading] = doc.Find(heading).Length()
	}
	return headings
}

// countLinks parses the document and returns the number of internal and external links,
// along with a list of inaccessible (broken) links and their status codes.
func countLinks(doc *goquery.Document, pageURL string) (int, int, []models.BrokenLink) {
	internalLinks := 0
	externalLinks := 0
	var inaccessibleLinks []models.BrokenLink

	baseURL, err := url.Parse(pageURL)
	if err != nil {
		return internalLinks, externalLinks, inaccessibleLinks
	}

	doc.Find("a").Each(func(i int, s *goquery.Selection) {
		href, exists := s.Attr("href")
		if !exists {
			return
		}

		linkURL, err := url.Parse(href)
		if err != nil {
			return
		}

		fullURL := href
		if !linkURL.IsAbs() {
			internalLinks++
			fullURL = baseURL.ResolveReference(linkURL).String()
		} else {
			externalLinks++
		}

		resp, err := http.Get(fullURL)
		if err != nil || resp.StatusCode >= 400 {
			statusCode := 0
			if resp != nil {
				statusCode = resp.StatusCode
			}
			inaccessibleLinks = append(inaccessibleLinks, models.BrokenLink{
				URL:    fullURL,
				Status: statusCode,
			})
		} else if resp != nil {
			resp.Body.Close()
		}
	})

	return internalLinks, externalLinks, inaccessibleLinks
}

// checkLoginForm checks if the page contains any password input field,
// which typically indicates the presence of a login form.
func checkLoginForm(doc *goquery.Document) bool {
	return doc.Find("input[type='password']").Length() > 0
}
