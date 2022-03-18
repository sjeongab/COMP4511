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


function init() {
 
 
 container = document.querySelector('#scene-container');
 // create a Scene
 scene = new THREE.Scene();


 // Set the background color
 scene.background = new THREE.Color('white');

 createCamera();
 createLights();
 createPlanes();
 createClaw();
 createRenderer();
 document.onkeydown = function(event){keyDownEvent(event)};
 document.onkeyup = function(event){keyUpEvent(event);}

 // start the animation loop
 renderer.setAnimationLoop(() => {
 update();
 render();
 

    });
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
   const upperPlane_Geometry = new THREE.TorusGeometry(5, 0.6, 2, 50);
   const upperPlane_Material = new THREE.MeshStandardMaterial({ color: 0xf4c2c2, opacity: 0.5, transparent: true});

   const lowerPlane_Geometry = new THREE.TorusGeometry(3, 0.6, 2, 50);
   const lowerPlane_Material = new THREE.MeshStandardMaterial({ color: 0xf4c2c2, opacity: 0.5, transparent: true});

   upperPlane_Mesh = new THREE.Mesh(upperPlane_Geometry, upperPlane_Material);
   upperPlane_Mesh.position.set(0,-0.5,0);
   upperPlane_Mesh.rotation.set(degree_90,0,0);
   lowerPlane_Mesh = new THREE.Mesh(lowerPlane_Geometry, lowerPlane_Material);
   
   lowerPlane_Mesh.rotation.set(degree_90,0,0);
   lowerPlane_Mesh.position.set(0,-2.5,0);
   scene.add(upperPlane_Mesh);
   scene.add(lowerPlane_Mesh);
}

function createClaw() {
   const clawBase = new THREE.BoxGeometry(0.9,0.15,0.2);
   const clawBase_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
   const clawLeftBase = new THREE.BoxGeometry(0.5,0.1,0.2);
   const clawLeftBase_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
   const clawLeft = new THREE.BoxGeometry(0.5,0.1,0.2);
   const clawLeft_Material = new THREE.MeshStandardMaterial({ color: 0x00ffff});
   const clawRightBase = new THREE.BoxGeometry(0.5,0.1,0.2);
   const clawRightBase_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
   const clawRight = new THREE.BoxGeometry(0.5,0.1,0.2);
   const clawRight_Material = new THREE.MeshStandardMaterial({ color: 0x00ffff});
   const clawTarget = new THREE.CircleGeometry( 0.1, 32 );
   const clawTarget_Material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
   


  
   claw_Mesh = new THREE.Mesh(clawBase, clawBase_Material);
   claw_Mesh.position.set(0,2,0);
   clawTarget_Mesh = new THREE.Mesh( clawTarget, clawTarget_Material);
   clawTarget_Mesh.position.set(claw_Mesh.position.x,target,claw_Mesh.position.z);
   clawTarget_Mesh.rotation.set(-degree_90,0,0);
   clawLeftBase_Mesh = new THREE.Mesh(clawLeftBase, clawLeftBase_Material);
   clawLeftBase_Mesh.rotation.set(0,0,1);
   clawLeftBase_Mesh.position.set(-0.4,-0.1,0);
   clawLeft_Mesh = new THREE.Mesh(clawLeft, clawLeft_Material);
   clawLeft_Mesh.rotation.set(0,0,1.5);
   clawLeft_Mesh.position.set(-0.3,-0.2,0);
   clawRightBase_Mesh = new THREE.Mesh(clawRightBase, clawRightBase_Material);
   clawRightBase_Mesh.rotation.set(0,0,-1);
   clawRightBase_Mesh.position.set(0.4,-0.1,0);
   clawRight_Mesh = new THREE.Mesh(clawRight, clawRight_Material);
   clawRight_Mesh.rotation.set(0,0,-1.5);
   clawRight_Mesh.position.set(0.3,-0.2,0);
   
   scene.add(claw_Mesh);
   scene.add(clawTarget_Mesh);
   claw_Mesh.add(clawLeftBase_Mesh);
   claw_Mesh.add(clawRightBase_Mesh);
   clawLeftBase_Mesh.add(clawLeft_Mesh);
   clawRightBase_Mesh.add(clawRight_Mesh);
  }

