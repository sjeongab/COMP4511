var point = 0;
var pointText;
function displayPoint() {
   pointText = document.createElement('div');
   pointText.id = "point";
   pointText.style.position = 'absolute';
   pointText.style.width = 100;
   pointText.style.height = 100;
   pointText.innerHTML = "Point: " + point;
   pointText.style.top = 50 + 'px';
   pointText.style.align = "center";
   pointText.style.color = 'black';
   pointText.style.fontWeight = 'bold';
   pointText.style.fontSize = '20px';
   pointText.style.fontFamily = 'Fantasy';
   document.body.appendChild(pointText);
}
function addPoint(event) {
   for (var i = 0; i < itemList.length; i++) {
      if (itemList[i] !== null) {
         if (itemList[i].caught && claw.base.position.y >= 1.5) {
            if (itemList[i].type == "plus") {
               timeLimit += addTime;
               timeUpSound.play();
            }
            else if (itemList[i].type == "gold") {
               goldCount += 1;
               timeUpSound.play();
               if (goldCount >= goldMax) {
                  point += goldScore;
                  goldCount = 0;
               }
               updateGold();
            }
            else if (itemList[i].plane == "lower_plane") {
               point += Math.round((Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10)) * 1.25);
               pointSound_1.play();
            }
            else {
               point += Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10);
               pointSound_2.play();
            }
            if (point >= 100 && hamUpdate_1 == false) {
               ham_0.visible = false;
               ham_1.visible = true;
               hamUpdate_1 = true;
               tadaSound.play();
            }
            else if (point >= 200 && hamUpdate_2 == false) {
               ham_1.visible = false;
               ham_2.visible = true;
               hamUpdate_2 = true;
               tadaSound.play();
            }
            //document.getElementById("point").innerHTML = "Point: " + point;
            claw.base.remove(itemList[i].itemMesh);
            itemList[i].disposeItem();
            itemList[i] = null;
            emptyList[i] = 1;
            // var r = Math.random() / 10 + 0.15;
            // if (i < numItemUpper) {
            //    itemList[i] = new Item(r, angleListUpper[i], "upper_plane");
            // } else {
            //    itemList[i] = new Item(r, angleListLower[i - numItemUpper], "lower_plane");
            // }
            // itemList[i].createItem();
            
            // create new item
            // get total number of empty slots
            var numEmpty = 0;
            console.log(emptyList);
            for (var j = 0;j<emptyList.length;j++){
               numEmpty += emptyList[j];
            }
            console.log(numEmpty);
            //add item
            var p = Math.random();
            if (numEmpty > maxEmpty){
               p = 1;
            }
            if (p>emptyProb){
               // determine which empty slot to add item
               var newItemSlotRel = Math.trunc(Math.random()*numEmpty)+1;
               console.log(newItemSlotRel);
               var newItemSlotAbs = -1;
               for (var k = 0;k<emptyList.length;k++){
                  newItemSlotRel -= emptyList[k];
                  if (newItemSlotRel == 0){
                     newItemSlotAbs = k;
                     break;
                  }
               }
               // add item
               addItem(newItemSlotAbs);
            }
            if (numEmpty > maxEmpty){
               for (var k = 0;k<emptyList.length;k++){
                  if (emptyList[k] == 1){
                     var pr = Math.random();
                     if (pr > emptyProb){
                        addItem(k);
                     }
                  }
               }
            }
         }
      }
   }
   updatePoint();
}

function updatePoint() {
   document.getElementById("point").innerHTML = "Point: " + point;
}