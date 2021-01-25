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
    // @ts-ignore
      console.log("obj.id ===>", obj.id)
      const userAfterAddition = await  user_table.create(obj, {
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
      debugger
      res.status(200).send({
        success: false,
        message: "Email already exists"
      })
    }
  } catch(e) {
    // []
    // e.errors[0]

    //     [ValidationErrorItem]
    // 0: ValidationErrorItem
    // instance: user_table {dataValues: {…}, _previousDataValues: {…}, _changed: Set(6), _options: {…}, isNewRecord: true}
    // message: "email must be unique"
    // origin: "DB"
    // path: "email"
    // type: "unique violation"
    // validatorArgs: []
    // validatorKey: "not_unique"
    // validatorName: null
    // value: "piya@dot.com"
    console.log("err", e)
    res.status(500).send({
      success: false,
      message: "Something wrong happened"
    })

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
      Object.keys(payload).forEach(async (key) => {
        let newObject: any = {}
        
        if(keysInTable.indexOf(key) !== -1 && key !== "user_id" && key !== "email") {
          newObject[key] = payload[key]
        }
        
        if(Object.keys(newObject).length > 0) {
          console.log("🚀 ~ file: users.ts ~ line 141 ~ Object.keys ~ newObject", newObject)

          // still after all those check , some items are there which you want to update.
          Object.keys(newObject).forEach((keyInObj: string) => {
            // @ts-ignore
            user[keyInObj] = newObject[keyInObj]
          })
          // user_table.update({
            
          // })
          await user?.save()
          return res.status(200).send({
            success: true,
            message: "test success message",
            data: {
              // @ts-ignore
              ...(user?.dataValues || {})
            }
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
