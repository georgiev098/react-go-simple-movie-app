package dbrepo

import (
	"context"
	"database/sql"
	"time"

	"github.com/georgiev098/simple-go-react-movie-app/internal/models"
)

const DBTimeOut = time.Second * 3

type PostgresDBRepo struct {
	DB *sql.DB
}

func (m *PostgresDBRepo) AllMovies() ([]*models.Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DBTimeOut)
	defer cancel()

	query := `
		SELECT 
			id,
			title,
			release_date,
			runtime,
			mpaa_rating,
			description,
			COALESCE(image, ''),
			created_at,
			updated_at
		FROM movies
		ORDER BY title
	`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movies []*models.Movie

	for rows.Next() {
		var movie models.Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.RunTime,
			&movie.MPAARating,
			&movie.Description,
			&movie.Image,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		movies = append(movies, &movie)
	}

	return movies, nil
}

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}
