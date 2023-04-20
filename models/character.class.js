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
    bottle_throwing = new Audio('audio/throw.mp3');
    endboss_hurt = new Audio('audio/endboss_hurt.mp3');
    endboss_attack = new Audio('audio/endboss_attack.mp3');
    endboss_dead = new Audio('audio/endboss_dead.mp3');
    chicken_dead = new Audio('audio/chicken.mp3');
    smallChicken_dead = new Audio('audio/smallchicken.mp3');

    muteAllSounds() {
        this.walking_sound.muted = true;
        this.jumping_sound.muted = true;
        this.is_hurt.muted = true;
        this.is_dead.muted = true;
        this.collect_coin.muted = true;
        this.collect_bottle.muted = true;
        this.bottle_breaking.muted = true;
        this.bottle_throwing.muted = true;
        this.endboss_hurt.muted = true;
        this.endboss_attack.muted = true;
        this.endboss_dead.muted = true;
        this.chicken_dead.muted = true;
        this.smallChicken_dead.muted = true;
    }

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

/**
 * The function handles collisions between the player and items, incrementing the collected coins or
 * bottles and removing the item accordingly.
 * @param item - The parameter "item" is an object that represents an item in the game that the
 * player's character can collide with. The function "handleCollision" is called when the player's
 * character collides with an item, and it checks the type of the item (whether it is a coin or a
 * bottle
 */
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

/**
 * The function animates the movement and actions of a character in a game, including walking, jumping,
 * and playing different animations based on the character's state.
 */

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
                        if (this instanceof Character) {
                            this.muteAllSounds();
                        }
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

/**
 * The "jump" function sets the speed of an object to 40 and plays a sound if the object is not above
 * the ground.
 */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 40;
            this.jumping_sound.play();
        }
    }

/**
 * The function decreases the health of an object and changes its speed when hit by an end boss in a
 * game.
 */
    hitByEndboss() {
        this.speedX = -80;
        this.speedY = 40;
        this.health -= 20;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

/**
 * The function sets the position and speed of an object when it collides with an enemy.
 * @param enemy - The "enemy" parameter is likely an object representing an enemy or obstacle in a
 * game. The function "bounceOnCollision" is likely called when the player's character collides with
 * the enemy, and it sets the player's position and speed to simulate a bouncing effect. Specifically,
 * it sets the player
 */
    bounceOnCollision(enemy) {
        this.y = enemy.y - this.height;
        this.speedY = 40;
    }

/**
 * The function calculates the absolute distance traveled by an object in the x-axis from its starting
 * position.
 * @returns The `getDistanceTraveled()` method is returning the absolute value of the difference
 * between the current `x` position and the starting position `startPositionX`. This represents the
 * distance traveled by the object along the x-axis.
 */
    getDistanceTraveled() {
        return Math.abs(this.x - this.startPositionX);
    }

/**
 * The function applies gravity to an object's movement in a game by adjusting its position and speed.
 */
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

/**
 * The function applies horizontal damping to reduce the speed of an object over time.
 */
    applyHorizontalDamping() {
        setInterval(() => {
            if (Math.abs(this.speedX) > 0.1) {
                this.speedX *= 0.9;
            } else {
                this.speedX = 0;
            }
        }, 40);
    }

/* Creating a new instance of the `Hitbox` class with the parameters `85`, `25`, `10`, and `20`, and
assigning it to the `hitbox` property of the `Character` class. This `Hitbox` instance represents
the hitbox or collision box of the character in the game. */
    hitbox = new Hitbox(85, 25, 10, 20);
}