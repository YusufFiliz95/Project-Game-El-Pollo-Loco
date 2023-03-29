class Chicken extends MovableObject{
    y = 350;
    width = 80;
    height = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
    
        // Define the minimum distance between chickens
        let minDistance = 200;
    
        // Define a random distance between the minimum distance and twice the minimum distance
        let randomDistance = minDistance + Math.random() * minDistance;
    
        // Define the maximum X position where chickens can spawn
        let maxX = 4000;
    
        // Get the X position of the last chicken created or set it to 0 if there are no chickens
        let lastChickenX = Chicken.lastChickenX || 0;
    
        // Calculate the X position of the new chicken
        let newX = lastChickenX + randomDistance;
    
        // Set the X position of the new chicken to the last chicken's X position if the calculated position is greater than the maximum
        this.x = newX > maxX ? lastChickenX : newX;
    
        // Set the lastChickenX attribute to the current chicken's X position
        Chicken.lastChickenX = this.x;
    
        // Set the speed of the chicken to a random value between 0.15 and 0.55
        this.speed = 0.15 + Math.random() * 0.4;
    
        // Start the animation of the chicken
        this.animate();
    }
    

    animate(){
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200);
    }

}