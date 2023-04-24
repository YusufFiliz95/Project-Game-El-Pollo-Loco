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

        this.eventTouchpadBtns();
    }

    /**
     * The function handles keydown events and sets corresponding boolean values to true based on the key
     * pressed.
     * @param event - The event parameter is an object that contains information about the event that
     * occurred, such as the type of event, the target element, and any additional data related to the
     * event. In this case, it is used to detect which key was pressed by the user.
     */
    handleKeyDown(event) {
        if (event.keyCode == 37 || event.key == 'a') {
            this.LEFT = true;
        }
        if (event.keyCode == 38 || event.key == 'w') {
            this.UP = true;
        }
        if (event.keyCode == 39 || event.key == 'd') {
            this.RIGHT = true;
        }
        if (event.keyCode == 40 || event.key == 's') {
            this.DOWN = true;
        }
        if (event.keyCode == 32 || event.key == ' ') {
            this.SPACE = true;
        }
        if (event.keyCode == 70) {
            this.F = true;
        }
        if (event.keyCode == 69) {
            this.E = true;
        }
        if (event.keyCode == 13) {
            this.ENTER = true;
        }
    }

    /**
     * The function handles key up events and updates corresponding boolean variables and keyReleased
     * object properties.
     * @param event - The event parameter is an object that contains information about the event that
     * occurred, such as the type of event, the target element, and any additional data related to the
     * event. In this case, it is used to detect which key was released and update the corresponding
     * boolean variables and keyReleased object.
     */
    handleKeyUp(event) {
        if (event.keyCode == 37 || event.key == 'a') {
            this.LEFT = false;
        }
        if (event.keyCode == 38 || event.key == 'w') {
            this.UP = false;
        }
        if (event.keyCode == 39 || event.key == 'd') {
            this.RIGHT = false;
        }
        if (event.keyCode == 40 || event.key == 's') {
            this.DOWN = false;
        }
        if (event.keyCode == 32 || event.key == ' ') {
            this.SPACE = false;
        }
        if (event.keyCode == 70) {
            this.F = false;
        }
        if (event.keyCode == 69) {
            this.E = false;
        }
        if (event.keyCode == 13) {
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

    eventTouchpadBtns() {
        setTimeout(() => {
            document
                .getElementById('moveleftphone')
                .addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    this.LEFT = true; // Updated variable name
                });
    
            document
                .getElementById('moveleftphone')
                .addEventListener('touchend', (event) => {
                    event.preventDefault();
                    this.LEFT = false; // Updated variable name
                });
    
            document
                .getElementById('moverightphone')
                .addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    this.RIGHT = true; // Updated variable name
                });
    
            document
                .getElementById('moverightphone')
                .addEventListener('touchend', (event) => {
                    event.preventDefault();
                    this.RIGHT = false; // Updated variable name
                });
    
            document
                .getElementById('jumpphone')
                .addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    this.SPACE = true; // Updated variable name
                });
    
            document
                .getElementById('jumpphone')
                .addEventListener('touchend', (event) => {
                    event.preventDefault();
                    this.SPACE = false; // Updated variable name
                });
    
            document
                .getElementById('throwphone')
                .addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    this.F = true; // Updated variable name
                });
    
            document
                .getElementById('throwphone')
                .addEventListener('touchend', (event) => {
                    event.preventDefault();
                    this.F = false; // Updated variable name
                });
        }, 500);
    }
    
}

