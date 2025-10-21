document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const yoshiWrapper = document.getElementById('yoshi-btn');
    const yoshiImg = yoshiWrapper.querySelector('img');

    const crackSound = new Audio('asset/egg-cracking-6844.mp3');
    const finalSound = new Audio('asset/yoshi-hmmph.mp3');

    finalSound.volume = 1.0;
    music.volume = 0.2;
    crackSound.volume = 0.3;

    const eggStages = [
        'asset/egg.png',
        'asset/eggcrack1.png',
        'asset/eggcrack2.png',
        'asset/eggcrack3.png',
        'asset/eggcrack4.png',
        'asset/eggcrack5.png',
        'asset/eggcrack6.png',
        'asset/eggcrack7.png',
        'asset/eggcrack8.png',
        'asset/eggcrack9.png'
    ];

    let currentStage = 0;


    musicBtn.addEventListener('click', () => {
        music.muted = !music.muted;
        musicBtn.classList.add('clicked');
        setTimeout(() => musicBtn.classList.remove('clicked'), 150);
    });


    document.body.addEventListener('click', () => {
        music.muted = false;
        music.volume = 0.2;
        music.play();
    }, {
        once: true
    });


    yoshiWrapper.addEventListener('click', () => {
        yoshiWrapper.classList.add('clicked');
        setTimeout(() => yoshiWrapper.classList.remove('clicked'), 500);

        if (currentStage < eggStages.length - 1) {
            currentStage++;
            yoshiImg.src = eggStages[currentStage];
            crackSound.currentTime = 0;
            crackSound.play();
        } else {
            finalSound.play();
            triggerFlashEffect(() => {
                window.location.href = "thesis.pdf";
            });
        }
    });


    function triggerFlashEffect(callback) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = 0;
        flash.style.left = 0;
        flash.style.width = '100vw';
        flash.style.height = '100vh';
        flash.style.backgroundColor = 'white';
        flash.style.opacity = 0;
        flash.style.zIndex = 9999;
        flash.style.transition = 'opacity 1.5s ease-in-out';
        flash.style.pointerEvents = 'none';
        flash.style.mixBlendMode = 'normal';
        document.body.appendChild(flash);

        requestAnimationFrame(() => {
            flash.style.opacity = 1;
            setTimeout(() => {
                callback();
            }, 1600);
        });
    }

    document.addEventListener('contextmenu', (e) => {
      if (e.target.matches('img')) {
        e.preventDefault();
      }
    });

    document.addEventListener('touchstart', (e) => {
      if (e.target.matches('img')) {
        clearTimeout(window._pressTimer);
        window._pressTimer = setTimeout(() => e.preventDefault(), 200);
      }
    });

    document.addEventListener('touchend', () => clearTimeout(window._pressTimer));
});