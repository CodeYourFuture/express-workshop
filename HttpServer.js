const http = require('http');

const server = http.createServer(function (req, res) {

    if (req.url === '/') { //check the URL of the current request

        console.log("New request to main page at " + Date())

        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // set response content    
        res.write('<html><body><h1>This is home Page.</h1></body></html>');
        res.write('<h2>The time is: ' + Date() + '</h2>');
        res.end();

    } else if (req.url === "/student") {

        console.log("New request to Student page at " + Date())

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><h1>This is student Page.</h1></body></html>');
        res.end();

    } else if (req.url === "/mentor") {
        console.log("New request to Student page at " + Date())

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<html><body><h1>This are Mentor Page.</h1>
                    <ol>
                        <li>Mozafer</li>
                        <li>Meakl</li>
                        <li>Sander</li>
                    </ol>
                    </body></html>`);
        res.end();
    } else {
        res.end('<html><body><h2>Invalid Request at ' + Date() + '</h2></body></html>');
    }
});

server.listen(5000);

console.log('Node.js web server at port 5000 is running..')