let x, y;
let threshold = 180;
let caughtUntil = 0;
let caughtDuration = 2000;
function setup() {
  createCanvas(1450, 650);
  x = width / 2;
  y = height / 2;
  textSize(14);
}

function draw() {
  background(255, 174, 66);

  let d = dist(mouseX, mouseY, x, y);
  let caught = millis() < caughtUntil;

  if (!caught && d > threshold) {
    x = lerp(x, mouseX, 0.03);
    y = lerp(y, mouseY, 0.03);
  }

  noStroke();
  if (caught) {
    fill(200, 60, 60);
  } else {
    fill(100, 150, 200);
  }
  ellipse(x, y, 40, 40);

  noFill();
  stroke(180);
  ellipse(x, y, threshold * 2);

}

function mousePressed() {
  let d = dist(mouseX, mouseY, x, y);

  if (d < 20) {
    caughtUntil = millis() + caughtDuration;
  }
}