let isBlown = false;

function blowCandles() {
    
    if (isBlown) return;
    isBlown = true;

    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.classList.add('out');
    });

   
    const instruction = document.getElementById('instruction');
    instruction.style.opacity = '0';

    
    setTimeout(() => {
        const message = document.getElementById('birthdayMessage');
        message.classList.add('show-message');
        document.getElementById('nameMessage').classList.add('show-message');
        startConfetti();
    }, 500);
}


function startConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfettiPiece();
    }
}


function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 3 + 2; 
    confetti.style.animation = `fall ${duration}s linear forwards`;
    
    confetti.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, (duration + 2) * 1000);
}

