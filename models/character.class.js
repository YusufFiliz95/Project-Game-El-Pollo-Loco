class Character extends MovableObject {

    type = 'character'
    width = 110;
    height = 220;
    y = -50; // 135
    speed = 50; //5
    isJumping = false;
    startPositionX = this.x;


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
    ]; 5

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
    jumping_sound = new Audio('audio/jump.mp3');
    is_hurt = new Audio('audio/hurt.mp3');
    is_dead = new Audio('audio/dead.mp3');
    collect_coin = new Audio('audio/coin.mp3');
    collect_bottle = new Audio('audio/bottle.mp3');
    bottle_breaking = new Audio('audio/glass.mp3');
    endboss_hurt = new Audio('audio/endboss_hurt.mp3');
    endboss_attack = new Audio('audio/endboss_attack.mp3');
    endboss_dead = new Audio('audio/endboss_dead.mp3');
    chicken_dead = new Audio('audio/chicken.mp3');
    smallChicken_dead = new Audio('audio/smallchicken.mp3');



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyHorizontalDamping();
        this.applyGravity();
        this.animate();
        this.gameOverTriggered = false; 
    }

    handleCollision(item) {
        if (this.hitTest(item)) {
            if (item.type === 'coin') {
                this.collectedCoins++;
                item.remove();
            } else if (item.type === 'bottle') {
                this.collectedBottles++;
                item.remove();
            }
        }
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
            if (this.world.keyboard.LEFT && this.x > -1200) {
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

            if (this.world.keyboard.UP || this.world.keyboard.SPACE) {
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.jump();
                }
            } else {
                this.isJumping = false;
            } this.world.camera_x = -this.x + 100;
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        let currentAnimation = null;
        let currentTimeout = null;

        const updateAnimation = () => {
            let newAnimation = null;
            let newTimeout = null;

            if (this.isDead()) {
                if (!this.deadOnce && !this.gameOverTriggered) {
                    newAnimation = this.IMAGES_DEAD;
                    newTimeout = 100;
                    this.is_dead.play();
                    setTimeout(() => {
                        gameOver();
                    }, 1000);
                    this.gameOverTriggered = true;
                }
            } else if (this.isHurt()) {
                newAnimation = this.IMAGES_HURT;
                this.is_hurt.play();
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
                    if (currentAnimation) { // Add this line
                        this.playAnimation(currentAnimation);
                    } // Add this line
                    currentTimeout = setTimeout(playCurrentAnimation, newTimeout);
                };
                playCurrentAnimation();
            }
        };
        setInterval(updateAnimation, 55);
    }

    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 40;
            this.jumping_sound.play();
        }
    }

    hitByEndboss() {
        this.speedX = -35;
        this.speedY = 40;
        this.health -= 20;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    bounceOnCollision(enemy) {
        this.y = enemy.y - this.height;
        this.speedY = 40;
    }

    getDistanceTraveled() {
        return Math.abs(this.x - this.startPositionX);
    }

    applyGravity() {
        setInterval(() => {
            this.x += this.speedX;

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;


                if (this.y < this.maxHeight) {
                    this.speedY = 0;
                    this.y = this.maxHeight;
                }
            }
        }, 40);
    }

    applyHorizontalDamping() {
        setInterval(() => {
            if (Math.abs(this.speedX) > 0.1) {
                this.speedX *= 0.9;
            } else {
                this.speedX = 0;
            }
        }, 40);
    }

    hitbox = new Hitbox(85, 25, 10, 20);
}