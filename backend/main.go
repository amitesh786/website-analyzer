package main

import (
	"sykell/test/database"
	"sykell/test/handlers"
	"sykell/test/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()

	router := gin.Default()
	router.Use(middlewares.CORSMiddleware())
	auth := router.Group("/", middlewares.AuthMiddleware())

	auth.POST("/start", handlers.StartProcessing)
	auth.POST("/stop", handlers.StopProcessing)
	auth.GET("/results", handlers.GetResults)
	auth.GET("/detail/*url", handlers.GetDetail)
	auth.DELETE("/delete", handlers.DeleteURLs)
	auth.GET("/crawl-stats", handlers.GetCrawlStats)

	router.Run(":8080")
}
