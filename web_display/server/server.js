/*
    Backend for web service

What this will do

-> Collect processed data results from MongoDB database
-> Send list of processed data entries into the client, such that the client can display them.
*/

const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Web_Display_Server:asnka4z8m5NEiJP2@cluster0.yk0dr.mongodb.net/database?retryWrites=true&w=majority";


const express = require('express');
app = express();
app.use(express.static(__dirname + '/client'));
var server = require('http').createServer(app);
var io = require('socket.io')(server);


const mongo_client = new MongoClient(uri, { useNewUrlParser: true });



app.get('/', (req, res) => {

    console.log("GET /");
    res.sendFile(path.join(__dirname + '/client/index.html'));



});


server.listen(process.env.PORT || 7000,function(){
    console.log('Listening on '+server.address().port);
});




mongo_client.connect(err => {
    // Error handling. 
    if (err) {
        console.error("MongoDB Connection has failed :(");
        return;
    }

    io.on('connection',function(socket){

        socket.on('request_entries', function() {
            console.log("request entries recieved!");
            const collection = mongo_client.db("database").collection("processed");
    
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
        
                console.log(result);
                socket.emit('reply_entries',result);
            });
            console.log("closing client connection");
    
        });
        
        // Establish connection to MongoDB and get what we need
    });

    // Processed DB 에서 


    //mongo_client.close();
});