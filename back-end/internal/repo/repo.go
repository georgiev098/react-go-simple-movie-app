package repo

import (
	"database/sql"

	"github.com/georgiev098/simple-go-react-movie-app/internal/models"
)

type DBRepo interface {
	AllMovies(genre ...int) ([]*models.Movie, error)
	Connection() *sql.DB
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	EditMovie(id int) (*models.Movie, []*models.Genre, error)
	GetMovieById(id int) (*models.Movie, error)
	AllGenres() ([]*models.Genre, error)
	AddMovie(movie models.Movie) (int, error)
	UpdateMovieGenres(id int, genreIds []int) error
	UpdateMovieById(movie models.Movie) error
	DeleteMovieById(id int) (int, error)
}
