
const words = ["hello", "world", "typing", "speed", "test", "practice", "keyboard", "code", "javascript", "web"];
let currentText = "";
let startTime;
let wordBox = document.getElementById("wordBox");
let inputArea = document.getElementById("inputArea");
let wpmDisplay = document.getElementById("wpm");
let accuracyDisplay = document.getElementById("accuracy");

function generateWords() {
  currentText = words.sort(() => 0.5 - Math.random()).slice(0, 25).join(" ");
  wordBox.innerText = currentText;
}

inputArea.addEventListener("input", () => {
  if (!startTime) {
    startTime = new Date();
  }
  let typedText = inputArea.value;
  let elapsed = (new Date() - startTime) / 1000 / 60;
  let wordsTyped = typedText.trim().split(" ").length;
  let wpm = Math.round(wordsTyped / elapsed);
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentText[i]) correctChars++;
  }
  let accuracy = Math.round((correctChars / typedText.length) * 100);
  wpmDisplay.innerText = isNaN(wpm) ? 0 : wpm;
  accuracyDisplay.innerText = isNaN(accuracy) ? "0%" : accuracy + "%";
});

generateWords();
