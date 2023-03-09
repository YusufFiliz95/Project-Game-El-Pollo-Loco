class Character extends MovableObject {

    width = 150;
    height = 300;
    y = 135;
    speed = 5;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walking_sound = new Audio('audio/running.mp3');



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();

    }

    animate() {

        let isWalking = false;

        setInterval(() => {
            if (!isWalking) {
                this.walking_sound.pause();
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.playbackRate = 2;
                if (!isWalking) {
                    this.walking_sound.play();
                    isWalking = true;
                }
            }
            if (this.world.keyboard.LEFT && this.x > -600) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.playbackRate = 2;
                if (!isWalking) {
                    this.walking_sound.play();
                    isWalking = true;
                }
            }
            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.walking_sound.pause();
                isWalking = false;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        
        
        

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                //Walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 55);
    }

    jump() {

    }
}