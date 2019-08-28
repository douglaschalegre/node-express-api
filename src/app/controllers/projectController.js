const express = require('express');
const authMiddleware = require('../middlewares/auth');
const cors = require('cors');
const Project = require('../models/Project');

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
        const projects = await Project.find().populate('dev');

        return res.send({ projects });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading projects'});
    }
    
});

router.post('/',cors(corsOptions), async (req,res)=> {
    try{
        const project = await Project.create({ ...req.body, createdBy: req.devId });
        return res.send({ project })
    }catch(err){
        return res.status(400).send({ error: 'Error creating project'});
    }
});


router.get('/:projectId',cors(corsOptions), async (req,res)=> {
    try {
        const project = await Project.findById(req.params.projectId).populate('dev');

        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading project'});
    }
});

router.put('/:projectId',cors(corsOptions), async (req,res)=> {
    res.send({ user: req.devId });
});

router.delete('/:projectId',cors(corsOptions), async (req,res)=> {
    try {
        const project = await Project.findByIdAndRemove(req.params.projectId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project'});
    }
});

module.exports = (app) => app.use('/projects', router);