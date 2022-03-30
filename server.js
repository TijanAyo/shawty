require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');

const ShortUrl = require('./model/shorturl');
const ConnectDB = require('./config/db')


//view engine & Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// static files path
app.use(express.static(__dirname+'/public'));


app.get('/', async (req, res)=>{
    try{
        const short_url = await ShortUrl.find().sort("-createdAt")
        return res.status(200).render('index', {title: "Short URL's | Shawty", short_url:short_url})
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
})


app.post('/shorten_url', async (req, res)=>{
    try{
        const new_shawty = await ShortUrl.create({
            full_url: req.body.fullUrl
        })
    
        if(new_shawty){
            return res.status(201).redirect('/')
        }
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
    
})

app.get('/:id', async(req, res)=>{
    try{
        const shawt_url = await ShortUrl.findOne({
            short_url: req.params.id
        })

        if(shawt_url == null){
            return res.status(404).json({message: 'Your short url not found'})
        }
        else{
            return res.redirect(shawt_url.full_url)
        }
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
})


// Connect DB
ConnectDB()


const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`)
})