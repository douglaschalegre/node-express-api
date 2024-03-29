const express = require('express');
const bcrypy = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const Dev = require('../models/Dev');

const router = express.Router();

// Gerador de token JWT
function generateJwtToken(params = { }){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

//Config do CORS
var whitelist = ['http://hookly.com.br'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

// Registro de um novo usuario
router.post('/register',cors(corsOptions), async (req,res)=>{
    const { email } = req.body;

    try{
        if(await Dev.findOne({ email })){
            return res.status(400).send({ error: 'User already exists' })
        }
        const dev = await Dev.create(req.body);
        dev.password = undefined;

        return res.send({ 
            dev,
            token: generateJwtToken({id: dev.id}),
         });

    } catch(err){
        return res.status(400).send({ error: 'Registration failed' });
    }

});

// Autenticaçao de um usuario
router.post('/authenticate',cors(corsOptions), async (req,res)=>{
    const { email, password } = req.body;

    const dev = await Dev.findOne({ email }).select('+password');
    
    if(!dev){
        return res.status(400).send({ error: 'User not found :(' });
    }

    if(!await bcrypy.compare(password, dev.password)){
        return res.status(400).send({ error:'Invalid password' });
    }
    dev.password = undefined;

    res.send({ 
        dev, 
        token: generateJwtToken({id: dev.id}),
    });
});

module.exports = (app) => app.use('/auth', router)