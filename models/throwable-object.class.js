class ThrowableObject extends MovableObject {
    isBroken = false;
    hasCollided = false;

    IMAGES_BOTTLE_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_BREAKING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_SPINNING);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.animate();
    }

/**
 * The function animates a bottle by spinning and breaking it at different intervals.
 */
    animate() {
        this.speedY = 35;
        this.applyGravity();
    
        const spinningAnimationSpeed = 35;
        const breakingAnimationSpeed = 100;
    
        const animateSpinning = () => {
            if (!this.isBroken) {
                this.playAnimation(this.IMAGES_BOTTLE_SPINNING);
                this.x += 10;
            }
        };
    
        const animateBreaking = () => {
            if (this.isBroken) {
                this.speedY = 0;
                this.speedX = 0;
                this.playAnimation(this.IMAGES_BOTTLE_BREAKING);
            }
        };
    
        setInterval(animateSpinning, spinningAnimationSpeed);
        setInterval(animateBreaking, breakingAnimationSpeed);
    }
    
    

/* Creating a new instance of the `Hitbox` class with the parameters `(1, 1, 10, 1)` and assigning it
to the `hitbox` property of the `ThrowableObject` class. This hitbox is used to detect collisions
with other objects in the game. */
    hitbox = new Hitbox(1, 1, 10, 1);
}

