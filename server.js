// Put this next to the files you want to serve and run: node server.js

// Require in some of the native stuff that comes with Node
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
// Port number to use
var port = 8080;
var root = process.cwd();
// Colors for CLI output
var WHT = '\033[39m';
var RED = '\033[91m';
var GRN = '\033[32m';

var args={};
for (let i=2;i<process.argv.length;i++){
	let key = process.argv[i].split('=')[0];
	switch (key){
		case 'port':port=parseInt(process.argv[i].split('=')[1]);break;
		case 'root':root=path.join(root,process.argv[i].split('=')[1]);break;
	}
}

function handleGet(request, response){
	// The requested URL, like http://localhost:8000/file.html => /file.html
    var uri = url.parse(request.url).pathname;
	uri=decodeURI(uri);
    // get the /file.html from above and then find it from the current folder
    var filename = path.join(root, uri);
	
    // Setting up MIME-Type (YOU MAY NEED TO ADD MORE HERE) <--------
    var contentTypesByExtension = {
        '.html': 'text/html',
        '.css':  'text/css',
        '.js':   'text/javascript',
        '.json': 'text/json',
        '.svg':  'image/svg+xml'
    };

    // Check if the requested file exists
    fs.exists(filename, function (exists) {
        // If it doesn't
        if (!exists) {
            // Output a red error pointing to failed request
            console.log(RED + 'FAIL: ' + WHT + filename);
            // Redirect the browser to the 404 page
            filename = path.join(process.cwd(), '/404.html');
        } else if (fs.statSync(filename).isDirectory()) {
            // Output a green line to the console explaining what folder was requested
            console.log(GRN + 'FLDR: ' + WHT + filename);
            // return a list of filenames/foldernames in this folder
			let files=[];
			fs.readdirSync(filename, {withFileTypes:true}).forEach(file => {
				if (typeof file.isDirectory === 'function'){
					if (file.isDirectory()){
						files.push(decodeURI(file.name)+"/");
					} else {
						files.push(decodeURI(file.name));
					}
				}
			});
            var headers = {'Access-Control-Allow-Origin':'*'};
			headers['Content-Type']='application/json';
			response.writeHead(200,headers);
			response.write(JSON.stringify(files));
			response.end();
			return;
        }

        // Assuming the file exists, read it
        fs.readFile(filename, 'binary', function (err, file) {
            // Output a green line to console explaining the file that will be loaded in the browser
            console.log(GRN + 'FILE: ' + WHT + filename);
            // If there was an error trying to read the file
            if (err) {
                // Put the error in the browser
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write(err + '\n');
                response.end();
                return;
            }

            // Otherwise, declare a headers object and a var for the MIME-Type
            var headers = {'Access-Control-Allow-Origin':'*'};
            var contentType = contentTypesByExtension[path.extname(filename)];
            // If the requested file has a matching MIME-Type
            if (contentType) {
                // Set it in the headers
                headers['Content-Type'] = contentType;
            }

            // Output the read file to the browser for it to load
            response.writeHead(200, headers);
            response.write(file, 'binary');
            response.end();
        });
    });
}

function handlePost(request, response){
	// The requested URL, like http://localhost:8000/file.html => /file.html
    var uri = url.parse(request.url).pathname;
    uri=decodeURI(uri);
    // get the /file.html from above and then find it from the current folder
    var filename = path.join(root, uri);
    // Check if the requested file exists
    fs.exists(filename, function (exists) {
		if (request.method==='PUT' && exists){
			console.log(RED+'ERROR: '+ WHT + 'File already exists. To overwrite a file, use OST instead.');
			var headers = {};
			headers['Access-Control-Allow-Origin']='*';
			response.writeHead(500,headers);
			response.end();
			return;
		}
		request.on('data', function(data) {
			try{
				fs.writeFileSync(filename,data);
				var headers = {};
				headers['Access-Control-Allow-Origin']='*';
				response.writeHead(204,headers);
				response.end();
				return;
			} catch (err){
				console.log(err);
			}		
		});
    });
}

// Create the server
http.createServer(function (request, response) {
	console.log(request.method + ' ' + request.url);
    if (request.method==='GET'){
		handleGet(request,response);
	} else if (request.method==='OPTIONS') {
		if (request.headers['access-control-request-headers']){
			var headers={};
			headers['Access-Control-Allow-Origin']='*';
			headers['Access-Control-Allow-Methods']='PUT, POST, GET, OPTIONS';
			headers['Access-Control-Allow-Headers']='Content-Type, content-type';
			response.writeHead(204,headers);
			response.end();
		} else {
			var headers={};
			headers['Allow']='OPTIONS, GET, HEAD, POST, PUT';
			response.writeHead(204,headers);
			response.end();
		}
	} else {
		handlePost(request,response);
	}
}).listen(parseInt(port, 10));

// Message to display when server is started
console.log(WHT + 'Serving at http://localhost:' + port + '/');