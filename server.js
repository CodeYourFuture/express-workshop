//core modules
const fs = require('fs')

//3rd party modules
const express = require('express')
const formidable = require("express-formidable");

//variables
const port = 3000
const pathPostsFile = __dirname + "/data/posts.json";

//create app
const app = express()

//reading posts
let allposts = []
allposts = JSON.parse(fs.readFileSync(pathPostsFile).toString());

//serving public assets middleware
app.use(express.static('public'))

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
app.listen(port, (req, res) => {
    console.log("Server is runnig on port:", port); 
})