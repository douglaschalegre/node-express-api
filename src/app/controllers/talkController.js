const express = require('express');
const authMiddleware = require('../middlewares/auth');

const talk = require('../models/Talk');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req,res)=>{
    try {
        const talks = await talk.find().populate('dev');

        return res.send({ talks });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading talks'});
    }
    
});

router.post('/', async (req,res)=> {
    try{
        const talk = await Talk.create({ ...req.body, createdBy: req.devId });
        return res.send({ talk })
    }catch(err){
        return res.status(400).send({ error: 'Error creating talk'});
    }
});


router.get('/:talkId', async (req,res)=> {
    try {
        const talk = await talk.findById(req.params.talkId).populate('dev');

        return res.send({ talk });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading talk'});
    }
});

router.put('/:talkId', async (req,res)=> {
    res.send({ user: req.devId });
});

router.delete('/:talkId', async (req,res)=> {
    try {
        const talk = await talk.findByIdAndRemove(req.params.talkId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting talk'});
    }
});

module.exports = (app) => app.use('/talks', router);