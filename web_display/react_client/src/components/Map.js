/**
 * Map component will handle spawning of Icons on 2D coordinates. 

TODOs
* 겹치기 방지, 100 x 100 이미지들이 겹치지 않게 옆으로 이동
* Pan 기능 -> 맵 사이즈를 고정시키고, Pan 모션을 통해 Navigate 하자
* Zoom 기능 -> 맵을 확대, 축소하면서 UI 들을 변경

 */

import React, { useState, useEffect } from "react";
import Icon from './Icon'
import socketio from 'socket.io-client';
const ENDPOINT = "http://localhost:7000";

const Map = () => {
    
    var icons = []

    const [tarray,updateArray] = useState([<div>Loading...</div>])

    // HTML Canvas loading and DB connection will be handled here.
    useEffect(() => {
        
        // SocketIO 연결하기
        const socket = socketio(ENDPOINT,{transports: ['websocket']});

        socket.on("reply_entries", array => {
            updateArray(array);
            console.log("Connected to DB and got entries");
            console.log(array)
        });
    
        socket.emit('request_entries');
        return () => socket.disconnect();
    
      }, []);


    var width = window.innerWidth * 2/3
    var height = window.innerHeight * 2/3
    var iconList = tarray.map((mongo_entry) => {

        var title = mongo_entry["Title"];
        var x = mongo_entry["x"] * width;
        var y = mongo_entry["y"] * height;
        var thumb_width = 100;
        var thumb_height = 100;
        var youtube_link = mongo_entry["link"];
        var thumbnail_link = mongo_entry["Thumbnail"];
        return (
                <Icon 
                    title={title}
                    x={x}
                    y={y}
                    thumb_width={thumb_width}
                    thumb_height={thumb_height}
                    youtube_link={youtube_link}
                    thumbnail_link={thumbnail_link}
                 />
        )

    })
    return iconList
}

export default Map
