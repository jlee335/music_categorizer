import Search from './components/Search'

import {fillCanvas} from './components/Canvas'

import React, { useState, useEffect } from "react";
import socketio from 'socket.io-client';
const ENDPOINT = "http://localhost:7000";



function App() {

    var icons = []

    useEffect(() => {

        // Canvas 불러오기
        const canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext('2d');

        var icons = []; 

        // SocketIO 연결하기
        const socket = socketio(ENDPOINT,{transports: ['websocket']});

        socket.on("reply_entries", array => {
            //console.log(array);
            fillCanvas(canvas,context,icons,array);
        });
    
        socket.emit('request_entries');

        return () => socket.disconnect();
    
      }, []);


    return (
        <div className = 'App'>
            <Search name="leeHyunjae" />
            <canvas id="canvas">
                Canvas
            </canvas>
        </div>
    )
}
export default App