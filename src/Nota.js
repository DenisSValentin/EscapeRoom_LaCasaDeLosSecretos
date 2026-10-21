import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Nota extends THREE.Object3D {
  constructor(){
    super();

    // TEXTURA DE LA NOTA
    var textura = new THREE.TextureLoader().load('./imgs/nota.png');
    var material = new THREE.MeshPhongMaterial ({map: textura});

    this.nota = new THREE.Mesh(new THREE.BoxGeometry(4,4,0.1), material);
    this.nota.name = "Nota";
    this.nota.position.set(240,65,40);

      this.posicionInicial = new THREE.Vector3(240,65,40);
      this.posicionFinal;

    this.add(this.nota);
  }

  // La nota viene a nosotros
  activarAnimacion(fin){
    var origen = this.posicionInicial;
    this.posicionFinal = fin;
    var direccion = new THREE.Vector3().subVectors(fin, origen).normalize();
    this.animacion = new TWEEN.Tween (origen)
    .to(fin, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => {
      this.nota.position.copy(origen);
      this.nota.lookAt(this.nota.position.clone().add(direccion));
    } )
    .start();
  }

  // La nota vuelve al libro
  desactivarAnimacion() {
    var origen = this.posicionFinal;
    var fin = new THREE.Vector3(240,65,40);
    var direccion = new THREE.Vector3().subVectors(fin, origen).normalize();
    this.animacion = new TWEEN.Tween(origen)
      .to(fin, 1000)
      .onUpdate(() => {
        this.nota.position.copy(origen);
        this.nota.lookAt(this.nota.position.clone().add(direccion));
      })
      .start();
  }


  update () {
    TWEEN.update();
  }

}


export{Nota};