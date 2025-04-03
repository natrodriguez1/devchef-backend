var express = require('express');
var router = express.Router();
const authController = require('../controllers/user.controller');

const {Sequelize, Op} = require('sequelize');
const User = require('../models').user;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user-main');
});

router.get('/all', function(req, res, next) {

    User.findAll({
        attributes: { exclude:  ["updatedAt","createdAt"] } ,
    })
    .then(user => {
        res.json(user);
    })
    .catch(error =>
    res.status(400).send(error))
});

//Buscar categoria por id
router.get('/findById/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    User.findAll({
        attributes: { exclude:  ["updatedAt", "createdAt"] } ,
        where: {
            [Op.and]: [
                {id: id}
            ]
        }
    })
    .then(user => {
        res.json(user);
    })
    .catch(error =>
    res.status(400).send(error))
});

router.get('/logInForm', function(req, res, next) {
  res.render('user');
});

router.get('/regForm', function(req, res, next) {
  res.render('user-register');
});

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
