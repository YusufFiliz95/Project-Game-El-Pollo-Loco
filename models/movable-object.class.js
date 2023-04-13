class MovableObject extends DrawableObject {
    speed = 0.09;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    health = 100;
    lastHit = 0;
    maxHeight = 10;

    remove() {
        this.world.items = this.world.items.filter(item => item !== this);
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                // Überprüfen, ob die maximale Höhe erreicht wurde
                if (this.y < this.maxHeight) {
                    this.speedY = 0;
                    this.y = this.maxHeight;
                }
            }
        }, 40);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return true
        } else {
        } return this.y < 185;
    }

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
    

    hit() {
        this.health -= 20;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime(); // Difference in ms
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 0.7;
    }

    isDead() {
        return this.health == 0;
    }


    moveRight() {
        console.log('Moving right')
    };

    moveLeft() {
        setInterval(() => {
            if (!this.isDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60)
    }
    
    
    moveCloudLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}