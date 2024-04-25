let font;
let points = [];
let r =60;
let angle = 0;
function preload() {
  font = loadFont('fonts/inter_normal_600.ttf');
  font = loadFont('Roboto/Roboto-LightItalic.ttf');
}

function setup() {
  createCanvas(600, 600);
  //points = font.textToPoints('Hi', 100, 300, 300); //, x, y, x2, y2)

  points = font.textToPoints('GM', 50, 300, 300,{
    sampleFactor:0.2,
    simplifyThreshold:0
  }); //, x, y, x2, y2)
  print(points);

  angleMode(DEGREES);

}

function draw() {
  background(0);
  for (let i = 0; i < points.length; i++) {
    ellipse(points[i].x , points[i].y+ r * sin(angle + i*25), 5, 5);
  }
  angle += 10;
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
