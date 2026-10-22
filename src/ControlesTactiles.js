import * as THREE from '../libs/three.module.js'

// Controles táctiles opcionales. Solo se cargan en pantallas táctiles sin ratón (ver juego.html)
// y no cambian nada de la lógica del juego: activan los mismos indicadores que el teclado
// (avanzar, retroceder, moverIzquierda, moverDerecha, agachado) y giran la cámara como el ratón.
//
//  - Joystick abajo a la izquierda: moverse
//  - Arrastrar el dedo en el resto de la pantalla: mirar alrededor
//  - Tocar un objeto: interactuar (el toque llega al juego como un clic normal)
//  - Botón abajo a la derecha: agacharse / levantarse

// Recorrido máximo del joystick en píxeles y parte central que no mueve (de 0 a 1)
const RADIO_JOYSTICK = 56;
const ZONA_MUERTA = 0.35;

// Radianes que gira la cámara por cada píxel que se arrastra el dedo
const SENSIBILIDAD = 0.005;

// A partir de cuántos píxeles un toque deja de ser un "clic" y pasa a ser "mirar"
const UMBRAL_ARRASTRE = 10;

const ESTILOS = `
  .tactil-ui {
    position: fixed;
    z-index: 10;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    font-family: 'Courier New', monospace;
  }

  .tactil-joystick {
    left: calc(24px + env(safe-area-inset-left));
    bottom: calc(24px + env(safe-area-inset-bottom));
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: rgba(26, 24, 20, 0.45);
    border: 2px solid rgba(227, 213, 181, 0.7);
  }

  .tactil-joystick__mando {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 64px;
    height: 64px;
    margin: -32px 0 0 -32px;
    border-radius: 50%;
    background: rgba(227, 213, 181, 0.9);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .tactil-agacharse {
    right: calc(24px + env(safe-area-inset-right));
    bottom: calc(48px + env(safe-area-inset-bottom));
    min-width: 96px;
    min-height: 56px;
    padding: 0 16px;
    border-radius: 28px;
    border: 2px solid rgba(227, 213, 181, 0.7);
    background: rgba(26, 24, 20, 0.55);
    color: #E3D5B5;
    font-size: 15px;
  }

  .tactil-agacharse[aria-pressed="true"] {
    background: rgba(227, 213, 181, 0.9);
    color: #1E1B16;
  }

  .tactil-girar {
    display: none;
    left: 50%;
    bottom: 196px;
    transform: translateX(-50%);
    max-width: calc(100vw - 32px);
    padding: 10px 16px;
    border: 0;
    background: rgba(26, 24, 20, 0.8);
    color: #E3D5B5;
    font-size: 14px;
    text-align: center;
  }

  @media (orientation: portrait) {
    .tactil-girar { display: block; }
  }

  .tactil-girar[hidden] { display: none; }
`;

// MyScene se crea cuando carga la página; esperamos a que exista
function esperarEscena() {
  return new Promise((resolve) => {
    (function comprobar() {
      if (window.laCasa && window.laCasa.camera) resolve(window.laCasa);
      else requestAnimationFrame(comprobar);
    })();
  });
}

function crearInterfaz() {
  const estilos = document.createElement('style');
  estilos.textContent = ESTILOS;
  document.head.appendChild(estilos);

  const joystick = document.createElement('div');
  joystick.className = 'tactil-ui tactil-joystick';
  joystick.setAttribute('aria-hidden', 'true');
  const mando = document.createElement('div');
  mando.className = 'tactil-joystick__mando';
  joystick.appendChild(mando);

  const agacharse = document.createElement('button');
  agacharse.className = 'tactil-ui tactil-agacharse';
  agacharse.type = 'button';
  agacharse.setAttribute('aria-pressed', 'false');
  agacharse.textContent = 'Agacharse';

  const girar = document.createElement('button');
  girar.className = 'tactil-ui tactil-girar';
  girar.type = 'button';
  girar.textContent = 'Gira el móvil para jugar mejor · tocar para cerrar';

  document.body.append(joystick, agacharse, girar);
  return { joystick, mando, agacharse, girar };
}

