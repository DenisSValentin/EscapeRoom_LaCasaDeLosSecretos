import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Calavera extends THREE.Object3D {
  constructor() {
    super();
    
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('./models/Skull_v3_L2.123c1407fc1e-ea5c-4cb9-9072-d28b8aba4c36/12140_Skull_v3_L2.mtl',
    (materials) => {
      objectLoader.setMaterials(materials);
      objectLoader.load('./models/Skull_v3_L2.123c1407fc1e-ea5c-4cb9-9072-d28b8aba4c36/12140_Skull_v3_L2.obj',
          (object) => {
            this.add(object);
          }, null, null);
    });
  }
}

export { Calavera }