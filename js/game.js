let canvas;
let world;
let bgMusic;
let game_over;
let keyboard = new Keyboard();


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

function playMusic(){
    bgMusic = new Audio('audio/soundtrack.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    bgMusic.play();
}

function gameOver(){
    
}

function openSettings(){
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

function closeSettings(){
    const gameMenu = document.getElementById('gamemenu');
    gameMenu.innerHTML = /*html*/ `
        <div class="menu-container-section" id="gamemenu">
        <div>
            <button class="start">START</button>
        </div>
        <div>
            <button class="settings-icon sound-off"></button>
            <button onclick="openSettings()" class="settings-icon setting"></button>
        </div>
    </div>
    `;
}

window.addEventListener('keydown', (event) => {
    if(event.keyCode == 37 || event.key == 'a') {
        keyboard.LEFT = true;
    }

    if(event.keyCode == 38 || event.key == 'w') {
        keyboard.UP = true;
    }

    if(event.keyCode == 39 || event.key == 'd') {
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 40 || event.key == 's') {
        keyboard.DOWN = true;
    }

    if(event.keyCode == 32 || event.key == ' ') {
        keyboard.SPACE = true;
    }

    if(event.keyCode == 70) {
        keyboard.F = true;
    }

    if(event.keyCode == 69) {
        keyboard.E = true;
    }

    if(event.keyCode == 13) {
        keyboard.ENTER = true;
    }
})

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 37 || event.key == 'a') {
        keyboard.LEFT = false;
    }

    if(event.keyCode == 38 || event.key == 'w') {
        keyboard.UP = false;
    }

    if(event.keyCode == 39 || event.key == 'd') {
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 40 || event.key == 's') {
        keyboard.DOWN = false;
    }

    if(event.keyCode == 32 || event.key == ' ') {
        keyboard.SPACE = false;
    }

    if(event.keyCode == 70) {
        keyboard.F = false;
    }

    if(event.keyCode == 69) {
        keyboard.E = false;
    }

    if(event.keyCode == 13) {
        keyboard.ENTER = false;
    }
})
