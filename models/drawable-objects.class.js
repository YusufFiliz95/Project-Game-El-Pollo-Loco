class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 290;
    height = 150;
    width = 100;


/**
 * The function loads an image from a specified path.
 * @param path - The path parameter is a string that represents the URL or file path of the image that
 * needs to be loaded.
 */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"src="">
        this.img.src = path;
    }

/**
 * This function draws an image on a canvas context and, if a hitbox is defined, also draws the hitbox.
 * @param ctx - The canvas context on which the image and hitbox will be drawn.
 */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    
        if (this.hitbox) {
            this.hitbox.draw(ctx, this.x, this.y, this.width, this.height);
        }
    }

/**
 * The function loads images from an array and caches them.
 * @param arr - An array of image file paths that need to be loaded.
 */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
