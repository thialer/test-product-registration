const { Pool } = require("pg");

const pool = new Pool({
  host: "ep-blue-darkness-ahhlaku9-pooler.c-3.us-east-1.aws.neon.tech",
  user: "neondb_owner",
  password: "npg_5ToIH7qifEMs",
  database: "neondb",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
