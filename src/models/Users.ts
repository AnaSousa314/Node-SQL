import { Model,DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql'

export interface UserInstance extends Model{
  id:number,
  name: string,
  age: number
}

export const User = sequelize.define<UserInstance>("User",{
  id:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true//assim quano usamos o findOrCreate, o sequelize entende o que está acontecendo e não dá erro
  },
  name:{
    type: DataTypes.STRING
  },
  age:{
    type: DataTypes.NUMBER,
    defaultValue: 18
  }
},{
  tableName: "users",
  timestamps: false
});