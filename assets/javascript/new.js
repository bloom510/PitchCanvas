  //NOTE: will be updating to ES6 syntax


  let canvas = document.querySelector("#myCanvas");  //our canvas element
  let context = canvas.getContext("2d");   //canvas context

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const PHI = (1 + Math.sqrt(5)) / 2;

  const init = () => {
    context.lineWidth = .5;
    context.strokeStyle = '#77aaff'
    context.lineCap = 'round'
    // context.setLineDash([3,5]);
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);
  }
  
//   context.fill();
  //Canvas only remembers the last item drawn,
  //so an array is created to store circles as discrete objects
  let dots = [];

  //creates a singular circle object to be distributed along the perimeter of a larger circle
  let dot = {
    radius: 150, //affects the radius of polar coords tbd
    xPos: 250 ,
    yPos: 200,
    color: "transparent",

    setColor: function(newColor) {
      this.color = newColor;
    },

    draw: function(x, y) {
      context.beginPath();
      context.arc(x, y, 0, 0, Math.PI * 2);
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
    //   console.log(newdot, 'heyo')
    }
  }
  init()
  PitchCircle();
  let polygons = {};


  const makePolygon = (ln1, ln2, ln3, ln4) => {
     

      // lastColor = lerpColor(lastColor, '#FFFFFF' , 5000)
      // context.strokeStyle = 'white';
      // console.log(lastColor)
    // console.log(dots[ln1].x)
      
    let polygons = {
        ln1: ln1 || ln1 === 0 ? {x: dots[ln1].x, y: dots[ln1].y} : 0,
        ln2: ln2 || ln2 === 0 ? {x: dots[ln2].x, y: dots[ln2].y} : 0,
        ln3: ln3 || ln3 === 0 ? {x: dots[ln3].x, y: dots[ln3].y} : 0,
        ln4: ln4 || ln4 === 0 ? {x: dots[ln4].x, y: dots[ln4].y} : 0
    };


    for(let i = 1; i <= 4; i++){

       if(i === 1) context.moveTo(polygons[`ln${i}`].x, polygons[`ln${i}`].y);
      //  else context.lineTo(polygons[`ln${i}`].x, Math.cos(polygons[`ln${i}`].y));
       else context.lineTo(polygons[`ln${i}`].x, polygons[`ln${i}`].y) 
       context.stroke();

       
      //  context.lineTo(polygons[`ln${i}`].x, Math.cos(polygons[`ln${i}`].y)) 
       
       

    }
    
 
//  

  }

  let counter = 0;
  let lastColor = '#77aaff'
  const movePolygon = () => {
    
    for(let i = 0; i <= 12; i++){
   

        makePolygon(
         Math.floor(Math.random()*12+i)%12,
         Math.floor(Math.random()*12+i)%12, 
         Math.floor(Math.random()*12+i)%12,
         Math.floor(Math.random()*12+i)%12)





        
        
      //  if(i === 11) {
        // canvas.toBlob(function(blob) {
        //     var newImg = document.createElement('img'),
        //         url = URL.createObjectURL(blob);
          
        //     newImg.src = url;
        //     document.body.appendChild(newImg);it 
        //   });
      //  }

    }

   this.animation = () => {
    requestAnimationFrame(() => movePolygon())
   } 

  // const cancelAnimation = () => cancelAnimationFrame(this.animation)
  
   requestAnimationFrame(() => { 
    // lastColor = lerpColor(lastColor, '#ff77aa' , 5000)
    // context.strokeStyle = lastColor;
    cancelAnimationFrame(this.animation)
    counter++;
    if(counter % 6 === 0) {
      context.translate(-1750,350)
    } else {
      context.translate(350,0)
      
    }
     
     


    setTimeout( () => { 
      // init()
      PitchCircle()
      movePolygon()
    }, 1000);
     
   });

  }
  movePolygon();
// 




   