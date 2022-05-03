function keySetUp() {
    document.onkeydown = function (event) { keyDownEvent(event) };
    document.onkeyup = function (event) { keyUpEvent(event); }
 }

function keyDownEvent(event) {
    if (event.key == " ") {
       if (claw.plane == "upper") {
          if (claw.mesh.position.y < upperY+0.5) {
             claw.up = true;
             claw.down = false;
          }
       }
       else if (claw.plane == "lower") {
          
          if (claw.mesh.position.y < lowerY+0.5)
             claw.up = true;
          claw.down = false;
       }
       else
          return;
       if (claw.up == false) {
          claw.down = true;
          claw.up = false;
       }
    }
    if (event.key == "ArrowRight") {
       claw.right = true;
    }
    if (event.key == "ArrowLeft") {
       claw.left = true;
    }
    if (event.key == "ArrowDown") {
       claw.front = true;
    }
    if (event.key == "ArrowUp") {
       claw.back = true;
    }
 }
 
 function keyUpEvent(event) {
    if (event.key == " ") {
       claw.down = false;
       claw.up = true;
    }
    if (event.key == "ArrowRight") {
       claw.right = false;
    }
    if (event.key == "ArrowLeft") {
       claw.left = false;
    }
    if (event.key == "ArrowDown") {
       claw.front = false;
    }
    if (event.key == "ArrowUp") {
       claw.back = false;
    }
 }