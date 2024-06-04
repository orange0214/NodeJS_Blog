const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRoutes = require('./routers/blogRoutes')

// express app
const app = express();

const dbURI = 'mongodb+srv://junchenhe123:GVJJh8r0V0mMbiyS@nodetuts.dlkdssh.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts';

mongoose.connect(dbURI)
    .then((result)=> {
        console.log('connect to db');
        // listen for request
        app.listen(3000); 
    })
    .catch((err)=> console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
// encode the url body
app.use(express.urlencoded({extended: true}));
// log middleware
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('blogs/about', {title: 'About'})
})

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res)=>{
    res.status(404).render('blogs/404', {title: '404'})
})