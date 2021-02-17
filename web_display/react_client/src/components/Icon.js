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

import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';



export default function Icon({title,x,y,thumb_width,thumb_height,thumbnail_link,youtube_link,handleClickOpen}) {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        small: {
          width: theme.spacing(3),
          height: theme.spacing(3),
        },
        large: {
          position: "absolute",
          top: y*5/6,
          left: x*5/6,
          width: theme.spacing(7),
          height: theme.spacing(7),
        },
      }));
    const classes = useStyles();

    // Dialog Open Close status is kept here

    var textStyle = {
        padding: "0px",
        margin: `${thumb_width}px 0px 0px 0px`,
        fontSize: `${thumb_width/5}px`,
      };

    function handleClick() {
        // Here, we invoke the callback with the new value
        handleClickOpen([title,thumbnail_link,youtube_link]);
    }
    
    const bgi = `url(${thumbnail_link})`

    return(
        <div>
            <Avatar 
            className={classes.large}
            onClick={handleClick}
            src={thumbnail_link}
            >
            </Avatar>
        </div>

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