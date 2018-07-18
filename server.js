//core modules
const fs = require('fs')

//3rd party modules
const express = require('express')
const formidable = require("express-formidable");
const hbs = require('hbs')
//variables
const port = 3000
const pathPostsFile = __dirname + "/data/posts.json";

//create app
const app = express()

//reading posts
let allposts = JSON.parse(fs.readFileSync(pathPostsFile).toString());

//serving public assets middleware
app.use(express.static('public'))
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("setUpper", text => text.toUpperCase());
app.use(formidable());

// router
app.get('/posts', (req, res) => {
    res.sendFile(pathPostsFile);    
})
app.post('/create-post', (req, res) => {
    const post = req.fields;
    allposts.push(post)
    fs.writeFileSync(pathPostsFile, JSON.stringify(allposts));
    res.sendFile(pathPostsFile);
})
require('./router/routes')(app) //routes for handlebars
app.listen(port, (req, res) => {
    console.log("Server is runnig on port:", port); 
})