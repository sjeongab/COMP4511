var ham_0;
var ham_1;
var ham_2;

var hamUpdate_1 = false;
var hamUpdate_2 = false;

function loadHamsters(){
    loadObj('Hamster/ham_0.mtl', 'Hamster/ham_0.obj').then(myObj=>{
        myObj.scale.set(0.5,0.5,0.5);
        myObj.position.set(0,3,-1);
        ham_0 = myObj;
     });
     loadObj('Hamster/ham_1.mtl', 'Hamster/ham_1.obj').then(myObj=>{
        myObj.scale.set(0.5,0.5,0.5);
        myObj.position.set(0,3,-1);
        ham_1 = myObj;
     });
     loadObj('Hamster/ham_2.mtl', 'Hamster/ham_2.obj').then(myObj=>{
        myObj.scale.set(0.5,0.5,0.5);
        myObj.position.set(0,3,-1);
        ham_2 = myObj;
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

 function addHamsters(){
   scene.add(ham_0);
   scene.add(ham_1);
   ham_1.visible = false;
   scene.add(ham_2);
   ham_2.visible = false;
}