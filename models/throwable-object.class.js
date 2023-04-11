class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
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

        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPINNING);
            this.x += 10;
        }, 35);
    }
}

