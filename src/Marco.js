import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Marco extends THREE.Object3D {
  constructor() {
    super();
    
    // TEXTURA DE LOS MARCOS
    var texturaMarco = new THREE.TextureLoader().load('./imgs/materialEstanteria.jpg');
    var materialMarco = new THREE.MeshPhongMaterial ({map: texturaMarco});

    
    // GEOMETRÍA DE LOS MARCOS
    var marcoBaseGeom = new THREE.BoxGeometry(100, 150, 5);
    var huecoGeom = new THREE.BoxGeometry(80, 130, 4);

    var marcoBase = new THREE.Mesh(marcoBaseGeom, materialMarco);
    marcoBase.position.y = 145;

    var hueco = new THREE.Mesh(huecoGeom, materialMarco);
    hueco.position.y = 145;
    hueco.position.z = -2;

    var marcoCSG = new CSG();
    marcoCSG.subtract([marcoBase, hueco]);

    this.marco = marcoCSG.toMesh();
    this.marco.position.z = 247.5;

    this.add(this.marco);
  }
}

export { Marco }