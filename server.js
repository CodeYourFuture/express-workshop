const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/student", function(req, res) {
  console.log("New request to Student page at " + Date());
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<html><body><h1>This is student Page.</h1></body></html>");
  res.end();
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
