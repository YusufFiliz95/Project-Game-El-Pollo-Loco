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

        let minDistance = 200; // minimaler Abstand zwischen den Hühnern
        let randomDistance = minDistance + Math.random() * minDistance; // zufälliger Abstand zwischen minDistance und 2*minDistance
        let maxX = 4000; // maximal x-Position, bis zu der Hühner spawnen sollen
        let lastChickenX = Chicken.lastChickenX || 0; // X-Position des letzten Huhns, initialisiert mit 0, falls es noch kein Huhn gibt
        let newX = lastChickenX + randomDistance; // berechnete X-Position des neuen Huhns
        this.x = newX > maxX ? lastChickenX : newX; // setze die X-Position, oder verwende die X-Position des letzten Huhns, falls newX zu groß ist
        Chicken.lastChickenX = this.x; // setze das Attribut lastChickenX auf die aktuelle X-Position
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
    }
    

    animate(){
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200);
    }

}