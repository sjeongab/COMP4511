var timeLimit = time;

function onLoad(){
   document.getElementById('Loading').style.display = 'block';
   document.getElementById('EASY').style.display = 'none';
   document.getElementById('HARD').style.display = 'none';
   document.getElementById('CRAZY').style.display = 'none';
   loadSound();
   loadHamsters();
   setTimeout(function(){
   document.getElementById('Loading').style.display = 'none';
   document.getElementById('EASY').style.display = 'inline-block';
   document.getElementById('HARD').style.display = 'inline-block';
   document.getElementById('CRAZY').style.display = 'inline-block';
   },100);
   
   
}

function init(mode) {
   MODE = mode;
   hideButtons();
   keySetUp();
   createCanvas();
   bgmSound.play();
   addObjects();
   addItems();
   
   displayPoint();
   displayTime();
   displayGold();
   renderer.setAnimationLoop(animate);
}

function animate(){
   if (timeLimit - clock.getElapsedTime() >= 0) {
      update();
      render();  
   }
   else{
      bgmSound.sound.stop();
      endSound.play();
      clock.stop();
      writeScore("John Doe", point);
      point = 0;
      renderer.setAnimationLoop(null);
      //alerttest();
      //clock.start();
   }
}

function hideButtons(){
   document.getElementById('EASY').style.display = 'none';
   document.getElementById('HARD').style.display = 'none';
   document.getElementById('CRAZY').style.display = 'none';
}


/*function alerttest(){
   let text;
   let person = prompt("Please enter your name:", "Harry Potter");
   if (person != null && person != "") {
      text = person + "'s score: "+point;
   }
   alert(text);
}*/

function addObjects() {
   createPlanes();
   addClaw();
   addHamsters();
}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
   updateTime();
   updateClaw();
   updateItems();
   updatePlanes();
   addPoint();
}