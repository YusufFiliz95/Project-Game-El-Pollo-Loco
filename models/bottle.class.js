class Bottle extends MovableObject {
    y = 340;
    width = 70;
    height = 90;
    IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    IMAGES_AIR = [
        'img/6_salsa_bottle/salsa_bottle.png',
    ];

    constructor(onGround = true, yPos = 340) {
        super();
        if (onGround) {
            this.loadImage(this.randomGroundImage());
            this.y = 340;
        } else {
            this.loadImage(this.IMAGES_AIR[0]);
            this.y = yPos;
        }

        this.x = Bottle.generateXPosition();
    }

    static generateXPosition() {
        const minDistance = 500;
        const minStartPosition = 500;
        const maxRange = 4500;
        const randomDistance = minDistance + Math.random() * minDistance;
        const lastBottleX = Bottle.lastBottleX || minStartPosition - randomDistance;

        const newX = lastBottleX + randomDistance;

        if (newX > maxRange) {
            return lastBottleX;
        } else {
            Bottle.lastBottleX = newX;
            return newX;
        }
    }

    randomGroundImage() {
        return this.IMAGES_GROUND[Math.floor(Math.random() * this.IMAGES_GROUND.length)];
    }

    hitbox = new Hitbox(10, 12, 10, 20);
}

function createRandomBottlePattern() {
    const patterns = [
        // Pattern 1: Single bottle on the ground
        (x, y) => [new Bottle(true)],
        // Pattern 2: Two bottles in the air at different heights
        (x, y) => [
            new Bottle(false, y),
            new Bottle(false, y - 100)
        ],
        // Pattern 3: Three bottles in the air at different heights
        (x, y) => [
            new Bottle(false, y),
            new Bottle(false, y - 100),
            new Bottle(false, y - 200)
        ],
        // Pattern 4: Four bottles in the air in a diamond shape
        (x, y) => [
            new Bottle(false, y - 100),
            new Bottle(false, y - 200),
            new Bottle(false, y - 300),
            new Bottle(false, y - 400),
        ],
        // Pattern 5: Five bottles in the air in a zigzag pattern
        (x, y) => [
            new Bottle(false, y),
            new Bottle(false, y - 100),
            new Bottle(false, y - 200),
            new Bottle(false, y - 300),
            new Bottle(false, y - 400),
        ],
    ];

    const randomIndex = getRandomInt(0, patterns.length - 1);
    const randomPattern = patterns[randomIndex];
    const x = getRandomInt(500, 4300);
    const y = getRandomInt(100, 240);

    return randomPattern(x, y);
}

function createRandomBottlePatterns(numPatterns = 10) {
    const bottlePatterns = [];

    for (let i = 0; i < numPatterns; i++) {
        bottlePatterns.push(...createRandomBottlePattern());
    }

    return bottlePatterns;
}