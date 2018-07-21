var fs = require("fs");
var express = require("express");
var express = require("express");
var formidable = require("express-formidable");

var app = express();

app.use(express.static("public"));
app.use(formidable());

app.get("/get-posts", function(req, res) {
  res.sendFile(
    "/Users/seraphineyoung/Documents/express-workshop/data/posts.json"
  );
});

app.post("/create-post", function(req, res) {
  console.log(req.fields);
  var content = JSON.stringify(req.fields);

  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    var parsedFile = JSON.parse(file);

    console.log("Logging the stored items in posts.json file", parsedFile);
    parsedFile[Date.now()] = req.fields.blogpost;

    //   parsedFile[Date.now()] = req.fields; - this code would log parsedFile whiich is the data in the posts.json and add a key to that object which is Date.now() and create a new object with blogpost as a key and value as the vulue from the website. This parsedFile[Date.now()] creates a new key on the parsedFile object and req.fields.blogpost gets the blogpost in the req.fields and save it as a value to the parsedFile[Date.now()] key that was created.

    console.log("Logging new content to post.json file plus date", parsedFile);

    var newContent = JSON.stringify(parsedFile);

    fs.writeFile(__dirname + "/data/posts.json", newContent, function(
      error
    ) {});
    res.send("Yay Node Girls!");

    // if (error) {
    //   console.log("This is an error file,while reading file", error);
    // } else {
    //   console.log(parsedFile);
    // }
  });
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
