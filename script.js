const piano = document.querySelector('.piano'),
    pianoKeys = document.querySelectorAll('.piano-key'),
    pianoKey = document.querySelector('.piano-key')
    pianoBtns = document.querySelectorAll('.piano-btn'),
    lettersBtn = document.querySelector('.btn-letters'),
    notesBtn = document.querySelector('.btn-notes'),
    fullScreenBtn = document.querySelector('.fullscreen'),
    body = document.querySelector('body');

function playAudio(e, data) {
    const pianoBtn = document.querySelector(`.piano-btn[data-code=${data}]`),
        audio = document.querySelector(`audio[data-code=${data}]`);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
        pianoBtn.classList.add('piano-key-active', 'piano-key-hover');
        setTimeout(() => {
            pianoBtn.classList.remove('piano-key-active', 'piano-key-hover');
        }, 300);
    } else {
        return;
    }
}

function action (e) {
  playAudio(e, e.target.dataset.code);
}

function startSoundOver() {
  pianoBtns.forEach(item => {
    item.addEventListener('mouseover', action)
  })
}

function stopSoundOver () {
  pianoBtns.forEach(item => {
    item.removeEventListener('mouseover', action)
  })
}

function fullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitrequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullScreen();
    }
}

function fullScreenCancel() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

fullScreenBtn.addEventListener('click', () => {
    if (fullScreenBtn.classList.contains('openfullscreen')) {
        fullScreen(body);
        fullScreenBtn.classList.remove('openfullscreen');
    } else {
        fullScreenCancel(body);
        fullScreenBtn.classList.add('openfullscreen');
    }

})

window.addEventListener('keypress', e => {
    playAudio(e, e.code);
});

piano.addEventListener('mousedown', e => {
  playAudio(e, e.target.dataset.code);
});

document.addEventListener('mousedown', startSoundOver);
document.addEventListener('mouseup', stopSoundOver);

lettersBtn.addEventListener('click', () => {
    notesBtn.classList.remove('btn-active');
    lettersBtn.classList.add('btn-active');
    pianoKeys.forEach((i) => {
        i.classList.add('piano-key-letter');
    })
});

notesBtn.addEventListener('click', () => {
    notesBtn.classList.add('btn-active');
    lettersBtn.classList.remove('btn-active');
    pianoKeys.forEach((i) => {
        i.classList.remove('piano-key-letter');
    })
});