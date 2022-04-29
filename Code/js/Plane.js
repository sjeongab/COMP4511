var MODE;

var upperPlane;
var lowerPlane;

var angleListUpper = [];
var angleListLower = [];

var upperX = 0;
var upperY = -1;
var upperZ = 0;
var lowerX = 0;
var lowerY = -2.5;
var lowerZ = 0;
var upperDirX = 1;
var lowerDirX = 1;
var upperVelX = 0.02;
var lowerVelX = 0.012;
var upperPlane;
var lowerPlane;

var upperR = 0.7;
var lowerR = 0.5;
var upperA = 0;
var lowerA = 0;

class Plane{
    constructor(radius, ypos) {
        const plane_Geometry = new THREE.TorusGeometry(radius, 0.6, 2, 50);
        const plane_Material = new THREE.MeshStandardMaterial({ color: 0x000000, opacity: 0.5, transparent: true});
        const plane_Mesh = new THREE.Mesh(plane_Geometry, plane_Material);
        plane_Mesh.position.set(0,ypos,0);
        plane_Mesh.rotation.set(Math.PI/2,0,0);
        this.mesh = plane_Mesh;
    }
}

function createPlanes() {
   upperPlane = new Plane(5, upperY);
   lowerPlane = new Plane(3, lowerY);

   scene.add(upperPlane.mesh);
   scene.add(lowerPlane.mesh);
}

function updatePlanes(){
    switch (MODE) {
       case 'EASY':
          return;
       case 'HARD':
          upperX = upperX + upperDirX * upperVelX;
          lowerX = lowerX + lowerDirX * lowerVelX;
          if ((upperDirX<0 && upperX<-1) || (upperDirX>0 && upperX>1)){
             upperDirX *= -1;
          }
          if ((lowerDirX<0 && lowerX<-0.5) || (lowerDirX>0 && lowerX>0.5)){
             lowerDirX *= -1;
          }
          upperPlane.mesh.position.set(upperX, upperY, upperZ);
          lowerPlane.mesh.position.set(lowerX, lowerY, lowerZ);
          return;
       case 'CRAZY':
          lowerA = (lowerA - 1 / 15) % (2 * Math.PI);
          upperA = (upperA + 1 / 15) % (2 * Math.PI);
          upperX = upperR * Math.cos(upperA);
          upperZ = upperR * Math.sin(upperA);
          lowerX = lowerR * Math.cos(lowerA);
          lowerZ = lowerR * Math.sin(lowerA);
          upperPlane.mesh.position.set(upperX, upperY, upperZ);
          lowerPlane.mesh.position.set(lowerX, lowerY, lowerZ);
          return;
    }
 }
