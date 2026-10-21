import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class cajaFuerte extends THREE.Object3D {
  constructor() {
    super();

    // TEXTURA CON RELIEVE PARA LA CAJA GRANDE
    var texturaCajaFuerte = new THREE.TextureLoader().load('./imgs/relieve.jpg');
    var matCajaFuerte = new THREE.MeshPhongMaterial({color: 0xA4C9BB});
    matCajaFuerte.bumpMap = texturaCajaFuerte;
    matCajaFuerte.bumpScale = 0.15;

    // CAJA GRANDE 
    var cajaGeo = new THREE.BoxGeometry(200,100,50);
    var caja = new THREE.Mesh (cajaGeo, matCajaFuerte);
    caja.rotation.y = Math.PI/2;
    caja.position.x = -225;
    caja.position.y = 50;
    caja.receiveShadow = true;
    caja.castShadow = true;

    // BOTONES
    var boton = new THREE.CylinderGeometry(10,10,10,30,30);

    // Botón 1
    var textura1 = new THREE.TextureLoader().load('./imgs/uno.jpg');
    var m1 = new THREE.MeshPhongMaterial ({map: textura1});
    var boton1 = new THREE.Mesh(boton, m1);
    boton1.position.set(-200,80,50);
    boton1.rotation.z = Math.PI/2;
    boton1.rotation.x = Math.PI;
    boton1.receiveShadow = true;
    boton1.castShadow = true;
    boton1.name = "Boton1";

    // Botón 2
    var textura2 = new THREE.TextureLoader().load('./imgs/dos.jpg');
    var m2 = new THREE.MeshPhongMaterial ({map: textura2});
    var boton2 = new THREE.Mesh(boton, m2);
    boton2.position.set(-200,80,0);
    boton2.rotation.z = Math.PI/2;
    boton2.rotation.x = Math.PI;
    boton2.receiveShadow = true;
    boton2.castShadow = true;
    boton2.name = "Boton2";

    // Botón 3
    var textura3 = new THREE.TextureLoader().load('./imgs/tres.jpg');
    var m3 = new THREE.MeshPhongMaterial ({map: textura3});
    var boton3 = new THREE.Mesh(boton, m3);
    boton3.position.set(-200,80,-50);
    boton3.rotation.z = Math.PI/2;
    boton3.rotation.x = Math.PI;
    boton3.receiveShadow = true;
    boton3.castShadow = true;
    boton3.name = "Boton3";

    // Botón 4
    var textura4 = new THREE.TextureLoader().load('./imgs/cuatro.jpg');
    var m4 = new THREE.MeshPhongMaterial ({map: textura4});
    var boton4 = new THREE.Mesh(boton, m4);
    boton4.position.set(-200,50,50);
    boton4.rotation.z = Math.PI/2;
    boton4.rotation.x = Math.PI;
    boton4.receiveShadow = true;
    boton4.castShadow = true;
    boton4.name = "Boton4";

    // Botón 5
    var textura5 = new THREE.TextureLoader().load('./imgs/cinco.jpg');
    var m5 = new THREE.MeshPhongMaterial ({map: textura5});
    var boton5 = new THREE.Mesh(boton, m5);
    boton5.position.set(-200,50,0);
    boton5.rotation.z = Math.PI/2;
    boton5.rotation.x = Math.PI;
    boton5.receiveShadow = true;
    boton5.castShadow = true;
    boton5.name = "Boton5";

    // Botón 6
    var textura6 = new THREE.TextureLoader().load('./imgs/seis.jpg');
    var m6 = new THREE.MeshPhongMaterial ({map: textura6});
    var boton6 = new THREE.Mesh(boton, m6);
    boton6.position.set(-200,50,-50);
    boton6.rotation.z = Math.PI/2;
    boton6.rotation.x = Math.PI;
    boton6.receiveShadow = true;
    boton6.castShadow = true;
    boton6.name = "Boton6";

    // Botón 7
    var textura7 = new THREE.TextureLoader().load('./imgs/siete.jpg');
    var m7 = new THREE.MeshPhongMaterial ({map: textura7});
    var boton7 = new THREE.Mesh(boton, m7);
    boton7.position.set(-200,20,50);
    boton7.rotation.z = Math.PI/2;
    boton7.rotation.x = Math.PI;
    boton7.receiveShadow = true;
    boton7.castShadow = true;
    boton7.name = "Boton7";

    // Botón 8
    var textura8 = new THREE.TextureLoader().load('./imgs/ocho.jpg');
    var m8 = new THREE.MeshPhongMaterial ({map: textura8});
    var boton8 = new THREE.Mesh(boton, m8);
    boton8.position.set(-200,20,0);
    boton8.rotation.z = Math.PI/2;
    boton8.rotation.x = Math.PI;
    boton8.receiveShadow = true;
    boton8.castShadow = true;
    boton8.name = "Boton8";

    // Botón 9
    var textura9 = new THREE.TextureLoader().load('./imgs/nueve.jpg');
    var m9 = new THREE.MeshPhongMaterial ({map: textura9});
    var boton9 = new THREE.Mesh(boton, m9);
    boton9.position.set(-200,20,-50);
    boton9.rotation.z = Math.PI/2;
    boton9.rotation.x = Math.PI;
    boton9.receiveShadow = true;
    boton9.castShadow = true;
    boton9.name = "Boton9";

    //Animación que simula que los botones son pulsados
    var origen = {x: 0};
    var fin = {x: 3};
    var tiempo = 250;
  
    this.animacion1 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton1.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion2 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton2.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion3 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton3.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion4 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton4.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion5 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton5.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion6 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton6.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion7 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton7.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion8 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton8.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);

      this.animacion9 = new TWEEN.Tween (origen)
      .to(fin, tiempo)
      .onUpdate(() => {
        boton9.position.x = -200 -  origen.x;
      } )
      .onComplete(() => origen.x = 0)
      .yoyo(true)
      .repeat(1)
      .repeatDelay(0);


    // AÑADIMOS AL OBJETO
    this.add(caja);
    this.add(boton1);
    this.add(boton2);
    this.add(boton3);
    this.add(boton4);
    this.add(boton5);
    this.add(boton6);
    this.add(boton7);
    this.add(boton8);
    this.add(boton9);
  }

  // Funciones para ejecutar las animaciones
  pulsarboton1(){
    this.animacion1.start();
  }
  pulsarboton2(){
    this.animacion2.start();
  }
  pulsarboton3(){
    this.animacion3.start();
  }
  pulsarboton4(){
    this.animacion4.start();
  }
  pulsarboton5(){
    this.animacion5.start();
  }
  pulsarboton6(){
    this.animacion6.start();
  }
  pulsarboton7(){
    this.animacion7.start();
  }
  pulsarboton8(){
    this.animacion8.start();
  }
  pulsarboton9(){
    this.animacion9.start();
  }

  update () {
    TWEEN.update();
  }
}

export { cajaFuerte }