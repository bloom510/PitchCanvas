/*
React integration:

Useful for handling resize by storing canvas dimensions in state as the current 
windowWidth and windowHeight. 

Ex:

--> componentDidMount(){ add resize dom listener and callback } -->
--> User resizes window and triggers our callback handleResize() -->
--> New canvas dimensions are passed down as props baked into draw logic -->
--> Responsive canvas site integration achieved
*/

class Vector {
    constructor(x, y, context) {
        this.color = 'black';
        this.x = x;
        this.y = y;
        this.notename;
        this.context = context;
    }
    draw(x, y) {
        this.context.beginPath();
        this.context.arc(x, y, 3, 0, Math.PI * 2);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    setColor(newColor) {
        this.color = newColor;
    }

}

class PitchCanvas {
    constructor(radius, canvas = {}) {
        this.radius = radius;
        this.canvas = canvas;
        this.pitchsets = {
            // data structure for pitchset memory and manipulation goes here
        };
        this.nodes = [];
    }
    init(x, y) {
        const interval = (Math.PI * 2) / 12;
        let radianAngle;
        let x, y;
        for (let i = 0; i < 12; i++) {
            radianAngle = interval * (i + 9);
            x = Math.round(x + this.radius * Math.cos(radianAngle));
            y = Math.round(y + this.radius * Math.sin(radianAngle));
            const vector = new Vector(x, y, this.canvas.context);
            this.nodes.push(vector);
        }
        this.activateListeners();
    }
    activateListeners() {
        //Logic that adds interactivity to the app.
        canvas.el.addEventListener('click', () => {
            //click logic goes here
        })
    }
}