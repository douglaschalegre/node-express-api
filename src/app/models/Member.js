const mongoose = require('../../database');

// Schema do usuario Dev
const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    description:{
        type: String,
        require: true,
    },
    role:{
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;