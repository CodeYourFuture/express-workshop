//core modules
const fs = require('fs')

//3rd party modules
const express = require('express')
const formidable = require("express-formidable");
const hbs = require('hbs')
//variables
const port = 3000

//create app
const app = express()

//serving public assets middleware
app.use(express.static('public', {'extensions': ['html']}))
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("setUpper", text => text.toUpperCase());
app.use(formidable());

// router
app.get('/posts', (req, res) => {
    res.json(fs.readFileSync(__dirname + "/data/posts.json", "utf8"));   
})
app.post('/post', (req, res) => {
    const pathPostsFile = __dirname + "/data/posts.json";
    const allposts = JSON.parse(fs.readFileSync(pathPostsFile).toString());

    const post = req.fields;
    allposts.push(post)
    fs.writeFileSync(pathPostsFile, JSON.stringify(allposts));
    res.json(fs.readFileSync(pathPostsFile, "utf8"));
})

app.listen(port, (req, res) => {
    console.log("Server is runnig on port:", port); 
})