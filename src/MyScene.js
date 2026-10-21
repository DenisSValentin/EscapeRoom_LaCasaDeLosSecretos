// Clases de la biblioteca
import * as THREE from '../libs/three.module.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'

// Clases de mi proyecto
import { Pared } from './Pared.js'
import { cajaFuerte } from './CajaFuerte.js'
import { Alfombra } from './Alfombra.js'
import { Estanteria } from './Estanteria.js'
import { silla } from './Silla.js'
import { Marco } from './Marco.js'
import { Bombilla } from './Bombilla.js'
import { Mesa } from './Mesa.js'
import { Cuadros } from './Cuadros.js'
import { Ordenador } from './Ordenador.js'
import { Puerta } from './Puerta.js'
import { Libros } from './Libros.js'
import { Caja } from './Caja.js'
import { Interruptores } from './Interruptores.js'
import { Pendrive } from './Pendrive.js'
import { Nota } from './Nota.js'
import { Fin } from './Fin.js'

 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {

  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar la visualización de la escena
  constructor (myCanvas) { 
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights();
    
    // Tendremos una cámara con un control de movimiento con las teclas WASD o las Flechas del teclado
    // Además podremos cambiar hacia dónde mira si tenemos la cámara fija (shift) y movemos el ratón
    this.createCamera();
    
    // El suelo suelo 
    this.createGround();
    
    // Si se ha llegado a este punto en el juego
    this.interruptor1 = false;
    this.ultimaPista = false;
    this.ganar = false;

    // El array de la cadena correcta para abrir la caja fuerte
    this.cadenaBuena = [1, 7, 2, 4, 5];
    this.cadena = [];
    this.continuar = false;
    this.abrirCaja = false;

    // Construimos los distinos elementos que tendremos en la escena
    this.pared = new Pared();
    this.cajaFuerte = new cajaFuerte();
    this.alfombra = new Alfombra();
    this.estanteria = new Estanteria();
    this.silla1 = new silla();
    this.silla1.position.set(-30, 0, 25);
    this.silla1.rotation.y = -Math.PI/2;
    this.silla2 = new silla();
    this.silla2.position.set(50, 0, -50);
    this.silla2.rotation.y = Math.PI/2;
    this.marco1 = new Marco();
    this.marco2 = new Marco();
    this.marco2.position.x = -135;
    this.marco3 = new Marco();
    this.marco3.position.x = 135;
    this.bombilla = new Bombilla();
    this.escritorio = new Mesa();
    this.escritorio.position.set(0, 0, 0);
    this.escritorio.rotation.y = Math.PI/2;
    this.cuadros = new Cuadros();
    this.ordenador = new Ordenador();
    this.puerta = new Puerta();
    this.libros = new Libros();
    this.caja = new Caja();
    this.interruptores = new Interruptores();
    this.pendrive = new Pendrive();
    this.pendrive.scale.set(2,2,2);
    this.pendrive.rotation.y = Math.PI/2;
    this.pendrive.position.set(-225,110,-5);
    this.nota = new Nota();
    this.fin = new Fin();

    // Añadir los objetos a la escena
    this.add(this.caja);
    this.add(this.libros);
    this.add(this.puerta);
    this.add(this.escritorio);
    this.add(this.cajaFuerte);
    this.add(this.pared);
    this.add(this.alfombra);
    this.add(this.estanteria);
    this.add(this.silla1);
    this.add(this.silla2);
    this.add(this.marco1);
    this.add(this.marco2);
    this.add(this.marco3);
    this.add(this.bombilla);
    this.add(this.cuadros);
    this.add(this.ordenador);
    this.add(this.interruptores);
    this.add(this.pendrive);
    this.add(this.nota);
    this.add(this.fin);

    // Objetos con los que podremos interactuar con el pick
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.pickableObjects = [];
    this.pickableObjects.push(this.libros);
    this.pickableObjects.push(this.ordenador);
    this.pickableObjects.push(this.cajaFuerte);
    this.pickableObjects.push(this.caja);
    this.pickableObjects.push(this.interruptores);
    this.pickableObjects.push(this.puerta);
    this.pickableObjects.push(this.pendrive);    
    this.pickableObjects.push(this.nota);
    this.pickableObjects.push(this.fin);

    // Mensaje de escena inicial
    this.setMenssage("Has iniciado una partida. \n ¡Consigue escapar antes de perder la cordura!");

  }

  // Cambiar el mensaje en función del momento en el que nos encontremos
  setMenssage(str){
    var mensajeElement = document.getElementById("Mensajes");
    mensajeElement.innerHTML = "<p>" + str + "</p>";
    mensajeElement.style.color = "white";
    mensajeElement.style.fontFamily = "Montserrat, sans-serif";
    mensajeElement.style.padding = "5px 10px";
  }

  // Creamos la cámara y le asignamos las teclas que interactuan con ella
  createCamera() {

    // Crea una cámara de perspectiva
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    
    // Establece la posición de la cámara
    this.camera.position.set(0, 160, -200);

    // Y hacia dónde mira
    var look = new THREE.Vector3(0, 160, 0);
    this.camera.lookAt(look);
    this.add(this.camera);
    
    // Crea una instancia de la clase PointerLockControls y le paso la cámara
    this.cameraControl = new PointerLockControls(this.camera, this.renderer.domElement);
 
    // Booleanos para el control de la cámara y agacharnos
    this.camaraFija = false;
    this.agachado = false;

    // Cuando se presionen estas teclas
    document.addEventListener('keydown', (event) => {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        if(this.camaraFija == false){
          this.cameraControl.lock();
          this.camaraFija = true;
        }
        else{
          this.cameraControl.unlock();
          this.camaraFija = false;
        }
      }
      if(event.code === 'ControlLeft' || event.code === 'ControlRight'){
        if(this.agachado == false)
          this.agachado = true;
        else
          this.agachado = false;
      }
      if (event.key ==='w' || event.key ==='W' || event.key === 'ArrowUp') {
        this.avanzar = true;
      }
      if (event.key ==='s' || event.key ==='S' || event.key === 'ArrowDown') {
        this.retroceder = true;
      }
      if (event.key ==='d' || event.key ==='D' || event.key === 'ArrowRight') {
        this.moverDerecha = true;
      }
      if (event.key ==='a' || event.key ==='A' || event.key === 'ArrowLeft') {
        this.moverIzquierda = true;
      }
    }, false);
    
    // Cuando se levanten estas teclas
    document.addEventListener('keyup', (event) => {
      if (event.key ==='w' || event.key ==='W' || event.key === 'ArrowUp') {
        this.avanzar = false;
      }
      if (event.key ==='s' || event.key ==='S' || event.key === 'ArrowDown') {
        this.retroceder = false;
      }
      if (event.key ==='d' || event.key ==='D' || event.key === 'ArrowRight') {
        this.moverDerecha = false;
      }
      if (event.key ==='a' || event.key ==='A' || event.key === 'ArrowLeft') {
        this.moverIzquierda = false;
      }
    }, false);
    
  }
  
  // Creamos el suelo
  createGround () {    

    // La geometría del suelo
    var sueloGeom = new THREE.BoxGeometry (500,0.2,500);
    
    // La textura del suelo
    var texturaSuelo = new THREE.TextureLoader().load('./imgs/suelo.png');
    var materialSuelo = new THREE.MeshPhongMaterial ({map: texturaSuelo});
    
    // Construimos su mesh
    var suelo = new THREE.Mesh (sueloGeom, materialSuelo);
    suelo.receiveShadow = true;

    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    suelo.position.y = -0.1;

    //Suelo del pasillo
    var sueloPasillo = new THREE.Mesh(new THREE.BoxGeometry(100,0.2,500), materialSuelo);
    sueloPasillo.position.set(0,-0.1,-500);
    
    // Añadirlo a la escena
    this.add(suelo);
    this.add(sueloPasillo);
    
  }
  
  // Creamos todas las luces que tendrá nuestra escena
  createLights () {
    
    // Luz ambiental
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    ambientLight.castShadow = true;
    this.add(ambientLight);
    
    // Luz central
    this.spotLight = new THREE.SpotLight( 0xffffff);
    this.spotLight.position.set(0, 220, 0);
    this.spotLight.castShadow = true;
    this.spotLight.penumbra = 1;
    this.spotLight.angle = Math.PI/2.5;
    this.add(this.spotLight);

    // Crear la luz amarilla
    this.luzAmarilla = new THREE.SpotLight(0xffff00);
    this.luzAmarilla.position.set(0, 200, 19);
    this.luzAmarilla.angle = Math.PI/8;
    this.luzAmarilla.penumbra = 1;
    var targetAmarilla = new THREE.Object3D();
    targetAmarilla.position.set(0, 145, 247);
    this.luzAmarilla.intensity = 0;
    this.luzAmarilla.target = targetAmarilla;

    // Crear la luz azul
    this.luzAzul = new THREE.SpotLight(0x0000ff);
    this.luzAzul.position.set(-10, 200, 16.5);
    this.luzAzul.angle = Math.PI/8;
    this.luzAzul.penumbra = 1;
    var targetAzul = new THREE.Object3D();
    targetAzul.position.set(-135, 145, 247);
    this.luzAzul.intensity = 0;
    this.luzAzul.target = targetAzul;
 
    // Crear la luz roja con la textura de la pista
    var texture3 = new THREE.TextureLoader().load('./imgs/pista1.jpg');
    this.luzRoja = new THREE.SpotLight(0xff0000);
    this.luzRoja.position.set(10, 200, 16.5);
    this.luzRoja.angle = Math.PI/8;
    this.luzRoja.penumbra = 1;
    this.luzRoja.map = texture3;
    this.luzRoja.shadow.focus = 0.4;
    this.luzRoja.intensity = 0;
    var targetRoja = new THREE.Object3D();
    targetRoja.position.set(135, 145, 247);
    this.luzRoja.target = targetRoja;

    // Agregar las luces y sus objetivos a la escena
    this.add(this.luzAmarilla);
    this.add(targetAmarilla);
    this.add(this.luzAzul);
    this.add(targetAzul);
    this.add(this.luzRoja);
    this.add(targetRoja);

  }

  // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
  createRenderer(myCanvas) {
    
    // Se instancia un Renderer WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Activar las sombras
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera() {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect(ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  // Evalúa si existe colisión o no con los objetos colisionables que tenemos definidos
  testColision(dondeEstoy){
    var colision = false;
    var cajaCamara = new THREE.Box3();
    cajaCamara.setFromCenterAndSize(dondeEstoy, new THREE.Vector3(1, 1, 1)); // Tamaño de la caja englobante de la cámara

    // Cajas englobantes de las 4 paredes
    
    var cajaPared2 = new THREE.Box3(new THREE.Vector3(245, 0, -250), new THREE.Vector3(250, 250, 250));
    var cajaPared3 = new THREE.Box3(new THREE.Vector3(-250, 0, 245), new THREE.Vector3(250, 250, 260));
    var cajaPared4 = new THREE.Box3(new THREE.Vector3(-260, 0, -250), new THREE.Vector3(-245, 250, 250));
    var cajaMesa = new THREE.Box3(new THREE.Vector3(-45, 0, -80), new THREE.Vector3(45, 250, 80));
    var cajaSilla1 = new THREE.Box3(new THREE.Vector3(-80, 0, -35),new THREE.Vector3(0, 250, 35));
    var cajaSilla2 = new THREE.Box3(new THREE.Vector3(20, 0, -55),new THREE.Vector3(100, 250, 0)); 
    var cajaEstanteria = new THREE.Box3(new THREE.Vector3(220, 0, -105),new THREE.Vector3(250, 250, 105));
    var cajaCajaFuerte = new THREE.Box3(new THREE.Vector3(-250, 0, -105),new THREE.Vector3(-190, 250, 105));
    var cajaMarco1 = new THREE.Box3(new THREE.Vector3(-50, 0, 245),new THREE.Vector3(50, 250, 250));
    var cajaMarco2 = new THREE.Box3(new THREE.Vector3(-185, 0, 245),new THREE.Vector3(135, 250, 250));
    var cajaMarco3 = new THREE.Box3(new THREE.Vector3(135, 0, 245),new THREE.Vector3(185, 250, 250));

    if(this.ganar){
      var cajaPared1_1= new THREE.Box3(new THREE.Vector3(-250, 0, -260), new THREE.Vector3(-50, 250, -245));
      var cajaPared1_2 = new THREE.Box3(new THREE.Vector3(50, 0, -260), new THREE.Vector3(250, 250, -245));
      var cajaPasilloFin =  new THREE.Box3(new THREE.Vector3(-50, 0, -760), new THREE.Vector3(50, 250, -745));
      var cajaPasilloDer =  new THREE.Box3(new THREE.Vector3(49, 0, -750), new THREE.Vector3(51, 250, -250));
      var cajaPasilloIzq =  new THREE.Box3(new THREE.Vector3(-51, 0, -750), new THREE.Vector3(-49, 250, -250));

      this.cajasColisionables = [
        cajaPared1_1, cajaPared1_2, cajaPasilloDer, cajaPasilloFin, cajaPasilloIzq, cajaPared2, cajaPared3, cajaPared4, cajaMesa, cajaSilla1, cajaSilla2,
        cajaEstanteria, cajaCajaFuerte, cajaMarco1, cajaMarco2, cajaMarco3
      ];

    }else{
      var cajaPared1 = new THREE.Box3(new THREE.Vector3(-250, 0, -260), new THREE.Vector3(250, 250, -245));

      this.cajasColisionables = [
        cajaPared1, cajaPared2, cajaPared3, cajaPared4, cajaMesa, cajaSilla1, cajaSilla2,
        cajaEstanteria, cajaCajaFuerte, cajaMarco1, cajaMarco2, cajaMarco3
      ];
    }

    for (var i = 0; i < this.cajasColisionables.length; i++) {
      var cajaColisionable = this.cajasColisionables[i];
      if (cajaCamara.intersectsBox(cajaColisionable)) {
        colision = true;
        break;
      }
    }

    return colision;
  }

  // Función para evaluar si la cadena introducida es la correcta o no
  // Si el número introducido coincide con el que debería ser, avanza; si no, restablece la cadena
  evaluarCadena(cadena){
    var tamanio = cadena.length;
    if(this.cadena.length == this.cadenaBuena.length){ // Si va a evaluar el último valor
      if(this.cadena[tamanio-1] == this.cadenaBuena[tamanio-1]){
        this.abrirCaja = true;
        console.log(this.cadena);
      }
      else{
        this.continuar = false;
        this.cadena.splice(0);
        console.log(this.cadena);
      }
    }
    else{
      if(this.cadena[tamanio-1] == this.cadenaBuena[tamanio-1]){
        this.continuar = true;
        console.log(this.cadena);
      }
      else{
        this.continuar = false;
        this.cadena.splice(0);
        console.log(this.cadena);
      }
    }
  }

  // En función del objeto pickable sobre el que clickemos, realizará una acción distinta
  onDocumentMouseDown(event) {
    // Se calculan las coordenadas del clic del ratón
    this.mouse.x =  (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = 1-2 * (event.clientY / window.innerHeight);

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const pickedObjects = this.raycaster.intersectObjects(this.pickableObjects, true);

    if(pickedObjects.length > 0){
      let clicado = pickedObjects[0].object;

      switch(clicado.name){

        case "LibroEspecial":
          this.setMenssage("Un libro algo sospechoso. \n Dentro se encontraba esta nota: \n ACE, ABDF, ABDCEF, ACDBF, BACDFE");
          var posicionCamara = this.camera.position.clone();
          var direccionCamara = this.camera.getWorldDirection(new THREE.Vector3());
          var distancia = 5;
          var posicionFinal = new THREE.Vector3().copy(posicionCamara).addScaledVector(direccionCamara, distancia);
          this.nota.activarAnimacion(posicionFinal);
          break;

        case "Nota":
          this.nota.desactivarAnimacion();
          break;
        
          case "Fin":
            location.reload();
          break;
        
        case "InterruptorArriba":
          if(!this.interruptor1){
            this.interruptor1=true;
            this.luzRoja.intensity = 1;
            this.interruptores.rotarInterruptor3();
            
          }
          else{
            this.interruptor1=false;
            this.luzRoja.intensity = 0;
            this.interruptores.rotarInterruptor3();
          }
          break;
          
        case "InterruptorCentro":
          if(!this.interruptor2){
            this.interruptor2=true;
            this.luzAmarilla.intensity = 1;
            this.interruptores.rotarInterruptor1();
          }
          else{
            this.interruptor2=false;
            this.luzAmarilla.intensity = 0;
            this.interruptores.rotarInterruptor1();
          }
          break;

        case "InterruptorDebajo":
          if(!this.interruptor3){
            this.interruptor3=true;
            this.luzAzul.intensity = 1;
            this.interruptores.rotarInterruptor2();
          }
          else{
            this.interruptor3=false;
            this.luzAzul.intensity = 0;
            this.interruptores.rotarInterruptor2();
          }
          break;
        
        case "Boton1":
          this.cadena.push(1);
          this.cajaFuerte.pulsarboton1();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton2":
          this.cadena.push(2);
          this.cajaFuerte.pulsarboton2();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton3":
          this.cadena.push(3);
          this.cajaFuerte.pulsarboton3();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton4":
          this.cadena.push(4);
          this.cajaFuerte.pulsarboton4();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton5":
          this.cadena.push(5);
          this.cajaFuerte.pulsarboton5();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton6":
          this.cadena.push(6);
          this.cajaFuerte.pulsarboton6();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton7":
          this.cadena.push(7);
          this.cajaFuerte.pulsarboton7();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton8":
          this.cadena.push(8);
          this.cajaFuerte.pulsarboton8();
          this.evaluarCadena(this.cadena);
          break;

        case "Boton9":
          this.cadena.push(9);
          this.cajaFuerte.pulsarboton9();
          this.evaluarCadena(this.cadena);
          break;

        case "Pomo":
          if(this.ganar){
            this.puerta.abrirPuerta();

            //Nota final
            var posicionCamara = this.camera.position.clone();
            var direccionCamara = this.camera.getWorldDirection(new THREE.Vector3());
            var distancia = 3;
            var posicionFinal = new THREE.Vector3().copy(posicionCamara).addScaledVector(direccionCamara, distancia);
            //this.fin.activarAnimacion(posicionFinal);

            this.setMenssage("HAS ACABADO EL JUEGO. Pulse RESTART para iniciar una nueva partida");

          }
          break;

        case "Cube":
        case "Cube.005_Cube.002":
          this.ultimaPista = true;
          this.setMenssage("Has encontrado esto:\n Pendrive \n ¿Para qué servirá?");
          this.pendrive.visible = false;
          break;

        case "Pantalla":
          if(this.ultimaPista){
            this.ganar = true;
            this.setMenssage("¡Lo has conseguido! \n Ya puedes salir por la puerta");
            this.ordenador.cambiarTextura();
          }
          break;
        
      }
    }

  }
  
  update () {

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualiza la posición de la cámara según su controlador
    var dondeEstoy = new THREE.Vector3();
    var dondeMiro = new THREE.Vector3();

    // Evaluamos si se quiere avanzar, retroceder, mover a la derecha o hacia la izquierda
    // Antes de realizar el movimiento se calcula si este provocará colisión o no
    // En caso de provocar colisión, no nos dejará movernos, en caso contrario; sí
    // Son if's en vez de else-if's para poder movernos en diagonal
    if(this.avanzar) {
      dondeEstoy.copy(this.camera.position);
      this.cameraControl.getDirection(dondeMiro);
      dondeMiro.y = 0;
      dondeMiro.normalize();
    
      // Si no habrá colisión, podemos mover la cámara hacia adelante
      if (!this.testColision(dondeEstoy.add(dondeMiro.multiplyScalar(2)))) {
        this.cameraControl.moveForward(2);
      }
    }
    if(this.retroceder) {
      dondeEstoy.copy(this.camera.position);
      this.cameraControl.getDirection(dondeMiro);
      dondeMiro.y = 0;
      dondeMiro.normalize();
    
      if (!this.testColision(dondeEstoy.sub(dondeMiro.multiplyScalar(2)))) {
        this.cameraControl.moveForward(-2);
      }
    }
    if(this.moverIzquierda) {
      dondeEstoy.copy(this.camera.position);
      this.cameraControl.getDirection(dondeMiro);
      dondeMiro.y = 0;
      dondeMiro.normalize();
    
      var lado = new THREE.Vector3(-dondeMiro.z, 0, dondeMiro.x); // Obtener el vector lateral
    
      if (!this.testColision(dondeEstoy.sub(lado.multiplyScalar(2)))) {
        this.cameraControl.moveRight(-2);
      }
    }
    if(this.moverDerecha) {
      dondeEstoy.copy(this.camera.position);
      this.cameraControl.getDirection(dondeMiro);
      dondeMiro.y = 0;
      dondeMiro.normalize();
    
      var lado = new THREE.Vector3(-dondeMiro.z, 0, dondeMiro.x); // Obtener el vector lateral
    
      if (!this.testColision(dondeEstoy.add(lado.multiplyScalar(2)))) {
        this.cameraControl.moveRight(2);
      }
    }

    // Modifica el valor de la Y si nos agachamos
    if(this.agachado)
      this.camera.position.setY(110);
    else
      this.camera.position.setY(160);
    
    // Abre la caja cuando se mete la combinación correcta
    if(this.abrirCaja == true){
      this.caja.abrir();
      this.abrirCaja = false;
      this.setMenssage("Has conseguido desbloquear la caja fuerte")
    }

    // Actualizamos los modelos
    this.caja.update();
    this.ordenador.update();

    // Modificamos la intensidad de la luz para que parpadee constantemente
    var time = Date.now() * 0.001;
    var targetIntensity = Math.sin(time) * 2 + 2;
    var maxIntensity = 0.8; 
    this.spotLight.intensity = Math.min(targetIntensity, maxIntensity);


    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

  }
}


/// La función main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  // Cuando ocurra un click se llama a onDocumentMouseDown
  window.addEventListener("click", (event) => scene.onDocumentMouseDown(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
