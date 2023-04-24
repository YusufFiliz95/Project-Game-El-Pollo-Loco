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
    gameStarted = false;
    startedMoving = false;
    endbossMusicPlayed = false;
    static isSoundMuted = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.bottle_breaking = window.audio.bottle_breaking;
        this.bottle_throwing = window.audio.bottle_throwing;
        this.chicken_dead = window.audio.chicken_dead;
        this.collect_bottle = window.audio.collect_bottle;
        this.collect_coin = window.audio.collect_coin;
        this.endboss_attack = window.audio.endboss_attack;
        this.endboss_dead = window.audio.endboss_dead;
        this.endboss_hurt = window.audio.endboss_hurt;
        this.is_dead = window.audio.is_dead;
        this.is_hurt = window.audio.is_hurt;
        this.jumping_sound = window.audio.jumping_sound;
        this.smallChicken_dead = window.audio.smallChicken_dead;
        this.throw_bottle = window.audio.throw_bottle;
        this.walking_sound = window.audio.walking_sound;
        this.lastHitTime = 0;
        this.gameStarted = true;
        this.endbossMusic = window.audio.endbossMusic;
        this.endbossMusic.loop = true;
        this.endbossMusic.volume = 0.3;
    }

    /**
     * The function toggles the mute state and volume of the endbossMusic object based on the current state
     * of the World's sound mute flag.
     */
    toggleEndbossMusicMute() {
        if (this.endbossMusic) {
            World.isSoundMuted = !World.isSoundMuted;
            this.endbossMusic.muted = World.isSoundMuted;
            this.endbossMusic.volume = World.isSoundMuted ? 0 : 1.0;
        }
    }

    /**
     * The function sets the world property of a character object to the current object.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * The function returns a boolean value indicating whether the game has started or not.
     * @returns The method `isGameStarted()` is returning the value of the `gameStarted` property.
     */
    isGameStarted() {
        return this.gameStarted;
    }

    /**
     * The function runs two checks repeatedly every 10 milliseconds.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 10);
    }

    /**
     * The function checks if throwable objects can be thrown and adds them to an array if possible based
     * on keyboard inputs.
     */
    checkThrowableObjects() {
        const throwBottleIfPossible = () => {
            if (this.statusBarBottle.count > 0) {
                this.statusBarBottle.decrementCount();
                let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 40);
                this.throwableObjects.push(bottle);
                this.throw_bottle.play();
            }
        };

        const timeLimit = 1000;
        const currentTime = Date.now();

        if (this.keyboard.E && this.keyboard.keyReleased.E) {
            if (!this.lastThrowTime || currentTime - this.lastThrowTime >= timeLimit) {
                this.lastThrowTime = currentTime;
                this.keyboard.keyReleased.E = false;
                throwBottleIfPossible();
            }
        }
        if (this.keyboard.F && this.keyboard.keyReleased.F) {
            if (!this.lastThrowTime || currentTime - this.lastThrowTime >= timeLimit) {
                this.lastThrowTime = currentTime;
                this.keyboard.keyReleased.F = false;
                throwBottleIfPossible();
            }
        }
        if (this.keyboard.ENTER && this.keyboard.keyReleased.ENTER) {
            if (!this.lastThrowTime || currentTime - this.lastThrowTime >= timeLimit) {
                this.lastThrowTime = currentTime;
                this.keyboard.keyReleased.ENTER = false;
                throwBottleIfPossible();
            }
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
                    this.checkEndbossCollision(enemy);
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
        if (enemy.type === 'chicken') {
            this.handleChickenCollision(enemy);
            enemy.loadImage(enemy.IMAGES_DEAD[0]);
            enemy.isDead = true;
        } else if (enemy.type === 'smallchicken') {
            this.handleSmallChickenCollision(enemy);
            enemy.loadImage(enemy.IMAGES_DEAD[0]);
            enemy.isDead = true;
        } else if (enemy.type === 'endboss') {
            this.handleEndbossCollision(enemy);
            if (!this.endbossMusicPlayed) {
                if (bgMusic) {
                    bgMusic.pause(); // Stop the background music
                }
                this.endbossMusic.play();
                this.endbossMusicPlayed = true;
            }
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
        this.bottle_breaking.play();
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
        this.character.chicken_dead.play();
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
        this.character.smallChicken_dead.play();
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
        if (enemy.isCollided) {
            return; // if the enemy has already collided, return immediately
        }

        enemy.hits += 1;

        if (enemy.hits === 4) {
            enemy.dead = true;
            this.character.endboss_dead.play();
            enemy.stopMoving();
            return;
        }

        // set the isCollided flag to prevent collision detection for 1.65 seconds
        enemy.isCollided = true;
        setTimeout(() => {
            enemy.isCollided = false;
        }, 1650);

        // if the player has collided with the endboss, set isAlert to true so that
        // the endboss will start moving towards the player
        if (!enemy.isAlert) {
            enemy.isAlert = true;
        }
        this.character.endboss_hurt.play();
        enemy.stopMoving();
        enemy.hurt = true;
        setTimeout(() => {
            enemy.hurt = false;
            enemy.resumeMoving();
            enemy.speed *= 1.3;
        }, 1500);

        setTimeout(() => {
            enemy.speed *= 8; // Increase the speed
        }, 150);

        setTimeout(() => {
            enemy.speed /= 8; // Reset the speed back to normal
        }, 1650);
    }

    /**
    Checks if the character collides with a chicken and if it is below it, kills the chicken.
    Otherwise, hits the character and updates the status bar.
    @param {Object} enemy - The chicken to check collision with.
    */
    checkChickenCollision(enemy) {
        if (this.character.y + this.character.height < enemy.y + enemy.height) {
            enemy.isDead = true;
            enemy.loadImage(enemy.IMAGES_DEAD);
            this.character.chicken_dead.play();
            this.character.jumping_sound.play();
            enemy.y = 351;
            this.character.bounceOnCollision(enemy);
            setTimeout(() => {
                const enemyIndex = this.level.enemies.indexOf(enemy);
                if (enemyIndex > -1) {
                    this.level.enemies.splice(enemyIndex, 1);
                }
            }, 500);
        } else {
            const currentTime = Date.now();
            if (currentTime - this.lastHitTime >= 1000) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.health);
                this.lastHitTime = currentTime;
            }
        }
    }

    /**
    Checks if the character collides with a smallchicken and if it is below it, kills the smallchicken.
    Otherwise, hits the character and updates the status bar.
    @param {Object} enemy - The smallchicken to check collision with.
    */
    checkSmallChickenCollision(enemy) {
        const currentTime = Date.now();
        if (currentTime - this.lastCollisionTime < 1300) {
            // Ignore the collision if it's been less than 3 seconds since the last one
            return;
        }
        this.lastCollisionTime = currentTime;
        if (this.character.y + this.character.height <= enemy.y + enemy.height + 6) {
            enemy.isDead = true;
            enemy.loadImage(enemy.IMAGES_DEAD);
            this.character.smallChicken_dead.play();
            this.character.jumping_sound.play();
            enemy.y = 375;
            this.character.bounceOnCollision(enemy);
            setTimeout(() => {
                const enemyIndex = this.level.enemies.indexOf(enemy);
                if (enemyIndex > -1) {
                    this.level.enemies.splice(enemyIndex, 1);
                }
            }, 500);
        } else {
            const currentTime = Date.now();
            if (currentTime - this.lastHitTime >= 1300) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.health);
                this.lastHitTime = currentTime;
            }
        }
    }

    /**
     * The function checks for collision between the player character and an end boss enemy, and triggers
     * an attack animation and sound effect if a collision occurs.
     * @param enemy - The parameter "enemy" is an object representing the end boss character in the game.
     * @returns If it has been less than 1300 milliseconds since the last collision, the function returns
     * without doing anything. Otherwise, the function proceeds with the collision detection and handling.
     */
    checkEndbossCollision(enemy) {
        const currentTime = Date.now();
        if (currentTime - this.lastCollisionTime < 1300) {
            // Ignore the collision if it's been less than 3 seconds since the last one
            return;
        }
        this.lastCollisionTime = currentTime;
        if (this.character.y + this.character.height <= enemy.y + enemy.height + 6) {
            enemy.attacking = true;
            this.character.endboss_attack.play();
            enemy.resetAnimation();
            enemy.stopMoving();
            this.character.hitByEndboss();
            this.statusBar.setPercentage(this.character.health);

            setTimeout(() => {
                enemy.attacking = false;
                enemy.resumeMoving();
                enemy.moveLeft();
                enemy.resetAnimation();
            }, 1300);
        }
    }

    /**
    Increments the coin count, removes the coin, and checks if the bottle count should be incremented.
    @param {number} index - The index of the coin in the enemies array.
    */
    checkCoinCollision(index) {
        this.statusBarCoin.incrementCount();

        if (!isMuted) {
            const coinAudio = this.collect_coin.cloneNode();
            coinAudio.volume = 0.2;
            coinAudio.play();
        }

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
        this.statusBarBottle.incrementCount();

        if (!isMuted) {
            const bottleAudio = this.collect_bottle.cloneNode();
            bottleAudio.play();
        }

        this.level.enemies.splice(index, 1);
    }

    /**
     * This function draws the game objects on the canvas and handles the movement of the end boss when the
     * player has traveled a certain distance.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        const distanceTraveled = this.character.getDistanceTraveled();
        if (distanceTraveled >= 5400) {
            const endboss = this.level.enemies.find(enemy => enemy.type === 'endboss');
            if (endboss && !endboss.isAlert) {
                if (bgMusic) {
                    bgMusic.pause(); // Stop the background music
                }
                if (!this.endbossMusicPlayed) {
                    this.endbossMusic.play();
                    this.endbossMusicPlayed = true;
                }
                endboss.isAlert = true;
                setTimeout(() => {
                    endboss.resumeMoving();
                    endboss.moveLeft();
                }, 3000);
            }
        }

        this.level.enemies.forEach(enemy => {
            if (enemy.type === 'endboss' && enemy.isAlert) {
                enemy.moveLeft();
            }
        });


        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function adds objects to a map by iterating through an array of objects and calling the
     * addToMap method for each object.
     * @param objects - An array of objects that need to be added to a map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * The function adds a movable object to a map and flips its image if necessary.
     * @param mo - movable object, an object that can be moved or animated on the canvas.
     */
    addToMap(mo) { // mo = movable object
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * The flipImage function flips an image horizontally using the canvas context in JavaScript.
     * @param mo - It is likely that "mo" is an object that represents an image or a graphical element. The
     * function "flipImage" is using the Canvas API to flip the image horizontally by translating the
     * canvas context to the right edge of the image, scaling it by -1 on the x-axis, and then
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * The function flips an image back horizontally and restores the canvas context.
     * @param mo - It seems that "mo" is an object that has an "x" property, which is being modified in the
     * function. The function also uses "this.ctx.restore()", which suggests that it is part of a larger
     * object or class that has a canvas context. Without more context, it's difficult to
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}