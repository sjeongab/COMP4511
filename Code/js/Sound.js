class Sound{
    constructor(file, camera, volume){
        const listener = new THREE.AudioListener();
        camera.add( listener );
        let sound = new THREE.Audio( listener );
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(file, function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( false );
            sound.setVolume(volume);
        });
        this.sound = sound;
    }
    play(){
        this.sound.play();
    }
}