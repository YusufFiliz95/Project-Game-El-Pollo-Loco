class ThrowableObject extends MovableObject {
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
        this.x += 10; 
        }, 35); //Speed
    }
}