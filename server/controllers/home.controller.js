import moment from "moment";
import Category from '../models/Categoria.model.js';
import Group from "../models/Grupos.model.js";
import User from '../models/User.model.js';
import Meeti from "../models/Meeti.model.js";

export const home = async (req, res) => { 
    const query = [];
    query.push( Category.find());
    query.push(Meeti.find({}).populate([
        {path: 'group', model: 'Group', select: 'imagen'},
        {path: 'created_at', model: 'User', select: 'name imagen'}
    ]))

    const [ categories, meetis] = await Promise.all(query);
    res.render('home', {
        namePage: 'Home', 
        categories,
        meetis,
        moment
    })
}