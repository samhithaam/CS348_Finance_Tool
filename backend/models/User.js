// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store plain text password (not recommended for production)
});

const User = mongoose.model('User', userSchema);
module.exports = User;
