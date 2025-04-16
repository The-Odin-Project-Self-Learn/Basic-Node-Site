var http = require('http');
var url = require('url');
var fs = require('fs');

//we want to return the page corresponding to the URL request made by the client
http.createServer(function(req, res){
    var q = url.parse(req.url, true); //obtain the specific page requested by the client
    var filename = "." + q.pathname + ".html"; //if q.pathname = "/about", filename = "./about.html"
    if (q.pathname == '/') {
        filename = './index.html';
    }
    fs.readFile(filename, function(err, data) {
        if (err) {
            filename = './404.html';
            fs.readFile(filename, function(error404, data404) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                if (error404) {
                    return res.end("404 page not found");
                }
                return res.end(data404);
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);
