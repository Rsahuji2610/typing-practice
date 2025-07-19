
const alphabet = 'asdfjkl;';
let currentLetters = '';
let typedCount = 0;
let correctCount = 0;

function generateSequence(length = 25) {
  currentLetters = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  document.getElementById('letterBox').innerText = currentLetters;
}

document.getElementById('typingInput').addEventListener('input', function () {
  const input = this.value;
  typedCount = input.length;
  correctCount = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentLetters[i]) {
      correctCount++;
    }
  }
  const accuracy = typedCount > 0 ? Math.round((correctCount / typedCount) * 100) : 0;
  document.getElementById('typedCount').innerText = typedCount;
  document.getElementById('accuracy').innerText = accuracy + '%';
});

generateSequence();
