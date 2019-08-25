const mongoose = require('../database');
const bcrypt = require('bcryptjs');


// Schema do usuario Dev
const DevSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

});

// Encriptação da senha 
DevSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const Dev = mongoose.model('Dev', DevSchema);

module.exports = Dev;