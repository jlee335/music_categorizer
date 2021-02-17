import Search from './components/Search'
import Map from './components/Map'
import socketio from 'socket.io-client';

import React, { useState, useEffect } from "react";

const ENDPOINT = "http://localhost:7000";

function App() {

    const [array,updateArray] = useState([])

    useEffect(() => {

        const socket = socketio(ENDPOINT,{transports: ['websocket']});

        socket.on("reply_entries", array => {
            console.log("Loaded!")
            updateArray(array);
        });
    
        socket.emit('request_entries');
        return () => {
            socket.disconnect();
        }
    
      }, []);   

    return (
        <div className = 'App'>
            <Search array = {array}/>
            <Map array = {array}/>
        </div>
    )
}
export default App