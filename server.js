const express = require("express");
const formidable = require("express-formidable");
const fs = require("fs");
let currentPosts = {};
const directory = __dirname + "/data/posts.json";
//app.get("/")///
fs.readFile(directory, function(error, file) {
  const parsedFile = JSON.parse(file);
  currentPosts = parsedFile;
});

const app = express();
app.get("/get-posts", function(req, res) {
  res.send(currentPosts);
});
app.use(express.static("public"));
app.use(formidable());
app.post("/create-post", (req, res) => {
  const { fields } = req;
  const newComment = { [Date.now()]: fields.blogpost };
  let newData = Object.assign(currentPosts, newComment);
  let yourData = JSON.stringify(newData);
  fs.writeFile(directory, yourData, function(error) {
    //console.log(fields.blogpost);
    //console.log(yourData);
    () => res.send(currentPosts);
  });
});
app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
