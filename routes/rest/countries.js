var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Area = require('../../models').area;

router.get('/all', function(req, res, next) {

    Area.findAll({
        attributes: { exclude:  ["updatedAt","createdAt"] } ,
    })
    .then(area => {
        res.json(area);
    })
    .catch(error =>
    res.status(400).send(error))
});

//Buscar categoria por id
router.get('/findById/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    Area.findAll({
        attributes: { exclude:  ["updatedAt", "createdAt"] } ,
        where: {
            [Op.and]: [
                {id: id}
            ]
        }
    })
    .then(area => {
        res.json(area);
    })
    .catch(error =>
    res.status(400).send(error))
});

module.exports = router;