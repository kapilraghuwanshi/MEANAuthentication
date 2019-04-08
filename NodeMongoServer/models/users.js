const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    country: { type: String },
});

module.exports = { User };