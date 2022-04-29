var itemList = [];
var goldCount = 0;
var goldText;

class Item {
   constructor(r,a,plane) {
      this.r = r;     // radius of the item
      this.a = a;     // angle
      if (plane == 'upper_plane') {
         this.R = 5;
         this.x = upperX + this.R * Math.cos(a);
         this.y = upperY+r;
         this.z = upperZ + this.R * Math.sin(a);
         this.va = vaUpper;
      } else if (plane == 'lower_plane') {
         this.R = 3;
         this.x = lowerX + this.R * Math.cos(a);
         this.y = lowerY+r;
         this.z = lowerZ + this.R * Math.sin(a);
         this.va = vaLower;
      }
      this.caught = false;
      this.plane = plane;
      this.texture = new THREE.Texture();
      this.setTexture(this.texture, r);
      this.geometry = new THREE.SphereGeometry(this.r, 64, 32);
      this.material = new THREE.MeshBasicMaterial({ map: this.texture });
      this.itemMesh = new THREE.Mesh(this.geometry,this.material);
   }

 
    setTexture(texture, r){
      var image = new Image();
      if(r <= 0.17){
        image.src = plus;
        this.type = "plus";
      }
      else if(r<=0.185){
        image.src = feed_high;
        this.type = "high";
      }
     else if(r<0.21){
        image.src = feed_mid;
        this.type = "mid";
     }
     else if( r< 0.245){
        image.src = feed_low;
        this.type = "low";
     }
     else{
        image.src = feed_gold;
        this.type = "gold";
     }
      texture.image = image;
      image.onload = function(){
         texture.needsUpdate = true;
      };
      texture.repeat.set(2,2);
    }

    updateItem(planeX,planeZ){
       
       var orix = this.x;   // original x
       var oriz = this.z;   // original z
       this.a = this.a+this.va;   //new angle
       this.a = this.a%(2*Math.PI);  // modulo
       this.x = this.R*Math.cos(this.a);   //new x
       this.z = this.R*Math.sin(this.a);   //new z
       var dx = this.x-orix;   //difference in x
       var dz = this.z-oriz;   //difference in z
       this.itemMesh.position.set(planeX+this.x,this.y,planeZ+this.z);
       this.itemMesh.rotation.set(this.x,this.x,this.x);
       this.x+=0.01;
       
    }
 
    createItem(){
       this.itemMesh.position.set(this.x,this.y,this.z);
       scene.add(this.itemMesh);
    }

    isCaught(clawBase){
        this.caught = true;
        this.itemMesh.position.set(0,-0.5,0);
        clawBase.add(this.itemMesh);
    }

    isReleased(){
        this.caught = false;
    }
    disposeItem(){
      this.texture.dispose();
      this.geometry.dispose();
      this.material.dispose();
   }
 }

 function addItems(num_items){
   for (var i = 0;i<numItemUpper;i++){
      angleListUpper.push(2*Math.PI/numItemUpper*i);
   }
   for (var i = 0;i<numItemLower;i++){
      angleListLower.push(2*Math.PI/numItemLower*i);
   }
   for (var i=0;i<numItemUpper;i++){
      var r = Math.random()/10 + 0.15;
      itemList.push(new Item(r,angleListUpper[i],"upper_plane"));
   }
   for (var i=0;i<numItemLower;i++){
      var r = Math.random()/10 + 0.15;
      itemList.push(new Item(r,angleListLower[i],"lower_plane"));
   }
   for (var i = 0; i<itemList.length;i++){
      itemList[i].createItem();
   }
}

function updateItems(){
   var currDistance;
   for (var i = 0; i < itemList.length; i++) {
      currDistance = ((claw.mesh.position.x - itemList[i].x) ** 2 + (claw.base.position.y - itemList[i].y) ** 2 + (claw.mesh.position.z - itemList[i].z) ** 2) ** (1 / 2);
      if (currDistance <= itemList[i].r * catchRange) {
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
   for (var i = 0;i<angleListUpper.length;i++){
      angleListUpper[i] += vaUpper;
   }
   for (var i = 0;i<angleListLower.length;i++){
      angleListLower[i] += vaLower;
   }
}

function displayGold() {
   goldText = document.createElement('div');
   goldText.id = "gold";
   goldText.style.position = 'absolute';
   goldText.style.width = 100;
   goldText.style.height = 100;
   goldText.style.top = 90 + 'px';
   goldText.style.textAlign = "center";
   goldText.style.color = 'black';
   goldText.style.fontWeight = 'bold';
   goldText.style.fontSize = '20px';
   goldText.style.fontFamily = 'Fantasy';
   goldText.innerHTML = "Gold: 0";
   document.body.appendChild(goldText);
}

function updateGold() {
   document.getElementById("gold").innerHTML = "Gold: " + goldCount;
}