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
    }

/**
 * This function generates a random x position for a chicken game object with certain constraints.
 * @returns a randomly generated x-position for a small chicken object in a game, taking into account
 * the minimum distance between chickens, the minimum starting position, and the maximum range. If the
 * new x-position exceeds the maximum range, the function returns the last chicken's x-position
 * instead.
 */
    static generateXPosition() {
        const minDistance = 500;
        const minStartPosition = 500;
        const maxRange = 5000;
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
        }, 100);
    }

/* Creating a new Hitbox object with specific parameters and assigning it to the `hitbox` property of
the `Smallchicken` class. The `Hitbox` object is used to define the collision detection area for the
chicken game object. The parameters passed to the `Hitbox` constructor are the x-offset, y-offset,
width, and height of the hitbox. */
    hitbox = new Hitbox(12, 1, 1, 1);
}
