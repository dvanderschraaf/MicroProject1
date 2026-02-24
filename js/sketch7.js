let sizeA = 40;
let sizeB = 40;
let advantage = 1; // subtle growth

function setup() {
  createCanvas(500, 300);
  textSize(14);
  textAlign(CENTER);
}

function draw() {
  background(255, 253, 208);

  //  Circle A
  fill(204, 204, 255);
  ellipse(width * 0.3, height / 2, sizeA);

  //  Circle B
  fill(255, 255, 0);
  ellipse(width * 0.7, height / 2, sizeB);

  // Labels
  fill(0);
  text("A: " + sizeA, width * 0.3, height - 40);
  text("B: " + sizeB, width * 0.7, height - 40);

  text("Click a circle to help it grow.", width / 2, 25);
  text("Press 'R' to reset.", width / 2, 45);
}

function mousePressed() {

  let dA = dist(mouseX, mouseY, width * 0.3, height / 2);
  let dB = dist(mouseX, mouseY, width * 0.7, height / 2);

  if (dA < sizeA / 2) {
    sizeA += 5;  // normal growth
  } else if (dB < sizeB / 2) {
    sizeB += 10 + advantage;  // bigger growth
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    sizeA = 40;
    sizeB = 40;
  }
}