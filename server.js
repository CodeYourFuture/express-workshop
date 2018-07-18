const formidable = require("express-formidable");
const express = require("express");
const app = express();
const fs = require("fs");
var file = 'public';

app.use(express.static("public"));
app.use(formidable());

app.post("/create", (req, res) => {
  console.log(req.fields);
  res.send("Thank you!");
});

let studentData = {
  "name": "Mike", 
  "age": "25", 
  "Location": "London"
};
console.log(studentData);

const studentJson = JSON.stringify(studentData);
console.log('json', studentJson);

 fs.writeFile("student.json", studentJson, function(error) {
 console.log('success', error);
 });


 fs.readFile('student.json', (err, data) => {  
  if (err) throw err;
  let student = JSON.parse(data);
  console.log(student);
});

console.log('This is after the read call'); 

// app.get("/student", (req,res) => {
//     console.log("New request to Student page at " + Date());
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write("<html><body><h1>This is student Page.</h1></body></html>");
//     res.end();
// });

app.get("*", (req, res) => {
  console.log("404 at " + Date());
  res.writeHead(404, {"Content-Type": "text/html"});
  res.write("NOT FOUND!!!");
  res.end();
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});






// const express = require("express");
// const app = express();

// app.get("/", function(req, res) {
//   res.send("Hello World! ");
// });

//  app.get("/student", function(req, res) {
//   res.send("This is a student page! ");


// });

// app.listen(5000, function() {
//   console.log("Server is listening on port 5000. Ready to accept requests!");
// });



// const http = require("http");

// const server = http.createServer(function(req, res) {

//     console.log("New request: " + Date());

//     console,log("New request: " + JSON)
  
//     res.end("Hello World! ");
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
//     res.write("<html><body><h1>This is home Page.</h1>");
//     res.write("<h2>The time is: " + Date() + "</h2></body></html>");
//     res.end();
//   } else if (req.url === "/student") {
//     console.log("New request to Student page at " + Date());
//     res.writeHead(200, { "Content-Type": "text/html" });
//     
//     res.end();
//   } else {
//     res.end(
//       "<html><body><h2>Invalid Request at " + Date() + "</h2></body></html>"
//     );
//   }
// });

// server.listen(5000);

// console.log("Node.js web server at port 5000 is running..");

