const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const shorturl = require('./models/shorturl');

require('dotenv').config()

const favicon = require('serve-favicon');
const path = require('path');

// express
const app = express();

//view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// static files path
app.use(express.static(__dirname+'/public'));

let pass = process.env.DB_PASS;
let name = process.env.DB_NAME

// connecting to MongoDB
const dbURI = `mongodb+srv://Tijan:${pass}@getting-started-with-no.sdrkl.mongodb.net/${name}?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
    .then((result)=>{
        app.listen(process.env.PORT || 3000);
    })
    .catch((err)=>{
        console.log(err);
    });

// Routes
app.get('/', (req, res) =>{
    shorturl.find()
        .then((result)=>{
            res.render('index', {title: "Short URL's | Shawty",  shorturl:result})
        })
        .catch((err)=>{
            console.log(err);
        })
});


app.post('/shawtyURLs', (req, res)=>{
    // const shawtyurl = new shorturl(req.body.fullUrl);
    shorturl.create({ full_url: req.body.fullUrl })
        .then(()=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })

});

app.get('/:shawtyid', async (req, res)=>{
    const shawtyid = await shorturl.findOne({ short_url: req.params.shawtyid})
    if(shawtyid == null) return res.sendStatus(404)

    res.redirect(shawtyid.full_url);

});