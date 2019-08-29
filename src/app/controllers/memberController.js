const express = require('express');
//const authMiddleware = require('../middlewares/auth');
const cors = require('cors');
const Member = require('../models/Member');

const router = express.Router();

//router.use(authMiddleware);


router.get('/', async (req,res)=>{
    try {
        const member = await Member.find();

        return res.send({ member });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading members'});
    }
    
});

router.post('/', async (req,res)=> {
    try{
        const member = await Member.create({ ...req.body, createdBy: req.devId });
        return res.send({ member });
    }catch(err){
        return res.status(400).send({ error: 'Error creating member'});
    }
});


router.get('/:memberId', async (req,res)=> {
    try {
        const member = await Member.findById(req.params.memberId);

        return res.send({ member });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading member'});
    }
});

router.put('/:memberId', async (req,res)=> {
    try {
        const member = await Member.findByIdAndUpdate(req.params.memberId);

        return res.send({ member });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating member'});
    }
});

router.delete('/:memberId', async (req,res)=> {
    try {
        const member = await Member.findByIdAndRemove(req.params.memberId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting member'});
    }
});

module.exports = (app) => app.use('/members', router);