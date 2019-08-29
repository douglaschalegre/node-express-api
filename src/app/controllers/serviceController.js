const express = require('express');
//const authMiddleware = require('../middlewares/auth');
const Service = require('../models/Service');

const router = express.Router();

//router.use(authMiddleware);



router.get('/', async (req,res)=>{
    try {
        const service = await Service.find();

        return res.send({ service });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading services'});
    }
    
});

router.post('/', async (req,res)=> {
    try{
        const service = await Service.create({ ...req.body, createdBy: req.devId });
        return res.send({ service });
    }catch(err){
        return res.status(400).send({ error: 'Error creating service'});
    }
});


router.get('/:serviceId', async (req,res)=> {
    try {
        const service = await Service.findById(req.params.serviceId);

        return res.send({ service });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading service'});
    }
});

router.put('/:serviceId', async (req,res)=> {
    try {
        const service = await Service.findByIdAndUpdate(req.params.serviceId);

        return res.send({ service });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating service'});
    }
});

router.delete('/:serviceId', async (req,res)=> {
    try {
        const service = await Service.findByIdAndRemove(req.params.serviceId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting service'});
    }
});

module.exports = (app) => app.use('/services', router);