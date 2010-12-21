var http = require('http')
, url = require('url')
, fs = require('fs')
, io = require('socket.io')
, sys = require('sys')
, Connect = require('connect')
, server;


var server = Connect.createServer(
    Connect.logger(), 
    Connect.conditionalGet(), 
    Connect.cache(), 
    Connect.gzip(),
    Connect.staticProvider(__dirname) 
);

server.listen(8080);

var io = io.listen(server)
, buffer = [];

io.on('connection', function(client){
    var user;

    client.send({ buffer: buffer });
    client.broadcast({ announcement: client.sessionId + ' connected' });

    client.on('message', function(message){

        if (!user) {
            user = message;
            /*
            var msg = { message: [client.sessionId, user + 'さん！いらっしゃい。', user] };
            buffer.push(msg);
            if (buffer.length > 15) {
                buffer.shift();
            }
            client.broadcast(msg);
            */

            return;
        }

        var msg = { message: [client.sessionId, message, user] };
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();
            client.broadcast(msg);
    });

    client.on('disconnect', function(){
        client.broadcast({ announcement: client.sessionId + ' disconnected' });
    });
});

