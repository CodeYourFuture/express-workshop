//core modules
const fs = require('fs')

//3rd party modules
const express = require('express')
const formidable = require("express-formidable");
const hbs = require('hbs')
//variables
const port = 3000
const pathToPostsFile = __dirname + "/data/posts.json";

//create app
const app = express()


//serving public assets middleware
app.use(express.static('public'))
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("setUpper", text => text.toUpperCase());
app.use(formidable());

// router
app.get('/posts', (req, res) => {
    res.sendFile(pathToPostsFile);    
})
app.post('/create-post', (req, res) => {
    //reading posts
    let allposts = JSON.parse(fs.readFileSync(pathToPostsFile), 'utf8');
    const post = req.fields;
    allposts.push(post)
    fs.writeFileSync(pathToPostsFile, JSON.stringify(allposts));
    res.sendFile(pathToPostsFile);
})
require('./router/routes')(app) //routes for handlebars
app.listen(port, (req, res) => {
    console.log("Server is runnig on port:", port); 
})