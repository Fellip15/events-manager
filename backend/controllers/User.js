const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const UserModel = require("../models/User");
const generateToken = require("../generateToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

module.exports.authUser = asyncHandler(async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha)
        return res.status(400).send("Dados insuficientes");

    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(senha, user.password))) {
        res.cookie("token", generateToken(user._id))
        return res.status(200).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
        
    } else {
        return res.status(401).send("Email ou senha inválido");
    }
});

module.exports.authToken = async (req, res) => {
    const token = req.body.token || null;

    if (!token) return res.status(400).send("Não autorizado");

    try {
        const Token = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(Token.id);
        return res.status(200).json({
            id: user._id,
            email: user.email
        });
    } catch (err) {
        return res.status(400).send("Não autorizado");
    }
}

module.exports.deslogar = async (req, res) => {
    res.clearCookie('Token');
    res.redirect('/');
}

module.exports.cadastrar = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const userExists = await UserModel.findOne({ email });
  
    if (userExists) {
        return res.status(400).send("Usuário já existe");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
  
    const user = new UserModel({
        email:email,
        password:passwordHash
    });
  
    const newUser = await user.save();
    return res.status(200).json({
        id:newUser._id,
        email:newUser.email,
        token: generateToken(newUser._id)
    });
});

module.exports.getUsers = async (req, res) => {
    const User = await UserModel.find().exec();
    
    if(User)
        return res.status(200).json(User);
    
    return res.status(404).send("Users not found");
}