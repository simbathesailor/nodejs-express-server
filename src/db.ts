import { Pool } from "pg"

import { Sequelize } from "sequelize"

const sequelize = new Sequelize('postgres://postgres:Stack123@localhost:5432/house')


async function TestDbConnection() {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

TestDbConnection()


export default sequelize

// const pool = new Pool({
//   user: "postgres",
//   password: "Stack123",
//   host: "127.0.0.1",
//   port: 5342,
//   database: "house",
// });

// export default pool