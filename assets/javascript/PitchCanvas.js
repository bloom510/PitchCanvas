  //NOTE: will be updating to ES6 syntax


  let canvas = document.querySelector("#myCanvas");  //our canvas element
  let context = canvas.getContext("2d");   //canvas context

  //Canvas only remembers the last item drawn,
  //so an array is created to store circles as discrete objects
  let dots = [];

  //creates a singular circle object to be distributed along the perimeter of a larger circle
  let dot = {
    radius: 100, //affects the radius of polar coords tbd
    xPos: canvas.width / 2,
    yPos: canvas.height / 2,
    color: "black",

    setColor: function(newColor) {
      this.color = newColor;
    },

    draw: function(x, y) {
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();

    }
  };

  //Draw pitch circle (12-pointed circle)
  function PitchCircle() {
    for (let i = 0; i < 12; i++) {
      /*
      To compute the angle for each point, keeping the radius
      constant we use the formula angle = 360° * index / number
      of sides. We'll be dealing with radians and note degrees here,
      and 2π radians make up the 360 degrees in a circle.
      */
      let interval = (Math.PI * 2) / 12;

      //Multiply the interval by each index to return its place along the circle.
      let radianAngle = interval * (i + 9);

      //Convert x and y coords from cartesian to polar, relative to the circle's radius
      let x = Math.round(dot.xPos + dot.radius * Math.cos(radianAngle));
      let y = Math.round(dot.yPos + dot.radius * Math.sin(radianAngle));

      //Create a new dot for every iteration through this loop
      let newdot = Object.create(dot);
      newdot.x = x;
      newdot.y = y;
      newdot.draw(x, y);
      dots.push(newdot);
    }
  }

  PitchCircle();



  let lineInit = false;  // lineInit determines whether the brush is lifted or down so that
                        //we're not drawing one continuous line
  // Detect dot clicks
  canvas.onmousedown = function(e) {
    let mousePos = getMousePos(canvas, e); //gets mouse position

    //iterate through array containing the 12 circles
    for (i = 0; i < dots.length; i++) {
      //get difference between mouse position and the circles
      y = mousePos.y - dots[i].y;
      x = mousePos.x - dots[i].x;

      //calculate the distance of the mouse from the center of our circles
      let dist = Math.sqrt(y * y + x * x);

      if (dist < 6) { //if within clicking range
        //draw line if drawing already intitiated
        if (lineInit === true) {
          console.log('drawing line');
          context.lineTo(dots[i].x, dots[i].y);
          context.stroke();
          // lineInit = false;
        } else { //move context to the clicked circle and initiate drawing
          console.log(`dot ${} clicked`);
          context.moveTo(dots[i].x, dots[i].y);
          lineInit = true;
        }
      }
    }
  }

  //Get mouse position
  function getMousePos(canvas, e) {
    //Store canvas size relative to the viewport
    let rect = canvas.getBoundingClientRect();
    //return the difference between client coords and canvas coords
    //to get mouse position along the canvas
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  //Begin keypress shortcuts
  document.onkeypress = function(e) {
    let x = e.which || e.keyCode;
    if (x === 108) { //if 'L' key is pressed, lift brush.
      alert("Brush lifted");
      lineInit = false;
    } else if (x === 120) { //if 'X' key is pressed, erase lines
      context.clearRect(0, 0, canvas.width, canvas.height);
      PitchCircle();
      lineInit = false;
    }
  }


    /*
       If desired, individual circles may be accessed and manipulated like so:
       let firstCircle = circles[0];
       firstCircle.setColor("rgba(255, 204, 0, 1)");
       firstCircle.draw(firstCircle.x, firstCircle.y);
    */
