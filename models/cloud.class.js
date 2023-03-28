class Cloud extends MovableObject{
    y = 50;
    width = 500;
    height = 250;
    speed = 0.09;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 5000;  
        this.animate();

    }
    animate(){
        this.moveLeft();
    }
}

