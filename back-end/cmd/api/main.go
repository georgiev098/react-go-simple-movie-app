package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/georgiev098/simple-go-react-movie-app/internal/repo"
	"github.com/georgiev098/simple-go-react-movie-app/internal/repo/dbrepo"
)

const port = 8080

type application struct {
	Domain string
	DSN    string
	DB     repo.DBRepo
}

func main() {
	var app application
	app.Domain = "example.com"

	flag.StringVar(&app.DSN, "dsn", "host=host.docker.internal port=5432 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres Connection String")
	flag.Parse()

	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}

	defer app.DB.Connection().Close()

	log.Println("Starting server on port:", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}
