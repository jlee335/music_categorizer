// Search in html element to find canvas!
var canvas = document.querySelector('canvas');

// Set canvas inner width and height to what is in window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d'); // Return drawing context.

// example: Make rectangle

// This variable will be used to get functions that interact with client.js
var Webpage = {};

class IconButton 
{
    constructor(x,y,w,h,youtube_link,thumbnail_link) 
    {
        this.x = x;
        this.y = y;
        this.thumb_width = w ;
        this.thumb_height = h;
        this.youtube_link = youtube_link;
        this.thumbnail_link = thumbnail_link;
    }

    draw(context)
    {

        var image = new Image();
        image.src = this.thumbnail_link;
        
        const width = this.thumb_width;
        const height = this.thumb_height;
        const x = this.x;
        const y = this.y;

        image.onload = function() {
            context.drawImage(image,x,y,width,height);
        }
        
    }

    clicked(mouseX,mouseY)
    {
        // Check boundaries and see if click is in boundaries
        if (this.x < mouseX && mouseX < this.x + this.thumb_width)
        {
            if (this.y < mouseY && mouseY < this.y + this.thumb_height)
            {
                // If button is pressed, go on!
                window.location.href = this.youtube_link;
            }
        }
    }
}




Webpage.load = function(array)
{
    console.log("Called Webpage.load");
    //array is mongoDB entries in array format.
    console.log(array);
    for (var i = 0; i < array.length; i++) {
        var mongo_entry = array[i];
        console.log(mongo_entry["Title"]);
        var icon = new IconButton(mongo_entry["x"] * 100,mongo_entry["y"] * 100,100,100,mongo_entry["link"],mongo_entry["Thumbnail"]);
        icon.draw(context);

        canvas.addEventListener('click', (event) => {
            // rect 
            const rect = canvas.getBoundingClientRect();
        
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
        
            icon.clicked(x,y);
        
            console.log(rect);
        });

    }
}

//var shapes = []; // List of shapes!

//var icon = new IconButton(100,100,100,100,"https://www.youtube.com/watch?v=xbdJf9MRL7A",'https://mdn.mozillademos.org/files/5395/backdrop.png');





