package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/georgiev098/simple-go-react-movie-app/internal/repo"
	"github.com/georgiev098/simple-go-react-movie-app/internal/repo/dbrepo"
)

const port = 8080

type application struct {
	Domain      string
	DSN         string
	DB          repo.DBRepo
	Auth        Auth
	JWTSecret   string
	JWTIssuer   string
	JWTAudience string
	API_KEY     string
	// CookieDomain string
}

func main() {
	var app application

	flag.StringVar(&app.DSN, "dsn", "host=host.docker.internal port=5432 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres Connection String")
	flag.StringVar(&app.JWTSecret, "jwt-secret", "verysecret", "signing secret")
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "signing issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "signing audience")
	// flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "cookie domain")
	flag.StringVar(&app.Domain, "domain", "example.com", "domain")
	flag.StringVar(&app.API_KEY, "image-api-key", "af5e2a6ed0dae9368267f1ec75c235b9", "get movie images")
	flag.Parse()

	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}

	defer app.DB.Connection().Close()

	app.Auth = Auth{
		Issuer:        app.JWTIssuer,
		Audience:      app.JWTAudience,
		Secret:        app.JWTSecret,
		TokenExpiry:   time.Minute * 15,
		RefreshExpiry: time.Hour * 24,
		CookiePath:    "/",
		CookieName:    "refresh_token",
		// CookieDomain:  app.CookieDomain,
	}

	log.Println("Starting server on port:", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}
