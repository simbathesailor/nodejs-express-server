import express from "express"
import path from "path"
import cookieParser from 'cookie-parser'
import logger from "morgan"
// import SequelizeImport from "sequelize"
import sequelize from "./db"
import bodyParser from "body-parser"


import indexRouter from "./routes/index"
import usersRouter from "./routes/users"




//const port = 8010;


// const sequelize = new Sequelize('postgres://postgres:localhost:53920/usertable') //

// // const sequelize = new Sequelize("database", "postgres", "Stack@123", {
// //   host: 
// // })
// console.log("🚀 ~ file: app.ts ~ line 15 ~ sequelize", sequelize)
// https://stackoverflow.com/questions/25670075/passing-database-connection-around-in-a-nodejs-application

// async function  test() {
//   try {
//     // @ts-ignore
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }


var app = express();


app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
module.exports = app;
