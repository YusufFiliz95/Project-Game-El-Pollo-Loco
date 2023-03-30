class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 240;
        this.height = 80;
        this.setPercentage(100);
    }

    // setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

class StatusBarBottle extends DrawableObject {
    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    id;
    count = 0;

    constructor(id) {
        super();
        this.loadImage(this.IMAGE_BOTTLE);
        this.x = 280;
        this.y = 20;
        this.width = 60;
        this.height = 60;
        this.id = id;
    }

    incrementCount() {
        this.count++;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = '30px zabars';
        ctx.fillStyle = 'black';
        ctx.fillText(this.count, this.x + this.width - 15, this.y + 43);
    }
}

class StatusBarCoin extends DrawableObject {
    IMAGE_BOTTLE = [
        'img/8_coin/coin_1.png'
    ];

    id;
    count = 0;

    constructor(id) {
        super();
        this.loadImage(this.IMAGE_BOTTLE);
        this.x = 330;
        this.y = -8;
        this.width = 120;
        this.height = 120;
        this.id = id;
    }

    incrementCount() {
        this.count++;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = '30px zabars';
        ctx.fillStyle = 'black';
        ctx.fillText(this.count, this.x + this.width - 34, this.y + 71);
    }
}
