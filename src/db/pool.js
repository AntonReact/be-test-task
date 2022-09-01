const Pool = require('pg').Pool;
const { migrate } = require('./migrations');
const { seed } = require('./seeds');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  ssl: {
    rejectUnauthorized: false
  }
});

const connectToDB = async () => {
  try {
    await pool.connect();
    await migrate(pool);
    await seed(pool);
    console.log("Connected to database successfully");
  } catch (err) {
    console.log("Failed to connect to database: ", err);
  }
};

connectToDB();

module.exports = {
  pool
}