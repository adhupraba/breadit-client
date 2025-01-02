// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: users.sql

package database

import (
	"context"

	"github.com/adhupraba/breadit-server/internal/db_types"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (name, email, username, password, image)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, email, username, password, image, created_at, updated_at
`

type CreateUserParams struct {
	Name     string              `db:"name" json:"name"`
	Email    string              `db:"email" json:"email"`
	Username string              `db:"username" json:"username"`
	Password string              `db:"password" json:"-"`
	Image    db_types.NullString `db:"image" json:"image"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.Name,
		arg.Email,
		arg.Username,
		arg.Password,
		arg.Image,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Username,
		&i.Password,
		&i.Image,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const findUserByEmail = `-- name: FindUserByEmail :one
SELECT id, name, email, username, password, image, created_at, updated_at FROM users WHERE email = $1
`

func (q *Queries) FindUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRowContext(ctx, findUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Username,
		&i.Password,
		&i.Image,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const findUserById = `-- name: FindUserById :one
SELECT id, name, email, username, password, image, created_at, updated_at FROM users WHERE id = $1
`

func (q *Queries) FindUserById(ctx context.Context, id int32) (User, error) {
	row := q.db.QueryRowContext(ctx, findUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Username,
		&i.Password,
		&i.Image,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const findUserByUsername = `-- name: FindUserByUsername :one
SELECT id, name, email, username, password, image, created_at, updated_at FROM users WHERE username = $1
`

func (q *Queries) FindUserByUsername(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRowContext(ctx, findUserByUsername, username)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Username,
		&i.Password,
		&i.Image,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const updateUsername = `-- name: UpdateUsername :exec
UPDATE users SET username = $1 WHERE id = $2
`

type UpdateUsernameParams struct {
	Username string `db:"username" json:"username"`
	ID       int32  `db:"id" json:"id"`
}

func (q *Queries) UpdateUsername(ctx context.Context, arg UpdateUsernameParams) error {
	_, err := q.db.ExecContext(ctx, updateUsername, arg.Username, arg.ID)
	return err
}