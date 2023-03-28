class coin extends MovableObject{
    y = 50;
    width = 500;
    height = 250;
    speed = 0.09;
    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');

        this.x = 300;

    }
}
