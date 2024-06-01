const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


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
    res.render('about', {title: 'About'})
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
})

// blog route
app.get('/blog/create', (req, res) => {
    res.render('create', {title: 'Create'});
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result)=> {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err)=> {
            console.log(err);
        });
})


// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title: '404'})
})