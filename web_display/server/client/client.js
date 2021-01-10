/**
 * client.js
 * 
 * This will be attached to the html file to communicate with the server.js
 * 
 * This will recieve array of entries from server and transport it to canvas.js
 * 
 */

const socket = io();

var Client = {};
Client.socket = io.connect();

Client.request_entries = function () 
{
    Client.socket.emit('request_entries');
}


Client.socket.on('reply_entries',function(array){
    Webpage.load(array);
});

Client.request_entries();
