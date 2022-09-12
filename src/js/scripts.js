import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'


const twoBy4Dims = {
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
    creatTopPlate(wall);
    createBottomPlate(wall);
    createStuds(wall);
}

function creatTopPlate(wall){
    switch(wall.axis){
        case 'x': 
            wall.center.y += wall.height/2 + twoBy4Dims[2]/2;
            createBoard({width: wall.height, height: twoBy4Dims[2], depth: twoBy4Dims[4]}, {x: 0, y: wall.center.y, z: 0});
            break;
        case 'y': 
            wall.center.x += wall.height/2 + twoBy4Dims[2]/2;
            createBoard({width: twoBy4Dims[2], height: wall.height, depth: twoBy4Dims[4]}, {x: wall.center.x, y: 0, z: 0});
            break;
        default:
            wall.center.y += wall.height/2 + twoBy4Dims[2]/2;
            createBoard({width: twoBy4Dims[4], height: twoBy4Dims[2], depth: wall.height}, {x: 0, y: wall.center.y, z: 0});
    }
}

function createBottomPlate(wall){
    switch(wall.axis){
        case 'x': 
            wall.center.y -= wall.height/2 - twoBy4Dims[2]/2;
            createBoard({width: wall.height, height: twoBy4Dims[2], depth: twoBy4Dims[4]}, {x: 0, y: wall.center.y, z: 0});
            break;
        case 'y': 
            wall.center.y -= wall.length/2 - twoBy4Dims[2]/2;
            createBoard({width: twoBy4Dims[2], height: wall.height, depth: twoBy4Dims[4]}, {x: wall.center.y, y: 0, z: 0});
            break;
        default:
            wall.center.y -= wall.height/2 - twoBy4Dims[2]/2;
            createBoard({width: twoBy4Dims[4], height: twoBy4Dims[2], depth: wall.height}, {x: 0, y: wall.center.y, z: 0});
    }
}

function createStuds(wall){
    var dims;
    var sPt;

    switch(wall.axis){
        case 'x':
            dims = {width: twoBy4Dims[4], height: wall.height, depth: twoBy4Dims[2]};
            sPt = {x: , y: , z:};
            break;
        case 'y':
            dims = {width: wall.height, height: twoBy4Dims[2], depth: twoBy4Dims[4]};
            sPt = {};
            break;
        default: 
        dims = {width: twoBy4Dims[4], height: wall.height, depth: twoBy4Dims[2]};
            sPt = {};
    }

    for(let i=0; i < 9; i+=wall.offset){
        createBoard(studsStartingPoint.center, wall.axis);
        sPt = {...sPt, y+=i};
        console.log(sPt);
    }
}

function createBoard(dim, position){
    var boxGeometry = new THREE.BoxGeometry(dim.width,dim.height,dim.depth);
    var boxMaterial = new THREE.MeshBasicMaterial({
        color: 0xe6bf00,
        wireframe: false
    });
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);
    box.castShadow = true;
    box.position.set(position.x, position.y, position.z);
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
createLeftWall({length: 8, height: 8, center: {x: 0, y: 0, z: 0}, axis: 'z', offset: 2});
//creatTopPlate({length: 8, height: 8, center: {x: 0, y: 0, z: 0}, axis: 'z', offset: 2});
//createBottomPlate({length: 8, height: 8, center: {x: 0, y: 0, z: 0}, axis: 'z', offset: 2});
//createBoard({x: 1, y: 1, z: 1}, {x: .5, y: .5, z: .5});

function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();
//renderer.setAnimationLoop(animate);