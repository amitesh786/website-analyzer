package models

import (
	"time"

	"gorm.io/datatypes"
)

// ProcessRequest represents the payload for initiating a crawl or re-processing a URL.
type ProcessRequest struct {
	URL string `json:"url"`
}

// BrokenLink represents a link that could not be reached during analysis.
type BrokenLink struct {
	URL    string `json:"url"`
	Status int    `json:"status"`
}

// ProcessResult stores the result of analyzing a URL.
type ProcessResult struct {
	ID                uint           `gorm:"primaryKey" json:"id"`
	URL               string         `gorm:"type:varchar(255);uniqueIndex" json:"url"`
	HTMLVersion       string         `json:"html_version"`
	PageTitle         string         `json:"page_title"`
	HeadingsCount     datatypes.JSON `json:"headings_count"`
	InternalLinks     int            `json:"internal_links"`
	ExternalLinks     int            `json:"external_links"`
	InaccessibleLinks datatypes.JSON `json:"inaccessible_links"`
	HasLoginForm      bool           `json:"has_login_form"`
	Status            string         `gorm:"type:varchar(20)" json:"status"`
	CreatedAt         time.Time      `json:"created_at"`
}
