import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Configurar OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Habilita la amortiguación (smooth)
controls.dampingFactor = 0.25;  // Factor de amortiguación
controls.enableZoom = true;     // Habilita el zoom
controls.enablePan = true;      // Habilita el movimiento lateral

scene.background = new THREE.Color(0x2e2c2c); // Color gris

// Luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);

// Luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Carga y posición de diferentes modelos
const gltfLoader = new GLTFLoader();

// Arreglo de modelos y sus posiciones
const models = [
    { path: '/models/RAM-DDR4/scene.gltf', position: { x: -15, y: -5, z: 0 }, scale: 1.5 }, // RAM DDR4
    { path: '/models/RAM-DDR3/scene.gltf', position: { x: 0, y: 0, z: 0 }, scale: 0.01 }, // RAM DDR3
    { path: '/models/MOTHERBOARD/scene.gltf', position: { x: 15, y: 0, z: 0 }, scale: 3 }  // Motherboard
];

// Función para cargar modelos
function loadModel(model) {
    gltfLoader.load(model.path, (gltf) => {
        const loadedModel = gltf.scene;
        loadedModel.scale.set(model.scale, model.scale, model.scale);
        loadedModel.position.set(model.position.x, model.position.y, model.position.z);
        scene.add(loadedModel);
    });
}

// Cargar todos los modelos
models.forEach(loadModel);

camera.position.z = 5;

// Animación
function animate() {
    controls.update(); // Solo se necesita si enableDamping está habilitado
    renderer.render(scene, camera);
}

// Respuesta al evento de redimensionamiento de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar el bucle de animación
renderer.setAnimationLoop(animate);
