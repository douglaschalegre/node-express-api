const express = require('express');
const authMiddleware = require('../middlewares/auth');
const cors = require('cors');
const Member = require('../models/Member');

const router = express.Router();

router.use(authMiddleware);

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


router.get('/',cors(corsOptions), async (req,res)=>{
    try {
        const member = await Member.find();

        return res.send({ member });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading members'});
    }
    
});

router.post('/',cors(corsOptions), async (req,res)=> {
    try{
        const member = await Member.create({ ...req.body, createdBy: req.devId });
        return res.send({ member });
    }catch(err){
        return res.status(400).send({ error: 'Error creating member'});
    }
});


router.get('/:memberId',cors(corsOptions), async (req,res)=> {
    try {
        const member = await Member.findById(req.params.memberId);

        return res.send({ member });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading member'});
    }
});

router.put('/:memberId',cors(corsOptions), async (req,res)=> {
    res.send({ user: req.devId });
});

router.delete('/:memberId',cors(corsOptions), async (req,res)=> {
    try {
        const member = await Member.findByIdAndRemove(req.params.memberId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting member'});
    }
});

module.exports = (app) => app.use('/members', router);