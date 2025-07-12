package main

import (
	"sykell/test/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.Use(middlewares.CORSMiddleware())
	auth := router.Group("/", middlewares.AuthMiddleware())

	router.Run(":8080")
}
