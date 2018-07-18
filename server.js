// const http = require("http");

// const server = http.createServer(function(req, res) {
//   console.log("New Request:" + Date());

//   res.end("Hello World!");
// });

// server.listen(5000);

// console.log("Node.js web server at port 5000 is running..");

// const http = require("http");
// const server = http.createServer(function(req, res) {
//   if (req.url === "/") {
//     //check the URL of the current request
//     console.log("New request to main page at " + Date());
//     // set response header
//     res.writeHead(200, { "Content-Type": "text/html" });
//     // set response content
//     res.write("<html><body><h1>This is home Page.</h1></body></html>");
//     res.write("<h2>The time is: " + Date() + "</h2>");
//     res.end();
//   } else if (req.url === "/student") {
//     console.log("New request to Student page at " + Date());
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write("<html><body><h1>This is student Page.</h1></body></html>");
//     res.end();
//   } else {
//     res.end(
//       "<html><body><h2>Invalid Request at " + Date() + "</h2></body></html>"
//     );
//   }
// });

// server.listen(5000);

// console.log("Node.js web server at port 5000 is running..");
const express = require("express");
const app = express();
const formidable = require("express-formidable");
const fs = require("fs");

// app.get("/", function(req, res) {
//   res.send("hello world");
// });

app.use(express.static("public"));
app.use(formidable());

app.get("/student", function(req, res) {
  console.log("Server is loading a student page");
  res.send("hello student");

  app.post("/contact.html", function(req, res) {
    fs.writeFile("data/posts.json", req.fields, function(error) {
      res.send("Thank your for filling this form. cooool");

      fs.readFile(__dirname + "data/posts.json", function(error, content) {
        const parsedFile = JSON.parse(content);
        console.log(parsedFile);

        var newContent = JSON.stringify(parsedFile);
        //append data to file
        fs.appendFile("data/posts.json", newContent, function(err) {
          if (err) throw err;
          console.log("Appended!");
        });
      });
    });
  });
});

app.listen(5000, function() {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});
