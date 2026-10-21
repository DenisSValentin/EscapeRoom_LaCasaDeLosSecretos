import * as THREE from '../libs/three.module.js'

class Alfombra extends THREE.Object3D {
  constructor() {
    super();

    // TEXTURAS
    // La textura de la parte inferior de la alfombra
    var texturaAlfombraInf = new THREE.TextureLoader().load('./imgs/alfombra2.png');
    var materialAlfombraInf = new THREE.MeshPhongMaterial ({map: texturaAlfombraInf});

    // La textura de la parte superior de la alfombra
    var texturaAlfombraSup = new THREE.TextureLoader().load('./imgs/alfombra1.png');
    var materialAlfombraSup = new THREE.MeshPhongMaterial ({map: texturaAlfombraSup});


    // GEOMETRÍAS
    // La parte inferior
    var alfombraExteriorGeom = new THREE.CylinderGeometry(125, 125, 2.5, 100, true);

    var alfombraExterior = new THREE.Mesh(alfombraExteriorGeom, materialAlfombraInf);
    alfombraExterior.position.y = 1.25;
    alfombraExterior.scale.z = 1.5;
    alfombraExterior.receiveShadow = true;
    alfombraExterior.castShadow = true;

    this.add(alfombraExterior);

    // La parte superior
    var alformbraInteriorGeom = new THREE.CylinderGeometry(100, 100, 3, 100, true)

    var alfombraInterior = new THREE.Mesh(alformbraInteriorGeom, materialAlfombraSup);
    alfombraInterior.position.y = 1.5;
    alfombraInterior.scale.z = 1.5;
    alfombraInterior.castShadow = true;
    alfombraInterior.receiveShadow = true;

    this.add(alfombraInterior);
  }
}

export { Alfombra }