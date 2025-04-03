var express = require('express');
var router = express.Router();
const authController = require('../controllers/user.controller');


const {Sequelize, Op} = require('sequelize');
const User = require('../models').user;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user-main');
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
