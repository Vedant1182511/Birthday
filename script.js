// Confetti burst code by https://codepen.io/yeun/pen/yEGbGa edited for this context
const colors = [
  "#fc4a7b", "#ffd700", "#51e898", "#b5b2fa", "#f7a8ff", "#ffe38a", "#9be0ff"
];

// Simple confetti burst
function confettiBurst(x, y) {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let confetti = [];
  let count = 80;
  for(let i=0; i<count; i++) {
    confetti.push({
      x: x,
      y: y,
      r: Math.random()*7+2,
      d: Math.random()*80,
      color: colors[Math.floor(Math.random()*colors.length)],
      tilt: Math.random()*20-10,
      tiltAngle: 0,
      tiltAngleIncremental: Math.random()*0.07+0.05,
      angle: Math.random()*2*Math.PI,
      velocity: Math.random()*6+2,
      gravity: 0.13 + Math.random()*0.03
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<confetti.length; i++) {
      let c = confetti[i];
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.r, c.r*0.9, c.angle, 0, 2*Math.PI);
      ctx.fillStyle = c.color;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
      c.x += Math.cos(c.angle) * c.velocity * (1-c.d/100);
      c.y += Math.sin(c.angle) * c.velocity + c.gravity * frame * 0.02;
      c.angle += 0.02 * (i%3===0?-1:1);
      c.tilt += c.tiltAngleIncremental;
      c.d -= 0.3;
    }
    frame++;
    if(frame<70) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// Candle blow-out on click
document.querySelectorAll('.candle').forEach((candle, idx) => {
  candle.addEventListener('click', function(e) {
    let flame = candle.querySelector('.flame');
    if(flame.style.opacity !== "0") {
      flame.style.transition = 'opacity 0.4s, filter 0.9s';
      flame.style.filter = 'blur(6px)';
      flame.style.opacity = "0";
      // Confetti burst
      const rect = e.target.getBoundingClientRect();
      const x = rect.left + rect.width/2;
      const y = rect.top + 5;
      confettiBurst(x, y);
    }
  });
});

// Responsive canvas
window.addEventListener('resize', function(){
  const canvas = document.getElementById('confettiCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
