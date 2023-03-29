class Character extends MovableObject {

    width = 110;
    height = 220;
    y = -50; // 135
    speed = 5;
    isJumping = false;

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    world;
    walking_sound = new Audio('audio/running.mp3');



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
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

            if(this.world.keyboard.UP || this.world.keyboard.SPACE) {
                if(!this.isJumping) {
                    this.isJumping = true;
                    this.jump();
                }
            } else {
                this.isJumping = false;
            }             this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        let currentAnimation = null;
        let currentTimeout = null;

        const updateAnimation = () => {
            let newAnimation = null;
            let newTimeout = null;
        
            if (this.isDead()) {
                newAnimation = this.IMAGES_DEAD;
                newTimeout = 100;
            } else if (this.isHurt()) {
                newAnimation = this.IMAGES_HURT;
                newTimeout = 100;
            } else if (this.isAboveGround()) {
                this.walking_sound.pause();
                newAnimation = this.IMAGES_JUMPING;
                newTimeout = 100;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.walking_sound.play();
                newAnimation = this.IMAGES_WALKING;
                newTimeout = 70;
            } else {
                newAnimation = this.IMAGES_STANDING;
                newTimeout = 150;
            }
        
            if (newAnimation !== currentAnimation) {
                currentAnimation = newAnimation;
                if (currentTimeout) {
                    clearTimeout(currentTimeout);
                }
                const playCurrentAnimation = () => {
                    this.playAnimation(currentAnimation);
                    currentTimeout = setTimeout(playCurrentAnimation, newTimeout);
                };
                playCurrentAnimation();
            }
        };
        
        const animationInterval = setInterval(updateAnimation, 55);
        
    }

    jump() {
        if(!this.isAboveGround()) {
            this.speedY = 40;
        }
    }

    hitbox = new Hitbox(20, 10);
}