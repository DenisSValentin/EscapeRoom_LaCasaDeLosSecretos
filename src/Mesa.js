import * as THREE from '../libs/three.module.js'

class Mesa extends THREE.Object3D {
  constructor(){
    super();

    // TEXTURA DE LA MESA
    var matBlanco= new THREE.MeshPhongMaterial({color: 0xffffff});

    var textura = new THREE.TextureLoader().load('./imgs/mesa.png');
    var matTabla = new THREE.MeshPhongMaterial ({map: textura});
    

    // GEOMETRÍAS
    // Geometría de la tabla
    var tabla = new THREE.Mesh(new THREE.BoxGeometry(150,5,80), matTabla);
    tabla.position.y = 102.5;
    tabla.receiveShadow = true;
    tabla.castShadow = true;

    // Geometría de las patas
    var pataGeo = new THREE.CylinderGeometry(3,3,100,100,100);
    var pata1 = new THREE.Mesh(pataGeo, matBlanco);
    pata1.position.set(-50,50,30);
    pata1.receiveShadow = true;
    pata1.castShadow = true;
    var pata2 = pata1.clone();
    pata2.position.x += 100;
    var pata3 = pata1.clone();
    pata3.position.z -= 60;
    var pata4 = pata1.clone();
    pata4.position.x += 100;
    pata4.position.z -= 60;


    // AÑADIMOS AL OBJETO
    this.add(tabla);
    this.add(pata1);
    this.add(pata2);
    this.add(pata3);
    this.add(pata4);
  }
}


export{Mesa};