class WarmHole{
    constructor(size=0.5) {
        const WarmHole_Geometry = new THREE.CircleGeometry(size, 32 );
        const WarmHole_Material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        this.mesh = new THREE.Mesh(WarmHole_Geometry, WarmHole_Material);
    }
}