let font;
let points = [];
let angle = 0;
let diameter = 10;
let r = 50;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let xx = 0;
let yy = 0;
let xxx = 0;
let yyy = 0;

function preload() {
  font = loadFont('fonts/inter_normal_600.ttf');
  font = loadFont('Roboto/Roboto-LightItalic.ttf');
}

function setup() {
  createCanvas(900, 900);
  frameRate(2);

  points = font.textToPoints('G', 50, 300, 300, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  }); //, x, y, x2, y2)
  print(points);
  angleMode(DEGREES);
  document.getElementById("gamepads").style.display = "none"; 
}

function draw() {
  background(0);

  //  xxx = map(axesValue.axes[0], -1, 1, -300,300);
  //  console.log( xxx);
  if (buttonValue.length > 0 && axesValue.axes && axesValue.axes[0]) {
    xxx += map(axesValue.axes[0], -1, 1, -1 * width / 2, width / 2);
    offsetX = xxx;
    yyy += map(axesValue.axes[1], -1, 1, height / 2, -1 * height / 2);
    offsetY = yyy;

    console.log(axesValue.axes[0], xxx, yyy, "xxx", buttonValue);
  }
  for (let i = 0; i < points.length; i++) {
    if (buttonValue.length > 0) {

      if (buttonValue[1] === 1) {
        fill("red");
      }
      if (buttonValue[2] === 1) {
        fill("green");
      }
      if (buttonValue[3] === 1) {
        fill("blue");
      }
      if (buttonValue[6] === 1) {
        fill("orange");
      }
      if (buttonValue[5] === 1) {
        fill("purple");
      }
      if (buttonValue[4] === 1||buttonValue[0] === 1) {
        fill("yellow");
      }
      //  console.log( xxx);
      ellipse(points[i].x + r * sin(angle + i * 25) + xxx, points[i].y - yyy, 10, 10);
    } else if (dragging) {
      ellipse(points[i].x + r * sin(angle + i * 25) + offsetX + mouseX - xx, points[i].y + mouseY - yy - offsetY, 10, 10);
    } else {
      circle(points[i].x + r * sin(angle + i * 25), points[i].y, diameter / 2);
    }

  }
  angle += 10;


  if (buttonValue.length > 0) {
    // console.log(buttonValue);
  }
  // console.log(axesValue);
  runningElem.textContent = ((performance.now() * 0.001 * 60 | 0) % 100).toString().padStart(2, '0');
  addNewPads(); // some browsers add by polling, others by event

  Object.values(gamepadsByIndex).forEach(processController);
  buttonValue = [];

  requestAnimationFrame(process);


}


function mousePressed(e) {



  for (let i = 0; i < points.length; i++) {
    if (dist(points[i].x, points[i].y, mouseX, mouseY) < diameter * 2) {
      dragging = true;
      xx = points[237].x - points[0].x + mouseX;
      yy = points[0].y - points[points.length - 1].y + mouseY;
      console.log("DRAGGING")
    }


  }




}

function mouseReleased() {
  dragging = false;
}

/*

p5.Font.textToPoints(txt: string, x: number, y: number, fontSize: number, options?: object): any[]
an (optional) object that can contain:

sampleFactor - the ratio of path-length to number of samples (default=.1); higher values yield more points and are therefore more precise

simplifyThreshold - if set to a non-zero value, collinear points will be be removed from the polygon; the value represents the threshold angle to use when determining whether two edges are collinear


Computes an array of points following the path for specified text

@return
an array of points, each with x, y, alpha (the path angle)

*/
