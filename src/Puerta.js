import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Puerta extends THREE.Object3D {
  constructor(){
    super();

    // TEXTURA DE LA PUERTA
    var matBlanco= new THREE.MeshPhongMaterial({color: 0xffffff});

    var texturaPomo = new THREE.TextureLoader().load('./imgs/dorado.png');
    var materialPomo = new THREE.MeshPhongMaterial ({map: texturaPomo});


    // GEOMETRÍAS
    // Geometría de la puerta
    var puerta = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 6), matBlanco);
    var hueco1 = new THREE.Mesh(new THREE.BoxGeometry(80,80,2), matBlanco);
    var hueco2 = new THREE.Mesh(new THREE.BoxGeometry(80,60,2), matBlanco);

    puerta.position.set(50, 100, 0);
    hueco1.position.set(50, 140, 2);
    hueco2.position.set(50, 50, 2);

    var puertaCSG = new CSG();
    puertaCSG.subtract([puerta, hueco1]);
    puertaCSG.subtract([hueco2]);

    var puertaFinal = puertaCSG.toMesh();

    // Geometría del pomo
    var cilindro = new THREE.Mesh(new THREE.CylinderGeometry(2,2,8,30,30),materialPomo);
    var esfera = new THREE.Mesh(new THREE.SphereGeometry(4,100,100),materialPomo);
    esfera.position.y = 6;
    esfera.name = "Pomo";

    var pomo = new THREE.Object3D();
    pomo.add(cilindro);
    pomo.add(esfera);

    pomo.rotation.z = Math.PI/2;
    pomo.rotation.y = Math.PI/2;
    pomo.position.set(85,90,5);

    // Creamos una puerta que contenga ambos objetos
    this.puertaCompleta = new THREE.Object3D();
    this.puertaCompleta.add(puertaFinal);
    this.puertaCompleta.add(pomo);

    //Animacion de la puerta abriendose que dura 2 segundos
    var origen = {y: 0};
    var fin = {y: Math.PI/2};
    var tiempo = 2000;

    this.animacion1 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        this.puertaCompleta.rotation.y = origen.y;
      } )
      .onComplete(() => origen.y = 0);


    this.puertaCompleta.position.set(-50,0,-250);
    this.add(this.puertaCompleta);
  }

  // Función para abrir la puerta cuando se pueda
  abrirPuerta(){
   this.animacion1.start();
  }

  update () {
    TWEEN.update();
  }

}


export{Puerta};