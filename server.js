const express = require("express");
const app = express();
const formidable = require("express-formidable");
const fs = require("fs");
// const http = require("http");

// app.get("/", function(req, res) {
//   // res.send("Hello World!");
//   //check the URL of the current request
//   console.log("New request to main page at " + Date());
//   // set response header
//   res.writeHead(200, { "Content-Type": "text/html" });
//   // set response content
//   res.write("<html><body><h1>This is home Page.</h1></body></html>");
//   res.write("<h2>The time is: " + Date() + "</h2>");
//   res.end();
// });

app.use(express.static("public"));
app.use(formidable());

app.post("/contact.html", function(req, res) {
  console.log(req.fields);

  const fs = require("fs");

  fs.appendFile("message.txt", "data to append", function(err) {
    if (err) throw err;
    console.log("Saved!");
  });

  fs.appendFile("data/posts.json", json(req.fields), function(error) {
    if (error) {
      return console.log(error);
    }

    console.log("The file was saved!");
  });
  res.end("Thank you for submitting the form!");
});

fs.readFile(__dirname + "/data/posts.json", function(error, file) {
  const parsedFile = JSON.parse(file);
  console.log(file);
  console.log(file.toString());
});

// app.get("/student", function(req, res) {
//   // res.send("Hello Student!");
//   console.log("New request to Student page at " + Date());
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.write("<html><body><h1>This is student Page.</h1></body></html>");
//   res.end();
// });

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

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
