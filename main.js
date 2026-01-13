// --- Waste Segregation Game ---
const wasteItems = [
  { name: 'Banana Peel', emoji: '🍌', bin: 'organic' },
  { name: 'Plastic Bottle', emoji: '🧴', bin: 'recyclable' },
  { name: 'Newspaper', emoji: '📰', bin: 'recyclable' },
  { name: 'Apple Core', emoji: '🍏', bin: 'organic' },
  { name: 'Broken Toy', emoji: '🧸', bin: 'other' },
  { name: 'Can', emoji: '🥫', bin: 'recyclable' },
  { name: 'Eggshell', emoji: '🥚', bin: 'organic' },
  { name: 'Chip Bag', emoji: '🍟', bin: 'other' }
];
let wasteScore = 0, wasteTotal = wasteItems.length;
function renderWasteItems() {
  const container = document.getElementById('waste-items');
  if (!container) return;
  container.innerHTML = '';
  wasteItems.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'waste-draggable';
    el.draggable = true;
    el.textContent = item.emoji;
    el.title = item.name;
    el.style.fontSize = '2.2rem';
    el.style.cursor = 'grab';
    el.style.userSelect = 'none';
    el.style.margin = '0.2rem';
    el.dataset.idx = idx;
    el.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', idx);
    });
    container.appendChild(el);
  });
}
function setupWasteBins() {
  document.querySelectorAll('.waste-bin').forEach(bin => {
    bin.addEventListener('dragover', e => e.preventDefault());
    bin.addEventListener('drop', e => {
      e.preventDefault();
      const idx = e.dataTransfer.getData('text/plain');
      const item = wasteItems[idx];
      if (!item) return;
      if (bin.dataset.bin === item.bin) {
        bin.appendChild(document.querySelector('.waste-draggable[data-idx="'+idx+'"]'));
        document.querySelector('.waste-draggable[data-idx="'+idx+'"').draggable = false;
        wasteScore++;
        showWasteFeedback('Correct!');
      } else {
        showWasteFeedback('Try again!');
      }
      updateWasteScore();
    });
  });
}
function showWasteFeedback(msg) {
  const fb = document.getElementById('waste-feedback');
  if (fb) {
    fb.textContent = msg;
    fb.style.color = msg === 'Correct!' ? '#388e3c' : '#d32f2f';
    setTimeout(() => { fb.textContent = ''; }, 1200);
  }
}
function updateWasteScore() {
  const sc = document.getElementById('waste-score');
  if (sc) {
    sc.textContent = Score: ${wasteScore} / ${wasteTotal};
  }
}
window.addEventListener('DOMContentLoaded', () => {
  renderWasteItems();
  setupWasteBins();
  updateWasteScore();
});
// Animated falling leaves
const leafEmojis = ['🍂', '🍁', '🌿', '🍃'];

function startLeafAnimation() {
  const container = document.getElementById('leaves-bg');
  if (!container) {
    console.warn('leaves-bg container not found');
    return;
  }
  
  console.log('Starting leaf animation');
  
  function createLeaf() {
    const leaf = document.createElement('div');
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.className = 'falling-leaf';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.fontSize = '2.5rem';
    const duration = 5 + Math.random() * 4;
    leaf.style.animationDuration = duration + 's';
    console.log('Created leaf with duration:', duration + 's');
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000 + 500);
  }
  
  // Create first leaf immediately
  createLeaf();
  // Create new leaves every 900ms
  setInterval(createLeaf, 900);
}

// Try multiple ways to ensure this runs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startLeafAnimation);
} else {
  startLeafAnimation();
}
// Fun animation for the Start button
const startBtn = document.getElementById('startBtn');
if (startBtn) {
  startBtn.addEventListener('click', () => {
    startBtn.textContent = 'Let’s Go! 🌟';
    startBtn.style.background = 'linear-gradient(90deg, #bdbdbd 0%, #6c63ff 100%)';
    startBtn.style.color = '#fff';
    startBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
      startBtn.textContent = 'Start Your Adventure';
      startBtn.style.background = 'linear-gradient(90deg, #6c63ff 0%, #bdbdbd 100%)';
      startBtn.style.color = '#fff';
      startBtn.style.transform = 'scale(1)';
    }, 1200);
  });
}

