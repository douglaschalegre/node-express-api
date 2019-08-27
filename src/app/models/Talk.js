const mongoose = require('../../database');

// Schema de Talks
const TalkSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },   
    local:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    slideUrl:{
        type: String,
        require: true,
    },
    assignedTo:{
        type: [String],
    },
    date:{
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

const Talk = mongoose.model('Talk', TalkSchema);

module.exports = Talk;