let container;
let camera;
let renderer;
let scene;
var point = 0;
var itemList = [];
var clock;
var timeText;
var pointText;
var x = 0;
var timeLimit = 20;
let sound;
var gameStart = false;
var mode;
let endSound;
let pointSound_1;
let pointSound_2;
let tadaSound;
let timeUpSound;
let clawSound;
var gold = 0;
var hamUpdate = false;
var hamUpdate_1 = false;
var hamUpdate_2 = false;
var myHam_0;
var myHam_1;
var myHam_2;


let isCatching = false;
var collisionList = [];

//position of planes
var upperX = 0;
const upperY = -0.5;
var upperZ = 0;
const upperR = 0.7;
var upperA = 0;
var lowerX = 0;
const lowerY = -2.5;
var lowerZ = 0;
const lowerR = 0.5;
var lowerA = 0;
var ham;
var ham_0;
var ham_1;
var ham_2;
let bgmSound;

function onLoad(){
   camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .5, 1000);
   
   loadSound();
   ham_0 = loadObj('r0-3/r1-1.mtl', 'r0-3/r1-1.obj');
   ham_0.then(myObj=>{
      myObj.scale.set(0.5,0.5,0.5);
      myObj.position.set(0,3,-1);
      //scene.add(myObj);
      myHam_0 = myObj;
      //scene.remove(myObj);
   });
   ham_1 = loadObj('r0-3/r1-2.mtl', 'r0-3/r1-2.obj');
   ham_1.then(myObj=>{
      myObj.scale.set(0.5,0.5,0.5);
      myObj.position.set(0,3,-1);
      //scene.add(myObj);
      //myObj.visible = false;
      myHam_1 = myObj;
      //scene.remove(myObj);
   });
   ham_2 = loadObj('r0-3/r1-3.mtl', 'r0-3/r1-3.obj');
   ham_2.then(myObj=>{
      myObj.scale.set(0.5,0.5,0.5);
      myObj.position.set(0,3,-1);
      //scene.add(myObj);
      //myObj.visible = false;
      myHam_2 = myObj;
      //scene.remove(myObj);
   });
}
function loadObj(mtl_path, obj_path){
   return new Promise(function(resolve){
      new MTLLoader().load(mtl_path, function(materials) {
         materials.preload();
         mat = materials;
         new OBJLoader().setMaterials(materials).load(obj_path, resolve );
      });
   });
   
}
function easy(){
   mode = 'EASY';
   start();
}
function hard(){
   mode = 'HARD';
   start();
}
function crazy(){
   mode = 'CRAZY';
   start();
}
function start(){
   document.getElementById('EASY').style.display = 'none';
   document.getElementById('HARD').style.display = 'none';
   document.getElementById('CRAZY').style.display = 'none';
   gameStart = true;
   init();
}
function init() {
    
   createCanvas();
   //loadSound();
   bgmSound.play();
   addObjects();
   addItems(20);
   keySetUp();
   displayPoint();
   displayTime();
   scene.add(myHam_0);
   scene.add(myHam_1);
   myHam_1.visible = false;
   scene.add(myHam_2);
   myHam_2.visible = false;
   /*ham = ham_0;
   ham.name = "name";
   
   ham.then(myObj=>{
      myObj.scale.set(0.5,0.5,0.5);
      myObj.position.set(0,3,-1);
      scene.add(myObj);
      myHam = myObj;
      //scene.remove(myObj);
   });*/
   
   // start the animation loop
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
function loadSound(){
   bgmSound = new Sound('../Code/sounds/bgm.wav', camera, 10, true);
   //bgmSound.sound.setLoop(true);
   endSound = new Sound('../Code/sounds/end.wav', camera, 10, false);
   pointSound_1 = new Sound('../Code/sounds/point_1.wav', camera, 10, false);
   pointSound_2 = new Sound('../Code/sounds/point_2.wav', camera, 10, false);
   timeUpSound = new Sound('../Code/sounds/point.wav', camera, 10, false);
   tadaSound = new Sound('../Code/sounds/tada.wav', camera, 7, false);
   clawSound = new Sound('../Code/sounds/claw.wav', camera, 3, false);
}
function createCanvas(){
   container = document.querySelector('#scene-container');
   scene = new THREE.Scene();
   scene.background = new THREE.Color('orange');

   camera.position.set(0, 3, 10);
   camera.lookAt(0, 0, 0);
   scene.add(camera);

   const ambientLight = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
   scene.add(ambientLight);

   renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.physicallyCorrectLights = true;
   container.appendChild(renderer.domElement);
}


//randomly create items
function addItems(num_items){
   for (var i = 0; i < num_items; i++) {
      var r = Math.random() / 10 + 0.15;  //random radius
      var p = Math.random();  // probability
      var va = 0.01;
      a = i / 10 * 2 * Math.PI;
      if (p < 0.5) {
         //item on upper plane
         itemList.push(new Item(r, 5, -0.5 + r, a, 0, va, "upper_plane"));
      } else {
         //item on lower plane
         itemList.push(new Item(r, 3, -2.5 + r, a, 0, -va, "lower_plane"));
      }
   }

   for (var i = 0; i < itemList.length; i++) {
      itemList[i].createItem();
   }
}

function alerttest(){
   let text;
   let person = prompt("Please enter your name:", "Harry Potter");
   if (person != null && person != "") {
      text = person + "'s score: "+point;
   }
   alert(text);
}

function displayPoint() {
   pointText = document.createElement('div');
   pointText.id = "point";
   pointText.style.position = 'absolute';
   pointText.style.width = 100;
   pointText.style.height = 100;
   pointText.innerHTML = "Point: " + point;
   pointText.style.top = 50 + 'px';
   pointText.style.left = 680 + 'px';
   pointText.style.color = 'black';
   pointText.style.fontWeight = 'bold';
   pointText.style.fontSize = '20px';
   pointText.style.fontFamily = 'Fantasy';
   document.body.appendChild(pointText);
}

function displayTime() {
   clock = new THREE.Clock();
   clock.start();
   timeText = document.createElement('div');
   timeText.id = "time";
   timeText.style.position = 'absolute';
   timeText.style.width = 100;
   timeText.style.height = 100;
   timeText.innerHTML = "Time: " + (timeLimit - Math.trunc(clock.getElapsedTime()));
   timeText.style.top = 70 + 'px';
   timeText.style.left = 680 + 'px';
   timeText.style.color = 'black';
   timeText.style.fontWeight = 'bold';
   timeText.style.fontSize = '20px';
   timeText.style.fontFamily = 'Fantasy';
   document.body.appendChild(timeText);
}

function addObjects() {
   createPlanes();
   addClaw();
}

function keySetUp() {
   document.onkeydown = function (event) { keyDownEvent(event) };
   document.onkeyup = function (event) { keyUpEvent(event); }
}

function createPlanes() {
   upperPlane = new Plane(5, upperY);
   lowerPlane = new Plane(3, lowerY);

   scene.add(upperPlane.mesh);
   scene.add(lowerPlane.mesh);
}

function addClaw() {
   claw = new Claw();
   scene.add(claw.mesh);
   scene.add(claw.target);
}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
   claw.moveTarget(upperX, upperZ, lowerX, lowerZ);
   claw.move();
   document.getElementById("time").innerHTML = "Time: " + (timeLimit - 1 - Math.trunc(clock.getElapsedTime()));

   updateItems();
   updatePlanes();
   addPoint();
}

