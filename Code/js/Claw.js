//import THREE from "vendor/three/three.js"

class Claw {
    constructor(props) {
        createClaw();
        createTarget();
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.front = false;
        this.back = false;
    }
    createClaw(){
        const base_Geometry = new THREE.BoxGeometry(0.9,0.15,0.2);
        const base_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
        const leftBase_Geometry = new THREE.BoxGeometry(0.5,0.1,0.2);
        const leftBase_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
        const left_Geometry = new THREE.BoxGeometry(0.5,0.1,0.2);
        const left_Material = new THREE.MeshStandardMaterial({ color: 0x00ffff});
        const rightBase_Geomtery = new THREE.BoxGeometry(0.5,0.1,0.2);
        const rightBase_Material = new THREE.MeshStandardMaterial({ color: 0x000000});
        const right_Geometry = new THREE.BoxGeometry(0.5,0.1,0.2);
        const right_Material = new THREE.MeshStandardMaterial({ color: 0x00ffff});

        this.base = new THREE.Mesh(base_Geomtery, base_Material);
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
    }

    createTarget(){
        const target_Geometry = new THREE.CircleGeometry(0.1, 32 );
        const target_Material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

        this.target = new THREE.Mesh(target_Geometry, target_Material);
        this.target.position.set(this.base.position.x,-2,this.base.position.z);
        this.target.rotation.set(-Math.PI/2,0,0);
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
            this.base.translateY(0.05);
         }
         else{
            this.up = false;
         }
    }
    moveDown(){
        if(this.base.position.y>=-7){
            this.base.translateY(-0.1);
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
            this.base.translateX(0.05);
         }
         else{
            this.right = false;
         }
    }
    moveLeft(){
        if(this.base.position.x > -5.6){
            this.base.translateX(-0.05);
         }
         else{
            this.left = false;
         }
    }
    moveFront(){
        if(this.base.position.z < 5.6){
            this.base.translateZ(0.05);
         }
         else{
            this.front = false;
         }
    }
    moveBack(){
        if(this.base.position.z > -5.6){
            this.base.translateZ(-0.05);
         }
         else{
            this.back = false;
         }
    }
}