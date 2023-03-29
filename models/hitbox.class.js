class Hitbox {
    constructor(marginWidth, marginHeight) {
        this.marginWidth = marginWidth;
        this.marginHeight = marginHeight;
    }

    draw(ctx, x, y, width, height) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(x + this.marginWidth, y + this.marginHeight, width - this.marginWidth * 2, height - this.marginHeight * 2);
        ctx.stroke();
    }

    isColliding(x1, y1, width1, height1, x2, y2, width2, height2) {
        const marginAWidth = this.marginWidth;
        const marginAHeight = this.marginHeight;
        const marginBWidth = this.marginWidth;
        const marginBHeight = this.marginHeight;

        return x1 + width1 - marginAWidth > x2 + marginBWidth &&
            y1 + height1 - marginAHeight > y2 + marginBHeight &&
            x1 + marginAWidth < x2 + width2 - marginBWidth &&
            y1 + marginAHeight < y2 + height2 - marginBHeight;
    }
}