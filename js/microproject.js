// --------------------
// GLOBAL VARIABLES
// --------------------

let energy = 100;
let threshold = 30;

let rectX;
let rectY;

//OPACITY
let alpha = map(energy, 0, 100, 40, 255);

// frames
let cooldown = 60; 


function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.6);
  rectX = width / 2;
  rectY = height / 2;
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
  background(240);

  let movement = dist(mouseX, mouseY, pmouseX, pmouseY);

  // INPUT EFFECT
  if (movement > 1) {
    energy -= 0.5;
  } else {
    energy += 0.3;
  }

  // Keep energy in bounds
  energy = constrain(energy, 0, 100);

// STATE LOGIC (3 states)
    if (energy > threshold) {
  // ACTIVE
    rectX = lerp(rectX, mouseX, 0.01);
    rectY = lerp(rectY, mouseY, 0.01);
  } else if (energy > 0) {
  // EXHAUSTED
    rectX = lerp(rectX, mouseX, 0.0002);
    rectY = lerp(rectY, mouseY, 0.0002);
  } else {
  // COLLAPSED (energy = 0)
    energy = 0;
    // no movement at all
}

  // SIZE CONTROLLED BY ENERGY
  let size = map(energy, 0, 100, 20, 80);

  let alpha = map(energy, 0, 100, 40, 255);
  fill(100, alpha);
  rect(rectX, rectY, size, size);

  // STATE LABEL
  fill(0);
  textSize(14);
  text("Energy: " + floor(energy), width / 2, height - 40);

  if (energy > threshold) {
    text("State: Active", width / 2, height - 20);
  } else {
    text("State: Exhausted", width / 2, height - 20);
  }

}

function windowResized() {
  resizeCanvas(windowWidth * 0.8, windowHeight * 0.6);
}   