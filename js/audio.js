window.audio = {
    bg_music: new Audio('audio/soundtrack.mp3'),
    bottle_breaking: new Audio('audio/glass.mp3'),
    bottle_throwing: new Audio('audio/throw.mp3'),
    chicken_dead: new Audio('audio/chicken.mp3'),
    collect_bottle: new Audio('audio/bottle.mp3'),
    collect_coin: new Audio('audio/coin.mp3'),
    endboss_attack: new Audio('audio/endboss_attack.mp3'),
    endboss_dead: new Audio('audio/endboss_dead.mp3'),
    endboss_hurt: new Audio('audio/endboss_hurt.mp3'),
    endbossMusic: new Audio('audio/endbosssound.mp3'),
    game_over: new Audio('audio/game_over.mp3'),
    is_dead: new Audio('audio/dead.mp3'),
    is_hurt: new Audio('audio/hurt.mp3'),
    jumping_sound: new Audio('audio/jump.mp3'),
    smallChicken_dead: new Audio('audio/smallchicken.mp3'),
    throw_bottle: new Audio('audio/throw.mp3'),
    walking_sound: new Audio('audio/running.mp3'),
    you_win: new Audio('audio/win.mp3'),
};

/**
 * The function mutes all audio elements on the webpage by setting their volume to 0.
 */
function muteAudio() {
    for (const key in window.audio) {
        if (window.audio[key] instanceof Audio) {
            window.audio[key].volume = 0;
        }
    }
    isMuted = true;
}

/**
 * The function unmutes all audio elements on the webpage.
 */
function unmuteAudio() {
    for (const key in window.audio) {
        if (window.audio[key] instanceof Audio) {
            window.audio[key].volume = 1;
            window.audio.bg_music.volume = 0.3;
        }
    }
    isMuted = false;
}

/**
 * The function mutes all audio except for the one specified by the exceptionAudioKey parameter.
 * @param exceptionAudioKey - The parameter `exceptionAudioKey` is a string representing the key of an
 * audio object that should not be muted. The function `muteAllExcept` loops through all the audio
 * objects in the `window.audio` object and mutes them, except for the one with the key specified in
 * `exceptionAudio
 */
function muteAllExcept(exceptionAudioKey) {
    for (const key in window.audio) {
        if (window.audio[key] instanceof Audio && key !== exceptionAudioKey) {
            window.audio[key].muted = true;
        }
    }
}

window.muteAudio = muteAudio;
window.unmuteAudio = unmuteAudio;

