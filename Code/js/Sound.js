class Sound{
    constructor(file, camera, volume, loop){
        const listener = new THREE.AudioListener();
        camera.add( listener );
        let sound = new THREE.Audio( listener );
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(file, function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( loop );
            sound.setVolume(volume);
        });
        this.sound = sound;
    }
    play(){
        this.sound.play();
    }
}