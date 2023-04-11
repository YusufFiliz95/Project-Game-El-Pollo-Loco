class Chicken extends MovableObject {
    isDead = false;
    type = 'chicken'
    y = 345;
    width = 80;
    height = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = Chicken.generateXPosition();
        this.speed = 0.15 + Math.random() * 0.4;

        this.animate();
    }

    static generateXPosition() {
        const minDistance = 200;
        const minStartPosition = 600;
        const maxRange = 4300;
        const randomDistance = minDistance + Math.random() * minDistance;
        const lastChickenX = Chicken.lastChickenX || minStartPosition - randomDistance;

        const newX = lastChickenX + randomDistance;

        if (newX > maxRange) {
            return lastChickenX;
        } else {
            Chicken.lastChickenX = newX;
            return newX;
        }
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    hitbox = new Hitbox(1, 1, 1, 1);
}
