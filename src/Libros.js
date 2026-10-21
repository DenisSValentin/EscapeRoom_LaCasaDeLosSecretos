import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'


class Libros extends THREE.Object3D {
  constructor(){
    super();

    // TEXTURA DEL LIBRO
    var texture = new THREE.TextureLoader().load('./imgs/libro.png');
    var materialLibro = new THREE.MeshPhongMaterial ({map: texture});
    var matBlanco = new THREE.MeshPhongMaterial({color: 0xffffff});


    // GEOMETRÍA DE UN LIBRO
    var cilindro = new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5,15,30,30),materialLibro);
    cilindro.position.x = -5;
    var box = new THREE.Mesh(new THREE.BoxGeometry(10,15,5), materialLibro);
    var box2 = new THREE.Mesh(new THREE.BoxGeometry(12,15,4), materialLibro);

    var tapaCSG = new CSG();
    tapaCSG.union([cilindro, box]);
    tapaCSG.subtract([box2]);

    var tapa = tapaCSG.toMesh();

    var relleno = new THREE.Mesh(new THREE.BoxGeometry(10,14,4), matBlanco);
    relleno.position.x = -1;

    // Mesh del libro concreto para interactuar con el pick
    var tapaLibroEspecial = tapaCSG.toMesh();
    tapaLibroEspecial.name = "LibroEspecial";

    var rellenoLibroEspecial = new THREE.Mesh(new THREE.BoxGeometry(10,14,4), matBlanco);
    rellenoLibroEspecial.position.x = -1;
    rellenoLibroEspecial.name = "LibroEspecial";

    // Creamos un libro
    var libro = new THREE.Object3D();
    libro.add(tapa);
    libro.add(relleno);
    libro.scale.set(2,2,2);
    libro.position.set(240,75,0);

    // A partir de este libro, mediante clonaciones, creamos el resto
    var libro2 = libro.clone();
    libro2.position.z = -10;
    var libro3 = libro.clone();
    libro3.position.z = -20;
    var libro4 = libro.clone();
    libro4.position.z = -30;
    var libro5 = libro.clone();
    libro5.position.z = -40;
    var libro6 = libro.clone();
    libro6.position.z = -50;
    var libro7 = libro.clone();
    libro7.position.z = -60;
    var libro8 = libro.clone();
    libro8.position.z = -70;
    var libro9 = libro.clone();
    libro9.position.z = -80;

    var libro10 = libro.clone();
    libro10.position.set(240,25,-75);
    var libro11 = libro10.clone();
    libro11.position.z = -65;
    var libro12= libro10.clone();
    libro12.position.z = -85;
    var libro13= libro10.clone();
    libro13.position.z = 85;
    var libro14= libro10.clone();
    libro14.position.z = 75;

    var libro15 = libro14.clone();
    libro15.rotation.y = Math.PI;
    libro15.rotation.x = Math.PI/2;
    libro15.position.set(235,115,60);
    var libro16 = libro15.clone();
    libro16.position.set(235,125,65);
    var libro17 = libro16.clone();
    libro17.position.set(235,135,58);

    // Creamos el libro que dará la nota
    var libroEspecial = new THREE.Object3D();
    libroEspecial.add(tapaLibroEspecial);
    libroEspecial.add(rellenoLibroEspecial);
    libroEspecial.scale.set(2,2,2);
    libroEspecial.position.set(240,75,0);
    libroEspecial.position.z = 40;
    libroEspecial.rotation.x = Math.PI/2;
    libroEspecial.position.y = 65;

    // AÑADIMOS AL OBJETO
    this.add(libro);
    this.add(libro2);
    this.add(libro3);
    this.add(libro4);
    this.add(libro5);
    this.add(libro6);
    this.add(libro7);
    this.add(libro8);
    this.add(libro9);
    this.add(libro10);
    this.add(libro11);
    this.add(libro12);
    this.add(libro13);
    this.add(libro14);
    this.add(libro15);
    this.add(libro16);
    this.add(libro17);
    this.add(libroEspecial);

  }
}


export{Libros};
