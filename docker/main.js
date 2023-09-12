var http = require("http");
require('dotenv').config();

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(`
     ________________________________________
    < mooooooooooooooooooooooooooooooooooooo >
     ----------------------------------------
           \\
            \\   ^__^
             \\  (oo)\\_______
                (__)\\       )\\/\\
                    ||----w |
                    ||     ||
    `);
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
console.log(process.env.FOOBAR);
