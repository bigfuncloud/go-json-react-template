package main

import (
	"log"
	"net/http"

	"github.com/bigfuncloud/@BFC_APP_DOMAIN@/api/models"
	"github.com/gin-gonic/gin"
)

func allFriends(c *gin.Context) {
	var friends []models.Friend
	result := db.Find(&friends)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "no value"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"value": friends})
}

func postFriend(c *gin.Context) {
	var json struct {
		Value models.Friend `json:"value" binding:"required"`
	}

	if c.Bind(&json) == nil {
		result := db.Create(&json.Value)

		if result.Error != nil {
			log.Println(result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	}
}
