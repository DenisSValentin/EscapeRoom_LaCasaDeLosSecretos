import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Fin extends THREE.Object3D {
  constructor(){
    super();

    // TEXTURA DE LA NOTA FINAL
    var textura = new THREE.TextureLoader().load('./imgs/restart.jpg');
    var material = new THREE.MeshPhongMaterial ({map: textura});

    this.nota = new THREE.Mesh(new THREE.BoxGeometry(40,40,0.1), material);
    this.nota.name = "Fin";
    this.nota.position.set(0,165,-748);

      this.posicionInicial = new THREE.Vector3(0,65,-300);

    this.add(this.nota);
  }

  // La nota viene a nosotros
  activarAnimacion(fin){
    var origen = this.posicionInicial;
    var direccion = new THREE.Vector3().subVectors(fin, origen).normalize();
    this.animacion = new TWEEN.Tween (origen)
    .to(fin, 3000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => {
      this.nota.position.copy(origen);
      this.nota.lookAt(this.nota.position.clone().add(direccion));
    } )
    .start();
  }


  update () {
    TWEEN.update();
  }

}


export{Fin};