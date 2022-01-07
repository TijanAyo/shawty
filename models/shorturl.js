const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url:{
        type: String,
        required: true,
        default:  shortid.generate
    }
});

const shorturl = mongoose.model('shawty', ShortUrlSchema);
module.exports = shorturl;