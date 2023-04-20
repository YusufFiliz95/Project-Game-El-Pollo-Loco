let canvas;
let world;
let bgMusic;
let game_over = new Audio('audio/game_over.mp3');
let you_win = new Audio('audio/win.mp3');
let isSoundMuted = false;
let keyboard = new Keyboard();


/**
 * The function starts the game by initializing the canvas, creating a new world, and animating all
 * chickens and small chickens in the level.
 */
function startGame() {
    canvas = document.getElementById('canvas');
    document.getElementById('gamemenu').classList.add('d-none');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);

    // Call animate() for all chickens and small chickens
    for (const enemy of world.level.enemies) {
        if (enemy instanceof Chicken || enemy instanceof Smallchicken) {
            enemy.animate();
        }
    }
    playMusic();
}

/**
 * The function plays a background music with adjustable volume and mute settings.
 */
function playMusic() {
    bgMusic = new Audio('audio/soundtrack.mp3');
    bgMusic.loop = true;
    bgMusic.volume = isSoundMuted ? 0 : 0.3;
    bgMusic.muted = isSoundMuted;
    bgMusic.play();
}

/**
 * The function toggles the sound on and off for all audio elements on the page and also specifically
 * mutes or unmutes the endboss music.
 */
function toggleSound() {
    const soundButton = document.getElementById('soundbutton');
    const isSoundOn = soundButton.classList.contains('sound-on');
    const allAudioElements = document.querySelectorAll('audio');

    isSoundMuted = isSoundOn;

    if (isSoundOn) {
        soundButton.classList.remove('sound-on');
        soundButton.classList.add('sound-off');
        allAudioElements.forEach(audio => {
            audio.muted = true;
            audio.volume = 0;
        });
    } else {
        soundButton.classList.remove('sound-off');
        soundButton.classList.add('sound-on');
        allAudioElements.forEach(audio => {
            audio.muted = false;
            audio.volume = 1.0;
        });
    }

    // Stummschalten der Endboss-Musik direkt
    if (world && world.endbossMusic) {
        world.endbossMusic.muted = isSoundMuted;
        world.endbossMusic.volume = isSoundMuted ? 0 : 1.0;
    }
}

/**
 * The function displays a "you win" message and image while playing a victory sound effect and pausing
 * any background music.
 */
function youWin() {
    canvas.classList.add('d-none');
    const gameOverWin = document.getElementById('gameoverwinimage');
    gameOverWin.classList.remove('d-none');
    document.getElementById('gameoverwin').src = "img/9_intro_outro_screens/game_over/game over.png";
    bgMusic.pause();
    you_win.play();
    if (world.endbossMusic) {
        world.endbossMusic.pause();
    }
}

/**
 * The function displays a game over screen and plays a sound effect when called.
 */
function gameOver() {
    canvas.classList.add('d-none');
    const gameOverWin = document.getElementById('gameoverwinimage');
    gameOverWin.classList.remove('d-none');
    document.getElementById('gameoverwin').src = "img/9_intro_outro_screens/game_over/you lost.png";
    bgMusic.pause();
    game_over.play();
    if (world.endbossMusic) {
        world.endbossMusic.pause();
    }
}

/**
 * The function redirects the user to the "index.html" page.
 */
function goToMenu() {
    window.location.href = "index.html";
}

/**
 * The function opens a settings menu with instructions on how to move, jump, and throw a bottle in a
 * game.
 */
function openSettings() {
    const gameMenu = document.getElementById('gamemenu');
    gameMenu.innerHTML = /*html*/ `
    <div class="instructions">
        <div>
            <button class="back" onclick="closeSettings()"></button>
        </div>
        <div class="context">
            <div class="move">
                <p>Move: A D, ← →</p>
            </div>
            <div class="jump">
                <p>Jump: W, SPACE, ↑</p>
            </div>
            <div class="throw-bottle">
                <p>Throw Bottle: E, F, ENTER</p>
            </div>
        </div>
    </div>
    `;
}

/**
 * The function replaces the HTML content of an element with a game menu and a button to open settings.
 */
function closeSettings() {
    const gameMenu = document.getElementById('gamemenu');
    gameMenu.innerHTML = /*html*/ `
        <div class="menu-container-section" id="gamemenu">
        <div>
            <button class="start" onclick="startGame()">START</button>
        </div>
        <div>
        <button class="settings-icon sound-on" onclick="toggleSound()" id="soundbutton"></button>
            <button onclick="openSettings()" class="settings-icon setting"></button>
        </div>
    </div>
    `;
}

/* This code adds an event listener to the window object that listens for keydown events. When a
keydown event occurs, the function inside the listener is executed. This function checks which key
was pressed by checking the keyCode or key property of the event object. Depending on the key
pressed, it sets the corresponding property of the keyboard object to true. This allows the game to
detect which keys are currently being pressed and respond accordingly. */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37 || event.key == 'a') {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38 || event.key == 'w') {
        keyboard.UP = true;
    }

    if (event.keyCode == 39 || event.key == 'd') {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 40 || event.key == 's') {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32 || event.key == ' ') {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 70) {
        keyboard.F = true;
    }

    if (event.keyCode == 69) {
        keyboard.E = true;
    }

    if (event.keyCode == 13) {
        keyboard.ENTER = true;
    }
})

/* This code adds an event listener to the window object that listens for keyup events. When a keyup
event occurs, the function inside the listener is executed. This function checks which key was
released by checking the keyCode or key property of the event object. Depending on the key released,
it sets the corresponding property of the keyboard object to false. This allows the game to detect
which keys are no longer being pressed and respond accordingly. */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 37 || event.key == 'a') {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38 || event.key == 'w') {
        keyboard.UP = false;
    }

    if (event.keyCode == 39 || event.key == 'd') {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 40 || event.key == 's') {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32 || event.key == ' ') {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 70) {
        keyboard.F = false;
    }

    if (event.keyCode == 69) {
        keyboard.E = false;
    }

    if (event.keyCode == 13) {
        keyboard.ENTER = false;
    }
})
