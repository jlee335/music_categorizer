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
import IconDialog from './IconDialog'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

export default function Icon({title,x,y,thumb_width,thumb_height,thumbnail_link,youtube_link}) {
    
    // Dialog Open Close status is kept here
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        console.log("closed")
        setOpen(false);
    };

    var textStyle = {
        background: "#eee",
        padding: "0px",
        margin: `${thumb_width}px 0px 0px 0px`,
        fontSize: `${thumb_width/5}px`,
      };

    return(
        <div>
            <div onClick={handleClickOpen} 
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
            <Drawer 
                open={open}
                onClose={handleClose}
                onBackdropClick={handleClose}
                variant="persistent"
                anchor="bottom"
            >
                <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Drawer>
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