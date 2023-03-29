class World {

    character = new Character();
    level = level1;
    canvas;
    ctx; // ctx = context
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
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
        if (this.keyboard.E && this.keyboard.keyReleased.E) {
            this.keyboard.keyReleased.E = false;
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 40);
            this.throwableObjects.push(bottle);
        }
        if (this.keyboard.F && this.keyboard.keyReleased.F) {
            this.keyboard.keyReleased.F = false;
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 40);
            this.throwableObjects.push(bottle);
        }
        if (this.keyboard.ENTER && this.keyboard.keyReleased.ENTER) {
            this.keyboard.keyReleased.ENTER = false;
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 40);
            this.throwableObjects.push(bottle);
        }
    }


    

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.health);
            }
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        //--------- Spcae for fixed objects ---------
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

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
        if(mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}