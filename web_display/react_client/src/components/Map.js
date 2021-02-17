/**
 * Map component will handle spawning of Icons on 2D coordinates. 

TODOs
* 겹치기 방지, 100 x 100 이미지들이 겹치지 않게 옆으로 이동
* Pan 기능 -> 맵 사이즈를 고정시키고, Pan 모션을 통해 Navigate 하자
* Zoom 기능 -> 맵을 확대, 축소하면서 UI 들을 변경

 */

import React, { useState, useEffect } from "react";
import Icon from './Icon'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import IconDialog from './IconDialog'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea, Divider } from "@material-ui/core";


const drawerWidth = 300

const useStyles = makeStyles(theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }));

const Map = (array) => {
    console.log(array)
    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
    const [currentSong, setCurrentSong] = useState(["","",""]);

    // Window Resize 대비해서 이것도 짜자
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      })

    // HTML Canvas loading and DB connection will be handled here.
    useEffect(() => {

        function handleResize() {
            setDimensions({
              height: window.innerHeight,
              width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    
      }, []);

    // Functions for Drawer
    const handleClickOpen = (song) => {
        console.log(song)
        setCurrentSong(song)
        console.log("setsong "+song)
        setOpen(true);
    };
    
    const handleClose = () => {
        console.log("closed")
        setOpen(false);
    };


    var width = dimensions.width * 4/5
    var height = dimensions.height * 4/5

    var iconList = (array.array).map((mongo_entry) => {
        
        var title = mongo_entry["Title"];
        var x = mongo_entry["x"] * width;
        var y = mongo_entry["y"] * height;
        var thumb_width = width/50;
        var thumb_height = width/50;
        var youtube_link = mongo_entry["link"];
        var thumbnail_link = mongo_entry["Thumbnail"];
        return (
            <Icon 
                title={title}
                x={x + drawerWidth}
                y={y}
                thumb_width={thumb_width}
                thumb_height={thumb_height}
                youtube_link={youtube_link}
                thumbnail_link={thumbnail_link}
                handleClickOpen={handleClickOpen}
                />
        )
    })
    
    return(
    <div>
    <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform, positionX, positionY, ...rest }) => (
          <React.Fragment>
            <TransformComponent>
                <div style={{
                height: `${height}px`,
                width: `${width}px`,
                backgroundColor: "#DFF2F3",
                }}>{iconList}</div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
        <Drawer 
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
              }}
            open={open}
            onClose={handleClose}
            onBackdropClick={handleClose}
            containerClassName="drawer-side-drawer"
            variant="persistent"
            anchor="left"       
        >
            <CardActionArea
                style={{display: "table-cell"}} 
                href={currentSong[2]} 
                target="_blank"
            >
                <CardMedia
                    component="img"
                    height={drawerWidth}
                    image={currentSong[1]}
                />  
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {currentSong[0]}
                    </Typography>
                </CardContent>
            </CardActionArea>
            
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>

        </Drawer>
    </div>

      
    );

    
}

export default Map
