const express = require('express');
//const authMiddleware = require('../middlewares/auth');
const cors = require('cors');
const Project = require('../models/Project');

const router = express.Router();

//router.use(authMiddleware);


router.get('/', async (req,res)=>{
    try {
        const projects = await Project.find().populate('dev');

        return res.send({ projects });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading projects'});
    }
    
});

router.post('/', async (req,res)=> {
    try{
        const project = await Project.create({ ...req.body, createdBy: req.devId });
        return res.send({ project })
    }catch(err){
        return res.status(400).send({ error: 'Error creating project'});
    }
});


router.get('/:projectId', async (req,res)=> {
    try {
        const project = await Project.findById(req.params.projectId).populate('dev');

        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading project'});
    }
});

router.put('/:projectId', async (req,res)=> {
    res.send({ user: req.devId });
});

router.delete('/:projectId', async (req,res)=> {
    try {
        const project = await Project.findByIdAndRemove(req.params.projectId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project'});
    }
});

module.exports = (app) => app.use('/projects', router);