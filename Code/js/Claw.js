class Claw {
    constructor(props) {
        this.createClaw();
        this.createTarget();
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.front = false;
        this.back = false;
        this.plane = "none";
    }
    createClaw(){
        const base_Geometry = new THREE.BoxGeometry(0.9,0.15,0.2);
        const base_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
        const leftBase_Geometry = new THREE.BoxGeometry(0.5,0.1,0.2);
        const leftBase_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
        const left_Geometry = new THREE.BoxGeometry(0.5,0.1,0.2);
        const left_Material = new THREE.MeshStandardMaterial({ color: 0x00ffff});
        const rightBase_Geometry = new THREE.BoxGeometry(0.5,0.1,0.2);
        const rightBase_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
        const right_Geometry = new THREE.BoxGeometry(0.5,0.1,0.2);
        const right_Material = new THREE.MeshStandardMaterial({ color: 0x00ffff});

        this.base = new THREE.Mesh(base_Geometry, base_Material);
        this.base.position.set(0,2,0);
        this.leftBase = new THREE.Mesh(leftBase_Geometry, leftBase_Material);
        this.leftBase.rotation.set(0,0,1);
        this.leftBase.position.set(-0.4,-0.1,0);
        this.leftTip = new THREE.Mesh(left_Geometry, left_Material);
        this.leftTip.rotation.set(0,0,1.5);
        this.leftTip.position.set(-0.3,-0.2,0);
        this.rightBase = new THREE.Mesh(rightBase_Geometry, rightBase_Material);
        this.rightBase.rotation.set(0,0,-1);
        this.rightBase.position.set(0.4,-0.1,0);
        this.rightTip = new THREE.Mesh(right_Geometry, right_Material);
        this.rightTip.rotation.set(0,0,-1.5);
        this.rightTip.position.set(0.3,-0.2,0);

        this.base.add(this.leftBase);
        this.base.add(this.rightBase);
        this.leftBase.add(this.leftTip);
        this.rightBase.add(this.rightTip);
        this.mesh = this.base;
    }

    createTarget(){
        const target_Geometry = new THREE.CircleGeometry(0.08, 32 );
        const target_Material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

        this.target = new THREE.Mesh(target_Geometry, target_Material);
        
        this.target.rotation.set(-Math.PI/2,0,0);
        this.target.position.set(this.base.position.x,-2,this.base.position.z);
    }

    move(){
        if (this.up == true){
            this.moveUp();
         }
         else if (this.down == true){
            this.moveDown();
         }
         else if (this.right == true){
            this.moveRight();
         }
         else if (this.left == true){
            this.moveLeft();
         }
         else if (this.front == true){
            this.moveFront();
         }
         else if (this.back == true){
            this.moveBack();
         }
    }

    moveTarget(upperX,upperZ,lowerX,lowerZ){
      var distUpper = ((this.base.position.x-upperX)**2+(this.base.position.z-upperZ)**2)**(0.5);
      var distLower = ((this.base.position.x-lowerX)**2+(this.base.position.z-lowerZ)**2)**(0.5);
      if(distUpper>=4.4 && distUpper<=5.6){ 
         // upper plane
         this.plane = "upper";
         //console.log(this.plane);
         this.target.material.color.setHex( 0xff0000 );
         this.target.position.set(this.base.position.x, -0.5, this.base.position.z);
         this.target.visible = true;
      } else if (distLower>=2.4 && distLower<=3.6) {
         // lower plane
         this.plane = "lower";
         this.target.material.color.setHex( 0x0000ff );
         this.target.position.set(this.base.position.x,-2.5, this.base.position.z);
         this.target.visible = true;
      } else {
         // no plane
         this.plane = "none";
         this.target.visible = false;
   }
    }

    moveUp(){
        if(this.rightBase.position.x >= 0.4){
            this.rightBase.translateX(-0.012);
            this.rightBase.translateY(-0.012);
            this.rightBase.rotateZ(-0.04); 
            this.rightTip.rotateZ(-0.02); 
            this.leftBase.translateX(0.012);
            this.leftBase.translateY(-0.012);
            this.leftBase.rotateZ(0.04); 
            this.leftTip.rotateZ(0.02);
         }
         if(this.base.position.y < 2.0){
            this.base.translateY(0.15);
         }
         else{
            this.up = false;
         }
    }

    moveDown(){
        if(this.base.position.y>=-3){
         //console.log(claw.mesh.position.y);
            this.base.translateY(-0.15);
            if(this.rightBase.position.x <= 0.55){
                this.rightBase.translateX(0.003);
                this.rightBase.translateY(0.003);
                this.rightBase.rotateZ(0.01); 
                this.rightTip.rotateZ(0.005); 
                this.leftBase.translateX(-0.003);
                this.leftBase.translateY(0.003);
                this.leftBase.rotateZ(-0.01); 
                this.leftTip.rotateZ(-0.005);
            } 
         }
         else{
            this.down = false;
            this.up = true;
         }

    }

    moveRight(){
        if(this.base.position.x < 5.6){
            this.base.translateX(0.1);
         }
         else{
            this.right = false;
         }
    }

    moveLeft(){
        if(this.base.position.x > -5.6){
            this.base.translateX(-0.1);
         }
         else{
            this.left = false;
         }
    }

    moveFront(){
        if(this.base.position.z < 5.6){
            this.base.translateZ(0.1);
         }
         else{
            this.front = false;
         }
    }
    
    moveBack(){
        if(this.base.position.z > -5.6){
            this.base.translateZ(-0.1);
         }
         else{
            this.back = false;
         }
    }

}