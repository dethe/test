// starter code from http://www.aerotwist.com/tutorials/getting-started-with-three-js/

function initThree(){
    // set the scene size
    var WIDTH = 500,
      HEIGHT = 500;

    // set some camera attributes
    var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

    // get the DOM element to attach to
    var $container = document.querySelector('#home');

    // create a WebGL renderer, camera
    // and a scene
    window.renderer = new THREE.WebGLRenderer();
    window.camera =
      new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);

    window.scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.appendChild(renderer.domElement);

    // set up the sphere vars
    var radius = 75,
        segments = 16,
        rings = 16;


    window.texture = new THREE.Texture(canvas);
    texture.doubleSided = true;
    texture.needsUpdate = true;
    window.sphereMaterial =
        new THREE.MeshBasicMaterial({ map: texture });
    //  sphereMaterial.transparent = true;
    // sphereMaterial.doubleSided = true;

    // create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    window.sphere = new THREE.Mesh(

      new THREE.SphereGeometry(
        radius,
        segments,
        rings),

      sphereMaterial);
    // sphere.transparent = true;
    // sphere.doubleSided = true;

    // add the sphere to the scene
    scene.add(sphere);


    // create a point light
    window.pointLight =
      new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);
}

// draw!
function render(){
    texture.needsUpdate = true;
    sphere.rotation.z += 0.003;
    sphere.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(drawTexture);
};

function initTexture(){
    window.canvas = document.querySelector('#texture');
    window.context = canvas.getContext('2d');
    window.cycle = new Cycle();
    window.flowers = [];
    for (var i = 0; i < 30; i++){
        flowers.push(new Flower(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)));
    }
}
var framecount = 0;
var degree = Math.PI / 180;

function Cycle(){
    var value = 0;
    var degree = Math.PI / 180;
    this.next = function(){
        value = (value + 1) % 360;
    };
    this.valueOf = function(){
        return Math.sin(value * degree);
    };
    this.angle = function(){
        return value * degree;
    };
    this.rawValue = function(){
        return value;
    };
}

function Flower(x,y){
    this.x = x;
    this.y = y;
    this.dx = 0.5 - Math.random();
    this.dy = 0.5 - Math.random();
    this.petals = Math.floor(Math.random() * 4) + 3;
    this.height = Math.floor(Math.random() * 30) + 50;
}
Flower.prototype.draw = function(cycle){
    var angle = (Math.PI * 2) / this.petals;
    this.x = (this.x + this.dx) % 600;
    if (this.x < -100) this.x = 600;
    this.y = (this.y + this.dy) % 600;
    if (this.y < 100) this.y = 600;
    for (var i = 0; i < this.petals; i++){
        this.petal(angle *  i + cycle);
    }
};
Flower.prototype.petal = function(angle){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(angle);
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.beginPath()
    context.moveTo(0,0);
    context.arcTo(-5,this.height/2,0,this.height,5);
    context.arcTo(5,this.height/2,0,0,5);
    context.arcTo(15,this.height,-5,this.height/2,8);
    //context.closePath();
    context.stroke();
    context.restore();
};

function drawTexture(){
    cycle.next();
    context.fillStyle = 'rgba(0,0,255, 0.02';
    context.fillRect(0,0,500,500);
    // context.clearRect(0,0,500,500);
    flowers.forEach(function(flower){
        flower.draw(cycle.angle());
    });
    requestAnimationFrame(render);
}

function start(){
    initTexture();
    initThree();
    render();
}

start();
