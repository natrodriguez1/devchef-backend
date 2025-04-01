var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Category = require('../../models').category;

router.get('/all', function(req, res, next) {

    Category.findAll({
        attributes: { exclude:  ["updatedAt","createdAt"] } ,
    })
    .then(category => {
        res.json(category);
    })
    .catch(error =>
    res.status(400).send(error))
});

//Buscar categoria por id
router.get('/findById/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    Category.findAll({
        attributes: { exclude:  ["updatedAt", "createdAt"] } ,
        where: {
            [Op.and]: [
                {id: id}
            ]
        }
    })
    .then(category => {
        res.json(category);
    })
    .catch(error =>
    res.status(400).send(error))
});

module.exports = router;