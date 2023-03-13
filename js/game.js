let canvas;
let world;
let keyboard = new Keyboard();


function init(){  
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
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
})
