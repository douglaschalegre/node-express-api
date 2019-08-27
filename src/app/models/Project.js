const mongoose = require('../../database');

// Schema dos Projetos
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    site:{
        type: String,
        require: true,
    },
    img:{
        type: String,
        require: true,
    },
    serviceType:{
        type: [String],
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    createdBy:{
        type: String,
    },

});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;