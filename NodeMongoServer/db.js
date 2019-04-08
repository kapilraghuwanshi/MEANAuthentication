const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MEAN_CRUD', (err) => {
    if (!err)
        console.log(`Yippee - Mongo db connection succeeded..`);
    else
        console.log(`error in db connection - ${err}`);
});

module.exports = mongoose;