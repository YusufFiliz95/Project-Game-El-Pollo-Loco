class World {

    character = new Character();
    level = level1;
    canvas;
    ctx; // ctx = context
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 10);
    }


    checkThrowableObjects() {
        const throwBottleIfPossible = () => {
            if (this.statusBarBottle.count > 0) {
                this.statusBarBottle.decrementCount();
                let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 40);
                this.throwableObjects.push(bottle);
            }
        };

        if (this.keyboard.E && this.keyboard.keyReleased.E) {
            this.keyboard.keyReleased.E = false;
            throwBottleIfPossible();
        }
        if (this.keyboard.F && this.keyboard.keyReleased.F) {
            this.keyboard.keyReleased.F = false;
            throwBottleIfPossible();
        }
        if (this.keyboard.ENTER && this.keyboard.keyReleased.ENTER) {
            this.keyboard.keyReleased.ENTER = false;
            throwBottleIfPossible();
        }
    }

    /**
    Checks collisions between the character and enemies.
    If the character collides with a chicken, checks if the character is above it and kills the chicken.
    If the character collides with a smallchicken, checks if the character is below it and kills the smallchicken.
    If the character collides with a coin, increments the coin count and removes the coin.
    If the character collides with a bottle, increments the bottle count and removes the bottle.
    */
    checkCollisions() {
        this.checkThrowableObjectCollisions();

        for (let index = this.level.enemies.length - 1; index >= 0; index--) {
            const enemy = this.level.enemies[index];
            if (this.character.isColliding(enemy)) {
                if (enemy.type === 'chicken') {
                    this.checkChickenCollision(enemy);
                } else if (enemy.type === 'smallchicken') {
                    this.checkSmallChickenCollision(enemy);
                } else if (enemy.type === 'endboss') {
                    this.checkEndbossCollision(index);
                } else if (enemy.type === 'coin') {
                    this.checkCoinCollision(index);
                } else if (enemy.type === 'bottle') {
                    this.checkBottleCollision(index);
                }
            }
        }
    }

    /**
     * This function checks for collisions between throwable objects and enemies in a game and removes the
     * throwable object and sets the enemy to dead if a collision occurs.
     */
    /**
     * Handles throwable object collisions with enemies.
     */
    checkThrowableObjectCollisions() {
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            const throwableObject = this.throwableObjects[i];
            if (!throwableObject.isBroken) {
                for (let j = this.level.enemies.length - 1; j >= 0; j--) {
                    const enemy = this.level.enemies[j];
                    if (throwableObject.isColliding(enemy) && (enemy.type === 'chicken' || enemy.type === 'smallchicken' || enemy.type === 'endboss')) {
                        this.handleThrowableObjectCollision(throwableObject, enemy, i);
                        break;
                    }
                }
            }
        }
    }

    /**
     * Handles the collision between a throwable object and an enemy.
     * @param {ThrowableObject} throwableObject - The throwable object involved in the collision.
     * @param {MovableObject} enemy - The enemy involved in the collision.
     * @param {number} throwableObjectIndex - The index of the throwable object in the throwableObjects array.
     */
    handleThrowableObjectCollision(throwableObject, enemy, throwableObjectIndex) {
        this.breakThrowableObject(throwableObject);
        this.removeThrowableObject(throwableObjectIndex);
        enemy.isDead = true;
        enemy.loadImage(enemy.IMAGES_DEAD[0]);
        if (enemy.type === 'chicken') {
            this.handleChickenCollision(enemy);
        } else if (enemy.type === 'smallchicken') {
            this.handleSmallChickenCollision(enemy);
        } else if (enemy.type === 'endboss') {
            this.handleEndbossCollision(enemy);
        }
    }

    /**
     * Breaks the throwable object after a collision.
     * @param {ThrowableObject} throwableObject - The throwable object to break.
     */
    breakThrowableObject(throwableObject) {
        throwableObject.isBroken = true;
        throwableObject.currentImage = 0;
        throwableObject.loadImages(throwableObject.IMAGES_BOTTLE_BREAKING);
    }

    /**
     * Removes the throwable object from the array after a collision.
     * @param {number} index - The index of the throwable object in the throwableObjects array.
     */
    removeThrowableObject(index) {
        setTimeout(() => {
            this.throwableObjects.splice(index, 1);
        }, 600);
    }

    /**
     * Handles the collision between a throwable object and a chicken enemy.
     * @param {MovableObject} enemy - The chicken enemy involved in the collision.
     */
    handleChickenCollision(enemy) {
        enemy.y = 351;
        setTimeout(() => {
            const enemyIndex = this.level.enemies.indexOf(enemy);
            if (enemyIndex > -1) {
                this.level.enemies.splice(enemyIndex, 1);
            }
        }, 500);
    }

    /**
     * Handles the collision between a throwable object and a small chicken enemy.
     * @param {MovableObject} enemy - The small chicken enemy involved in the collision.
     */
    handleSmallChickenCollision(enemy) {
        enemy.y = 375;
        setTimeout(() => {
            const enemyIndex = this.level.enemies.indexOf(enemy);
            if (enemyIndex > -1) {
                this.level.enemies.splice(enemyIndex, 1);
            }
        }, 500);
    }

    /**
     * Handles the collision between a throwable object and the endboss.
     * @param {MovableObject} enemy - The endboss involved in the collision.
     */
    handleEndbossCollision(enemy) {
        enemy.health -= 1;
        if (enemy.health <= 0) {
            setTimeout(() => {
                const enemyIndex = this.level.enemies.indexOf(enemy);
                if (enemyIndex > -1) {
                    this.level.enemies.splice(enemyIndex, 1);
                }
            }, 500);
        }
    }


    /**
    Checks if the character collides with a chicken and if it is below it, kills the chicken.
    Otherwise, hits the character and updates the status bar.
    @param {Object} enemy - The chicken to check collision with.
    */
    checkChickenCollision(enemy) {
        if (this.character.y + this.character.height < enemy.y + enemy.height) {
            console.log('Chicken');
            enemy.isDead = true;
            enemy.loadImage(enemy.IMAGES_DEAD);
            enemy.y = 351;
            this.character.bounceOnCollision(enemy);
            setTimeout(() => {
                const enemyIndex = this.level.enemies.indexOf(enemy);
                if (enemyIndex > -1) {
                    this.level.enemies.splice(enemyIndex, 1);
                }
            }, 500);
        } else {
            this.character.hit();
            this.statusBar.setPercentage(this.character.health);
        }
    }

    /**
    Checks if the character collides with a smallchicken and if it is below it, kills the smallchicken.
    Otherwise, hits the character and updates the status bar.
    @param {Object} enemy - The smallchicken to check collision with.
    */
    checkSmallChickenCollision(enemy) {
        if (this.character.y + this.character.height <= enemy.y + enemy.height + 6) {
            console.log('Smallchicken');
            enemy.isDead = true;
            enemy.loadImage(enemy.IMAGES_DEAD);
            enemy.y = 375;
            this.character.bounceOnCollision(enemy);
            setTimeout(() => {
                const enemyIndex = this.level.enemies.indexOf(enemy);
                if (enemyIndex > -1) {
                    this.level.enemies.splice(enemyIndex, 1);
                }
            }, 500);
        } else {
            this.character.hit();
            this.statusBar.setPercentage(this.character.health);
        }
    }

    /**
Checks if the character collides with a smallchicken and if it is below it, kills the smallchicken.
Otherwise, hits the character and updates the status bar.
@param {Object} enemy - The smallchicken to check collision with.
*/
    checkEndbossCollision(enemy) {
        if (this.character.y + this.character.height <= enemy.y + enemy.height + 6) {
            console.log('Endboss');
            enemy.isDead = true;
            enemy.loadImage(enemy.IMAGES_DEAD);
            this.character.bounceOnCollision(enemy);
            setTimeout(() => {
                const enemyIndex = this.level.enemies.indexOf(enemy);
                if (enemyIndex > -1) {
                    this.level.enemies.splice(enemyIndex, 1);
                }
            }, 500);
        } else {
            this.character.hit();
            this.statusBar.setPercentage(this.character.health);
        }
    }

    /**
    Increments the coin count, removes the coin, and checks if the bottle count should be incremented.
    @param {number} index - The index of the coin in the enemies array.
    */
    checkCoinCollision(index) {
        console.log('Coin');
        this.statusBarCoin.incrementCount();
        this.level.enemies.splice(index, 1);
        if (this.statusBarCoin.count % 3 === 0) {
            this.statusBarBottle.incrementCount();
        }
    }

    /**
    Increments the bottle count and removes the bottle.
    @param {number} index - The index of the bottle in the enemies array.
    */
    checkBottleCollision(index) {
        console.log('Bottle');
        this.statusBarBottle.incrementCount();
        this.level.enemies.splice(index, 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        //--------- Spcae for fixed objects ---------

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { // mo = movable object
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}