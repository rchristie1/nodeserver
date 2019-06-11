const http = require('http');
const fs = require('fs');

let HTML = fs.readFileSync('./index.html')

const server = http.createServer((req, res) => {

    if(req.url === "/") {
    res.writeHead(res.statusCode, {'Content-type': 'text/html'});
        let HTML = fs.readFileSync('./index.html');
        res.end(HTML);
    } else if(req.url === "/api/user"){
        res.writeHead(res.statusCode, {'Content-type': 'application/json'});
        const json = JSON.stringify({
            name: 'Ryan',
            cars: ['Ford', 'Infiniti', 'Volswagen']
        });
        res.end(json.toString());
    } else {
        res.writeHead(404);
        res.end();
    }
})

server.listen(8080, '127.0.0.1');
console.log('server is running on port: 8080');