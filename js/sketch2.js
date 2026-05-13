let y;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("game-container");
  y = height / 2;
}

function draw() {
  background(200,20,25);

  y = constrain(mouseY, height / 3, (2 * height) / 3);

  let x = mouseX;
  let wobble = sin(frameCount * 0.5) * 10;

  fill(200, 80, 80);
  rectMode(CENTER);
  rect(x + wobble, y, 40, 40);
}