// --- Interactive Quiz Feature ---
const quizData = [
  {
    question: 'Which of these is NOT recyclable?',
    options: ['Plastic bottle', 'Glass jar', 'Banana peel', 'Aluminum can'],
    answer: 2
  },
  {
    question: 'What is the best way to save energy at home?',
    options: ['Leave lights on', 'Unplug devices', 'Use more water', 'Open windows in winter'],
    answer: 1
  },
  {
    question: 'Planting trees helps to...?',
    options: ['Increase pollution', 'Reduce oxygen', 'Clean the air', 'Waste water'],
    answer: 2
  }
];
let quizIndex = 0;
let quizScore = 0;
document.addEventListener('DOMContentLoaded', () => {
  // Quiz DOM elements
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizFeedback = document.getElementById('quiz-feedback');

  function showQuizQuestion() {
    if (!quizQuestion || !quizOptions) return;
    const q = quizData[quizIndex];
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'quiz-btn';
      btn.onclick = () => checkQuizAnswer(i, btn);
      quizOptions.appendChild(btn);
    });
  }
  function checkQuizAnswer(selected, btn) {
    const q = quizData[quizIndex];
    if (selected === q.answer) {
      quizScore++;
      quizFeedback.textContent = 'Correct! 🌟';
      quizFeedback.style.color = '#6c63ff';
      btn.style.background = 'linear-gradient(90deg, #6c63ff 0%, #bdbdbd 100%)';
      btn.style.color = '#fff';
      btn.style.transform = 'scale(1.12)';
    } else {
      quizFeedback.textContent = 'Oops! Try again.';
      quizFeedback.style.color = '#f06292';
      btn.style.background = 'linear-gradient(90deg, #f06292 0%, #bdbdbd 100%)';
      btn.style.color = '#fff';
      btn.style.transform = 'scale(1.05)';
    }
    setTimeout(() => {
      quizIndex = (quizIndex + 1) % quizData.length;
      showQuizQuestion();
    }, 900);
  }
  if (quizQuestion && quizOptions) {
    showQuizQuestion();
  }
});

