const scoreBoard = document.getElementById('scoreRead');
const el = document.getElementById('clickFrame');
let mouse = {x: undefined, y: undefined};
let bubbles = [];
let speed = 10;
let score = 0;

function Bubble(x, y, radius, color) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.updatePosition = function(){
        // TASK: Dots fall smoothly at a constant rate.
        // this will be called every 20ms, so that's 50 updates per second.
        // y = the position it's at, plus pix per sec over refresh ratio; so the speed is per sec in ms.
        this.y = (this.y + speed / 50);
    };

    this.place = function() {
            c = myGameArea.context;
            c.beginPath();
            c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            c.strokeStyle = color.toString();
            c.stroke();
    };
};

function getColor(){

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function blowBubble(){
    // TASK: Dots should vary randomly in size from 10px in diameter to 100px in DIAMETER!
    let radius = Math.random() * (50-5) + 5;
    // TASK: A dot should not "hang" off the left or right edge of the screen.
    let x = Math.random() * (myGameArea.canvas.width - radius * 2) + radius;
    // TASK: New dots appear at a random horizontal position at the top of the box.
    let y = 0 - radius;
    var color = getColor();

    b = new Bubble(x, y, radius, color);
    bubbles.push(b);

};

function drawBubbles(){
    for (i=0 ; i < bubbles.length ; i++){
        bubbles[i].place();
    };
};

function startBubble(){
    // TASK: When the game starts, a new dot should appear on the playing area.
    blowBubble();
    bubbles[0].y = window.innerHeight / 5
};

function startGame() {
    // TASK: The game starts when the page loads.
    scoreBoard.innerHTML=score.toString();
    startBubble();
    myGameArea.start();

}

var myGameArea = {

    canvas : document.createElement("canvas"), 

    start : function() {
        this.canvas.width = window.innerWidth - 6;
        this.canvas.height = window.innerHeight - 150;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.getElementById('canvasAnchor'));
        this.interval = setInterval(updateGameArea, 20);
        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

    blowCycle : 0,

};

function updateGameArea() {
    //this fx redraws every 20ms
    // console.log('updating');

    for (i=0 ; i < bubbles.length ; i++){
        bubbles[i].updatePosition();
    };
    myGameArea.clear();
    drawBubbles();

    myGameArea.blowCycle += 20;

    if (myGameArea.blowCycle === 1000){
        // TASK: A new dot should also appear every 1000ms.
        blowBubble();
        myGameArea.blowCycle = 0;
    };
};

el.addEventListener('click', function(event){
        mouse.x = event.x;
        mouse.y = event.y - 140;

        if(mouse.y > 0){
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
    
                // NOTE: + 10 for ux for, note
                if ((yDif + xDif) < bubbles[i].radius + 10){
    
                    // TASK: The score should be incremented by a value inversely proportional to the size
                    // of the dot, with 10px dots worth 10 points, and 100px dots worth 1 point.
                    let newPoints = Math.floor((10 - (bubbles[i].radius * 2) / 10) + 1);
    
                    score += newPoints;
    
                    scoreBoard.innerHTML = score.toString();
                    // TASK: When a player touches or clicks a dot,
                    // the dot should disappear from the box and
                    // a new dot should appear at the top of the page 1000ms later.
                    bubbles.splice(i, 1);
                    setTimeout(blowBubble, 1000);
                };      
            };
        };
});

// TASK: A player should be able to use a SLIDER to control the speed at which dots fall.
var slider = document.getElementById("sRange");
var output = document.getElementById("speedRead");
output.innerHTML = slider.value;

slider.oninput = function() {
    // TASK: When the SLIDER is changed, all dots including currently
    // falling dots and newly created dots should change speed.
  output.innerHTML = this.value;
    // TASK: At the SLIDER's left-most position,
    // dots should fall at a speed of 10px per second,
    // and at the SLIDER's right-most position, should fall at a speed of 100px per second.
  speed = this.value;
};
