var express = require('express');
var router = express.Router();
const authController = require('../controllers/user.controller');


const {Sequelize, Op} = require('sequelize');
const User = require('../models').user;

/* GET users listing. */
router.get('/', function(req, res, next) {
  signInUser
  res.render('user');
});

router.post('/login', authController.login);
module.exports = router;
