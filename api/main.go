package main

import (
	"log"
	"net/http"
	"os"

	"github.com/bigfuncloud/@BFC_APP_DOMAIN@/api/models"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func setupDB() {
	var err error
	db, err = gorm.Open(postgres.New(postgres.Config{
		DSN:                  os.Getenv("PG_DSN"),
		PreferSimpleProtocol: true,
	}), &gorm.Config{})

	if err != nil {
		log.Fatalf("could not connect to database: %v", err)
	}

	// Add more models in the models/ folder and here for auto-migration.
	if err := db.AutoMigrate(&models.Friend{}); err != nil {
		log.Fatalf("could not migrate: %v", err)
	}
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	// Ping test
	r.GET("/api/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/api/friends", allFriends)
	r.POST("/api/friends", postFriend)

	return r
}

func main() {
	setupDB()
	r := setupRouter()
	r.Run(":3030")
}
