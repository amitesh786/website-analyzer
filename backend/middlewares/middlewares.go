package middlewares

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// CORSMiddleware sets headers to allow Cross-Origin Resource Sharing (CORS).
// It enables your frontend (which may be hosted on a different domain) to access this backend.
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	}
}

// AuthMiddleware checks for a valid Bearer token in the Authorization header.
// The token is expected to match the AUTH_TOKEN from the environment.
func AuthMiddleware() gin.HandlerFunc {
	requiredToken := "Bearer " + os.Getenv("AUTH_TOKEN")
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token != requiredToken {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		c.Next()
	}
}
