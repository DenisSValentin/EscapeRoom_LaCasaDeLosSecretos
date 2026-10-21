import * as THREE from '../libs/three.module.js'

class Cuadros extends THREE.Object3D {
  constructor() {
    super();

    // TEXTURAS DE LOS CUADROS
    var texture1 = new THREE.TextureLoader().load('./imgs/ElGrito.png');
    var materialCuadroGrito = new THREE.MeshPhongMaterial ({map: texture1});
    
    var texture2 = new THREE.TextureLoader().load('./imgs/cuadro.jpg');
    var materialCuadroNumeros = new THREE.MeshPhongMaterial ({map: texture2});
    

    // GEOMETRÍA DE LOS CUADROS
    var cuadroGeom = new THREE.BoxGeometry(80, 130, 3);
    
    // Cuadro 1
    var cuadro1 = new THREE.Mesh (cuadroGeom, materialCuadroGrito);
    cuadro1.position.set(0, 145, 247);

    // Cuadro 2
    var cuadro2 = new THREE.Mesh (cuadroGeom, materialCuadroNumeros);
    cuadro2.position.set(-135, 145, 247);   

    // Cuadro 3
    var cuadro3 = new THREE.Mesh (cuadroGeom, materialCuadroNumeros);
    cuadro3.position.set(135, 145, 247);


    // AÑADIMOS AL OBJETO
    this.add(cuadro1);
    this.add(cuadro2);
    this.add(cuadro3);
  }
}

export { Cuadros }