package database

import (
	"fmt"
	"log"
	"os"
	"sykell/test/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// DB is a global database connection instance used throughout the application
var DB *gorm.DB

// Connect initializes the database connection and runs migrations
func Connect() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: .env file not found or failed to load")
	}

	// Read DB credentials and config from environment variables
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbname := os.Getenv("DB_NAME")

	// Format DSN (Data Source Name) for MySQL connection
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname)

	// Attempt to open a connection to the MySQL database
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	DB = db
	// Auto-migrate the ProcessResult model (creates/updates table structure)
	err = db.AutoMigrate(&models.ProcessResult{})
	if err != nil {
		log.Fatal("AutoMigrate failed:", err)
	}
}
