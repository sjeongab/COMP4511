let container;
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .5, 1000);;
let renderer;
let scene;

function createCanvas(){
    container = document.querySelector('#scene-container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color('orange');
 
    camera.position.set(0, 4, 12);
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

function render() {
    renderer.render(scene, camera);
 }