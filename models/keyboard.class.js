class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    F = false;
    E = false;
    ENTER = false;

    keyReleased = {
        E: true,
        F: true,
        ENTER: true
    };

    constructor() {
        document.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        });

        document.addEventListener('keyup', (event) => {
            this.handleKeyUp(event);
        });
    }

    handleKeyDown(event) {
        if(event.keyCode == 37 || event.key == 'a') {
            this.LEFT = true;
        }
        if(event.keyCode == 38 || event.key == 'w') {
            this.UP = true;
        }
        if(event.keyCode == 39 || event.key == 'd') {
            this.RIGHT = true;
        }
        if(event.keyCode == 40 || event.key == 's') {
            this.DOWN = true;
        }
        if(event.keyCode == 32 || event.key == ' ') {
            this.SPACE = true;
        }
        if(event.keyCode == 70) {
            this.F = true;
        }
        if(event.keyCode == 69) {
            this.E = true;
        }
        if(event.keyCode == 13) {
            this.ENTER = true;
        }
    }

    handleKeyUp(event) {
        if(event.keyCode == 37 || event.key == 'a') {
            this.LEFT = false;
        }
        if(event.keyCode == 38 || event.key == 'w') {
            this.UP = false;
        }
        if(event.keyCode == 39 || event.key == 'd') {
            this.RIGHT = false;
        }
        if(event.keyCode == 40 || event.key == 's') {
            this.DOWN = false;
        }
        if(event.keyCode == 32 || event.key == ' ') {
            this.SPACE = false;
        }
        if(event.keyCode == 70) {
            this.F = false;
        }
        if(event.keyCode == 69) {
            this.E = false;
        }
        if(event.keyCode == 13) {
            this.ENTER = false;
        }

        if (event.keyCode == 69) { 
            this.keyReleased.E = true;
        }
        if (event.keyCode == 70) {
            this.keyReleased.F = true;
        }
        if (event.keyCode == 13) {
            this.keyReleased.ENTER = true;
        }
    }
}
