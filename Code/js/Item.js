var angleListUpper = new Array(numItemUpper);
var angleListLower = new Array(numItemLower);
var itemList = new Array(numItemLower + numItemUpper);
var emptyList = new Array(numItemLower+numItemUpper);
var goldCount = 0;
var goldMaxString = goldMax.toString();
var goldText;

class Item {
   constructor(r, a, plane) {
      this.r = r;     // radius of the item
      this.a = a;     // angle
      this.plane = plane;
      if (plane == 'upper_plane') {
         this.R = 5;
         this.x = upperX + this.R * Math.cos(a);
         this.y = upperY + r;
         this.z = upperZ + this.R * Math.sin(a);
         this.va = vaUpper;
      } else if (plane == 'lower_plane') {
         this.R = 3;
         this.x = lowerX + this.R * Math.cos(a);
         this.y = lowerY + r;
         this.z = lowerZ + this.R * Math.sin(a);
         this.va = vaLower;
      }
      this.caught = false;
      this.plane = plane;
      this.texture = new THREE.Texture();
      this.setTexture(this.texture, r);
      this.geometry = new THREE.SphereGeometry(this.r, 64, 32);
      this.material = new THREE.MeshBasicMaterial({ map: this.texture });
      this.itemMesh = new THREE.Mesh(this.geometry, this.material);
   }


   setTexture(texture, r) {
      var image = new Image();
      if (r <= 0.17) {
         image.src = plus;
         this.type = "plus";
      }
      else if (r <= 0.185) {
         image.src = feed_high;
         this.type = "high";
      }
      else if (r < 0.21) {
         image.src = feed_mid;
         this.type = "mid";
      }
      else if (r < 0.245) {
         image.src = feed_low;
         this.type = "low";
      }
      else {
         image.src = feed_gold;
         this.type = "gold";
      }
      texture.image = image;
      image.onload = function () {
         texture.needsUpdate = true;
      };
      texture.repeat.set(2, 2);
   }

   updateItem(planeX, planeZ) {

      var orix = this.x;   // original x
      var oriz = this.z;   // original z
      this.a = this.a + this.va;   //new angle
      this.a = this.a % (2 * Math.PI);  // modulo
      this.x = this.R * Math.cos(this.a);   //new x
      this.z = this.R * Math.sin(this.a);   //new z
      var dx = this.x - orix;   //difference in x
      var dz = this.z - oriz;   //difference in z
      this.itemMesh.position.set(planeX + this.x, this.y, planeZ + this.z);
      this.itemMesh.rotation.set(this.x, this.x, this.x);
   }

   createItem() {
      this.itemMesh.position.set(this.x, this.y, this.z);
      scene.add(this.itemMesh);
   }

   isCaught(clawBase) {
      this.caught = true;
      this.itemMesh.position.set(0, -0.5, 0);
      clawBase.add(this.itemMesh);
   }

   isReleased() {
      this.caught = false;
   }
   disposeItem() {
      scene.remove(this.itemMesh);
      this.texture.dispose();
      this.geometry.dispose();
      this.material.dispose();
   }
}

function addItem(i){
   var r = Math.random()/10 + 0.15;
   emptyList[i] = 0;
   if (i<numItemUpper){
      itemList[i] = new Item(r,angleListUpper[i],"upper_plane");
   } else {
      itemList[i] = new Item(r,angleListLower[i-numItemUpper],"lower_plane");
   }
   itemList[i].createItem();
}

function addInitialItems(num_items) {
   for (var i = 0; i < numItemUpper; i++) {
      angleListUpper[i] = 2 * Math.PI / numItemUpper * i;
   }
   for (var i = 0; i < numItemLower; i++) {
      angleListLower[i] = 2 * Math.PI / numItemLower * i;
   }
   for (var i =0;i<emptyList.length;i++){
      emptyList[i] = 1;
   }
   addItem(0); // guarantee at least one item is on the plane
   for (var i = 1; i< itemList.length;i++){
      var p = Math.random();
      if (p>emptyProb){
         addItem(i);
      } else {
         itemList[i] = null;
      }
   }
}

function updateItems() {
   var currDistance;
   for (var i = 0; i < itemList.length; i++) {
      if (itemList[i] !== null) {
         currDistance = ((claw.mesh.position.x - itemList[i].x) ** 2 + (claw.base.position.y - itemList[i].y) ** 2 + (claw.mesh.position.z - itemList[i].z) ** 2) ** (1 / 2);
         if (currDistance <= itemList[i].r * catchRange) {
            itemList[i].isCaught(claw.base);
            claw.down = false;
            claw.up = true;
            emptyList[i] = 1;
            break;
         }
      }
   }
   for (var i = 0; i < itemList.length; i++) {
      if (itemList[i] !== null) {
         if (itemList[i].caught == false) {
            if (itemList[i].plane == "upper_plane") {
               itemList[i].updateItem(upperX, upperZ);
            } else {
               itemList[i].updateItem(lowerX, lowerZ);
            }
         }
      }
   }
   for (var i = 0; i < angleListUpper.length; i++) {
      angleListUpper[i] += vaUpper;
   }
   for (var i = 0; i < angleListLower.length; i++) {
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
   goldText.innerHTML = "Gold: 0/" + goldMaxString;
   document.body.appendChild(goldText);
}

function updateGold() {
   document.getElementById("gold").innerHTML = "Gold: " + goldCount + "/" + goldMaxString;
}