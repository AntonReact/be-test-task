const random = (min, max) => Math.floor(Math.random() * (max - min) ) + min;

/** count of total ratings rows - USERS * APPS */
const USERS = 500; /** count of total users  */
const APPS = 20; /** count of total apps */

const usersSeed = (pool) => {
  console.log('Seeding users');
  const arr = Array(1000).fill(1);

  return Promise.all(arr.map((_, index) => {
    return pool.query(`
      INSERT INTO users(name) VALUES ($1);
    `, [`User ${index + 1}`]);
  }))
}

const appsSeed = (pool) => {
  console.log('Seeding apps');
  const arr = Array(50).fill(1);

  return Promise.all(arr.map((_, index) => {
    return pool.query(`
      INSERT INTO apps(name) VALUES ($1);
    `, [`App ${index + 1}`]);
  }))
}

const ratingSeed = (pool) => {
  console.log('Seeding ratings');

  const apps = Array(APPS).fill(1);
  const users = Array(USERS).fill(1);

  return apps.reduce((acc, _, app_index) => {
    return [
      ...acc,
      ...users.map((_, user_index) => {
        return pool.query(
          `INSERT INTO ratings(app_id, user_id, rating) VALUES ($1, $2, $3);`,
          [
            app_index + 1,
            user_index + 1,
            (user_index + 1) % 2 === 0 ? random(1000, 100000) : random(1, 1000)
          ]
        )
      })
    ]
  }, [])
}

const seed = (pool) => {
  return Promise.all([
    appsSeed(pool),
    usersSeed(pool),
    ratingSeed(pool)
  ]);
}

module.exports = {
  seed
}