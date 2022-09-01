const { pool } = require('./pool');

const getRating = (request, response) => {
  const { app_id, user_id } = request.body

  pool.query(
    `SELECT * FROM ((
      SELECT
        ratings.rating,
        apps.name AS application,
        users.name AS username
      FROM ratings
      JOIN apps ON ratings.app_id = apps.id
      JOIN users ON ratings.user_id = users.id
      WHERE ratings.app_id = $1
      ORDER BY rating DESC
      LIMIT 10
    ) UNION (
      SELECT
        ratings.rating,
        apps.name AS application,
        users.name AS username
      FROM ratings
      JOIN apps ON ratings.app_id = apps.id
      JOIN users ON ratings.user_id = users.id
      WHERE ratings.app_id = $1 AND ratings.user_id = $2
    )) as RESULT
    ORDER BY rating DESC
    `,
    [app_id, user_id],
    (error, results) => {
      if (error) {
        response.status(500).end();
      } else {
        response.status(200).json(results.rows);
      }
    }
  )
}

const createRating = (request, response) => {
  const { app_id, user_id, rating } = request.body

  pool.query(
    'INSERT INTO ratings (app_id, user_id, rating) VALUES ($1, $2, $3)',
    [app_id, user_id, rating],
    (error) => {
      if (error) {
        response.status(500).end();
        console.log(error);
      } else {
        response.status(201).send(`Rating created`);
      }
  })
}

const updateUsername = (request, response) => {
  const { username, user_id } = request.body

  pool.query(
    'UPDATE users SET name = $1 WHERE id = $2',
    [username, user_id],
    (error) => {
      if (error) {
        response.status(500).end()
      } else {
        response.status(200).send(`Username updated succesfully`)
      }
    }
  )
}

module.exports = {
  getRating,
  createRating,
  updateUsername
}