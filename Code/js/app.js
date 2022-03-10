let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;
var ySpeed = 0.1;
var time = 0;
var downCalled = false;
var startRestore = false;


function init() {
 
 
 container = document.querySelector('#scene-container');
 // create a Scene
 scene = new THREE.Scene();

 // Set the background color
 scene.background = new THREE.Color('blue');

 createCamera();
 createControls();
 createLights();
 createPlanes();
 //createPlane();
 createClaw();
 createRenderer();
 document.onkeydown = function(event){downCalled = true;}//keyDown();};
 //document.addEventListener("keydown", onDocumentKeyDown, false);

 // start the animation loop
 renderer.setAnimationLoop(() => {
 update();
 render();
 

    });
}


function createCamera() {

 camera = new THREE.PerspectiveCamera(50,4/3,.5,1000);
 camera.position.set(0,0,10);
 camera.lookAt(0, 0, 0);
 scene.add(camera);

}

function createControls() {

 controls = new THREE.OrbitControls( camera, container );

}

function createLights() {

 const ambientLight = new THREE.HemisphereLight(
 0xddeeff, 
 0x200020, 
 5, 
    );

 scene.add(ambientLight);

}

function createPlane() {

 const coneGeometry = new THREE.ConeGeometry( 5, 5, 20, 1, true);
 const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });


 planeMesh = new THREE.Mesh(coneGeometry, coneMaterial);

 scene.add(planeMesh);
 planeMesh.rotation.x = 180;
 planeMesh.rotation.z = -100;

}

function createPlanes() {
   const upperPlane_Geometry = new THREE.BoxGeometry(20, 0.5, 1);
   const upperPlane_Material = new THREE.MeshStandardMaterial({ color: 0xffffff});

   const lowerPlane_Geometry = new THREE.BoxGeometry(20, 0.5, 1);
   const lowerPlane_Material = new THREE.MeshStandardMaterial({ color: 0xffffff});

   upperPlane_Mesh = new THREE.Mesh(upperPlane_Geometry, upperPlane_Material);
   upperPlane_Mesh.position.set(0,-2,0);
   lowerPlane_Mesh = new THREE.Mesh(lowerPlane_Geometry, lowerPlane_Material);
   lowerPlane_Mesh.position.set(0,-4,0);
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
  
   claw_Mesh = new THREE.Mesh(clawBase, clawBase_Material);
   claw_Mesh.position.set(0,2,0);
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
   claw_Mesh.add(clawLeftBase_Mesh);
   claw_Mesh.add(clawRightBase_Mesh);
   clawLeftBase_Mesh.add(clawLeft_Mesh);
   clawRightBase_Mesh.add(clawRight_Mesh);
  }

function createRenderer() {

 renderer = new THREE.WebGLRenderer({ antialias: true });
 renderer.setSize(container.clientWidth, container.clientHeight);

 renderer.setPixelRatio(window.devicePixelRatio);

 renderer.physicallyCorrectLights = true;


container.appendChild(renderer.domElement);

}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
   if (downCalled == true){
      openClaw();
   }
   if (startRestore==true){
      restore();
   }

}
function dummy(){

}
// render, or 'draw a still image', of the scene
function render() {

 renderer.render(scene, camera);

}

function onWindowResize() {

 console.log('You resized the browser window!');
 // set the aspect ratio to match the new browser window aspect ratio
 camera.aspect = container.clientWidth / container.clientHeight;

 // update the camera's frustum
 camera.updateProjectionMatrix();

 renderer.setSize(container.clientWidth, container.clientHeight);
}
function restore(){
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
      startRestore = false;
   } 
}

function keyDown(event) {
      openClaw();
}

function sleep(delay) {
   var start = new Date().getTime();
   while (new Date().getTime() < start + delay);
}

function openClaw(){
   if(claw_Mesh.position.y>=-3){
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
      downCalled = false;
      startRestore = true;
   }
}
window.addEventListener('resize', onWindowResize);

init();
