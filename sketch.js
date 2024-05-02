let font;
let points = [];
let angle = 0;
let diameter = 20;
let r = 50;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let xx = 0;
let yy = 0;

function preload() {
  font = loadFont('fonts/inter_normal_600.ttf');
  font = loadFont('Roboto/Roboto-LightItalic.ttf');
}

function setup() {
  createCanvas(600, 600);

  points = font.textToPoints('G', 50, 300, 300, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  }); //, x, y, x2, y2)
  print(points);
  angleMode(DEGREES);
}

function draw() {
  background(0);


  for (let i = 0; i < points.length; i++) {
    if (dragging) {
      ellipse(points[i].x + r * sin(angle + i * 25) + mouseX - xx, points[i].y + mouseY + offsetY - yy, 10, 10);
    } else {
      ellipse(points[i].x + r * sin(angle + i * 25) , points[i].y , 10, 10);
    }

  }
  angle += 10;
}


function mousePressed(e) {
 


  for (let i = 0; i < points.length; i++) {
    if (dist(points[i].x, points[i].y, mouseX, mouseY) < diameter * 2) {
      dragging = true;
      xx = points[points.length - 1].x - points[0].x + mouseX;
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