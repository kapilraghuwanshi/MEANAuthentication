const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const Subscriber = mongoose.model('Subscriber');

console.log('inside subscriber controller');
module.exports.register = (req, res, next) => {
    console.log('inside register in subscriber.controller.js ');
    var subs = new Subscriber({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    });
    // mongoDb function
    subs.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(`inside save ${doc}`);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['This email adrress is already in use!']);
            else
                return next(err); // error catches by next
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    console.log('inside authenticate in subscriber.controller.js ');
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user and send the JWT token to this user's request
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.subscriberProfile = (req, res, next) => {
    console.log('inside subscriberProfile in subscriber.controller.js ');
    // mongoDb function
    Subscriber.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
        }
    );
}