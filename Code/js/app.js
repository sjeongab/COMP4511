let container;
let camera;
let renderer;
let scene;
var ySpeed = 0.1;
var time = 0;
var moveDown = false;
var moveUp = false;
var moveLeft = false;
var moveRight = false;
var moveFront = false;
var moveBack = false;
var downCalled = false;
var startRestore = false;
var degree_90 = Math.PI/2;
var target = -2;
var point;
var itemList = [];


function init() {
 
 
 container = document.querySelector('#scene-container');
 // create a Scene
 scene = new THREE.Scene();
 var clock = new THREE.Clock();
 clock.start();

 // Set the background color
 scene.background = new THREE.Color('white');

 createCamera();
 createLights();
 addObjects();
 keySetUp();
 createRenderer();

 //randomly create items
for (var i = 0 ;i<10;i++){
   var r = Math.random()/3+0.2;  //random radius
   var color = new THREE.Color(0xffff);  
   color.setHex(Math.random()*0xffffff);  //random color
   var p = Math.random();  // probability
   var va = Math.random()/15; //random angular velocity
   if (p<0.5){
      //item on upper plane
      itemList.push(new Item(r,color,5,-0.5+r,Math.random()*2*Math.PI,0,va));
   } else {
      //item on lower plane
      itemList.push(new Item(r,color,3,-2.5+r,Math.random()*2*Math.PI,0,va));
   }
}

for (var i = 0; i<itemList.length;i++){
   itemList[i].createItem();
}

 // start the animation loop
 renderer.setAnimationLoop(() => {
    if(clock.getElapsedTime() <= 60){
      update();
      render();
    }
});
}

function addObjects(){
   createPlanes();
   addClaw();
   addWarmHoles();
}

function keySetUp(){
   document.onkeydown = function(event){keyDownEvent(event)};
   document.onkeyup = function(event){keyUpEvent(event);}
}
function createCamera() {

 camera = new THREE.PerspectiveCamera(50,4/3,.5,1000);
 camera.position.set(0,3,10);
 camera.lookAt(0, 0, 0);
 scene.add(camera);

}

function createLights() {

 const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x552055, 5);
 scene.add(ambientLight);

}

function createPlanes() {
   upperPlane = new Plane(5, -0.5);
   lowerPlane = new Plane(3, -2.5);

   scene.add(upperPlane.mesh);
   scene.add(lowerPlane.mesh);
}

function addClaw() {
   claw = new Claw();
   scene.add(claw.mesh);
   scene.add(claw.target);
}

function addWarmHoles(){
   upperWarmHole = new WarmHole();
   upperWarmHole.mesh.position.set(1,0,-5.6);
   scene.add(upperWarmHole.mesh);
 
   lowerWarmHole = new WarmHole();
   lowerWarmHole.mesh.position.set(-1,-2.7,-5.6);
   scene.add(lowerWarmHole.mesh);

   endWarmHole = new WarmHole(2);
   endWarmHole.mesh.rotation.set(degree_90-1,0,0);
   endWarmHole.mesh.position.set(0,-3,0);
   scene.add(endWarmHole.mesh);
} 

function createRenderer() {
 renderer = new THREE.WebGLRenderer({ antialias: true });
 renderer.setSize(800, 600);
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.physicallyCorrectLights = true;
container.appendChild(renderer.domElement);

}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
   claw.move();
   claw.moveTarget();

   //testing item
   for (var i = 0;i<itemList.length;i++){
      itemList[i].updateItem();
      //itemList[i].drawItem();
   }
}
// render, or 'draw a still image', of the scene
function render() {
 renderer.render(scene, camera);
} 

function keyDownEvent(event){
   if(event.key == " " ){
      claw.down = true;
      claw.up = false;
   }
   if(event.key == "ArrowRight" ){
      claw.right = true;
   }
   if(event.key == "ArrowLeft" ){
      claw.left = true;
   }
   if(event.key == "ArrowDown" ){
      claw.front = true;
   }
   if(event.key == "ArrowUp" ){
      claw.back = true;
   }

}
function keyUpEvent(event){
   if(event.key == " "){
      claw.down = false;
      claw.up = true;
   }
   if(event.key == "ArrowRight" ){
      claw.right = false;
   }
   if(event.key == "ArrowLeft" ){
      claw.left = false;
   }
   if(event.key == "ArrowDown" ){
      claw.front = false;
   }
   if(event.key == "ArrowUp" ){
      claw.back = false;
   }
}

init();
