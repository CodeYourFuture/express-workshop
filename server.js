const exphbs = require("express-handlebars");
const fs = require("fs");
const express = require("express");
const app = express();
const formidable = require("express-formidable");

app.use(express.static("public"));
app.use(formidable());

app.set("views", __dirname + "/views");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.post("/subscribe", function(req, res) {
  var email = req.fields.mail;

  fs.readFile(__dirname + "/data/posts.json", function(error, content) {
    //Convert the text in JSON to an object
    var mailingList = JSON.parse(content);

    // Adding the content to the object
    var date = Date.now();
    mailingList[date] = email;

    // Convert the object to string in JSON format
    var newContent = JSON.stringify(mailingList);

    // Write the file with the whole new content
    fs.writeFile(__dirname + "/data/posts.json", newContent, function(error) {
      res.end("success!");
    });
  });
});

app.get("/subscribers", function(req, res) {
  // Read file
  fs.readFile(__dirname + "/data/posts.json", function(error, content) {
    //Convert the text in JSON to an object
    var mailingList = JSON.parse(content);

    //Convert the object in an array with the emails
    var emails = Object.keys(mailingList).map(function(key) {
      return mailingList[key];
    });

    console.log(emails);

    // array emails to handlebars
    res.render("subscribers", {
      subscribersMail: emails
    });
  });
});

app.get("*", function(req, res) {
  console.log("404 at " + Date());
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write("NOT FOUND!!!");
  res.end();
});

app.listen(5000, function() {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});
