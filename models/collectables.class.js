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

    constructor(x, y, onGround = true) {
        super();
        if (onGround) {
            this.loadImage(this.randomGroundImage());
            this.y = 340;
        } else {
            this.loadImage(this.IMAGES_AIR[0]);
            this.y = y;
        }

        this.x = x;
    }

    randomGroundImage() {
        return this.IMAGES_GROUND[Math.floor(Math.random() * this.IMAGES_GROUND.length)];
    }
    hitbox = new Hitbox(10, 12, 10, 20);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomPattern(patterns, lastRandomIndex, lastXCoordinate, minDistanceBetweenPatterns, maxRange) {
    if (lastXCoordinate >= maxRange) {
        return { result: [], newLastRandomIndex: lastRandomIndex, newLastXCoordinate: lastXCoordinate };
    }

    let randomIndex;
    do {
        randomIndex = getRandomInt(0, patterns.length - 1);
    } while (randomIndex === lastRandomIndex);

    const minAllowedX = lastXCoordinate + minDistanceBetweenPatterns;
    const x = getRandomInt(minAllowedX, minAllowedX + 300); // Randomize the x-coordinate with a minimum distance
    const y = getRandomInt(200, 200); // Randomize the y-coordinate

    const newPattern = patterns[randomIndex](x, y);
    return { result: newPattern, newLastRandomIndex: randomIndex, newLastXCoordinate: x };
}

const coinPatterns = [
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
const bottlePatterns = [
    // Pattern 1: Single bottle on the ground
    (x, y) => [new Bottle(x, y, true)],
    // Pattern 2: Two bottles in the air at different heights
    (x, y) => [
        new Bottle(x, y, false),
        new Bottle(x + 100, y - 100, false)
    ],
    // Pattern 3: Four bottles close together
    (x, y) => [
        new Bottle(x, y, false),
        new Bottle(x + 50, y - 50, false),
        new Bottle(x + 100, y, false),
        new Bottle(x + 150, y - 50, false)
    ],
    // Pattern 4: Five bottles close together in a horizontal line
    (x, y) => [
        new Bottle(x, y, false),
        new Bottle(x + 50, y, false),
        new Bottle(x + 100, y, false),
        new Bottle(x + 150, y, false),
        new Bottle(x + 200, y, false)
    ],
    // Pattern 5: Six bottles in a close hexagonal pattern
    (x, y) => [
        new Bottle(x, y, false),
        new Bottle(x + 50, y, false),
        new Bottle(x + 25, y - 50, false),
        new Bottle(x + 75, y - 50, false),
        new Bottle(x, y - 100, false),
        new Bottle(x + 50, y - 100, false)
    ],
];

let lastRandomIndexCoin = null;
let lastRandomIndexBottle = null;
let lastXCoordinateCoin = 0;
let lastXCoordinateBottle = 0;
const minDistanceBetweenCoinPatterns = 400;
const minDistanceBetweenBottlePatterns = 400;
const maxCoinRange = 3600;
const maxBottleRange = 3600;

function createAlternatingPattern() {
    let items = [];

    // Create coin pattern first
    const coinPattern = createRandomPattern(
        coinPatterns, lastRandomIndexCoin, lastXCoordinateCoin,
        minDistanceBetweenCoinPatterns, maxCoinRange);
    items = items.concat(coinPattern.result);
    lastRandomIndexCoin = coinPattern.newLastRandomIndex;
    lastXCoordinateCoin = coinPattern.newLastXCoordinate;

    // Update lastXCoordinateBottle based on the last coin pattern
    lastXCoordinateBottle = lastXCoordinateCoin + 300;

    // Create bottle pattern
    const bottlePattern = createRandomPattern(
        bottlePatterns, lastRandomIndexBottle, lastXCoordinateBottle,
        minDistanceBetweenBottlePatterns, maxBottleRange);
    items = items.concat(bottlePattern.result);
    lastRandomIndexBottle = bottlePattern.newLastRandomIndex;
    lastXCoordinateBottle = bottlePattern.newLastXCoordinate;

    return items;
}
