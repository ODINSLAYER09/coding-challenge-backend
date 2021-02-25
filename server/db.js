const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "DQ9Gk:3t",
  host: "localhost",
  port: 5432,
  database: "userdirectory",
});

module.exports = pool;
