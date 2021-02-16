/*
Icon component

* This will display music information
* These components will be spawned by Map.js Component

TODOs
* Click to expand! 
* 아이콘 클릭하면 밑에 Pop-up 으로 세부정보 표시한다
* 제목 옆에서 보여주기

*/



import React from 'react'
import Draggable from 'react-draggable'

export default function Icon({title,x,y,thumb_width,thumb_height,thumbnail_link,youtube_link}) {
    
    var textStyle = {
        background: "#eee",
        padding: "0px",
        margin: "100px 0px 0px 0px",
        fontSize: "5px",
      };


    return(
        <a href={youtube_link} className='icon'>
            <div 
                style={{
                    marign: "5px",
                    position: "absolute",
                    left: `${x}px`,    
                    top: `${y}px`,
                    height: `${thumb_width}px`,
                    width: `${thumb_height}px`,
                    backgroundImage: `url(${thumbnail_link})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
            }}>
                <body style={textStyle} >{title}</body>
            </div>
        </a>
    );
}



/** 혹시 미래에 Draggable 사용하고 싶으면 이렇게!
 * 
 *         <Draggable
          //axis="x"
          //handle=".handle"
          defaultPosition={{x: this.x, y: this.y}}
          position={null}
          //grid={[25, 25]}
          scale={1}
          //onStart={this.handleStart}
          //onDrag={this.handleDrag}
          //onStop={this.handleStop}
          >
            <button><img src={this.thumbnail_link} alt="my image" width={this.thumb_width} height={this.thumb_height} onClick={this.clicked} /></button>
        </Draggable>
 */