function createRenderer() {

 renderer = new THREE.WebGLRenderer({ antialias: true });
 //renderer.setSize(container.clientWidth, container.clientHeight);
 renderer.setSize(800, 600);
 renderer.setPixelRatio(window.devicePixelRatio);

 renderer.physicallyCorrectLights = true;


container.appendChild(renderer.domElement);

}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
   if (moveUp == true){
      clawUp();
   }
   else if (moveDown == true){
      clawDown();
   }
   else if (moveRight == true){
      clawRight();
   }
   else if (moveLeft == true){
      clawLeft();
   }
   else if (moveFront == true){
      clawFront();
   }
   else if (moveBack == true){
      clawBack();
   }
   var pos = (claw_Mesh.position.x)**2+(claw_Mesh.position.z)**2;
   if((claw_Mesh.position.x)**2+(claw_Mesh.position.z)**2<=2){
      clawTarget_Mesh.position.set(claw_Mesh.position.x,-4,claw_Mesh.position.z);
   }
   else{
      clawTarget_Mesh.position.set(claw_Mesh.position.x,-2.5,claw_Mesh.position.z);
   }

}
// render, or 'draw a still image', of the scene
function render() {
 renderer.render(scene, camera);
}

function clawDown(){
   if(claw_Mesh.position.y>=-7){
      claw_Mesh.translateY(-0.1);
      if(clawRightBase_Mesh.position.x <= 0.55){
         clawRightBase_Mesh.translateX(0.003);
         clawRightBase_Mesh.translateY(0.003);
         clawRightBase_Mesh.rotateZ(0.01); 
         clawRight_Mesh.rotateZ(0.005); 
         clawLeftBase_Mesh.translateX(-0.003);
         clawLeftBase_Mesh.translateY(0.003);
         clawLeftBase_Mesh.rotateZ(-0.01); 
         clawLeft_Mesh.rotateZ(-0.005);
      } 
   }
   else{
      moveDown = false;
      moveUp = true;
   }
}

function clawUp(){
   if(clawRightBase_Mesh.position.x >= 0.4){
      clawRightBase_Mesh.translateX(-0.012);
      clawRightBase_Mesh.translateY(-0.012);
      clawRightBase_Mesh.rotateZ(-0.04); 
      clawRight_Mesh.rotateZ(-0.02); 
      clawLeftBase_Mesh.translateX(0.012);
      clawLeftBase_Mesh.translateY(-0.012);
      clawLeftBase_Mesh.rotateZ(0.04); 
      clawLeft_Mesh.rotateZ(0.02);
   }
   if(claw_Mesh.position.y < 2.0){
      claw_Mesh.translateY(0.05);
   }
   else{
      moveUp = false;
   }

}

function clawRight(){
   if(claw_Mesh.position.x<5.6){
      claw_Mesh.translateX(0.05);
   }
   else{
      moveRight = false;
   }

}

function clawLeft(){
   if(claw_Mesh.position.x>-5.6){
      claw_Mesh.translateX(-0.05);
   }
   else{
      moveLeft= false;
   }

}

function clawFront(){
   if(claw_Mesh.position.z<5.6){
      claw_Mesh.translateZ(0.05);
   }
   else{
      moveFront = false;
   }
}

function clawBack(){
   if(claw_Mesh.position.z>-5.6){
      claw_Mesh.translateZ(-0.05);
   }
   else{
      moveBack = false;
   }
}



function keyDownEvent(event){
   if(event.key == " " ){
      moveDown = true;
      moveUp = false;
   }
   if(event.key == "ArrowRight" ){
      moveRight = true;
   }
   if(event.key == "ArrowLeft" ){
      moveLeft = true;
   }
   if(event.key == "ArrowDown" ){
      moveFront = true;
   }
   if(event.key == "ArrowUp" ){
      moveBack = true;
   }

}
function keyUpEvent(event){
   if(event.key == " "){
      moveDown = false;
      moveUp = true;
   }
   if(event.key == "ArrowRight" ){
      moveRight = false;
   }
   if(event.key == "ArrowLeft" ){
      moveLeft = false;
   }
   if(event.key == "ArrowDown" ){
      moveFront = false;
   }
   if(event.key == "ArrowUp" ){
      moveBack = false;
   }

}


/*function onWindowResize() {

   console.log('You resized the browser window!');
   // set the aspect ratio to match the new browser window aspect ratio
   camera.aspect = container.clientWidth / container.clientHeight;
  
   // update the camera's frustum
   camera.updateProjectionMatrix();
  
   renderer.setSize(container.clientWidth, container.clientHeight);
  }

window.addEventListener('resize', onWindowResize);*/

init();
