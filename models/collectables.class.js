class Coin extends MovableObject {

    type = 'coin'
    y = 300;
    width = 100;
    height = 100;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

/**
 * This is a constructor function that loads images and sets the initial position of a coin object, and
 * then animates it.
 * @param x - The x-coordinate of the coin's position on the game screen.
 * @param y - The y-coordinate of the coin's position on the game screen.
 */
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

/**
 * The function uses setInterval to repeatedly play an animation of coin images.
 */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN)
        }, 200);
    }

    hitbox = new Hitbox(30, 30, 30, 30);
}

class Bottle extends MovableObject {

    type = 'bottle'
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

/**
 * This is a constructor function that sets the x and y coordinates and loads an image based on whether
 * the object is on the ground or in the air.
 * @param x - The x-coordinate of the object's position.
 * @param y - The y parameter is the vertical position of the object on the canvas.
 * @param [onGround=true] - The "onGround" parameter is a boolean value that indicates whether the
 * object should be placed on the ground or in the air. If it is true, the object will be placed on the
 * ground and if it is false, the object will be placed in the air at the specified y-coordinate.
 */
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

/**
 * The function returns a random image from an array of ground images.
 * @returns A random image from the `IMAGES_GROUND` array. The image is selected using `Math.random()`
 * to generate a random index within the length of the array, and `Math.floor()` to round down to the
 * nearest integer.
 */
    randomGroundImage() {
        return this.IMAGES_GROUND[Math.floor(Math.random() * this.IMAGES_GROUND.length)];
    }
    hitbox = new Hitbox(10, 12, 10, 20);
}

/**
 * The function returns a random integer between a minimum and maximum value.
 * @param min - The minimum value that the random integer can be.
 * @param max - The maximum value that the random integer can be (inclusive).
 * @returns a random integer between the minimum and maximum values (inclusive) passed as arguments.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * The function creates a random pattern using a set of patterns, ensuring a minimum distance between
 * patterns and returning the last used random index and x-coordinate.
 * @param patterns - an array of functions that generate patterns
 * @param lastRandomIndex - The index of the last pattern that was randomly selected.
 * @param lastXCoordinate - The x-coordinate of the last pattern created. It is used to ensure that the
 * new pattern is created with a minimum distance between the previous pattern.
 * @param minDistanceBetweenPatterns - The minimum distance between the x-coordinates of two
 * consecutive patterns.
 * @param maxRange - The maximum value for the x-coordinate of the pattern. Once the lastXCoordinate
 * exceeds this value, the function will stop generating new patterns and return an empty result.
 * @returns An object with three properties: "result" which contains an array of the new pattern
 * generated, "newLastRandomIndex" which contains the index of the pattern used to generate the new
 * pattern, and "newLastXCoordinate" which contains the x-coordinate of the new pattern.
 */
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
const minDistanceBetweenCoinPatterns = 200;
const minDistanceBetweenBottlePatterns = 200;
const maxCoinRange = 4600;
const maxBottleRange = 4600;

/**
 * The function creates an alternating pattern of randomly generated coin and bottle items with
 * specified distances between them.
 * @returns The function `createAlternatingPattern` returns an array of items that alternates between
 * randomly generated coin patterns and bottle patterns.
 */
function createAlternatingPattern() {
    let items = [];
    items = createCoinPattern(items);
    items = createBottlePattern(items);
    return items;
}

function createCoinPattern(items){
    // Create coin pattern first
    const coinPattern = createRandomPattern(
        coinPatterns, lastRandomIndexCoin, lastXCoordinateCoin,
        minDistanceBetweenCoinPatterns, maxCoinRange);
    items = items.concat(coinPattern.result);
    lastRandomIndexCoin = coinPattern.newLastRandomIndex;
    lastXCoordinateCoin = coinPattern.newLastXCoordinate;

    // Update lastXCoordinateBottle based on the last coin pattern
    lastXCoordinateBottle = lastXCoordinateCoin + minDistanceBetweenBottlePatterns;
    return items;
}

function createBottlePattern(items){
    // Create bottle pattern
    const bottlePattern = createRandomPattern(
        bottlePatterns, lastRandomIndexBottle, lastXCoordinateBottle,
        minDistanceBetweenBottlePatterns, maxBottleRange);
    items = items.concat(bottlePattern.result);
    lastRandomIndexBottle = bottlePattern.newLastRandomIndex;
    lastXCoordinateBottle = bottlePattern.newLastXCoordinate;

    // Update lastXCoordinateCoin based on the last bottle pattern
    lastXCoordinateCoin = lastXCoordinateBottle + minDistanceBetweenCoinPatterns;
    return items;
}
