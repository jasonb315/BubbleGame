////////[:][:][:][:]////////

var bubbles = [];
// create a bubble each second, or 1000ms
// render them all updated to position on interval
// event listener for click on each
    // score += (size by speed)

////////[:][:][:][:]////////



function startGame() {
    //component definitions
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        // NOTE: writeover dimentions in css for screen proportions
        this.canvas.width = 0;
        this.canvas.height = 0;
        // canvas type:
        this.context = this.canvas.getContext("2d");
        // append to DOM:
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        // some code that clears the canvas for redraw
    }
}