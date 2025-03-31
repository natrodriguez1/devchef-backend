var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Recipe = require('../../models').recipe;
const Ingredient = require('../../models').ingredient;
const Area = require('../../models').area;
const User = require('../../models').user;
const Category = require('../../models').category;

router.get('/all', function(req, res, next) {
    Recipe.findAll({
        attributes: { exclude:  ["updatedAt"] } ,
        include: [{
            model: [Ingredient, Area, User, Category],
            attributes: ['texto'],
            through: {attributes: []}
        }],
    })
    .then(recipe => {
        res.json(recipe);
    })
    .catch(error =>
    res.status(400).send(error))
});

router.get('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    Recipe.findAll({
        attributes: { exclude:  ["updatedAt"] } ,
        include: [{
            model: [Ingredient, Area, User, Category],
            attributes: ['texto'],
            through: {attributes: []}
        }],
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

module.exports = router;