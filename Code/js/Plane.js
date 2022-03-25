class Plane{
    constructor(radius, ypos) {
        const plane_Geometry = new THREE.TorusGeometry(radius, 0.6, 2, 50);
        const plane_Material = new THREE.MeshStandardMaterial({ color: 0xf4c2c2, opacity: 0.5, transparent: true});
        const plane_Mesh = new THREE.Mesh(plane_Geometry, plane_Material);
        plane_Mesh.position.set(0,ypos,0);
        plane_Mesh.rotation.set(Math.PI/2,0,0);
        this.mesh = plane_Mesh;
    }
}