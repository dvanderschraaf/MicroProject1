let images = [];
let currentIndex = 0;
let totalImages = 9;
let canvasWidth;
let canvasHeight;


// PRELOAD
function preload() {
  for (let i = 1; i <= totalImages; i++) {
    images.push(loadImage("../img/image" + i + ".jpg"));
  }
}


// SETUP
function setup() {
  calculateCanvasSize();
  createCanvas(canvasWidth, canvasHeight);
  textAlign(CENTER, CENTER);
}


// LOOP
function draw() {
  background(20);

  displayCurrentImage();
  displayProgressIndicator();
}


// IMAGE DISPLAY
function displayCurrentImage() {
  let img = images[currentIndex];

  let scaleFactor = min(width / img.width, height / img.height);
  let newWidth = img.width * scaleFactor;
  let newHeight = img.height * scaleFactor;

  let x = (width - newWidth) / 2;
  let y = (height - newHeight) / 2;

  image(img, x, y, newWidth, newHeight);
}


// STATE INDICATOR
function displayProgressIndicator() {

  // Numers
  fill(255);
  textSize(14);
  text("Image " + (currentIndex + 1) + " / " + totalImages, width / 2, height - 25);

  // indicaor
  let spacing = 20;
  let startX = width / 2 - (totalImages - 1) * spacing / 2;

  for (let i = 0; i < totalImages; i++) {
    if (i === currentIndex) {
      fill(255);
    } else {
      fill(100);
    }
    ellipse(startX + i * spacing, height - 45, 8, 8);
  }
}


// NAVIGATION
function keyPressed() {

  if (keyCode === RIGHT_ARROW) {
    goForward();
  }

  if (keyCode === LEFT_ARROW) {
    goBackward();
  }
}


function goForward() {
  currentIndex++;
  if (currentIndex >= totalImages) {
    currentIndex = 0;  // forward
  }
}


function goBackward() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalImages - 1;  // backward
  }
}


// REPONSIVENESS
function windowResized() {
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}


function calculateCanvasSize() {
  canvasWidth = windowWidth * 0.8;
  canvasHeight = windowHeight * 0.8;
}