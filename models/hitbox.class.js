class Hitbox {
    constructor(marginTop, marginRight, marginBottom, marginLeft) {
        this.marginTop = marginTop;
        this.marginRight = marginRight;
        this.marginBottom = marginBottom;
        this.marginLeft = marginLeft;
    }

    draw(ctx, x, y, width, height) {
        ctx.beginPath();
/*         ctx.lineWidth = '5'; //This codeline draws the actuall frame of the hitbox
        ctx.strokeStyle = 'blue';
        ctx.rect(x + this.marginLeft, y + this.marginTop, width - this.marginLeft - this.marginRight, height - this.marginTop - this.marginBottom); */
        ctx.stroke();
    }
    
    isColliding(x1, y1, width1, height1, x2, y2, width2, height2, marginATop, marginARight, marginABottom, marginALeft, marginBTop, marginBRight, marginBBottom, marginBLeft) {
        return x1 + width1 - marginARight > x2 + marginBLeft &&
            y1 + height1 - marginABottom > y2 + marginBTop &&
            x1 + marginALeft < x2 + width2 - marginBRight &&
            y1 + marginATop < y2 + height2 - marginBBottom;
    }
}

// Example: hitbox = new Hitbox(marginTop, marginRight, marginBottom, marginLeft);
