const express = require('express');
const authMiddleware = require('../middlewares/auth');
const cors = require('cors');
const Service = require('../models/Service');

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
        const service = await Service.find();

        return res.send({ service });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading services'});
    }
    
});

router.post('/',cors(corsOptions), async (req,res)=> {
    try{
        const service = await Service.create({ ...req.body, createdBy: req.devId });
        return res.send({ service });
    }catch(err){
        return res.status(400).send({ error: 'Error creating service'});
    }
});


router.get('/:serviceId',cors(corsOptions), async (req,res)=> {
    try {
        const service = await Service.findById(req.params.serviceId);

        return res.send({ service });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading service'});
    }
});

router.put('/:serviceId',cors(corsOptions), async (req,res)=> {
    res.send({ user: req.devId });
});

router.delete('/:serviceId',cors(corsOptions), async (req,res)=> {
    try {
        const service = await Service.findByIdAndRemove(req.params.serviceId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting service'});
    }
});

module.exports = (app) => app.use('/services', router);