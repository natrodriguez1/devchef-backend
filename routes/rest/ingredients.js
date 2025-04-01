var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Ingredient = require('../../models').ingredient;

router.get('/all', function(req, res, next) {

    Ingredient.findAll({
        attributes: { exclude:  ["updatedAt","createdAt"] } ,
    })
    .then(ingredient => {
        res.json(ingredient);
    })
    .catch(error =>
    res.status(400).send(error))
});

//Buscar categoria por id
router.get('/findById/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    Ingredient.findAll({
        attributes: { exclude:  ["updatedAt", "createdAt"] } ,
        where: {
            [Op.and]: [
                {id: id}
            ]
        }
    })
    .then(ingredient => {
        res.json(ingredient);
    })
    .catch(error =>
    res.status(400).send(error))
});

module.exports = router;