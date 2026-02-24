function setup() {
    createCanvas(1450, 600);
    colorMode(HSB, 360, 100, 100, 255);
    background(250);
  }
  
  function draw() {
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let hue = map(speed, 0, 30, 200, 0);
  
    fill(hue, 80, 80, 150);
    noStroke();
    ellipse(mouseX, mouseY, speed + 6, speed + 6);
  }