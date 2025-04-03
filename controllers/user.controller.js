const {Sequelize, Op} = require('sequelize');
const User = require('../models').user;
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const {email, password, username} = req.body;

    try{
        const user = await User.create({
            username, email, password
        });
        res.json({message: 'registered correctly'})
    }catch(error){
        res.status(400).json({error: error.message})
    }
};
exports.login = async (req, res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({
        where: {
            [Op.and]: [
                {email: email}
            ]
        }
    });
    if(!user){
        return res.status(401).json({message: "error"});
    }
    const token = jwt.sign({userId: user.id}, "secret-key",{
        expiresIn: "1h"
    });
    res.json({message: "login successful", token, username: user.username, password: user.password})
}