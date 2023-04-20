class Hitbox {
    constructor(marginTop, marginRight, marginBottom, marginLeft) {
        this.marginTop = marginTop;
        this.marginRight = marginRight;
        this.marginBottom = marginBottom;
        this.marginLeft = marginLeft;
    }

/**
 * This function draws a rectangle with a specified width and height using the canvas context.
 * @param ctx - The canvas context on which the rectangle will be drawn.
 * @param x - The x-coordinate of the top-left corner of the rectangle to be drawn.
 * @param y - The y parameter is the vertical position of the top-left corner of the hitbox relative to
 * the canvas or viewport.
 * @param width - The width of the rectangle to be drawn.
 * @param height - The height parameter is the height of the rectangle that will be drawn on the canvas
 * context (ctx).
 */
    draw(ctx, x, y, width, height) {
        ctx.beginPath();
/*         ctx.lineWidth = '5'; //This codeline draws the actuall frame of the hitbox
        ctx.strokeStyle = 'blue';
        ctx.rect(x + this.marginLeft, y + this.marginTop, width - this.marginLeft - this.marginRight, height - this.marginTop - this.marginBottom); */
        ctx.stroke();
    }
    
/* The `isColliding` function is a method of the `Hitbox` class that checks if two rectangles are
colliding with each other. It takes in the coordinates, width, height, and margin values of two
rectangles and returns a boolean value indicating whether they are colliding or not. The function
uses the margins to adjust the hitbox area of each rectangle, allowing for more precise collision
detection. */
    isColliding(x1, y1, width1, height1, x2, y2, width2, height2, marginATop, marginARight, marginABottom, marginALeft, marginBTop, marginBRight, marginBBottom, marginBLeft) {
        return x1 + width1 - marginARight > x2 + marginBLeft &&
            y1 + height1 - marginABottom > y2 + marginBTop &&
            x1 + marginALeft < x2 + width2 - marginBRight &&
            y1 + marginATop < y2 + height2 - marginBBottom;
    }
}

// Example: hitbox = new Hitbox(marginTop, marginRight, marginBottom, marginLeft);
