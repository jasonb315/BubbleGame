////////[:][:][:][:]////////

// 10-100px per sec
var speed= 10;

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

    this.updatePosition = function(){
        this.y += speed;
    };

    this.place = function() {
            c = myGameArea.context;
            c.beginPath();
            c.arc(this.x, this.y, this.size, Math.PI * 2, false);
            c.stroke();
    };
};

function blowBubble(){
    // out: bubble to bubbles
    // 10 to 100px bubble size
    let radius = Math.random() * (100-10) + 10;
    let x = 50;
    let y = 50;
    b = new Bubble(x, y, radius);
    bubbles.push(b);
};

function drawBubbles(){
    for (i=0 ; i < bubbles.length ; i++){
        bubbles[i].place();
    };
};

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


////////XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//////

function updateGameArea() {
    console.log('updating');
}