import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Pendrive extends THREE.Object3D {
  constructor() {
    super();
    
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('./models/PenDrive/PenDrive.mtl',
    (materials) => {
      objectLoader.setMaterials(materials);
      objectLoader.load('./models/PenDrive/PenDrive.obj',
          (object) => {
            object.name = "Pendrive";
            this.add(object);
          }, null, null);
    });
  }
}

export { Pendrive }