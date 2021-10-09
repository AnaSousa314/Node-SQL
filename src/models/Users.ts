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
    type: DataTypes.STRING,
    //antes do model entregar o nome do usuario, ele altera com o get. Ele não altera o BD, ele altera o dado entregado
    get(){
      const raw = this.getDataValue('name');
      return raw.toUpperCase();
    }
  },
  age:{
    type: DataTypes.NUMBER,
    defaultValue: 18,

    // o set altera o dado antes dele ser enviado para o BD. No caso abaixo se o age que é o value, for menor que 18, ele alterara o dado de age para 18.
    set(value:number){
      if(value < 18){
        value = 18;
      }
      this.setDataValue('age',value);
    }
  },
  //com o set podemos enviar a senha já criptografada
  // password:{
  //   type: DataTypes.STRING
  // }

  // campo virtual, ele não existe no banco de dados, existe apenas no model
  firstLetterOfName:{
     type: DataTypes.VIRTUAL,
     get(){
       let name: string = this.getDataValue('name');
       return name.charAt(0);
     }
  },
  //se tivessemos nome e sobrenome, para uni-los poderiamos criar um campo virtual para reunir esses dois dados somente no model.
  fullName:{
    type: DataTypes.VIRTUAL,
    get(){
      let name: string = this.getDataValue('name');
      let lastName: string = 'Silva'
      return `${name} ${lastName}`
    }
  }

},{
  tableName: "users",
  timestamps: false
});