class Coin extends MovableObject {
    y = 300;
    width = 100;
    height = 100;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN)
        }, 200);
    }

    hitbox = new Hitbox(30, 30, 30, 30);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let lastRandomIndex = null;
let lastXCoordinate = 0;
const minDistanceBetweenPatterns = 600;
const maxRange = 3400;

function createRandomCoinPattern() {
    if (lastXCoordinate >= maxRange) {
        return [];
    }
    const patterns = [
        // Pattern 1: Coin Line
        (x, y) => [
            new Coin(x, y),
            new Coin(x + 100, y),
            new Coin(x + 200, y),
            new Coin(x + 300, y),
        ],
        // Pattern 2: Coin Triangle
        (x, y) => [
            new Coin(x, y),
            new Coin(x + 100, y),
            new Coin(x + 200, y),
            new Coin(x + 100, y - 100),
        ],
        // Pattern 3: Coin Diamond
        (x, y) => [
            new Coin(x, y),
            new Coin(x + 100, y - 100),
            new Coin(x + 200, y),
            new Coin(x + 100, y + 100),
        ],
        // Pattern 4: Coin Zigzag
        (x, y) => [
            new Coin(x, y),
            new Coin(x + 100, y - 50),
            new Coin(x + 200, y),
            new Coin(x + 300, y - 50),
        ],
        // Pattern 5: Coin Inverted Stairs
        (x, y) => [
            new Coin(x, y - 150),
            new Coin(x + 100, y - 100),
            new Coin(x + 200, y - 50),
            new Coin(x + 300, y),
        ],
        // Pattern 6: Coin Square
        (x, y) => [
            new Coin(x, y),
            new Coin(x, y),
            new Coin(x, y - 50),
            new Coin(x, y - 50),
        ],
        // Pattern 7: Coin V
        (x, y) => [
            new Coin(x, y),
            new Coin(x, y - 100),
            new Coin(x + 50, y - 50),
            new Coin(x + 100, y),
            new Coin(x + 100, y - 100),
        ],
        // Pattern 8: Coin Checkerboard
        (x, y) => [
            new Coin(x, y),
            new Coin(x + 100, y - 100),
            new Coin(x + 200, y),
            new Coin(x + 300, y - 100),
            new Coin(x + 400, y),
            new Coin(x + 500, y - 100),
        ],
    ];


    let randomIndex;
    do {
        randomIndex = getRandomInt(0, patterns.length - 1);
    } while (randomIndex === lastRandomIndex);

    lastRandomIndex = randomIndex;
    const randomPattern = patterns[randomIndex];

    // Ensure there's enough distance between patterns
    const minAllowedX = lastXCoordinate + minDistanceBetweenPatterns;
    const x = getRandomInt(minAllowedX, minAllowedX + 250); // Randomize the x-coordinate with a minimum distance
    const y = getRandomInt(200, 200); // Randomize the y-coordinate

    lastXCoordinate = x;

    return randomPattern(x, y);
}

