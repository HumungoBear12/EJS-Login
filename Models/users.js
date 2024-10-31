const mongoose = require('mongoose');
// import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: [true, 'Must Provide a Email']
    },
    name: {
        type: String,
        required: [true, 'Must Provide a name']
    },
    password: {
        type: String,
        required: [true, 'Must Provide a Password']
    },
    logs: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: new Date()
    }
});

// This is basic validation not advanced
module.exports = mongoose.model('users', UserSchema);