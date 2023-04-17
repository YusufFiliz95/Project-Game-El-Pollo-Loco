class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 6800; // Max map reach

    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}