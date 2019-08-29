const express = require('express');
//const authMiddleware = require('../middlewares/auth');
const Talk = require('../models/Talk');

const router = express.Router();

//router.use(authMiddleware);



router.get('/', async (req,res)=>{
    try {
        const talks = await Talk.find();

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
        const talk = await Talk.findById(req.params.talkId);

        return res.send({ talk });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading talk'});
    }
});

router.put('/:talkId', async (req,res)=> {
    try {
        const talk = await Talk.findByIdAndUpdate(req.params.talkId);

        return res.send({ talk });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating talk'});
    }
});

router.delete('/:talkId', async (req,res)=> {
    try {
        const talk = await Talk.findByIdAndRemove(req.params.talkId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting talk'});
    }
});

module.exports = (app) => app.use('/talks', router);