function activarJoystick(escena, joystick, mando) {
  let dedo = null;
  let centro = { x: 0, y: 0 };

  function soltar() {
    dedo = null;
    mando.style.transform = '';
    escena.avanzar = escena.retroceder = escena.moverIzquierda = escena.moverDerecha = false;
  }

  joystick.addEventListener('pointerdown', (e) => {
    if (dedo !== null) return;
    dedo = e.pointerId;
    // En táctil el navegador ya captura el dedo; esto es un refuerzo que puede fallar sin problema
    try { joystick.setPointerCapture(dedo); } catch (error) { /* sin captura explícita */ }
    const r = joystick.getBoundingClientRect();
    centro = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    mover(e);
  });

  function mover(e) {
    if (e.pointerId !== dedo) return;
    let dx = e.clientX - centro.x;
    let dy = e.clientY - centro.y;
    const distancia = Math.hypot(dx, dy);
    if (distancia > RADIO_JOYSTICK) {
      dx *= RADIO_JOYSTICK / distancia;
      dy *= RADIO_JOYSTICK / distancia;
    }
    mando.style.transform = `translate(${dx}px, ${dy}px)`;

    // Igual que con W A S D: cada eje activa o no su dirección (se puede ir en diagonal)
    const x = dx / RADIO_JOYSTICK;
    const y = dy / RADIO_JOYSTICK;
    escena.avanzar = y < -ZONA_MUERTA;
    escena.retroceder = y > ZONA_MUERTA;
    escena.moverIzquierda = x < -ZONA_MUERTA;
    escena.moverDerecha = x > ZONA_MUERTA;
  }

  joystick.addEventListener('pointermove', mover);
  joystick.addEventListener('pointerup', (e) => { if (e.pointerId === dedo) soltar(); });
  joystick.addEventListener('pointercancel', (e) => { if (e.pointerId === dedo) soltar(); });
}

function activarMirada(escena, alArrastrar) {
  const lienzo = escena.renderer.domElement;
  const euler = new THREE.Euler(0, 0, 0, 'YXZ');
  const LIMITE = Math.PI / 2 - 0.01;
  let dedo = null;
  let anterior = { x: 0, y: 0 };
  let recorrido = 0;

  lienzo.style.touchAction = 'none';
  lienzo.addEventListener('contextmenu', (e) => e.preventDefault());

  lienzo.addEventListener('pointerdown', (e) => {
    if (dedo !== null) return;
    dedo = e.pointerId;
    anterior = { x: e.clientX, y: e.clientY };
    recorrido = 0;
  });

  lienzo.addEventListener('pointermove', (e) => {
    if (e.pointerId !== dedo) return;
    const dx = e.clientX - anterior.x;
    const dy = e.clientY - anterior.y;
    anterior = { x: e.clientX, y: e.clientY };
    recorrido += Math.abs(dx) + Math.abs(dy);

    // El mismo giro que hace PointerLockControls con el ratón
    euler.setFromQuaternion(escena.camera.quaternion);
    euler.y -= dx * SENSIBILIDAD;
    euler.x -= dy * SENSIBILIDAD;
    euler.x = Math.max(-LIMITE, Math.min(LIMITE, euler.x));
    escena.camera.quaternion.setFromEuler(euler);
  });

  function soltar(e) {
    if (e.pointerId !== dedo) return;
    dedo = null;
    if (recorrido > UMBRAL_ARRASTRE) alArrastrar();
  }

  lienzo.addEventListener('pointerup', soltar);
  lienzo.addEventListener('pointercancel', soltar);
}

// El juego escucha los clics en window para interactuar con los objetos.
// Al terminar de arrastrar para mirar, algunos navegadores lanzan además un clic sobre la escena:
// lo descartamos en la fase de captura, antes de que llegue al juego. Solo los de la escena,
// para no comernos un toque a un botón justo después de mirar.
function crearFiltroDeClics(lienzo) {
  let ignorarSiguiente = false;
  let temporizador = null;

  window.addEventListener('click', (e) => {
    if (!ignorarSiguiente || e.target !== lienzo) return;
    ignorarSiguiente = false;
    e.stopImmediatePropagation();
  }, true);

  return function ignorarProximoClic() {
    ignorarSiguiente = true;
    clearTimeout(temporizador);
    temporizador = setTimeout(() => { ignorarSiguiente = false; }, 400);
  };
}

// Los toques sobre los controles no deben llegar al juego como clics sobre la escena
function aislarClics(elemento, alPulsar) {
  elemento.addEventListener('click', (e) => {
    e.stopPropagation();
    if (alPulsar) alPulsar();
  });
}

async function iniciar() {
  const escena = await esperarEscena();
  const { joystick, mando, agacharse, girar } = crearInterfaz();

  activarJoystick(escena, joystick, mando);
  aislarClics(joystick);

  aislarClics(agacharse, () => {
    escena.agachado = !escena.agachado;
    agacharse.setAttribute('aria-pressed', String(escena.agachado));
    agacharse.textContent = escena.agachado ? 'Levantarse' : 'Agacharse';
  });

  aislarClics(girar, () => { girar.hidden = true; });

  activarMirada(escena, crearFiltroDeClics(escena.renderer.domElement));
}

iniciar();
