import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'


const twoBy4 = {
    2: 2/12,
    4: 4/12
}
const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xC8C8C8);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = 50;
//camera.up.set(0,1,0);
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Create controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

//Create a DirectionalLight and turn on shadows for the light
const directionalLight = new THREE.DirectionalLight( 0xffffff, .8 );
scene.add( directionalLight );
directionalLight.position.set(-30, 30,0)

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 3);
scene.add(dLightHelper);

// Grid
const gridHelper = new THREE.GridHelper(20,100);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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

function buildHouseWalls(){
    createFrontWall();
    createBackWall();
    createLeftWall();
    createRightWall();
}

function createLeftWall(wall){ 
    creatTopPlate({...wall, center: {}});
    createBottomPlate({...wall, center: {}});
    createStuds({...wall, center: {}});
}

function creatTopPlate(wall){
    createBoard({...wall, center: {x: wall.center.x, y: wall.center.y + wall.height/2, z: wall.center.z}}, 'y');
}

function createBottomPlate(wall){
    var new_center;
    switch(wall.axis){
        case 'x':
            break;
        case 'y':
            break;
        default:

    }

    createBoard({...wall, center: {x: wall.center.x, y: wall.center.y - wall.height/2, z: wall.center.z}},  'y');
}

function createStuds(wall){
    var studsStartingPoint = {...wall, center: {x: wall.center.x + wall.x, y: wall.center.y, z: wall.center.z}};

    while(0){
        createBoard(studsStartingPoint.center, wall.axis);
        studsStartingPoint = {...studsStartingPoint, center: {x: wall.center.x - i*wall.offset, y: wall.center.y, z: wall.center.z}};
        console.log(studsStartingPoint);
    }
}

function createBoard(wall, axis){
    var boxGeometry;
    
    switch(axis){
        case 'x':
            boxGeometry = new THREE.BoxGeometry(2/12, 72/12, 4/12);
            break;
        case 'y':
            boxGeometry = new THREE.BoxGeometry(72/12,2/12,4/12);
            break;
        default:
            boxGeometry = new THREE.BoxGeometry(4/12,72/12,2/12);
    }
    var boxMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: false
    });
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);
    box.castShadow = true;
    box.position.set(wall.x, wall.y, wall.z);
}

function addGuiControls(){
    const gui = new dat.GUI();
    const options = {
        color: '#ffee00'
    }
    
    gui.addColor(options, 'color').onChange(function(e){
        box.material.color.set(e);
    });
    
    gui.add(camera.position, 'x', -100, 100).name("Camera X Axis");
    gui.add(camera.position, 'y', -100, 100).name("Camera Y Axis");
    gui.add(camera.position, 'z', -100, 100).name("Camera Z Axis");
    
    //gui.add(box.position, 'x', -100, 100).name("Box X Axis");
    //gui.add(box.position, 'y', -100, 100).name("Box Y Axis");
    //gui.add(box.position, 'z', -100, 100).name("Box Z Axis");
    console.log(gridHelper);
    //gui.add(gridHelper.scale, 'x', -10, 10).name("Grid Sizing X Axis");
    //gui.add(gridHelper.scale, 'y', -10, 10).name("Grid Sizing Y Axis");
    //gui.add(gridHelper.scale, 'z', -10, 10).name("Grid Sizing Z Axis");
}

addGuiControls();
createLeftWall({length: 8, height: 8, center: {x: 0, y: 0, z: 0}, axis: 'x', offset: 2});

function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();
//renderer.setAnimationLoop(animate);