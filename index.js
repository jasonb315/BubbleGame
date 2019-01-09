// 10-100px per sec
let speed = 10;
let bubbles = [];
let score = 0;

const scoreBoard = document.getElementById('scoreRead');
scoreBoard.innerHTML='ding'
// scoreBoard.textContent('pop the bubbles!')
// create a bubble each second, or 1000ms
// render them all updated to position on interval
// event listener for click on each
    // score += (size by speed)

function Bubble(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.updatePosition = function(){
        // this will be called every 20ms, so that's 50 updates per second.
        // y = the position it's at, plus pix per sec over refresh ratio; so the speed is per sec in ms.
        this.y = (this.y + speed/50);
    };
    this.place = function() {
            c = myGameArea.context;
            c.beginPath();
            c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            c.strokeStyle = color.toString();
            c.stroke();
    };
    // console.log(this);
};

function blowBubble(){
    // out: bubble to bubbles
    // 10 to 100px bubble radius
    let radius = Math.random() * (50-5) + 5;
    let x = Math.random() * (myGameArea.canvas.width - radius * 2) + radius;
    // start with base at top of page
    let y = 0 - radius;
    
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    b = new Bubble(x, y, radius, color);
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
        this.canvas.width = window.innerWidth - 6;
        this.canvas.height = window.innerHeight - 150;
        // canvas type:
        this.context = this.canvas.getContext("2d");
        // append to DOM:
        document.body.insertBefore(this.canvas, document.getElementById('canvasAnchor'));
        this.interval = setInterval(updateGameArea, 20);
        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    blowCycle : 0,
}

myGameArea.canvas.id = "canvas"

////////XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//////

function updateGameArea() {
    
    //this fx redraws every 20ms
    // console.log('updating');
    for (i=0 ; i < bubbles.length ; i++){
        bubbles[i].updatePosition();
    }
    myGameArea.clear();
    drawBubbles();

    myGameArea.blowCycle += 20;
    //blow a new one every 1000ms
    if (myGameArea.blowCycle === 1000){
        // per second updates, happens once every 50 cycles = 1000 ms
        blowBubble();
        myGameArea.blowCycle = 0;
    }
}

////////XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//////

var el = document.getElementById('clickFrame');

var mouse = {x: undefined, y: undefined};

el.addEventListener('click', function(event){
        mouse.x = event.x;
        mouse.y = event.y - 140;
        // console.log(mouse);
        // for (i=0 ; i < bubbles.length ; i++){
        for (i=0 ; i < bubbles.length ; i++){

            let xClick = mouse.x;
            let yClick = mouse.y;
            let xB = bubbles[i].x;
            let yB = bubbles[i].y;
            let xDif = 0;
            let yDif = 0;

            //NOTE: needs work, click area is aligned properly but click surface is a diamond.
            if (xB < xClick){ xDif = xClick - xB; } else if (xB > xClick) { xDif = xB - xClick; } else { xDif = 0; };
            if (yB < yClick){ yDif = yClick - yB; } else if (yB > yClick) { yDif = yB - yClick; } else { yDif = 0; };

            // + 10 for ux for, note
            if ((yDif + xDif) < bubbles[i].radius + 10){

                // 10px dots worth 10 points, and 100px dots worth 1 point
                let newPoints = Math.floor((10 - (bubbles[i].radius * 2) / 10) + 1);

                score += newPoints;

                scoreBoard.innerHTML = score.toString();

                // remove dynamically
                bubbles.splice(i, 1);
                // redraw another circle also
                setTimeout(blowBubble, 1000);
            };       
        };
});

//////////////////////SLIDER////////////

var slider = document.getElementById("sRange");
var output = document.getElementById("speedRead");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  speed = this.value;
}

//////////////////////SLIDER////////////
