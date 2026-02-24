let steps=0;
let maxSteps = 1118;

function setup () {
    createCanvas (1450, 200);

}
function draw (){
    background (220);

    if (mouseIsPressed) {
        steps += 5; // speed of filling
      } else {
        steps -= 5; // speed of emptying
      }
      
      // keep steps in bounds
      steps = constrain(steps, 0, maxSteps);

let sectionWidth = width / maxSteps

//sections

noStroke();
fill(" #00ff00")
for (let i =0; i <steps; i++){
// loop
// let i = 0
// i ‹ steps
//

    rect(i * sectionWidth, 0, sectionWidth, height);
}

if (steps>= maxSteps) {
    textSize (16);
    fill(0);
    text("State: Complete", width -150, height -20);
}
}
