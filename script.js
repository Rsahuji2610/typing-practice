const wordDisplay = document.getElementById('wordDisplay');
const inputArea = document.getElementById('inputArea');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeSelect = document.getElementById('timeSelect');
const keyboard = document.getElementById('keyboard');

const words = ["hello", "world", "javascript", "typing", "speed", "test", "keyboard", "accuracy", "practice", "random"];
let timer;
let timeLeft;
let wordIndex = 0;
let typedWords = [];
let correctChars = 0;
let totalChars = 0;

function generateWords() {
  let text = '';
  for (let i = 0; i < 50; i++) {
    text += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  wordDisplay.textContent = text.trim();
}

function startTest() {
  resetTest();
  inputArea.disabled = false;
  inputArea.focus();
  timeLeft = parseInt(timeSelect.value);
  timerDisplay.textContent = timeLeft;
  generateWords();
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      inputArea.disabled = true;
      calculateStats();
    }
  }, 1000);
}

function resetTest() {
  clearInterval(timer);
  inputArea.disabled = true;
  inputArea.value = '';
  timerDisplay.textContent = timeSelect.value;
  wordDisplay.textContent = '';
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent = '100';
  correctChars = 0;
  totalChars = 0;
  keyboard.querySelectorAll('.key').forEach(k => k.classList.remove('active'));
}

function calculateStats() {
  const typedText = inputArea.value.trim();
  totalChars = typedText.length;
  const displayedWords = wordDisplay.textContent.trim().split(' ');
  const typedWords = typedText.split(' ');

  let correctWords = 0;
  typedWords.forEach((word, index) => {
    if (word === displayedWords[index]) correctWords++;
  });

  correctChars = typedWords.reduce((acc, word, index) => {
    if (word === displayedWords[index]) return acc + word.length;
    return acc;
  }, 0);

  const wpm = Math.round(correctWords / (parseInt(timeSelect.value) / 60));
  const accuracy = totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
}

document.addEventListener('keydown', (e) => {
  const keyEl = document.getElementById('key-' + e.key.toLowerCase());
  if (keyEl) keyEl.classList.add('active');
});

document.addEventListener('keyup', (e) => {
  const keyEl = document.getElementById('key-' + e.key.toLowerCase());
  if (keyEl) keyEl.classList.remove('active');
});

function renderKeyboard() {
  const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');
  keyboard.innerHTML = '';
  keys.forEach(key => {
    const keyEl = document.createElement('div');
    keyEl.className = 'key';
    keyEl.id = 'key-' + key;
    keyEl.textContent = key;
    keyboard.appendChild(keyEl);
  });
}

renderKeyboard();
