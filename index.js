////////[:][:][:][:]////////

var bubbles = [];
// create a bubble each second, or 1000ms
// render them all updated to position on interval
// event listener for click on each
    // score += (size by speed)

////////[:][:][:][:]////////

function Bubble(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    
    this.place = function() {
            c = myGameArea.context;
            c.beginPAth();
            c.arc(this.x, this.y, this.size);
            c.stroke();
        }
    return this;
}

function blowBubble(){
    // out: bubble to bubbles
    // 10 to 100px bubble size
    let size = Math.random() * (100-10) + 10;
    let x = window.innerWidth / 2;
    let y = 20;
    b = new Bubble(x, y, size);
    bubbles.push(b);
}

function drawBubbles(){
    for (i=0 ; i < bubbles.length ; i++){
        c = myGameArea.context;
        c.beginPath();
        c.arc(bubbles[i].x, bubbles[i].y, bubbles[i].size, Math.PI * 2, false);
        c.stroke();
    }
}

function startGame() {
    //component definitions
    myGameArea.start();
}

var myGameArea = {

    canvas : document.createElement("canvas"),

    start : function() {
        // NOTE: writeover dimentions in css for screen proportions
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // canvas type:
        this.context = this.canvas.getContext("2d");
        // append to DOM:
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.interval = setInterval(updateGameArea, 1000);
        },

    clear : function() {
        // some code that clears the canvas for redraw
    }
}

function updateGameArea() {
    console.log('updating');
}