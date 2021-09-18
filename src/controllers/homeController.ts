import { Request, Response } from 'express';

import { Product } from '../models/Product';
import { User } from "../models/Users";

import {Op} from "sequelize"

export const home = async (req: Request, res: Response)=>{

    // let users = await User.findAll();
    // console.log("Usuários: ",JSON.stringify(users))
    
    let users = await User.findAll({
        // attributes: ['name','age']
        // attributes: {exclude: ['id','age']}
        // where: {
        //     name: 'Paulo',
        //     age: 30,
        // }
        where:{
            // age:{
            //     [Op.or]: [30,55]
            // }, essa forma é mais indicada p coisas mais complexas, a abaixo é mais facil de aprender
            // [Op.or]: [
            //     {age: 55},
            //     {age: 26},
            //     {name: 'Paulo'},
            // ]
            age: [55,30,18]//busca todos q tiverem essas condicoes 
        }
    });





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