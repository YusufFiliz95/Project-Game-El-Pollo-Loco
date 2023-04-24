const level1 = new Level(

    [
        /* Creating an array of objects that will be used as enemies in a game level. The array includes
        multiple instances of the `Chicken` and `Smallchicken` classes, as well as a pattern of alternating
        objects created by the `createAlternatingPattern()` function. */
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),
        ...createAlternatingPattern(),

        /* `new Endboss()` is creating an instance of the `Endboss` class, which is added to the array
        of enemies in the `level1` object. This suggests that the `Endboss` is the final enemy that
        the player will face in the game level. */
        new Endboss(),
    ],
    [
        /* Creating an array of `Cloud` objects that will be used as background elements in the game level. The
        `new Cloud()` statement creates a new instance of the `Cloud` class, and the array is created by
        listing multiple instances of the class separated by commas. */
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        /* This code is creating an array of `BackgroundObject` instances that will be used as background
        elements in a game level. Each `BackgroundObject` instance is created with a specific image file
        path and position on the screen, determined by multiplying the width of the screen (719 pixels) by a
        certain factor. The images used for the background layers are located in the
        `img/5_background/layers` directory. The layers are arranged in a specific order to create a
        parallax effect, with the air layer being the furthest back and the first layer being the closest to
        the player. */
        new BackgroundObject('img/5_background/layers/air.png', -719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 9),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 10),
    ],
);

