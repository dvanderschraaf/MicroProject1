// GLOBAL VARIABLES

//main variable controls everything = movement(drain), rest(recovery), collapsed(frozen)
let energy = 100;

let threshold = 30;

//movement - square position
let rectX;
let rectY;

//frames
let cooldown = 60; 

//previous position
let prevRectX;
let prevRectY;

//minimum energy to move
let wakeThreshold = 10;

//pause dureing collapse
let isCollapsed = false;
let collapseTimer = 0;

//frozen state (3 seconds)
let collapseDuration = 180;



function setup() {
    createCanvas(windowWidth, windowHeight);
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

    if (isCollapsed) {
      return;
    }
  
    if (energy > 70) {
      //effort is movement speed - based on energy level
      let effort = map(energy, 70, 100, 0.02, 0.1);
      rectX = lerp(rectX, mouseX, effort);
      rectY = lerp(rectY, mouseY, effort);
  
    } else if (energy > 40) {
      rectX = lerp(rectX, mouseX, 0.02);
      rectY = lerp(rectY, mouseY, 0.02);
      //collapsed state (frozen)
    } else if (energy > 0.01) {
      rectX = lerp(rectX, mouseX, 0.008);
      rectY = lerp(rectY, mouseY, 0.008);
  
    } else {
      isCollapsed = true;
      collapseTimer = 0; // start timer
    }
  
}

function updateEnergy() {
    //measures amount moved - controls energy drain and recovery
    let movement = dist(rectX, rectY, prevRectX, prevRectY);
  
    if (isCollapsed) {
  
      collapseTimer++;
  
      //no recovery when frozen
      if (collapseTimer < collapseDuration) {
        //frozen
      } else {
        //recover
        energy += 0.2;
  
        if (energy > wakeThreshold) {
          isCollapsed = false;
        }
      }
  
    } else {
  
      if (movement > 0.05) {
        energy -= movement * 0.04;
      } else {
        energy += 0.15;
      }
  
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
    //size makes the square shrink as energy drops
    let size = map(energy, 0, 100, 20, 80);
    //alspha makes the square fade as energy drops
    let alpha = map(energy, 0, 100, 40, 255);

    stroke(255);
    strokeWeight(3.5);
    noFill();
    rect(rectX, rectY, size, size);

    //energyHeight controls energy bar inside the square
    let energyHeight = map(energy, 0, 100, 0, size);

    noStroke();
    fill(255, alpha);

    //bottomY controls the energy bar to regenerate upwards
    let bottomY = rectY + size / 2;
    rect(rectX, bottomY - energyHeight / 2, size, energyHeight);

}

function drawUI() {

    fill(0);
    textSize(14);
    text("Energy: " + floor(energy), width / 2, height - 40);

    if (isCollapsed) {
      text("State: Collapsed", width / 2, height - 20);
  
    } else if (energy > 70) {
      text("State: Active", width / 2, height - 20);
  
    } else if (energy > 40) {
      text("State: Tired", width / 2, height - 20);
  
    } else if (energy > 10) {
      text("State: Very Tired", width / 2, height - 20);
  
    } else {
      text("State: Critical", width / 2, height - 20);
    }
}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}   