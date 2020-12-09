// Use this script to run a local server that will proxy RS Web Service calls to another machine.
// This is useful for developing if you can reach the Web Service endpoint but do not have access
// to modify files on the Web Service machine.

var http = require('http');
var https = require('https');
var fs = require('fs');

var rswebhost = '192.168.0.168';
var rswebport = 80;
var rshttp = http;

var rswebhost = 'reservations.miraval-austin.com';
var rswebport = 443;
var rshttp = https;

var docroot = '/';
var serverport = process.env.PORT || 4567;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
https.createServer({
	key:fs.readFileSync('./localhost.key'),
	cert: fs.readFileSync('./localhost.crt')
},function(request, response) {
    if (request.url.substr(0,4)!='/ws/' && request.url.substr(0,9)!='/wso2wsas') {
		var queryoffset = request.url.indexOf('?') == -1 ? request.url.length : request.url.indexOf('?');
		request.url = request.url.match(/[^?]+/)[0];
		fs.readFile('.' + docroot + request.url, function(err, data) {
			if (!err) {

				var dotoffset = request.url.lastIndexOf('.');
				var mimetype = dotoffset == -1
								? 'text/plain'
								: {
									'.jstpl' : 'text/x-jsrender',
									'.map' : 'application/json',
									'.html' : 'text/html',
									'.ico' : 'image/x-icon',
									'.jpg' : 'image/jpeg',
									'.png' : 'image/png',
									'.svg' : 'image/svg+xml',
									'.gif' : 'image/gif',
									'.css' : 'text/css',
									'.js' : 'text/javascript'
									}[ request.url.substr(dotoffset) ]|| 'text/plain'
				response.setHeader('Content-type' , mimetype);
				response.end(data);
				console.log( request.url, request.url.substr(request.url.lastIndexOf('.')), mimetype  );
			} else {
				console.log ('file not found: ' + request.url);
				response.writeHead(404, "That shit ain't here");
				response.end();
			}
		});
	} else {
		console.log('proxying xml for ',request.socket.remoteAddress);
		request.headers['X-Forwarded-For'] = request.socket.remoteAddress;
		var proxy_request = rshttp.request({
								method: request.method,
								path: request.url,
								headers: request.headers,
								port: rswebport,
								host : rswebhost});
		request.setEncoding('utf8');
		proxy_request.addListener('response', function (proxy_response) {
			proxy_response.addListener('data', function(chunk) {
				response.write(chunk, 'binary');
			});
			proxy_response.addListener('end', function() {
				response.end();
			});
			response.writeHead(proxy_response.statusCode, proxy_response.headers);
		});
		request.addListener('data', function(chunk) {
			proxy_request.write(chunk, 'binary');
			console.log(chunk.toString());
		});
		request.addListener('end', function() {
			proxy_request.end();
		});

	}
}).listen(serverport,'0.0.0.0');

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

console.log('ready on port ' + serverport + ' prxy to host ' + rswebhost + ' on port ' + rswebport)
