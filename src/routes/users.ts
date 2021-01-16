import express from "express"
import pool from "../db"
import user_table from "../models/user.model"
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  
 
  res.send('respond with a resource');
});


router.post("/adduser", async function(req, res, next) {
  try {
    console.log("🚀 ~ file: users.ts ~ line 14 ~ router.post ~ req", req.body)
    const jane = user_table.build({
      "name": "Anil",
      "age": 29,
      "address":"my address",
      "salary": 21000
  });
    console.log("🚀 ~ file: users.ts ~ line 16 ~ router.get ~ jane", jane)
    console.log(jane instanceof user_table);
    await jane.save();
    console.log("saved to database", jane)
    res.json(jane)
  } catch(e) {
    console.log("err", e)

  }
})

export default router
