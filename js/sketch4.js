let x, y;
let threshold = 80;

function setup() {
  createCanvas(1450, 600);
  x = width / 2;
  y = height / 2;
  textSize(14);
}

function draw() {
  background(255, 174, 66);

  let d = dist(mouseX, mouseY, x, y);

  if (d > threshold) {
    x = lerp(x, mouseX, 0.03);
    y = lerp(y, mouseY, 0.03);
  }

  fill(100, 150, 200);
  noStroke();
  ellipse(x, y, 40, 40);

  noFill();
  stroke(180);
  ellipse(x, y, threshold * 2);


  noStroke();
  fill(0);
  if (d > threshold) {
    text("The circle moves toward the mouse.", 10, height - 30);
  } else {
    text("The circle hesitates and stops.", 10, height - 30);
  }
}