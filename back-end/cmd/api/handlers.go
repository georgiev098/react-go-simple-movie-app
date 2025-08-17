package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/georgiev098/simple-go-react-movie-app/internal/models"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Movie app is up and runnign",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	rd, _ := time.Parse("2006-01-02", "1986-03-07")

	highlander := models.Movie{
		ID:          1,
		Title:       "Higlander",
		ReleaseDate: rd,
		MPAARating:  "R",
		RunTime:     116,
		Description: "A very nice movie.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, highlander)
	rd, _ = time.Parse("2006-01-02", "1988-03-07")

	alien := models.Movie{
		ID:          2,
		Title:       "Alien",
		ReleaseDate: rd,
		MPAARating:  "R",
		RunTime:     130,
		Description: "A very scary movie.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}
	movies = append(movies, alien)

	out, err := json.Marshal(movies)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}
