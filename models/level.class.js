class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 4614; // Max map reach 4314

    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}