const express = require('express');
const app = express();
const formidable = require('express-formidable');
const fs = require('fs');

app.use(express.static("public"));
app.use(formidable());




app.post("/create-post", function (req, res) {
    console.log(req.fields);
    
    //const postsContent = fs.readFileSync(__dirname + '/data/posts.json');

    fs.readFile(__dirname + '/data/posts.json', function (erro, file) {
        const posts = JSON.parse(file);
        posts[Date.now()] = req.fields.blogpost;
        fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(posts), function () {
            res.send(200, req.fields);
        })
    })
})

app.get("/get-posts", function (req, res) {
    res.sendFile(__dirname + '/data/posts.json');
})
app.listen(3000, function () {
    console.log("Server up to runing");
})