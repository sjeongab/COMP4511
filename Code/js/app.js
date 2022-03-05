let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init() {

 container = document.querySelector('#scene-container');

 // create a Scene
 scene = new THREE.Scene();

 // Set the background color
 scene.background = new THREE.Color('blue');

 createCamera();
 createControls();
 createLights();
 createMeshes();
 createRenderer();

 // start the animation loop
 renderer.setAnimationLoop(() => {

 update();
 render();

    });
}


function createCamera() {

 camera = new THREE.PerspectiveCamera(50,4/3,.5,1000);
 camera.position.set(10,10,10);
 //camera.lookAt(0, 0, 0);
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

function createMeshes() {

 const geometry = new THREE.ConeGeometry( 5, 5, 20, 1, true);
 const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });

 mesh = new THREE.Mesh(geometry, material);

 scene.add(mesh);
 mesh.rotation.x = 180;
 mesh.rotation.z = -100;

}

function createRenderer() {

 renderer = new THREE.WebGLRenderer({ antialias: true });
 renderer.setSize(container.clientWidth, container.clientHeight);

 renderer.setPixelRatio(window.devicePixelRatio);

 renderer.gammaFactor = 2.2;
 renderer.gammaOutput = true;

 renderer.physicallyCorrectLights = true;


container.appendChild(renderer.domElement);

}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

 // increase the mesh's rotation each frame
 //mesh.rotation.z += 0.01;
 //mesh.rotation.x = 180;
 //mesh.rotation.z = -100;
 //mesh.position.y -= 0.01;
 //mesh.rotation.y = 10;

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

window.addEventListener('resize', onWindowResize);

init();
