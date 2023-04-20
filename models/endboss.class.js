class Endboss extends MovableObject {

    type = 'endboss'
    health = 99;
    height = 350;
    width = 300;
    y = 100;
    standing = true;
    attacking = false;
    walking = false;
    hurt = false;
    dead = false;
    hits = 0;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_SLEEPING = [
        'img/4_enemie_boss_chicken/6_sleeping/G27.png',
        'img/4_enemie_boss_chicken/6_sleeping/G28.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G6.png');
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 6750;
        this.animate();
        this.isAlert = false;
        this.movingLeft = false;
        this.speed = 0.8;
        this.youWinTriggered = false;
    }

    animate() {
        setInterval(() => {
            if (!this.isAlert) {
                this.playAnimation(this.IMAGES_SLEEPING);
            }
        }, 800);

        setInterval(() => {
            if (this.isAlert) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);

        setInterval(() => {
            if (this.attacking) {
                this.playAnimation(this.IMAGES_ATTACKING, true);
            }
        }, 100);

        setInterval(() => {
            if (this.walking) {
                this.playAnimation(this.IMAGES_WALKING, true);
            }
        }, 100);

        setInterval(() => {
            if (this.hurt) {
                this.playAnimation(this.IMAGES_HURT, true);
            }
        }, 100);
        setInterval(() => {
            if (this.dead) {
                this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
                if (!this.youWinTriggered) {
                    setTimeout(() => {
                        bgMusic.pause();
                        youWin();
                    }, 1000);
                    this.youWinTriggered = true;
                }
            }
        }, 200);
        

    }

    resetAnimation() {
        this.currentImage = 0;
        this.loadImages(this.IMAGES_ATTACKING);
    }

    moveLeft() {
        if (!this.movingLeft && !this.standing) {
            this.movingLeft = true;
            this.walking = true;
            this.standing = true;

            const move = () => {
                if (this.isAlert && this.movingLeft) {
                    this.x -= this.speed;
                    requestAnimationFrame(move);
                } else {
                    this.movingLeft = false;
                    this.walking = false;
                }
            };

            requestAnimationFrame(move);
        }
    }

    stopMoving() {
        this.movingLeft = false;
        this.standing = true;
    }

    resumeMoving() {
        this.standing = false;
    }


    hitbox = new Hitbox(80, 40, 10, 40);
}