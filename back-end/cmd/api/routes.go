package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)

	mux.Use(app.enableCORS)

	mux.Get("/", app.Home)

	mux.Get("/movies", app.AllMovies)

	mux.Post("/auth", app.Authenticate)
	mux.Get("/refresh", app.RefreshToken)
	mux.Get("/logout", app.LogOut)
	mux.Get("/movies/{id}", app.GetMovieById)
	mux.Get("/genres", app.AllGenres)

	mux.Route("/admin", func(mux chi.Router) {
		mux.Use(app.authRequired)
		mux.Get("/movies", app.MovieCatalogue)
		mux.Get("/movies/{id}", app.EditMovie)
		mux.Patch("/movies/{id}", app.UpdateMovieById)
		mux.Put("/movies", app.AddMovie)
		mux.Delete("/movies/{id}", app.DeleteMovieById)
	})
	return mux
}
