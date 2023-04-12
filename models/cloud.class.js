class Cloud extends MovableObject{
    y = 1;
    width = 500;
    height = 250;
    speed = 0.09;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.floor(Math.random() * 24) * 250;
        this.animate();

    }
    animate(){
        this.moveLeft();
    }
}

