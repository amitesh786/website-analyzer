package utils

import (
	"github.com/gin-gonic/gin"
)

// JSONError is a helper function to send a standardized JSON error response.
//
// Parameters:
// - c: The Gin context for the current request.
// - status: HTTP status code to return (e.g., 400, 500).
// - message: Readable error message.
//
// Example output:
//   {
//     "error": "Invalid input"
//   }

func JSONError(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{"error": message})
}
