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
    pointText.style.left = 680 + 'px';
    pointText.style.color = 'black';
    pointText.style.fontWeight = 'bold';
    pointText.style.fontSize = '20px';
    pointText.style.fontFamily = 'Fantasy';
    document.body.appendChild(pointText);
}
function addPoint(event) {
    for (var i = 0; i < itemList.length; i++) {
       if (itemList[i].caught && claw.base.position.y >= 1.5) {
          if(itemList[i].type == "plus"){
             timeLimit += 10;
             timeUpSound.play();
          }
          else if(itemList[i].type=="gold"){
             gold += 1;
             timeUpSound.play();
             if(gold >= 7){
             point+=300;
             gold = 0;
             }
          }
          else if (itemList[i].plane == "lower_plane"){
             point += Math.round((Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10)) * 1.25);
             pointSound_1.play();
          }
          else{
             point += Math.round(2 / itemList[i].r) + Math.round(itemList[i].va * 10);
             pointSound_2.play();
          }
          if(point>=30 && hamUpdate_1 == false){
             ham_0.visible = false;
             ham_1.visible = true;
             hamUpdate_1 = true;
             tadaSound.play();
          }
          else if(point>=50 && hamUpdate_2 == false){
             ham_1.visible= false;
             ham_2.visible = true;
             hamUpdate_2 = true;
             tadaSound.play();
          }
          document.getElementById("point").innerHTML = "Point " + point;
          claw.base.remove(itemList[i].itemMesh);
          //itemList[i].disposeItem();
          var r = Math.random()/10 + 0.15;
          if (i<numItemUpper){
             itemList[i] = new Item(r,angleListUpper[i],"upper_plane");
          } else {
             itemList[i] = new Item(r,angleListLower[i-numItemUpper],"lower_plane");
          }
          itemList[i].createItem();
       }
    }
 }