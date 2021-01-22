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

router.get("/get",async function(req, res, next) {
  try {

    // const transaction = await sequelize.transaction()

    const items = await sequelize.query(`select * from public.user_table;`, {
      model:user_table ,
      mapToModel: true // pass true here if you have any mapped fields
    });

    // console.log("====>", user_table.rawAttributes)
     res.status(200).send({
      success: true,
      message: "Success message",
      payload: {
        data: {
          items: items
        }
      }
    })
  } catch(e) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong !"
    })
  }
    console.log("🚀 ~ file: users.ts ~ line 112 ~ router.get ~ user_table.rawAttributes", user_table.rawAttributes)
    console.log("🚀 ~ file: users.ts ~ line 112 ~ router.get ~ user_table.rawAttributes", user_table.rawAttributes)
})

router.patch("/updateuser",async function(req, res, next) {
  try {
    const {payload} = req.body
    const keysInTable = Object.keys(user_table.rawAttributes)
    const { user_id } = payload
    if(!user_id) {
      return res.status(400).send({
        success: false,
        message: "user_id is required",
      })
    }

    let user = await  user_table.findOne({
      where : {"user_id": user_id}
    })
    console.log("🚀 ~ file: users.ts ~ line 131 ~ router.patch ~ user", user)

    debugger
    // if user is there anf payload is valid
    if(user && payload) {
      Object.keys(payload).forEach((key) => {
        let newObject: any = {}
        
        if(keysInTable.indexOf(key) !== -1 && key !== "user_id" && key !== "email") {
          newObject[key] = payload[key]
        }
        
        if(Object.keys(newObject).length > 0) {
          console.log("🚀 ~ file: users.ts ~ line 141 ~ Object.keys ~ newObject", newObject)
          // still after all those check , some items are there which you want to update.

          // user_table.update({
            
          // })

          return res.status(200).send({
            success: true,
            message: "test success message"
          })
          
        }
      })
    }
    //  res.status(200).send({
    //   success: true,
    //   message: "Success message",
    //   payload: {
    //     data: {
    //       items: []
    //     }
    //   }
    // })
  } catch(e) {
    debugger
    console.log("🚀 ~ file: users.ts ~ line 167 ~ router.patch ~ e", e)
    return res.status(500).send({
      success: false,
      message: "Something went wrong !"
    })
  }
})



export default router
