class Smallchicken extends MovableObject {
    isDead = false;
    type = 'smallchicken'
    y = 370;
    width = 50;
    height = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = Smallchicken.generateXPosition();
        this.speed = 0.15 + Math.random() * 0.4;

        this.animate();
    }

    static generateXPosition() {
        const minDistance = 500;
        const minStartPosition = 500;
        const maxRange = 4300;
        const randomDistance = minDistance + Math.random() * minDistance;
        const lastChickenX = Smallchicken.lastChickenX || minStartPosition - randomDistance;

        const newX = lastChickenX + randomDistance;

        if (newX > maxRange) {
            return lastChickenX;
        } else {
            Smallchicken.lastChickenX = newX;
            return newX;
        }
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    hitbox = new Hitbox(12, 1, 1, 1);
}
