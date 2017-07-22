const express = require('express');
const app = express();
const formidable = require('express-formidable');
const fs = require('fs');

app.use(express.static("public"));
app.use(formidable());




app.post("/create-post", function (req, res) {
    console.log(req.fields);
    // fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(req.fields), function () {
    //     console.log(req.fields)
    // })
    const postsContent = fs.readFileSync(__dirname + '/data/posts.json');
    const posts = JSON.parse(postsContent);
    posts[Date.now()] = req.fields.blogpost;
    fs.writeFileSync(__dirname + '/data/posts.json', JSON.stringify(posts));
    res.send(200, posts);
})
app.listen(3000, function () {
    console.log("Server up to runing");
})