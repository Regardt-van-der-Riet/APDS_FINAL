const mongoose = require('mongoose');

const bruteForceSchema = new mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date
    },
    expires: {
        type: Date,
        index: {
            expires: '1d'
        }
    }
});

module.exports = mongoose.model('BruteForce', bruteForceSchema);