function updatePlanes(){
   lowerA = (lowerA - 1/15) % (2 * Math.PI);
   upperX = upperR * Math.cos(upperA);
   upperZ = upperR * Math.sin(upperA);
   lowerX = lowerR * Math.cos(lowerA);
   lowerZ = lowerR * Math.sin(lowerA);
   upperPlane.mesh.position.set(upperX, upperY, upperZ);
   lowerPlane.mesh.position.set(lowerX, lowerY, lowerZ);
}

function updateItems(){
   var currDistance;
   for (var i = 0; i < itemList.length; i++) {
      currDistance = ((claw.mesh.position.x - itemList[i].x) ** 2 + (claw.base.position.y - itemList[i].y) ** 2 + (claw.mesh.position.z - itemList[i].z) ** 2) ** (1 / 2);
      if (currDistance <= itemList[i].r * 5) {

         itemList[i].isCaught(claw.base);

         claw.down = false;
         claw.up = true;
         break;
      }
   }
   for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].caught == false) {
         if (itemList[i].plane == "upper_plane") {
            itemList[i].updateItem(upperX, upperZ);
         } else {
            itemList[i].updateItem(lowerX, lowerZ);
         }
      }
   }
}
function render() {
   renderer.render(scene, camera);
}

function keyDownEvent(event) {
   if (event.key == " ") {
      if (claw.plane == "upper") {
         if (claw.mesh.position.y < 0) {
            claw.up = true;
            claw.down = false;
         }
      }
      else if (claw.plane == "lower") {
         
         if (claw.mesh.position.y < -2)
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

function addPoint(event) {
   for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].caught && claw.base.position.y >= 1.5) {
         if(itemList[i].type == "plus"){
            timeLimit += 10;
            timeUpSound.play();
         }
         else if(itemList[i].type=="gold"){
            gold += 1;
            timeUpSound.play();
            if(gold >= 7){
            point+=300;
            gold = 0;
            }
         }
         else if (itemList[i].plane == "lower_plane"){
            point += Math.round((Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10)) * 1.25);
            pointSound_1.play();
         }
         else{
            point += Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10);
            pointSound_2.play();
         }
         if(point>=30 && hamUpdate_1 == false){
            myHam_1.visible = true;
            myHam_0.visible = false;
            hamUpdate_1 = true;
            tadaSound.play();
         }
         else if(point>=50 && hamUpdate_2 == false){
            myHam_2.visible = true;
            myHam_1.visible= false;
            hamUpdate_2 = true;
            tadaSound.play();
         }
         document.getElementById("point").innerHTML = "Point " + point;
         claw.base.remove(itemList[i].itemMesh);
         itemList.splice(i, 1);
      }
   }
}
