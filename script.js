const startBtn = document.getElementById('startBtn');
const cover = document.getElementById('cover');
const bookScreen = document.getElementById('bookScreen');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCounter = document.getElementById('pageCounter');
const confettiBtn = document.getElementById('confettiBtn');

let currentPage = 0;
let musicPlaying = false;

function updatePage() {
  pages.forEach((page, index) => {
    page.classList.toggle('active', index === currentPage);
  });

  pageCounter.textContent = `Page ${currentPage + 1} / ${pages.length}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.textContent = currentPage === pages.length - 1 ? 'Finish ❤️' : 'Next →';

  if (currentPage === pages.length - 1) {
    launchConfetti();
  }
}

async function playMusic() {
  try {
    await music.play();
    musicPlaying = true;
    musicBtn.textContent = 'Pause Music';
  } catch (error) {
    musicPlaying = false;
    musicBtn.textContent = 'Play Music';
  }
}

startBtn.addEventListener('click', () => {
  cover.classList.add('hidden');
  bookScreen.classList.remove('hidden');
  playMusic();
  updatePage();
});

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicBtn.textContent = 'Play Music';
  } else {
    playMusic();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updatePage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    updatePage();
  } else {
    launchConfetti();
  }
});

confettiBtn.addEventListener('click', launchConfetti);

function launchConfetti() {
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.background = ['#fff', '#ffcc00', '#ff5c8a', '#7df9ff', '#baff7d'][Math.floor(Math.random() * 5)];
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3300);
  }
}

function createHeart() {
  const heart = document.createElement('span');
  heart.textContent = ['❤️', '💖', '✨', '🌸'][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 5 + Math.random() * 5 + 's';
  document.querySelector('.floating-hearts').appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 700);
updatePage();
