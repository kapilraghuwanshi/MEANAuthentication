const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var subscriberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name cant be empty'
    },
    email: {
        type: String,
        required: 'Email cant be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password cant be empty',
        minlength: [4, 'Password must be atleast 4 character long'],
        maxlength: [8, 'Password must be atmax 8 character long']
    },
    saltSecret: String,
});

// Custom validation for email
subscriberSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Your e-mail is Invalid.');

// Mongoose Hooks - Pre Events before save
subscriberSchema.pre('save', function (next) {
    console.log('inside pre save in subscriber.model.js ');
    // bcrypt to encrpy password and saltSecret
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next(); // pass execution to the next handler
        });
    });
});

// Mongoose Custom Methods for full collection
subscriberSchema.methods.verifyPassword = function (password) {
    console.log('inside verifyPassword in subscriber.model.js ');
    return bcrypt.compareSync(password, this.password);
};

subscriberSchema.methods.generateJwt = function () {
    console.log('inside generateJwt in subscriber.model.js ');
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
}

mongoose.model('Subscriber', subscriberSchema);