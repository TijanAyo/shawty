const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const ShortUrl = new Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url:{
        type: String,
        required: true,
        default:  shortid.generate
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('Short', ShortUrl);