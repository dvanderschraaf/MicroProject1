let circles = [];

function setup() {
  createCanvas(1450, 600);
  noStroke();

  for (let i = 0; i < 30; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      ox: random(width),
      oy: random(height)
    });
  }
}

function draw() {
  background(230, 240, 255);

  for (let c of circles) {
    c.x = lerp(c.x, c.ox + (mouseX - width/2) * 0.5, 0.02);
    c.y = lerp(c.y, c.oy + (mouseY - height/2) * 0.5, 0.02);

    let size = 70 + sin(frameCount * 0.1) * 15;

    fill(100, 150, 200, 180);
    ellipse(c.x, c.y, size, size);
  }
}