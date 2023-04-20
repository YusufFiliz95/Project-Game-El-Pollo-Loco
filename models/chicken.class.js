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

    }

/**
 * This function generates a random x position for a chicken in a game, ensuring a minimum distance
 * between chickens and a maximum range.
 * @returns a randomly generated x-position for a chicken object in a game. If the new x-position
 * exceeds the maximum range, the function returns the last x-position of the previous chicken object.
 */
    static generateXPosition() {
        const minDistance = 350;
        const minStartPosition = 600;
        const maxRange = 6600;
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

/**
 * The function animates the character by moving it left and playing a walking animation.
 */
    animate() {
        if (world && world.isGameStarted()) {
            this.moveLeft();
        }
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

/* Creating a new instance of the `Hitbox` class and assigning it to the `hitbox` property of the
`Chicken` class. The `Hitbox` class is likely used to define the collision detection area for the
chicken object in the game. */
    hitbox = new Hitbox(15, 1, 1, 1);
}
