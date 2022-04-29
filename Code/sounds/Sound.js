
let bgmSound;
let endSound;
let pointSound_1;
let pointSound_2;
let tadaSound;
let timeUpSound;
let clawSound;

function loadSound(){
    bgmSound = new Sound('../Code/sounds/bgm.wav', camera, 10, true);
    endSound = new Sound('../Code/sounds/end.wav', camera, 10, false);
    pointSound_1 = new Sound('../Code/sounds/point_1.wav', camera, 10, false);
    pointSound_2 = new Sound('../Code/sounds/point_2.wav', camera, 10, false);
    timeUpSound = new Sound('../Code/sounds/point.wav', camera, 10, false);
    tadaSound = new Sound('../Code/sounds/tada.wav', camera, 7, false);
    clawSound = new Sound('../Code/sounds/claw.wav', camera, 3, false);
 }