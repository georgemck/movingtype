let font, points = [],r=30,angle = 0;

function preload() {
  font = loadFont('fonts/inter_normal_600.ttf');
  font = loadFont('Roboto/Roboto-LightItalic.ttf');
}

function draw() {
  for (let i = 0; i < points.length; i++) {
    ellipse(points[i].x, points[i].y, 5, 5);
    ellipse(points[i].x + r * sin(angle + i*25), points[i].y, 5, 5);
  }
  angle += 10;
}

function setup() {
  frameRate(5)
  createCanvas(800, 400);
  points = font.textToPoints("PCC", 50, 300, 300);
  print(points);
}
