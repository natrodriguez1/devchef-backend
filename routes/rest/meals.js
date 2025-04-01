var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Recipe = require('../../models').recipe;
const Ingredient = require('../../models').ingredient;
const Area = require('../../models').area;
const User = require('../../models').user;
const Category = require('../../models').category;

//Todas las recetas
router.get('/all', function(req, res, next) {
    Recipe.findAll({
        attributes: { exclude:  ["updatedAt"] } ,
        include: [
            {
                model: Ingredient,
                attributes: ['name'],
                through: {attributes: []}
            },
            {
                model: Area,
                attributes: ['id', 'name', 'img_url']
            },
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Category,
                attributes: ['id', 'name']
            }
        ],
    })
    .then(recipe => {
        res.json(recipe);
    })
    .catch(error =>
    res.status(400).send(error))
});

//Buscar receta por id
router.get('/findById/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    Recipe.findAll({
        attributes: { exclude:  ["updatedAt"] } ,
        include: [
            {
                model: Ingredient,
                attributes: ['name'],
                through: {attributes: []}
            },
            {
                model: Area,
                attributes: ['id', 'name', 'img_url']
            },
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Category,
                attributes: ['id', 'name']
            }
        ],
        where: {
            [Op.and]: [
                {id: id}
            ]
        }
    })
    .then(recipe => {
        res.json(recipe);
    })
    .catch(error =>
    res.status(400).send(error))
});

//Devuelve una receta aleatoria
router.get('/random', function(req, res, next) {


    Recipe.findOne({
        attributes: { exclude: ["updatedAt"] },
        include: [
            {
                model: Ingredient,
                attributes: ['name'],
                through: { attributes: [] }
            },
            {
                model: Area,
                attributes: ['id', 'name', 'img_url']
            },
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Category,
                attributes: ['id', 'name']
            }
        ],
        order: Sequelize.literal('rand()')
    })
    .then(recipes => res.json(recipes))
    .catch(error => res.status(400).send(error));
});

//buscar por letra o por palabra
router.get('/search', function(req, res, next) {
    const { s, f } = req.query;
    
    // Si se proporciona el parámetro 's', buscar por coincidencia en el nombre
    // Si se proporciona 'f', buscar por la letra inicial
    let whereClause = {};

    if (s) {
        whereClause.name = { [Op.like]: `%${s}%` };
    } else if (f) {
        whereClause.name = { [Op.like]: `${f}%` };
    }else {
        return res.status(400).json({ error: "Falta parámetro de búsqueda (?s= o ?f=)" });
    }

    Recipe.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [
            {
                model: Ingredient,
                attributes: ['name'],
                through: { attributes: [] }
            },
            {
                model: Area,
                attributes: ['id', 'name', 'img_url']
            },
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Category,
                attributes: ['id', 'name']
            }
        ],
        where: whereClause
    })
    .then(recipes => res.json(recipes))
    .catch(error => res.status(400).send(error));
});

//Filtrar por parámetro
router.get('/filter', function(req, res, next) {
    const { c, i, a } = req.query;
    
    // Define los includes por defecto sin condición
    let includeOptions = [
        {
            model: Ingredient,
            attributes: ['name'],
            through: { attributes: [] }
        },
        {
            model: Area,
            attributes: ['id', 'name', 'img_url']
        },
        {
            model: User,
            attributes: ['id', 'username']
        },
        {
            model: Category,
            attributes: ['id', 'name']
        }
    ];

    // Según el parámetro, agrega la condición al include correspondiente
    if (c) {
        // Filtrar recetas por categoría 
        includeOptions = includeOptions.map(include => {
            if (include.model === Category) {
                return { 
                    ...include, 
                    required: true, 
                    where: { name: c }
                };
            }
            return include;
        });
    } else if (i) {
        // Filtrar recetas por ingrediente
        includeOptions = includeOptions.map(include => {
            if (include.model === Ingredient) {
                return { 
                    ...include,
                    required: true, 
                    where: { name: i }
                };
            }
            return include;
        });
    } else if (a) {
        // Filtrar recetas por área 
        includeOptions = includeOptions.map(include => {
            if (include.model === Area) {
                return { 
                    ...include, 
                    required: true, 
                    where: { name: a }
                };
            }
            return include;
        });
    } else {
        return res.status(400).json({ error: "Falta parámetro de búsqueda (?c=, ?i= o ?a=)" });
    }

    Recipe.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: includeOptions
    })
    .then(recipes => res.json(recipes))
    .catch(error => res.status(400).send(error));
});

router.post('/save', function(req, res, next) {
    let {user, name, area, thumbnail_url, youtube_url, tags, instructions, ingredients, category} = req.body;
    Recipe.create({
        name: name,
        instructions: instructions,
        thumbnail_url: thumbnail_url,
        youtube_url: youtube_url,
        tags: tags,
        user_id: user,
        area_id: area,
        category_id: category,
        ingredients: ingredients
    })
    .then(recipe => {
        res.json(recipe);
    })
    .catch(error =>
    res.status(400).send(error))
});

module.exports = router;