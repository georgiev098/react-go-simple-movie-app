package repo

import (
	"database/sql"

	"github.com/georgiev098/simple-go-react-movie-app/internal/models"
)

type DBRepo interface {
	AllMovies() ([]*models.Movie, error)
	Connection() *sql.DB
	GetUserByEmail(email string) (*models.User, error)
}
