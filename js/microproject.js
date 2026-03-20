// GLOBAL VARIABLES

//main variable controls everything = movement(drain), rest(recovery), collapsed(frozen)
let energy = 100;

let threshold = 30;

//movement - square position
let rectX;
let rectY;

//frames
let cooldown = 60; 

//previous square position
let prevRectX;
let prevRectY;

//minimum energy to move
let wakeThreshold = 75;

//pause dureing collapse
let isCollapsed = false;
let collapseTimer = 0;

//frozen state (3 seconds)
let collapseDuration = 30;

//score starts off at 0
let score = 0;

//circle possition + size
let circles = [];
let numCircles = 3;
let circleSize = 30;

//
let gameOver = false;


function setup() {
    createCanvas(windowWidth, windowHeight);
    rectX = width / 2;
    rectY = height / 2;
    rectMode(CENTER);
    textAlign(CENTER);

    prevRectX = rectX;
    prevRectY = rectY;

    for (let i = 0; i < numCircles; i++) {
      spawnCircle();
    }

}

function spawnCircle() {
    let x = random(50, width - 50);
    let y = random(50, height - 50);

    circles.push({ x: x, y: y });
}

function draw() {

  if (gameOver) {
    drawGameOver();
    return;
  }

    updateMovement();
    updateEnergy();
    
    drawEnvironment();
    drawRectangle();
    drawUI();

    drawCircles();

    checkCollision();
  
}

//game over screen
function drawGameOver() {

    background(0);

    fill(255,0,0);
    textSize(100);
    text("GAME OVER", width / 2, height / 2 - 100);

    fill(255);
    textSize(40);
    text("Press SPACE to try again", width / 2, height / 2 - 40);

    fill(255,0,0);
    textSize(20);
    text("Score: " + score, width / 2, height / 2);
    
}

function updateMovement() {

    if (isCollapsed) {
      return;
    }
    
    //speed booster
    let difficultyBoost = map(score, 0, 50, 0, 0.15, true);
    
    if (energy > 70) {
    
      let effort = map(energy, 70, 100, 0.02, 0.1) + difficultyBoost;
    
      rectX = lerp(rectX, mouseX, effort);
      rectY = lerp(rectY, mouseY, effort);
    
    } else if (energy > 40) {
    
      let effort = 0.05 + difficultyBoost * 0.5;
    
      rectX = lerp(rectX, mouseX, effort);
      rectY = lerp(rectY, mouseY, effort);
    
    } else if (energy > 0.01) {
    
      let effort = 0.009 + difficultyBoost * 0.3;
    
      rectX = lerp(rectX, mouseX, effort);
      rectY = lerp(rectY, mouseY, effort);
    
    } else {
      isCollapsed = true;
      collapseTimer = 0;
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
        energy += 0.35;
  
        if (energy > wakeThreshold) {
          isCollapsed = false;
        }
      }
  
    } else {
  
      if (movement > 0.05) {
        energy -= movement * 0.02;
      } else {
        energy += 0.15;
      }
  
    }
  
    energy = constrain(energy, 0, 100);
  
    prevRectX = rectX;
    prevRectY = rectY;
  
}

function drawEnvironment() {

    let r = map(energy, 100, 0, 250, 0);
    let g = map(energy, 100, 0, 0, 255);
    let b = 80;
  
    background(r, g, b);
    
}

function mousePressed() {

    if (gameOver) {

      if (
        mouseX > width / 2 - 60 &&
        mouseX < width / 2 + 60 &&
        mouseY > height / 2 + 40 &&
        mouseY < height / 2 + 80
      ) {
        resetGame();
      }
  
    return;
  }

    for (let i = circles.length - 1; i >= 0; i--) {
      let c = circles[i];
      let d = dist(mouseX, mouseY, c.x, c.y);

      if (d < circleSize / 2) {
        score++;

        // remove clicked circle
        circles.splice(i, 1);

        // add a new one somewhere else
        spawnCircle();

        break; // only one per click
      }
    }
}

function drawCircles() {
    fill(255, 200, 0);
    noStroke();

    for (let c of circles) {
      ellipse(c.x, c.y, circleSize);
    }
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

function checkCollision() {

    let d = dist(mouseX, mouseY, rectX, rectY);

    if (d < 40) { // adjust based on your size
      gameOver = true;
    }

}

function resetGame() {
    score = 0;
    energy = 100;
    isCollapsed = false;

    rectX = width / 2;
    rectY = height / 2;

    circles = []; // clear old ones

    for (let i = 0; i < numCircles; i++) {
      spawnCircle();
    }

    gameOver = false;
}

function drawUI() {

    //scoreboard
    fill(0);
    textSize(25);
    text("Score: " + score, width / 2, 30);

    //states of drained
    fill(255);
    textSize(20);
    text("Energy: " + floor(energy), width / 2, height - 45);

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

function keyPressed() {

    if (gameOver && key === ' ') {
      resetGame();
    }

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}   