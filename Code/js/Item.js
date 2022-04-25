const TYPE = {
   low: 'low',
   mid: 'mid',
   high: 'high',
   gold: 'gold',
   plus: 'plus'
}
class Item {
    constructor(r,R,y,a,vy,va, plane){
       this.r = r;     // radius of the item
       this.R = R;     // radius of the circular path of item
       this.a = a;     // angle
       this.x = R*Math.cos(a);     // position X
       this.y = y;                 // position Y
       this.z = R*Math.sin(a);     // position Z
       this.vy = vy;   // downward velocity
       this.va = va;   // angular velocity
       this.caught = false;
       this.x = 0;
       this.plane = plane;
       this.texture = new THREE.Texture();
       this.setTexture(this.texture, r);         
       this.itemMesh = new THREE.Mesh(new THREE.SphereGeometry(this.r,64,32),new THREE.MeshBasicMaterial({map: this.texture}));
    }
 
    setTexture(texture, r){
      var image = new Image();
      if(r <= 0.12){
        image.src = plus;
        this.type = "plus";
      }
      else if(r<=0.135){
        image.src = feed_high;
        this.type = "high";
      }
     else if(r<0.16){
        image.src = feed_mid;
        this.type = "mid";
     }
     else if( r< 0.195){
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
 }