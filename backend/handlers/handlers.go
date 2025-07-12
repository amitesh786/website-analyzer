package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/datatypes"

	"sykell/test/database"
	"sykell/test/models"
	"sykell/test/utils"
)

var processingQueue chan string

// Initialize processing queue and background worker
func init() {
	processingQueue = make(chan string, 100)
	go processQueue()
}

// Background worker: consumes URLs from queue and processes them one by one
func processQueue() {
	for url := range processingQueue {
		// Set status to running
		database.DB.Model(&models.ProcessResult{}).
			Where("url = ?", url).
			Update("status", "running")

		// Perform analysis
		result, err := utils.AnalyzeURL(url)
		if err != nil {
			database.DB.Model(&models.ProcessResult{}).
				Where("url = ?", url).
				Update("status", "error")
			continue
		}

		// Serialize headings count
		headingJSON, _ := json.Marshal(result.HeadingsCount)

		// Save results and mark as "done"
		updateData := map[string]interface{}{
			"html_version":       result.HTMLVersion,
			"page_title":         result.PageTitle,
			"headings_count":     datatypes.JSON(headingJSON),
			"internal_links":     result.InternalLinks,
			"external_links":     result.ExternalLinks,
			"inaccessible_links": result.InaccessibleLinks,
			"has_login_form":     result.HasLoginForm,
			"status":             "done",
		}
		database.DB.Model(&models.ProcessResult{}).
			Where("url = ?", url).
			Updates(updateData)
	}
}

// POST /start - Enqueue a URL for analysis
func StartProcessing(c *gin.Context) {
	var request models.ProcessRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.JSONError(c, http.StatusBadRequest, err.Error())
		return
	}
	if strings.TrimSpace(request.URL) == "" {
		utils.JSONError(c, http.StatusBadRequest, "URL cannot be empty")
		return
	}

	// Insert or update record with "queued" status
	dbResult := models.ProcessResult{
		URL:    request.URL,
		Status: "queued",
	}
	if err := database.DB.Where("url = ?", request.URL).FirstOrCreate(&dbResult).Error; err != nil {
		utils.JSONError(c, http.StatusInternalServerError, "Failed to initialize processing status")
		return
	}

	// Try to enqueue the URL for background processing
	select {
	case processingQueue <- request.URL:
		// Success: queued
		c.JSON(http.StatusAccepted, gin.H{
			"message": "Processing queued",
			"url":     request.URL,
			"status":  "queued",
		})
	default:
		// Failure: queue is full
		utils.JSONError(c, http.StatusServiceUnavailable, "Processing queue is full")
	}
}

// POST /stop - Delete a result by URL
func StopProcessing(c *gin.Context) {
	var request models.ProcessRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.JSONError(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := database.DB.Where("url = ?", request.URL).Delete(&models.ProcessResult{}).Error; err != nil {
		utils.JSONError(c, http.StatusInternalServerError, "Failed to delete result")
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Processing stopped for URL: " + request.URL})
}
