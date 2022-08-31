'use strict'

var log4js = require('log4js');
var http = require('http');
var socketIo = require('socket.io');
var express = require('express');

var USERCOUNT = 3;

log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: 'app.log',
            layout: {
                type: 'pattern',
                pattern: '%r %p - %m',
            }
        }
    },
    categories: {
       default: {
          appenders: ['file'],
          level: 'debug'
       }
    }
});

var logger = log4js.getLogger();

var app = express();

app.use(express.static('public'))

//http server
var server = http.createServer(app);
server.listen(8088, '0.0.0.0');
var io = socketIo(server);

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
}


io.sockets.on('connection', (socket)=> {

	socket.on('message', (room, data)=>{
		logger.debug('message, room: ' + room + ", data, type:" + data);
		socket.to(room).emit('message',room, data);
	});


	socket.on('join', (room)=>{
		socket.join(room);
		var myRoom = io.sockets.adapter.rooms[room]; 
		var users = (myRoom)? Object.keys(myRoom.sockets).length : 0;
		logger.debug('the user number of room (' + room + ') is: ' + users);

		if(users < USERCOUNT){
			socket.emit('joined', room, socket.id); 
            //发给除自己之外的房间内的所有人
			if(users > 1){
				socket.to(room).emit('otherjoin', room, socket.id);
			}
		
		}else{
			socket.leave(room);	
			socket.emit('full', room, socket.id);
		}
	});

	socket.on('leave', (room)=>{
		socket.leave(room);

		var myRoom = io.sockets.adapter.rooms[room]; 
		var users = (myRoom)? Object.keys(myRoom.sockets).length : 0;
		logger.debug('the user number of room is: ' + users);

		socket.to(room).emit('bye', room, socket.id);
		socket.emit('leaved', room, socket.id);

	});

});
