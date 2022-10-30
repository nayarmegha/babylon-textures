var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //color background black
    scene.clearColor = new BABYLON.Color3.FromHexString('#000');

    //create sphere w params (x, y, z, diameter)
    var s1 = createSphere(3, 0, -1, 0.7);

    //wrap sphere in material from URL file
    s1.material = hexMat("#00FF00");
    //create sphere
    var s2 = createSphere(2, 2, 0.5, 0.5);

    //wrap sphere in material from local file
    s2.material = hexMat('#ff0000');

    var s3 = createSphere(-2, 2, 0.5, 0.5);

    //wrap sphere in material from local file
    s3.material = hexMat("#00FF00");

    //create box with params x, y, z, width, height, ddepth
    var b1 = createBox(2, -2, 2, 1, 1, 1);

    //wrap box in material colored with hex code
    b1.material = hexMat('#ff0000');

    var b2 = createBox(1, -3, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b2.material = fileMat('mine.png');

    var b3 = createBox(3, -5, 3, 2, 2, 2);

    //wrap box in material from local file
    b3.material = fileMat('present.png');
   

    var b4 = createBox(5, -5, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b4.material = fileMat('possession.png');

    var b5 = createBox(0, 5, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b5.material = fileMat('possession.png');
    var b6 = createBox(5, 3, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b6.material = fileMat('control.jpg');

    var b7 = createBox(6, -2, 2, 1, 1, 1);

    //wrap box in material colored with hex code
    b7.material = hexMat('#ff0000');

    var b8 = createBox(7, -5, 2, 1, 1, 1);

    //wrap box in material colored with hex code
    b8.material = hexMat("#00FF00");

    var b9 = createBox(8, -3, 2, 1, 1, 1);

    //wrap box in material colored with hex code
    b9.material = hexMat("#00FF00");
    var b10 = createBox(0, 1, 2, 1, 1, 1);

    //wrap box in material colored with hex code
    b10.material = hexMat('#ff0000');


    var b11 = createBox(-2, 0, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b11.material = fileMat('control2.jpg');

  

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});