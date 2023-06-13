import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setSize(window.innerWidth, window.innerHeight);

const orbitControls = new OrbitControls(camera, document.querySelector('#bg'));

const uniforms = {
    u_time: {type: 'f', value: 0.0}
}

const sphereGeometry = new THREE.SphereGeometry(10, 64, 32);
const sphereMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    wireframe: true,
    uniforms
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);

camera.position.set(0,0,20);

const clock = new THREE.Clock();

function animate() {
    uniforms.u_time.value = clock.getElapsedTime();

    requestAnimationFrame(animate);

    orbitControls.update();

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = (document.documentElement.clientWidth - 400) / (document.documentElement.clientHeight / 2);
    
    camera.updateProjectionMatrix();

    renderer.setSize(document.documentElement.clientWidth - 400, document.documentElement.clientHeight / 2);
});
