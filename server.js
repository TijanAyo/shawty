const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const shorturl = require('./models/shorturl');

// express
const app = express();

//view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));

// connecting to MongoDB
const dbURI = 'mongodb+srv://Tijan:Tijan123@getting-started-with-no.sdrkl.mongodb.net/Shawty-url-shortner?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result)=>{
        app.listen(3000);
    })
    .catch((err)=>{
        console.log(err);
    });

// Routes
app.get('/', (req, res) =>{
    shorturl.find()
        .then((result)=>{
            res.render('index', {title: 'Shawty that lil link',  shorturl:result})
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

/* app.get('/:shorturl', (req, res)=>{
    const shawtyid = req.params.shorturl;

    shorturl.findOne({short_url:shawtyid})
    .then(()=>{
        if(shawtyid == null) return res.sendStatus(404);

        res.redirect(shorturl.full_url);
    })
    .catch((err)=>{
        console.log(err);
    })
}) */