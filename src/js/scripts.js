import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth/window.innerHeight, 
        0.1, 
        1000
);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.z = 100;


const boxGeometry = new THREE.BoxGeometry(2,72,4);
const boxMaterial = new THREE.MeshBasicMaterial({color: 0xC8C8C8});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const gridHelper = new THREE.GridHelper(50,10);
scene.add(gridHelper);

function animate(){
    //requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);