// --- Eco-Challenge Feature ---
const challengeDesc = document.getElementById('challenge-desc');
const completeChallengeBtn = document.getElementById('completeChallengeBtn');
const challengeFeedback = document.getElementById('challenge-feedback');
const challenges = [
  'Plant a tree in your neighborhood 🌳',
  'Segregate your household waste ♻',
  'Save electricity for a day 💡',
  'Pick up litter in a park 🗑',
  'Start a compost bin at home 🪱'
];
let challengeIndex = 0;
if (challengeDesc && completeChallengeBtn) {
  completeChallengeBtn.onclick = () => {
    challengeFeedback.textContent = 'Great job! You earned an Eco-Coin 🪙';
    challengeFeedback.style.color = '#6c63ff';
    completeChallengeBtn.style.background = 'linear-gradient(90deg, #6c63ff 0%, #bdbdbd 100%)';
    completeChallengeBtn.style.color = '#fff';
    completeChallengeBtn.style.transform = 'scale(1.07)';
    setTimeout(() => {
      challengeIndex = (challengeIndex + 1) % challenges.length;
      challengeDesc.textContent = challenges[challengeIndex];
      challengeFeedback.textContent = '';
      completeChallengeBtn.style.background = '';
      completeChallengeBtn.style.color = '';
      completeChallengeBtn.style.transform = '';
    }, 1200);
  };
  challengeDesc.textContent = challenges[challengeIndex];
}
// --- Leaderboard and Dashboard are static for demo, can be made dynamic later ---
// --- Eco Flip Cards Memory/Matching Game ---
const ecoPairs = [
  { fact: 'Turn off lights', action: 'Saves energy' },
  { fact: 'Use reusable bags', action: 'Reduces plastic waste' },
  { fact: 'Plant trees', action: 'Cleans the air' },
  { fact: 'Take shorter showers', action: 'Saves water' },
  { fact: 'Recycle paper', action: 'Saves trees' },
  { fact: 'Compost food scraps', action: 'Makes natural fertilizer' }
];
let flipCards = [], flipFirst = null, flipSecond = null, flipLock = false, flipScore = 0, flipMatches = 0;
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function setupFlipCards() {
  const container = document.getElementById('flip-cards-container');
  if (!container) return;
  // Prepare cards: each pair has a fact and an action card
  flipCards = [];
  ecoPairs.forEach((pair, idx) => {
    flipCards.push({ type: 'fact', text: pair.fact, pair: idx });
    flipCards.push({ type: 'action', text: pair.action, pair: idx });
  });
  shuffle(flipCards);
  container.innerHTML = '';
  flipCards.forEach((card, i) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flip-card';
    cardDiv.dataset.idx = i;
    cardDiv.style.width = '120px';
    cardDiv.style.height = '60px';
    cardDiv.style.background = '#e0f7fa';
    cardDiv.style.borderRadius = '10px';
    cardDiv.style.display = 'flex';
    cardDiv.style.alignItems = 'center';
    cardDiv.style.justifyContent = 'center';
    cardDiv.style.fontSize = '1rem';
    cardDiv.style.fontWeight = '600';
    cardDiv.style.cursor = 'pointer';
    cardDiv.style.boxShadow = '0 2px 8px #bdbdbd44';
    cardDiv.style.userSelect = 'none';
    cardDiv.style.transition = 'background 0.2s, color 0.2s, transform 0.2s';
    cardDiv.textContent = '';
    cardDiv.addEventListener('click', () => flipCard(i, cardDiv));
    container.appendChild(cardDiv);
  });
  flipFirst = null;
  flipSecond = null;
  flipLock = false;
  flipScore = 0;
  flipMatches = 0;
  updateFlipScore();
  setFlipFeedback('');
}
function flipCard(idx, cardDiv) {
  if (flipLock) return;
  if (cardDiv.textContent !== '') return; // already flipped
  cardDiv.textContent = flipCards[idx].text;
  cardDiv.style.background = '#b2dfdb';
  cardDiv.style.color = '#333';
  cardDiv.style.transform = 'scale(1.07)';
  if (flipFirst === null) {
    flipFirst = { idx, cardDiv };
  } else if (flipSecond === null && idx !== flipFirst.idx) {
    flipSecond = { idx, cardDiv };
    checkFlipMatch();
  }
}
function checkFlipMatch() {
  flipLock = true;
  const cardA = flipCards[flipFirst.idx];
  const cardB = flipCards[flipSecond.idx];
  if (cardA.pair === cardB.pair && cardA.type !== cardB.type) {
    // Match!
    setTimeout(() => {
      flipFirst.cardDiv.style.background = '#81c784';
      flipSecond.cardDiv.style.background = '#81c784';
      flipFirst.cardDiv.style.color = '#fff';
      flipSecond.cardDiv.style.color = '#fff';
      flipFirst.cardDiv.style.cursor = 'default';
      flipSecond.cardDiv.style.cursor = 'default';
      flipFirst.cardDiv.style.transform = 'scale(1)';
      flipSecond.cardDiv.style.transform = 'scale(1)';
      flipFirst.cardDiv.onclick = null;
      flipSecond.cardDiv.onclick = null;
      flipMatches++;
      flipScore++;
      setFlipFeedback('Matched!');
      updateFlipScore();
      if (flipMatches === ecoPairs.length) {
        setFlipFeedback('You matched all pairs! 🌟');
      }
      flipFirst = null;
      flipSecond = null;
      flipLock = false;
    }, 700);
  } else {
    // Not a match
    setTimeout(() => {
      flipFirst.cardDiv.textContent = '';
      flipSecond.cardDiv.textContent = '';
      flipFirst.cardDiv.style.background = '#e0f7fa';
      flipSecond.cardDiv.style.background = '#e0f7fa';
      flipFirst.cardDiv.style.color = '#333';
      flipSecond.cardDiv.style.color = '#333';
      flipFirst.cardDiv.style.transform = 'scale(1)';
      flipSecond.cardDiv.style.transform = 'scale(1)';
      flipScore++;
      setFlipFeedback('Try again!');
      updateFlipScore();
      flipFirst = null;
      flipSecond = null;
      flipLock = false;
    }, 900);
  }
}
function setFlipFeedback(msg) {
  const fb = document.getElementById('flip-feedback');
  if (fb) {
    fb.textContent = msg;
    fb.style.color = msg === 'Matched!' || msg.includes('all pairs') ? '#388e3c' : '#d32f2f';
    if (msg === '') fb.style.color = '';
  }
}
function updateFlipScore() {
  const sc = document.getElementById('flip-score');
  if (sc) {
    sc.textContent = `Tries: ${flipScore} | Matches: ${flipMatches} / ${ecoPairs.length}`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setupFlipCards();
});

