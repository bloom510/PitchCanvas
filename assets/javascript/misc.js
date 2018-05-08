  //NOTE: will be updating to ES6 syntax


  let canvas = document.querySelector("#myCanvas");  //our canvas element
  let context = canvas.getContext("2d");   //canvas context
  canvas.width =  window.innerWidth ;
  canvas.height = window.innerHeight ;
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width,canvas.height);
 
  // context.fillStyle = 'orange';
  // context.arc(canvas.width / 2 + 2, canvas.height / 2, 40, 0, Math.PI * 2);
  // context.fill()
  // context.fillStyle = 'orange';
  // context.font = "30px Courier";
  // context.fillText("NetRes",canvas.width/2-50, canvas.height/2);

  //Canvas only remembers the last item drawn,
  //so an array is created to store circles as discrete objects
  let dots = [];

  //creates a singular circle object to be distributed along the perimeter of a larger circle
  let dot = {
    radius: 300, //affects the radius of polar coords tbd
    xPos: canvas.width / 2,
    yPos: canvas.height / 2,
    color: '#008080',

    setColor: function(newColor) {
      this.color = newColor;
    },

    draw: function(x, y) {
      
      context.beginPath();
      context.arc(x, y, Math.random()*1.5, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();

    }
  };


function lerpColor(a, b, amount) { 

  var ah = parseInt(a.replace(/#/g, ''), 16),
      ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
      bh = parseInt(b.replace(/#/g, ''), 16),
      br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
      rr = ar + amount * (br - ar),
      rg = ag + amount * (bg - ag),
      rb = ab + amount * (bb - ab);

  return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

  //Draw pitch circle (12-pointed circle)
  function PitchCircle() {
    let lastColor = '#008080';
    for (let i = 0; i < 5000; i++) {

      /*
memorable numbers:
420,
200
      */
      /*
      To compute the angle for each point, keeping the radius
      constant we use the formula angle = 360° * index / number
      of sides. We'll be dealing with radians and note degrees here,
      and 2π radians make up the 360 degrees in a circle.
      */
      let interval = (Math.PI * 2) / 5000;

      //Multiply the interval by each index to return its place along the circle.
      let radianAngle = interval * (i + 9);

      //Convert x and y coords from cartesian to polar, relative to the circle's radius
      let x = Math.round(dot.xPos + dot.radius * Math.cos(radianAngle));
      let y = Math.round(dot.yPos + dot.radius * Math.sin(radianAngle));

      //Create a new dot for every iteration through this loop
      let newdot = Object.create(dot);
      newdot.x = x;
      newdot.y = y;
      newdot.color = lerpColor(lastColor, '#800080' , 20)
      lastColor = newdot.color;
      //create a new circle
      //push dots into circle.dots
      // push circle into circles array
      // newdot.draw(x, y);
      dots.push(newdot);
    }
  }

  PitchCircle();

  const PHI = (1 + Math.sqrt(5)) / 2;
      //  If desired, individual circles may be accessed and manipulated like so:
      //  let firstCircle = dots[0];
      //  firstCircle.setColor("rgba(255, 204, 0, 1)");
      //  firstCircle.draw(firstCircle.x, firstCircle.y);
      const animate = () => {
      for(let i = 0; i < dots.length; i++){
   
        // dots[i].x += .45;
        dots[i].y += .45;

        dots[i].draw(dots[i].x, dots[i].y)
        // context.translate((canvas.width / 2), (canvas.height /2));
        // context.rotate((Math.PI ) * .5);



        
      }
      requestAnimationFrame(() => {
        animate()
              // context.translate((canvas.width / 2), (canvas.height /2));
        context.rotate((Math.PI ) * .5);

      })
      
      
    }
    animate()


    
