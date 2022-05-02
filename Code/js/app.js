var timeLimit = time;
var gamePlaying;

function onLoad() {
   document.getElementById('Loading').style.display = 'block';
   document.getElementById('restart').style.display = 'none';
   document.getElementById('EASY').style.display = 'none';
   document.getElementById('HARD').style.display = 'none';
   document.getElementById('CRAZY').style.display = 'none';
   loadSound();
   loadHamsters();
   setTimeout(function () {
      document.getElementById('Loading').style.display = 'none';
      document.getElementById('EASY').style.display = 'inline-block';
      document.getElementById('HARD').style.display = 'inline-block';
      document.getElementById('CRAZY').style.display = 'inline-block';
   }, 100);


}

function init(mode) {
   gamePlaying = true;
   MODE = mode;
   point = 0;
   goldCount = 0;
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

function animate() {
   if (timeLimit - clock.getElapsedTime() >= 0) {
      update();
      render();
   }
   else {
      if (gamePlaying) {
         bgmSound.sound.stop();
         endSound.play();
         document.getElementById('scene-container').style.display = 'none';
         document.getElementById('point').style.display = 'none';
         document.getElementById('gold').style.display = 'none';
         document.getElementById('time').style.display = 'none';
         document.getElementById('finalScore').innerHTML = "Your Score: " + point.toString();
         document.getElementById('nameRecord').style.display = 'inline-block';
         //document.getElementById('restart').style.display = 'inline-block';
         gamePlaying = false;
         for (var i = 0; i < itemList.length; i++) {
            if (itemList[i].caught) {
               claw.base.remove(itemList[i].itemMesh);
            }
            itemList[i].disposeItem();
         }
      }
      //writeScore("John Doe", point);
      //restartGame();
   }
}


function hideButtons() {
   document.getElementById('EASY').style.display = 'none';
   document.getElementById('HARD').style.display = 'none';
   document.getElementById('CRAZY').style.display = 'none';
}

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

function nameRecord() {
   document.getElementById('nameRecord').style.display = 'none';
   document.getElementById('restart').style.display = 'inline-block';
}

function restartGame() {
   gamePlaying = true;
   document.getElementById('scene-container').style.display = 'flex';
   document.getElementById('restart').style.display = 'none';
   bgmSound.play();
   // display datas

   document.getElementById('point').style.display = 'block';
   document.getElementById('gold').style.display = 'block';
   document.getElementById('time').style.display = 'block';

   addItems();
   updatePlanes();
   point = 0;
   goldCount = 0;
   updateGold();
   updatePoint();
   gameRunning = true;
   timeLimit = time + Math.trunc(clock.getElapsedTime()) + 1;
   // update hamster
   ham_0.visible = true;
   ham_1.visible = false;
   ham_2.visible - false;
   hamUpdate_1 = false;
   hamUpdate_2 = false;
   // update claw 
   claw.base.position.set(0, 2, 0);
}