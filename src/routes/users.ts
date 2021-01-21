import express from "express"
import sequelize from "../db";
import pool from "../db"
import { v4 as uuidv4 } from 'uuid';
import user_table from "../models/user.model"
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  
 
  res.send('respond with a resource');
});


router.post("/adduser", async function(req, res, next) {
  try {
    
    console.log("🚀 ~ file: users.ts ~ line 14 ~ router.post ~ req", req.body)
    const transaction = await sequelize.transaction()
    
    // have to validate the payload here

    const newId = uuidv4()
    console.log("🚀 ~ file: users.ts ~ line 26 ~ router.post ~ newId", newId)
    try {
      const obj = {
     ...( req.body ? (req.body) : {}) ,
      user_id: newId
    }

    // sequelize.query("SELECT max(cust_no) + 1 as 'custNo' from employees.customers", {
    //   type: sequelize.Sequelize.QueryTypes.SELECT
    // })
    // .then(results => {
    //   return results[0];
    // })
    // .then(nextPk => {
    //   const values = Object.assign({}, newCustomer, nextPk);
    //   return customersModel.create(values);
    // })
    // .then(newRecord => {
    //   console.log('newRecord:', newRecord);
    // });
   
    // @ts-ignore
    console.log("obj.id ===>", obj.id)
      await  user_table.create(obj, {
        transaction
       }) 
  
       await transaction.commit()
       const items = await sequelize.query(`select * from public.user_table where email='anil@dot.com';`, {
        model:user_table ,
        mapToModel: true // pass true here if you have any mapped fields
      });
       console.log("🚀 ~ file: users.ts ~ line 63 ~ router.post ~ items", items)
       res.send({
         success: "ok",
         data: {...obj}
       })

      
    } catch(e) {
      console.log("Err is: ", e);
      transaction.rollback();
    }
  //   await user_table.create({
  //     "name": "Anil",
  //     "age": 29,
  //     "address":"my address",
  //     "salary": 21000
  // });
    // console.log("🚀 ~ file: users.ts ~ line 16 ~ router.get ~ jane", jane)
    // console.log(jane instanceof user_table);
    // // await jane.save();
    // console.log("saved to database", jane)
    // res.json(jane)
  } catch(e) {
    console.log("err", e)

  }
})

export default router
