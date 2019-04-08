const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/users');

router.get('/', (req, resp) => {
    User.find((err, docs) => {
        if (!err)
            resp.send(docs);
        else
            console.log(`Error in retrieving Users collection - ${err}`);
    });
});

router.get('/:id', (req, resp) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id - ${req.params.id}`);
    User.findById(req.params.id, (err, docs) => {
        if (!err)
            resp.send(docs);
        else
            console.log(`Error in retrieving Users collection - ${err}`);
    });
});

router.post('/', (req, resp) => {
    var usr = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
    });
    usr.save((err, doc) => {
        if (!err)
            resp.send(doc);
        else
            console.log(`Error in Usr save - ${err}`);
    });
});

router.put('/:id', (req, resp) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id - ${req.params.id}`);

    var user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err)
            resp.send(doc);
        else
            console.log(`Error in Usr save - ${err}`);
    });
});

router.delete(('/:id'), (req, resp) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id - ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err)
            resp.send(doc);
        else
            console.log(`Error in Usr save - ${err}`);
    });
});

module.exports = router;