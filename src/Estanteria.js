import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Estanteria extends THREE.Object3D {
  constructor() {
    super();
        
    // TEXTURA DE LA ESTANTERÍA
    var texturaEstanteria = new THREE.TextureLoader().load('./imgs/materialEstanteria.jpg');
    var materialEstanteria = new THREE.MeshPhongMaterial ({map: texturaEstanteria});
    

    // GEOMETRÍA DE LA ESTANTERÍA CON CSG
    var estanteriaBaseGeom = new THREE.BoxGeometry(200, 210, 20);
    var huecoGeom = new THREE.BoxGeometry(180, 40, 20);

    var estanteriaBase = new THREE.Mesh(estanteriaBaseGeom, materialEstanteria);
    estanteriaBase.position.y = 105;

    var hueco1 = new THREE.Mesh(huecoGeom, materialEstanteria);
    hueco1.position.y = 30;

    var hueco2 = new THREE.Mesh(huecoGeom, materialEstanteria);
    hueco2.position.y = 80;

    var hueco3 = new THREE.Mesh(huecoGeom, materialEstanteria);
    hueco3.position.y = 130;

    var hueco4 = new THREE.Mesh(huecoGeom, materialEstanteria);
    hueco4.position.y = 180;

    var huecosCSG = new CSG();
    huecosCSG.union([hueco1, hueco2, hueco3, hueco4]);

    var estanteriaCSG = new CSG();
    estanteriaCSG.subtract([estanteriaBase, huecosCSG.toMesh()]);

    this.estanteria = estanteriaCSG.toMesh();
    this.estanteria.rotation.y = Math.PI / 2;
    this.estanteria.position.x = 240;
    this.estanteria.castShadow = true;
    this.estanteria.receiveShadow = true;

    this.add(this.estanteria);
  }
}

export { Estanteria }