const usersMigrate = (pool) => {
  console.log("Running users migration");
  return pool.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    )
  `)
}

const ratingMigrate = (pool) => {
  console.log("Running ratings migration");
  return pool.query(`
    CREATE TABLE ratings (
      app_id INT NOT NULL,
      user_id INT NOT NULL,
      rating INT NOT NULL,
      CONSTRAINT id PRIMARY KEY (app_id, user_id),
      FOREIGN KEY (app_id) REFERENCES apps(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)
}

const appsMigrate = (pool) => {
  console.log("Running apps migration");
  return pool.query(`
    CREATE TABLE apps (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );
  `)
}

const migrate = async (pool) => {
  try {
    await usersMigrate(pool);
    await appsMigrate(pool);
    await ratingMigrate(pool);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

module.exports = {
  migrate
}