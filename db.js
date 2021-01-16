const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Stack@123",
  host: "localhost",
  port: 5342,
  database: "house",
});
