import { Request, Response } from 'express';
import {Op} from "sequelize"

import { Product } from '../models/Product';
import { User } from "../models/Users";


export const home = async (req: Request, res: Response)=>{

    // let searchName:string = 'an' 
    // // let users = await User.findAll();
    // // console.log("Usuários: ",JSON.stringify(users))
    
    // let users = await User.findAll({
    //     // attributes: ['name','age']
    //     // attributes: {exclude: ['id','age']}
    //     // where: {
    //     //     name: 'Paulo',
    //     //     age: 30,
    //     // }
    //     // where:{
    //     //     // age:{
    //     //     //     [Op.or]: [30,55]
    //     //     // }, essa forma é mais indicada p coisas mais complexas, a abaixo é mais facil de aprender
    //     //     // [Op.or]: [
    //     //     //     {age: 55},
    //     //     //     {age: 26},
    //     //     //     {name: 'Paulo'},
    //     //     // ]
    //     //     age: [55,30,18]//busca todos q tiverem essas condicoes 
    //     // }

    //     where:{
    //         // age:{
    //     //     // GT - Greater Than,
    //     //     // E - Equal,
    //     //     // LT - Lower Than
    //     //     // [Op.gt]: 40, // > 40,
    //     //     // [Op.gte]: 30, // >= 40
    //     //     // [Op.lt]: 40, // < 40
    //     //     // [Op.lte]: 55, // <= 40
    //     //     // [Op.between]: [30,55]
    //     //     // [Op.notBetween]: [30,55]
    //     //    // [Op.in]: [30,55] é o mesmo q age:[30,55]
    //         //     // [Op.notIn]: [30,55]
    //         // },
    //         name:{
    //             // [Op.like]: 'pa%'
    //             // [Op.like]: '%co'
    //             [Op.like]: `%${searchName}%`
    //         }
    //     }
    // });

    //aula 23 ordenando resultados

    // let users = await User.findAll({
    //     where:{
    //         age: {[Op.gte]: 18}
    //     },
    //     // order: [
    //     //     ['name','ASC'],
    //     //     ['age','ASC'],
    //     // ],
    //     offset: 4,
    //     limit: 2
    // })

    //aula 25 

    //build + save
    //build cria a instancia do usuário direto no node
    //ele serve para quando não temos certeza do valor de alguma variável.
    // const user = User.build({
    //     name: 'Carlos',
        // age: 25
    // });
    // let age:number = 27;
    // user.age = age,

    // await user.save();

    // console.log("Nome do usuário build ",user.name);
    // console.log("Idade do usuário: ",user.age)

    // await user.save();


    //create 
    // const user = await User.create({
    //     name: 'Mario',
    //     age: 39
    // });

    // console.log('Name: ',user.name);
    // console.log('Age: ',user.age);


    // let age: number = 90;
    // let showOld: boolean = false;

    // if(age > 50) {
    //     showOld = true;
    // }


    //aula 27


    // 1. Dados a serem alterados
    // 2. Condição para encontrar o(s) item(ns)

    // primeiro parametro é novo valor que será colocada, o segundo é condição de onde esse valor será alterdo. No caso, todos os usuários menores de 18 anos receberam uma nova idade de 18 anos.
    // await User.update({ age: 18}, {
    //     where:{
    //         age:{
    //             [Op.lt]: 18
    //         }
    //     }
    // });


    // apenas um usuario
    // await User.update({name: 'Seu Chico', age: 56},{
    //     where:{
    //         id: 4
    //     }
    // })


    // let result = await User.findAll({
    //     where:{id: 7}
    // });

    // if(result.length > 0){
    //     let usuario = result[0];

    //     usuario.age = 70;
    //     await usuario.save();
    // }
    // console.log('Results ')


    //AULA 29

    // primeira forma de deletar
    // await User.destroy({
    //     where:{
    //         age:{
    //             [Op.lte]: 18
    //         }
    //     }
    // });

    //segunda forma de deletar
    // let results = await User.findAll({
    //     where:{
    //        name:'João' 
    //     }
    // });

    // if(results.length > 0){
    //     let usuario = results[0];

    //     await usuario.destroy();
    // }

    //AULA31 métodos finder

    //o findOne pega o primeiro dado que atender as especificações, mesmo que haja outros ele só retornará o primeiro que encontrou
    let usuario = await User.findOne({
        where:{
            // id:60

            age:{
                [Op.gt]: 18
            }

        }
    });
    
    if(usuario){
        console.log(`O usuário ${usuario.name}, idade ${usuario.age}`)
    }else{
        console.log('não encntradio')
    }

    let usuario2 = await User.findByPk(1);

    // console.log(usuario2?.name)


    // console.log(usuario)

    // o findOrCreate se não encotrar o dado solicitado, ele cria esse dado com as especificações dadas

    const [user,created] = await User.findOrCreate({
        where:{
            name: 'Catarina'
        },
        defaults:{
            name: 'Catarina',//podemos colocar so o age pq no where já fala o name
            age: 106
        }
    });

    // console.log('Usuario',user);
    // console.log('Created',created);//quando o usuario já existe, ele retorna false

    if(created){
        console.log('Usuário criado com sucesso!');
    }else{
        console.log('Achamos o usuário.')
    }

    console.log('Usuario',user.name);


    

    let users = await User.findAll();

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        // showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};


export const idadeMais = async(req:Request,res:Response)=>{
    let {id} = req.params
    // let results = await User.findAll({
    //     where:{
    //       id: id  
    //     }
    // });

    let results = await User.findAll({
        where:{
          id: id  
        }
    });

    if(results.length > 0){
        let user = results[0]
        console.log(user.age)

        user.age++

        await user.save();  
    }
    
    
    res.redirect('/');

}

export const idadeMenos = async(req:Request,res:Response)=>{
    let {id} = req.params
    let results = await User.findAll({
        where:{
          id: id  
        }
    });

    if(results.length > 0){
        let user = results[0]
        console.log(user.age)

        user.age--

        await user.save();  
    }
    
    
    res.redirect('/');

}

export const deleted = async(req:Request,res: Response)=>{
    let {id} = req.params

    await User.destroy({
        where:{
            id: id
        }
    });

    //ou

    // let user = await User.findByPk(id);

    // await user?.destroy()

    // console.log(results)
    res.redirect('/');

}