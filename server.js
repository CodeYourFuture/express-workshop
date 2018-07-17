const fs = require("fs");

const express = require("express");
const app = express();

app.use(express.static("public"));
const formidable = require("express-formidable");
app.use(formidable());




app.post("/create-post", function (req, res) {
    fs.readFile(__dirname + "/data/posts.json", function (error, file) {
        const parsedFile = JSON.parse(file);
        var storage = [];
        storage.push(file.toString());
        storage.push({ [Date.now()]: req.fields["blogpost"] })
        fs.writeFile("./data/posts.json", JSON.stringify(storage), function (error) {
            // do something
        });
    });
});
app.listen(3500, function () {
    console.log("Server is listening on port 3500. Ready to accept requests!");
});


















