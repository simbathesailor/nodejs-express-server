import { DataTypes, Model } from "sequelize"
import sequelize from "../db"




// ID INT PRIMARY KEY     NOT NULL,
// NAME           TEXT    NOT NULL,
// AGE            INT     NOT NULL,
// ADDRESS        CHAR(50),
// SALARY         REAL


class user_table extends Model {}

user_table.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false
    // allowNull defaults to true
  },
  address: {
    type: DataTypes.TEXT
  },
  salary: {
    type: DataTypes.REAL
  }
}, {
  sequelize,
  modelName: "user_table",
  freezeTableName: true
})


console.log(user_table === sequelize.models.user_table);


export default user_table