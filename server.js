const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.static("public"));

const formidable = require("express-formidable");

app.use(formidable());

app.post("/subscribe", function(req, res) {
  var email = req.fields.mail;

  fs.readFile(__dirname + "/data/posts.json", function(error, content) {
    var mailingList = JSON.parse(content);
    var date = Date.now();

    mailingList[date] = email;
    var newContent = JSON.stringify(mailingList);

    fs.writeFile(__dirname + "/data/posts.json", newContent, function(error) {
      res.end("success!");
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
