  let canvas = document.querySelector("#myCanvas");
  let context = canvas.getContext("2d");
  let circles = [];

  //TODO: 1. Create line Object and push to an array similarly to circles.
  //      2. Allow color coding of lines as well as grouping into objects

  //create singular circle object for dots in pitch circle
  let circle = {
    radius: 100,
    xPos: canvas.width / 2,
    yPos: canvas.height / 2,
    color: "black",
    coords: '',

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

  //Draw pitch circle
  function PitchCircle() {
    for (let i = 0; i < 12; i++) {
      //Circle divided by number of dots
      let interval = (Math.PI * 2) / 12;
      //spacial distribution of each dot
      let radianAngle = interval * (i + 9);
      let x = Math.round(circle.xPos + circle.radius * Math.cos(radianAngle));
      let y = Math.round(circle.yPos + circle.radius * Math.sin(radianAngle));
      let newCircle = Object.create(circle);
      newCircle.x = x;
      newCircle.y = y;
      newCircle.draw(x, y);
      circles.push(newCircle);
    }
  }

  PitchCircle();


  //HOW TO ACCESS AND CHANGE PROPERTIES OF INDIVIDUAL POINTS.
  // let firstCircle = circles[0];
  // firstCircle.setColor("rgba(255, 204, 0, 1)");
  // firstCircle.draw(firstCircle.x, firstCircle.y);

  //BEGIN EVENT HANDLERS
  //Detect dot clicks
  let lineInit = false;
  canvas.onmousedown = function(e) {
    let mousePos = getMousePos(canvas, e);
    let drawFromX = 0;
    let drawFromY = 0;

    for (i = 0; i < circles.length; i++) {
      y = mousePos.y - circles[i].y;
      x = mousePos.x - circles[i].x;
      let dist = Math.sqrt(y * y + x * x);
      if (dist < 5) {
        if (lineInit === true) {
          console.log('drawing line');
          context.lineTo(circles[i].x, circles[i].y);
          context.stroke();
          // lineInit = false;
        } else {
          console.log('dot clicked');
          context.moveTo(circles[i].x, circles[i].y);
          lineInit = true;
          // circles[i].setColor("rgba(255, 204, 0, 1)");
          // circles[i].draw(circles[i].x,  circles[i].y);
        }
      }
    }
  }

  //Get mouse position
  function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  //Begin keypress shortcuts
  document.onkeypress = function(e) {
    let x = e.which || e.keyCode;
    if (x === 108) {
      alert("Brush lifted");
      lineInit = false;
    } else if (x === 120) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      PitchCircle();
      lineInit = false;
    } else {
      alert(e.keyCode);
    }
  }
