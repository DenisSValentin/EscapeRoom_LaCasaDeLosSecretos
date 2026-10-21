import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { Calavera } from './Calavera.js';
import * as TWEEN from '../libs/tween.esm.js'


class Caja extends THREE.Object3D {
  constructor() {
    super();

    // TEXTURAS
    var textura = new THREE.TextureLoader().load('./imgs/dorado.png');
    var matDorado = new THREE.MeshPhongMaterial ({map: textura});


    // GEOMETRÍAS
    // La caja sin la tapa
    var cajaExt = new THREE.Mesh(new THREE.BoxGeometry(40,20,30), matDorado);
    var cajaInf = new THREE.Mesh(new THREE.BoxGeometry(36,20,26), matDorado);
    cajaInf.position.y = 10;

    var csg = new CSG();
    csg.subtract([cajaExt, cajaInf]);
    var caja = csg.toMesh();

    caja.position.set(0,-11,15);
    caja.receiveShadow = true;
    caja.castShadow = true;

    // La tapa de la caja
    var tapaGeo = new THREE.BoxGeometry(40,1,30);
    tapaGeo.translate(0,-1,15);
    var tapa = new THREE.Mesh(tapaGeo, matDorado);
    tapa.receiveShadow = true;
    tapa.castShadow = true;

    // Calavera que gira constantemente
    this.calavera = new Calavera();
    this.calavera.scale.set(0.5,0.5,0.5);
    this.calavera.position.set(0,-0.5,15);
    this.calavera.rotation.x = -Math.PI/2;

    // Juntamos la tapa y la calavera en un solo objeto
    this.tapaEntera = new THREE.Object3D();
    this.tapaEntera.add(tapa);
    this.tapaEntera.add(this.calavera);

    // Combinamos la tapaEntera con la caja incial en un solo objeto
    var cajaCompleta = new THREE.Object3D();
    cajaCompleta.add(caja);
    cajaCompleta.add(this.tapaEntera);

    cajaCompleta.position.set(-240,120,0);
    cajaCompleta.rotation.y = Math.PI/2;

    //Animacion al abrir la caja
    var origen = {x: 0};
    var fin = {x: -Math.PI/4};
    var tiempo = 2000;

    this.animacion1 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        this.tapaEntera.rotation.x = origen.x;
      } )
      .onComplete(() => origen.y = 0);
      
      this.add(cajaCompleta);
  }

  // Función a la que se llama cuando se introduce la combinación correcta
  abrir(){
    this.animacion1.start();
  }

  // Para que la calavera esté constantemente girando
  update () {
    this.calavera.rotation.z += 0.01;
    TWEEN.update();
  }
}

export { Caja }