// --- Simple Starter Eco Flip Cards Game (self-contained) ---
document.addEventListener('DOMContentLoaded', () => {
  // Inject CSS for the simple game (scoped to .simple-grid and .simple-card)
  const style = document.createElement('style');
  style.textContent = `
    .simple-grid { display: grid; grid-template-columns: repeat(4, 120px); grid-gap: 15px; }
    .simple-card {
      width: 120px; height: 150px; background: #00796b; color: white;
      display: flex; justify-content: center; align-items: center;
      cursor: pointer; font-size: 14px; border-radius: 8px; text-align: center;
      user-select: none; transition: transform 0.3s;
    }
    .simple-card.flipped {
      background: #a5d6a7; color: black; transform: rotateY(180deg);
    }
  `;
  document.getElementById('simple-eco-flip-style')?.appendChild(style);

  const ecoCards = [
    {name: 'Lights', info: 'Turn off lights → Saves energy'},
    {name: 'Water', info: 'Save water → Protects rivers'},
    {name: 'Recycle', info: 'Recycle → Reduces plastic waste'},
    {name: 'Tree', info: 'Plant trees → Clean air'},
  ];
  let cardsArray = [...ecoCards, ...ecoCards];
  cardsArray.sort(() => 0.5 - Math.random());
  const gameBoard = document.getElementById('simpleGameBoard');
  let flippedCards = [];
  let matchedPairs = 0;
  if (!gameBoard) return;
  cardsArray.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('simple-card');
    cardElement.dataset.name = card.name;
    cardElement.innerText = card.name;
    cardElement.addEventListener('click', () => flipCard(cardElement, card));
    gameBoard.appendChild(cardElement);
  });
  function flipCard(cardElement, cardData) {
    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
      cardElement.classList.add('flipped');
      cardElement.innerText = cardData.info;
      flippedCards.push({cardElement, cardData});
      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    }
  }
  function checkMatch() {
    const [first, second] = flippedCards;
    if (first.cardData.name === second.cardData.name) {
      matchedPairs++;
      if (matchedPairs === ecoCards.length) alert('You matched all eco cards!');
    } else {
      first.cardElement.classList.remove('flipped');
      first.cardElement.innerText = first.cardData.name;
      second.cardElement.classList.remove('flipped');
      second.cardElement.innerText = second.cardData.name;
    }
    flippedCards = [];
  }
  const leavesContainer = document.getElementById("leaves-bg");

function spawnLeaf() {
  const leaf = document.createElement("img");
  leaf.src = "eco-leaf.png"; // or any leaf PNG
  leaf.className = "falling-leaf";

  leaf.style.left = Math.random() * 100 + "vw";
  leaf.style.animationDuration = 5 + Math.random() * 4 + "s";
  leaf.style.transform = `rotate(${Math.random() * 360}deg)`;

  leavesContainer.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, 9000);
}

setInterval(spawnLeaf, 500);

});
