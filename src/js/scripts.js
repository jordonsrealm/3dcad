import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xC8C8C8);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth/window.innerHeight, 
        0.1, 
        1000
);


//Create a DirectionalLight and turn on shadows for the light
const directionalLight = new THREE.DirectionalLight( 0xffffff, .8 );
scene.add( directionalLight );
directionalLight.position.set(-30, 60,0)

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);


const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.z = 50;

const boxGeometry = new THREE.BoxGeometry(2,72,4);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF0000
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.castShadow = true;

const gridHelper = new THREE.GridHelper(50,10);
scene.add(gridHelper);

const gui = new dat.GUI();

const options = {
    color: '#ffee00'
}

gui.addColor(options, 'color').onChange(function(e){
    box.material.color.set(e);
});

// gui.add(boxGeometry, 'width')
//     .min(1)
//     .max(10)
//     .step(0.1)
//     .name('cubeWidth')
//     .onChange((value) => {
//         box.geometry.dispose();

//         boxGeometry.parameters.width = parameter.width
//         console.log(mesh)

//     })
gui.add(camera.position, 'x', -100, 100);
gui.add(camera.position, 'y', -100, 100);
gui.add(camera.position, 'z', -100, 100);

function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();
//renderer.setAnimationLoop(animate);