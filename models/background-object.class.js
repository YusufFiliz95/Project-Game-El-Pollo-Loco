/* The BackgroundObject class extends the MovableObject class and sets the width, height, x, and y
properties for a background image. */
class BackgroundObject extends MovableObject{
    width = 720;
    height = 480;
    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; //480 - 400
    }

}