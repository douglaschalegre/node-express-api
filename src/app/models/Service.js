const mongoose = require('../../database');

// Schema dos Serviços
const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description:{
        type: String,
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

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;