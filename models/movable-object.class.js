class MovableObject extends DrawableObject {
    speed = 0.09;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    health = 100;
    lastHit = 0;
    maxHeight = 10;

/**
 * The "remove" function removes the current item from the world's list of items.
 */
    remove() {
        this.world.items = this.world.items.filter(item => item !== this);
    }

/**
 * The function applies gravity to an object by decreasing its vertical position and speed over time.
 */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                // Check if the maximum height has been reached
                if (this.y < this.maxHeight) {
                    this.speedY = 0;
                    this.y = this.maxHeight;
                }
            }
        }, 40);
    }

/**
 * The function checks if an object is above ground level or not.
 * @returns If the object is an instance of ThrowableObject, the function will always return true.
 * Otherwise, it will return true if the object's y-coordinate is less than 185 (indicating that it is
 * above ground) and false otherwise.
 */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return true
        } else {
        } return this.y < 185;
    }

/**
 * The function checks if two objects are colliding based on their hitboxes and margins.
 * @param mo - "mo" is an abbreviation for "moving object". It is likely a reference to another object
 * in the game that is capable of movement and collision detection.
 * @returns The function `isColliding` is returning a boolean value. It returns `true` if the two
 * objects being compared are colliding, and `false` if they are not colliding.
 */
    isColliding(mo) {
        if (this.hitbox && mo.hitbox) {
            return this.hitbox.isColliding(
                this.x, this.y, this.width, this.height,
                mo.x, mo.y, mo.width, mo.height,
                this.hitbox.marginTop, this.hitbox.marginRight, this.hitbox.marginBottom, this.hitbox.marginLeft,
                mo.hitbox.marginTop, mo.hitbox.marginRight, mo.hitbox.marginBottom, mo.hitbox.marginLeft
            );
        } else {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height;
        }
    }
    

/**
 * The "hit" function reduces the health of an object by 20 and updates the last hit time if the health
 * is not already zero.
 */
    hit() {
        this.health -= 20;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime(); // Difference in ms
        }
    }

/**
 * The function checks if the time passed since the last hit is less than 0.7 seconds and returns a
 * boolean value.
 * @returns The function `isHurt()` is returning a boolean value. It returns `true` if the time passed
 * since the last hit is less than 0.7 seconds, indicating that the object is still in a hurt state.
 * Otherwise, it returns `false`, indicating that the object has recovered from the hit.
 */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 0.7;
    }

/**
 * The function checks if the object's health is equal to zero and returns a boolean value.
 * @returns The method `isDead()` is returning a boolean value that indicates whether the `health`
 * property of the object is equal to 0 or not. If the `health` property is equal to 0, then the method
 * will return `true`, indicating that the object is dead. Otherwise, it will return `false`,
 * indicating that the object is still alive.
 */
    isDead() {
        return this.health == 0;
    }

/* The `moveRight()` function is defining a method for the `MovableObject` class that logs the message
"Moving right" to the console. It does not actually move the object to the right, but it could be
used as a placeholder function that could be replaced with code to move the object to the right. */
    moveRight() {
        console.log('Moving right')
    };

/**
 * The function moves an object to the left at a constant speed.
 */
    moveLeft() {
        setInterval(() => {
            if (!this.isDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60)
    }
    
/**
 * The function moves a cloud to the left at a specified speed.
 */
    moveCloudLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

/**
 * The "jump" function sets the value of "speedY" to 30.
 */
    jump() {
        this.speedY = 30;
    }

/**
 * The function plays an animation by cycling through a given array of images.
 * @param images - an array of image paths that will be used to play an animation.
 */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}