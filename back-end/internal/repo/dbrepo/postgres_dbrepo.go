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

func (m *PostgresDBRepo) GetMovieById(id int) (*models.Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DBTimeOut)
	defer cancel()

	query := `SELECT 
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
		WHERE id = $1`

	var movie models.Movie

	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
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

	// get genres
	query = `
	SELECT g.id, g.genre
	FROM movies_genres mg
	LEFT JOIN genres g ON mg.genre_id = g.id
	WHERE mg.movie_id = $1
	ORDER BY g.genre;
	`

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}

	defer rows.Close()

	var genres []*models.Genre

	for rows.Next() {
		var g models.Genre

		err := rows.Scan(
			&g.ID,
			&g.Genre,
		)
		if err != nil {
			return nil, err
		}

		genres = append(genres, &g)
	}

	movie.Genres = genres

	return &movie, nil
}

func (m *PostgresDBRepo) EditMovie(id int) (*models.Movie, []*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DBTimeOut)
	defer cancel()

	query := `SELECT 
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
		WHERE id = $1`

	var movie models.Movie

	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
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
		return nil, nil, err
	}

	// get genres
	query = `
	SELECT g.id, g.genre, FROM movies_genres mg
	LEFT JOIN g ON (mg.genre.id = g.id) WHERE mg.movie_id = $1
	OREDER BY g.genre
	`

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}

	defer rows.Close()

	var genres []*models.Genre
	var genresArray []int

	for rows.Next() {
		var g models.Genre

		err := rows.Scan(
			&g.ID,
			&g.Genre,
		)
		if err != nil {
			return nil, nil, err
		}

		genres = append(genres, &g)
		genresArray = append(genresArray, g.ID)
	}

	movie.Genres = genres
	movie.GenresArray = genresArray

	var allGenres []*models.Genre

	query = `SELECT id, genre FROM genres ORDER BY genre`

	gRows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, nil, err
	}
	defer gRows.Close()

	for gRows.Next() {
		var g models.Genre
		err := gRows.Scan(
			&g.ID,
			&g.Genre,
		)
		if err != nil {
			return nil, nil, err
		}

		allGenres = append(allGenres, &g)
	}

	return &movie, allGenres, nil
}

func (m *PostgresDBRepo) GetUserByEmail(email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DBTimeOut)
	defer cancel()

	query := `select id, email, first_name, last_name, password, 
				created_at, updated_at from users where email = $1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, email)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.FirstName,
		&user.LastName,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (m *PostgresDBRepo) GetUserByID(id int) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DBTimeOut)
	defer cancel()

	query := `select id, email, first_name, last_name, password, 
				created_at, updated_at from users where id = $1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.FirstName,
		&user.LastName,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (m *PostgresDBRepo) AllGenres() ([]*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DBTimeOut)
	defer cancel()

	query := `SELECT id, genre, created_at, updated_at FROM genres ORDER BY genre`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var genres []*models.Genre

	for rows.Next() {
		var g models.Genre

		err := rows.Scan(
			&g.ID,
			&g.Genre,
			&g.CreatedAt,
			&g.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		genres = append(genres, &g)
	}

	return genres, nil
}

func (m *PostgresDBRepo) AddMovie(movie models.Movie) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DBTimeOut)
	defer cancel()

	query := `INSERT INTO movies (title, description, release_date, runtime, mpaa_rating, created_at, updated_at, image)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id
	`

	var newId int
	err := m.DB.QueryRowContext(ctx, query, movie.Title, movie.Description, movie.ReleaseDate, movie.RunTime, movie.MPAARating, movie.CreatedAt, movie.UpdatedAt, movie.Image).Scan(&newId)

	if err != nil {
		return 0, err
	}

	return newId, nil
}
