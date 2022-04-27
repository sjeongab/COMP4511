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
var timeLimit = 10;
let sound;
var gameStart = false;

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
var ham_0;
var ham_1;
var ham_2;

function onLoad(){
   ham_0 = loadObj('r0-3/r0-1.mtl', 'r0-3/r0-1.obj');
   ham_1 = loadObj('r0-3/r0-2.mtl', 'r0-3/r0-2.obj');
   ham_2 = loadObj('r0-3/r0-3.mtl', 'r0-3/r0-3.obj');
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
function start(){
   buttons = document.getElementById('start');
   gameStart = true;
   buttons.style.visibility = 'hidden';
   buttons.disabled = 'true';
   
   init();
}
function init() {
    
   createCanvas();
   let coin;
   coin = new Sound('../Code/sounds/point.wav', camera, 10);
  
   addObjects();
   addItems(20);
   keySetUp();
   displayPoint();
   displayTime();
   
   ham_0.then(myObj=>{
      myObj.position.set(0,1,-1);
      scene.add(myObj);
   });
   
   // start the animation loop
   renderer.setAnimationLoop(() => {
      if (timeLimit - clock.getElapsedTime() >= 0) {
         update();
         render();
         
      }
      else{
         //coin.play();
         clock.stop();
         point = 0;
         //alerttest();
         //clock.start();
      }
   });
   
}

function createCanvas(){
   container = document.querySelector('#scene-container');
   scene = new THREE.Scene();
   scene.background = new THREE.Color('orange');

   camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .5, 1000);
   camera.position.set(0, 3, 10);
   camera.lookAt(0, 0, 0);
   scene.add(camera);

   const ambientLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 5);
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
      if (currDistance <= itemList[i].r * 1.5) {

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
            timeLimit += 20;
         }
         else if (itemList[i].plane == "lower_plane")
            point += Math.round((Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10)) * 1.25);
         else
            point += Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10);
         document.getElementById("point").innerHTML = "Point " + point;
         claw.base.remove(itemList[i].itemMesh);
         itemList.splice(i, 1);
      }
   }
}
