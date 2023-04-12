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
                this.playAnimation(this.IMAGES_BOTTLE_BREAKING, () => {
                    if (this.currentImage === this.IMAGES_BOTTLE_BREAKING.length - 1) {
                        const throwableObjectIndex = this.world.throwableObjects.indexOf(this);
                        if (throwableObjectIndex > -1) {
                            this.world.throwableObjects.splice(throwableObjectIndex, 1);
                        }
                    }
                });
            }
        };
    
        setInterval(animateSpinning, spinningAnimationSpeed);
        setInterval(animateBreaking, breakingAnimationSpeed);
    }
    
    

    hitbox = new Hitbox(1, 1, 10, 1);
}

