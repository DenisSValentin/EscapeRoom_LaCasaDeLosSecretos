import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'


class Pared extends THREE.Object3D {
  constructor() {
    super();
    
    // TEXTURA DE LAS PAREDES Y EL TECHO
    var texture = new THREE.TextureLoader().load('./imgs/pared.png');
    var materialPared = new THREE.MeshPhongMaterial ({map: texture});

    var matBlanco= new THREE.MeshPhongMaterial({color: 0xffffff});

    
    // GEOMETRÍA DE LAS PAREDES
    var paredGeom = new THREE.BoxGeometry(500,250, 1);
        
    //Pared donde va la puerta
    var pared1 = new THREE.Mesh(paredGeom, materialPared);
    pared1.position.z = -250;
    pared1.position.y = 125;

    // Creamos la puerta
    var puerta = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 6), materialPared);
    puerta.position.set(0,100,-250);

    var csg = new CSG();
    csg.subtract([pared1,puerta]);
    var pared = csg.toMesh();
    
    // Pared a la izquierda de la puerta
    var pared2 = new THREE.Mesh (paredGeom, materialPared);
    pared2.rotation.y = Math.PI/2;
    pared2.position.x = -250;
    pared2.position.y = 125;

    // Pared enfrente de la puerta
    var pared3 = new THREE.Mesh (paredGeom, materialPared);
    pared3.position.z = 250;
    pared3.position.y = 125;

    // Pared a la derecha de la puerta
    var pared4 = new THREE.Mesh (paredGeom, materialPared);
    pared4.rotation.y = Math.PI/2;
    pared4.position.x = 250;
    pared4.position.y = 125;
    
    // El techo
    var techoGeom = new THREE.BoxGeometry (500,0.2,500);
    var techo = new THREE.Mesh (techoGeom, matBlanco);
    techo.position.y = -0.1;
    techo.position.y += 250;

    // UNA VEZ ACABADO EL JUEGO, EL PASILLO DETRÁS DE LA PUERTA
    // Pared fuera de la sala
    var paredFuera = new THREE.Mesh(paredGeom, materialPared);
    paredFuera.position.z = -750;
    paredFuera.position.y = 125;

    // Pared lado derecho pasillo
    var paredDer = new THREE.Mesh(paredGeom, materialPared);
    paredDer.rotation.y = Math.PI/2;
    paredDer.position.set(50, 125, -500);

    // Pared lado izquiero pasillo
    var paredIzq = new THREE.Mesh(paredGeom, materialPared);
    paredIzq.rotation.y = Math.PI/2;
    paredIzq.position.set(-50,125, -500);

    // Techo pasillo
    var techoGeom = new THREE.BoxGeometry (500,0.2,500);
    var techoP = new THREE.Mesh (techoGeom, matBlanco);
    techoP.position.y = -0.1;
    techoP.position.y += 250;
    techoP.position.z = -500;


    // AÑADIMOS AL OBJETO
    this.add(pared);
    this.add(pared2);
    this.add(pared3);
    this.add(pared4);
    this.add(techo);
    this.add(paredFuera);
    this.add(paredIzq);
    this.add(paredDer);
    this.add(techoP);
  }
}

export { Pared }