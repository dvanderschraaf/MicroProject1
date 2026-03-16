// --------------------
// GLOBAL VARIABLES
// --------------------

let energy = 100;
let threshold = 30;

let rectX;
let rectY;


// frames
let cooldown = 60; 


let prevRectX;
let prevRectY;


function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.6);
  rectX = width / 2;
  rectY = height / 2;
  rectMode(CENTER);
  textAlign(CENTER);

  prevRectX = rectX;
  prevRectY = rectY;

}


function draw() {

    updateMovement();
    updateEnergy();
    
    drawEnvironment();
    drawRectangle();
    drawUI();
  
  }

  function updateMovement() {

    if (energy > 70) {
      let effort = map(energy, 70, 100, 0.02, 0.1);
      rectX = lerp(rectX, mouseX, effort);
      rectY = lerp(rectY, mouseY, effort);
  
    } else if (energy > 40) {
      rectX = lerp(rectX, mouseX, 0.02);
      rectY = lerp(rectY, mouseY, 0.02);
  
    } else if (energy > 10) {
      rectX = lerp(rectX, mouseX, 0.008);
      rectY = lerp(rectY, mouseY, 0.008);
  
    } else if (energy > 0) {
      rectX = lerp(rectX, mouseX, 0.002);
      rectY = lerp(rectY, mouseY, 0.002);
  
    } else {
      energy = 0;
    }
  
  }

  function updateEnergy() {

    let movement = dist(rectX, rectY, prevRectX, prevRectY);
  
    if (movement > 0.01) {
      energy -= movement * 0.02;
    } else {
      energy += 0.15;
    }
  
    energy = constrain(energy, 0, 100);
  
    prevRectX = rectX;
    prevRectY = rectY;
  
  }

  function drawEnvironment() {

    let r = map(energy, 100, 0, 0, 255);
    let g = map(energy, 100, 0, 200, 0);
    let b = 80;
  
    background(r, g, b);
  
  }

function drawRectangle() {

  let size = map(energy, 0, 100, 20, 80);
  let alpha = map(energy, 0, 100, 40, 255);

  stroke(255);
  strokeWeight(3.5);
  noFill();
  rect(rectX, rectY, size, size);

  let energyHeight = map(energy, 0, 100, 0, size);

  noStroke();
  fill(255, alpha);

  let bottomY = rectY + size / 2;
  rect(rectX, bottomY - energyHeight / 2, size, energyHeight);

}

function drawUI() {

  fill(0);
  textSize(14);
  text("Energy: " + floor(energy), width / 2, height - 40);

  if (energy > 70) {
    text("State: Active", width / 2, height - 20);

  } else if (energy > 40) {
    text("State: Tired", width / 2, height - 20);

  } else if (energy > 10) {
    text("State: Very Tired", width / 2, height - 20);

  } else if (energy > 0.1) {
    text("State: Critical", width / 2, height - 20);

  } else {
    text("State: Collapsed", width / 2, height - 20);
  }

}




function windowResized() {
  resizeCanvas(windowWidth * 0.8, windowHeight * 0.6);
}   