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


    let users = await User.findAll({
        where:{
            age: {[Op.gte]: 18}
        },
        order: [
            ['age','ASC'],
            ['name','DESC'],
        ]
    })


    //aula 23 ordenando resultados

    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};