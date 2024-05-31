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
// log middleware
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res)=> {
    const blog = new Blog({
        title: 'new blog2',
        snippet: 'about my new blog2',
        body: 'more about my new blog2'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get('/single-blog', (req, res)=> {
    Blog.findById('665a1f87f82c0989efcbb997')
        .then((result)=> {
            res.send(result);
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Home', blogs: blogs});
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// create
app.get('/blogs/create', (req, res)=>{
    res.render('create', {title: 'Create'})
})

// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title: '404'})
})