/**
 * Created by charleen on 12/15/16.
 */
var viewFrameWidth = window.innerWidth;
var viewFrameHeight = window.innerHeight;

var scene, camera, renderer;

var colorMood = 0x000000;
var colorMaterials = 0xF3F3F3;

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(30, viewFrameWidth / viewFrameHeight, 0.05, 50);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("scene"),
        antialias: true
    });

    renderer.setSize(viewFrameWidth, viewFrameHeight);
    renderer.setClearColor(colorMood, 1);

}

init();

window.addEventListener('resize', function(){
    viewFrameWidth =  window.innerWidth;
    viewFrameHeight = window.innerHeight;

    renderer.setSize(viewFrameWidth, viewFrameHeight);
    camera.aspect = viewFrameWidth / viewFrameHeight;
    camera.updateProjectionMatrix();
});

function PylonMess(){

    var maxWidth = 0.05;
    var minWidth = 0.0001;
    this.height = Math.floor(Math.random() * 4) + 0.5;

    var transform = (1 / this.height);

    if (transform > maxWidth){
        this.width = maxWidth;
    } else if (transform < minWidth){
        this.width = minWidth;
    } else {
        this.width = transform;
    }

    this.geometry = new THREE.CubeGeometry(this.width, this.width, this.height);
    // this.geometry = new THREE.TetrahedronBufferGeometry(1,0);
    //this will set the mesh's bottom as the origin point
    // this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,10));

    // var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
    // vertex.normalize();
    // vertex.multiplyScalar( 450 );
    // this.geometry.vertices.push( vertex );
    // var vertex2 = vertex.clone();
    // vertex2.multiplyScalar( Math.random() * 0.3 + 1 );
    // this.geometry.vertices.push( vertex2 );
    //
    // var line = new THREE.Line( this.geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: Math.random() } ) );
    // return line;

    this.material = new THREE.MeshPhongMaterial({
        color: colorMaterials,
        wireframe: true,
        wireframeLinewidth: 2

    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    return this.mesh;

}


scene.fog = new THREE.FogExp2(colorMood, 0.2);
var light = new THREE.HemisphereLight(0xCFE2F3, 0xdddddd, 5);

scene.add(light);

var plight = new THREE.PointLight(0x3e7dae, 2);
light.position.set(0, 0, 50);
scene.add(plight);

var tmp;

for (var i = 0; i < 1000; i++){

    var tmp = new PylonMess();

    var ridic1 = Math.random();
    var ridic2 = Math.random();

    tmp.position.x = (ridic1 * 15 - 5);
    tmp.position.y = (ridic2 * 15 - 5);

    scene.add(tmp);
}

camera.position.z = 8;


var easingTime = 0.00009;
var cameraZMin = 8;
var cameraZMax = 10;
var speedDefault = 0.0001;
var speedMod = 0;
var randomTimeoutTime;
var easingTimeSwitchTime;

var dir, up, zVerticalSpeed, zRotationalSpeed;

function randomize(){
    dir = Math.floor(Math.random() * 1) ? 'x' : 'y';
    up = Math.floor(Math.random() * 3) ? true : false;
    zVerticalSpeed = (Math.random() * 2 - 1) / 1500;
    zRotationalSpeed = (Math.random() * 2 - 1) / 1800;
    speed = 0;
}
randomize();

function randomTimeout(){

    randomTimeoutTime = Math.floor(Math.random() * 7000) + 600;
    //randomTimeoutStartTime = (new Date()).getTime();
    easingTimeSwitchTime = Date.now() + (randomTimeoutTime / 2);

    //console.log(time);
    speedMod = (Math.random() * 2 - 1) / 2000;
    speed += speedMod;

    randomize();

    setTimeout(randomTimeout, randomTimeoutTime);
}
randomTimeout();

function render(){
    requestAnimationFrame(render);


    if (up){
        xy = speed;
    } else {
        xy = -speed;
    }

    camera.rotation.z += zRotationalSpeed;

    if (camera.position.z < cameraZMin){
        camera.position.z += Math.abs(zVerticalSpeed);
    } else if (camera.position.z > cameraZMax){
        camera.position.z -= Math.abs(zVerticalSpeed);
    } else {
        camera.position.z += zVerticalSpeed;
    }

    camera.position[dir] += xy;
    if (Math.abs(camera.position[dir]) >= 20){
        up = !up;
    }

    renderer.render(scene, camera);
}
render();