import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Ordenador extends THREE.Object3D {
  constructor() {
    super();
    
    // TEXTURAS
    // Material negro
    var matNegro = new THREE.MeshPhongMaterial({color: 0x000000});
  
    // La textura de la pantalla que muestra imagen
    this.video = document.getElementById('TicTac');
    this.video.play();

    this.texturaPantalla = new THREE.VideoTexture(this.video);
    this.texturaPantalla.minFilter = THREE.LinearFilter;
    this.texturaPantalla.magFilter = THREE.LinearFilter;
    this.texturaPantalla.format = THREE.RGBFormat;

    var materialPantalla = new THREE.MeshBasicMaterial({ map: this.texturaPantalla });
    
    //Textura para cuando ganemos el juego
    this.video2 = document.getElementById('TheEnd');
    this.video2.play();

    this.texturaPantalla2 = new THREE.VideoTexture(this.video2);
    this.texturaPantalla2.minFilter = THREE.LinearFilter;
    this.texturaPantalla2.magFilter = THREE.LinearFilter;
    this.texturaPantalla2.format = THREE.RGBFormat;
    this.materialFin = new THREE.MeshPhongMaterial ({map: this.texturaPantalla2});

    // La textura del teclado
    var texturaTeclado = new THREE.TextureLoader().load('./imgs/Teclado.jpg');
    var materialTeclado = new THREE.MeshPhongMaterial ({map: texturaTeclado});

    // La textura del ratón
    var texturaRaton = new THREE.TextureLoader().load('./imgs/Raton.png');
    var materialRaton = new THREE.MeshPhongMaterial ({map: texturaRaton});


    // GEOMETRÍAS
    // Cuerpo de la pantalla
    var pantallaBaseGeom = new THREE.BoxGeometry(70, 50, 5);
    var huecoPantallaGeom = new THREE.BoxGeometry(60, 40, 3);

    var pantallaBase = new THREE.Mesh(pantallaBaseGeom, matNegro);
    pantallaBase.position.y = 55;
    pantallaBase.position.z = -2.5;

    var huecoPantalla = new THREE.Mesh(huecoPantallaGeom, matNegro);
    huecoPantalla.position.y = 55;
    huecoPantalla.position.z = -1.5;

    var PantallaCSG = new CSG();
    PantallaCSG.subtract([pantallaBase, huecoPantalla]);

    var pantalla = PantallaCSG.toMesh();
    pantalla.castShadow = true;
    pantalla.receiveShadow = true;
    
    pantalla.position.y = 100;
    pantalla.position.z = 40;
    pantalla.rotation.y = -Math.PI/1.7;
    pantalla.scale.set(0.75, 0.6, 0.75);

    this.add(pantalla);

    // El pie que sujeta el cuerpo de la pantalla
    this.puntospie = [];
    this.puntospie.push(new THREE.Vector3(0.001, 0.0, 0.0));
    this.puntospie.push(new THREE.Vector3(1.5, 0.0, 0.0));
    this.puntospie.push(new THREE.Vector3(0.2, 0.5, 0.0));
    this.puntospie.push(new THREE.Vector3(0.2, 3, 0.0));
    this.puntospie.push(new THREE.Vector3(0.001, 3, 0.0));

    this.pieGeom = new THREE.LatheGeometry(this.puntospie, 40, 0, 2*Math.PI); //
    var pie = new THREE.Mesh(this.pieGeom, matNegro);
    pie.castShadow = true;
    pie.receiveShadow = true;

    pie.position.x += 1.5;
    pie.position.y = 105;
    pie.position.z = 40;
    pie.scale.set(5,6,9);
    pie.rotation.y = Math.PI/1.1;

    this.add(pie);

    // La propia pantalla
    var pantallaRealGeom = new THREE.BoxGeometry(60, 40, 2);
    this.pantallaReal = new THREE.Mesh(pantallaRealGeom, materialPantalla);
    this.pantallaReal.position.set(0.75, 133, 40);
    this.pantallaReal.rotation.y = -Math.PI/1.7;
    this.pantallaReal.scale.set(0.75, 0.6, 0.75);
    this.pantallaReal.castShadow = true;
    this.pantallaReal.receiveShadow = true;
    this.pantallaReal.name = "Pantalla";

    this.add(this.pantallaReal);

    // El teclado
    var tecladoGeom = new THREE.BoxGeometry(50, 1, 20);
    var teclado = new THREE.Mesh(tecladoGeom, materialTeclado);
    teclado.position.set(-15, 105.5, 25);
    teclado.rotation.y = -Math.PI/1.7;
    teclado.castShadow = true;
    teclado.receiveShadow = true;

    this.add(teclado);

    // El ratón
    var ratonGeom = new THREE.SphereGeometry(5, 64, 32, 0, Math.PI, 0, Math.PI);
    var raton = new THREE.Mesh(ratonGeom, materialRaton);
    raton.position.set(-26, 105, 62.5);
    raton.rotation.x = -Math.PI/2;
    raton.rotation.z = -Math.PI/1.7;
    raton.scale.y = 1.5;
    raton.castShadow = true;
    raton.receiveShadow = true;

    this.add(raton);
    
  }

  // Función para cambiar la textura cuando hayamos acabado el juego
  cambiarTextura(){
    this.pantallaReal.material = this.materialFin;
  }

  // Para que el vídeo se visualice correctamente
  update () {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.texturaPantalla.needsUpdate = true;
    }

    if (this.video2.readyState === this.video2.HAVE_ENOUGH_DATA) {
      this.texturaPantalla2.needsUpdate = true;
    }
  }
}

export { Ordenador }