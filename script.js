// ============ Global ================
const giftBox = document.getElementById("giftBox");
const content = document.querySelector(".content");
const letsGoBtn = document.getElementById("letsGo");
const wishDisplay = document.getElementById("wishDisplay");
const nameInput = document.getElementById("friendName");
const bgMusic = document.getElementById("bgMusic");

let confettiRunning = false;
let confetti;

// ============ Wishes Array ================
const wishes = [
  "Wishing you a day filled with smiles and good conversations.",
  "Grateful to have a thoughtful and reliable friend like you.",
  "Here's to mutual respect, laughter, and shared goals.",
  "Friendship makes work lighter and days brighter. Thank you!",
  "Wishing you continued success and positive connections.",
  "Happy Friendship Day – let’s keep learning and growing together!",
  "Appreciate your support and thoughtful presence.",
  "To dependable friendships that make life easier.",
  "Glad to share this day with a friend who always brings clarity.",
  "Friendship is about trust, growth, and shared progress."
];

// ============ Confetti Setup ================
function startConfetti() {
  if (!confettiRunning) {
    confetti = confettiCanvas();
    confettiRunning = true;
    setTimeout(() => {
      confettiRunning = false;
      confetti && confetti.reset();
    }, 6000);
  }
}

function confettiCanvas() {
  const canvas = document.getElementById("confetti-canvas");
  const confetti = window.confetti.create(canvas, { resize: true });
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });
  return confetti;
}

// ============ Speech Function ================

window.speechSynthesis.onvoiceschanged = () => {
  // Now voices are loaded
};


function speakWish(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.pitch = 1.1;
  msg.rate = 0.85; // Slightly slower
  msg.lang = "en-US";

  const voices = speechSynthesis.getVoices();

  // Try to find a clearly female voice
  const femaleVoice = voices.find(voice =>
    /female|woman|google us english/i.test(voice.name)
  );

  // Fallback if no voice found
  msg.voice = femaleVoice || voices[0];

  speechSynthesis.cancel(); // Stop previous voice
  speechSynthesis.speak(msg);
}


// ============ UI Logic ================
giftBox.addEventListener("click", () => {
  giftBox.style.display = "none";
  content.classList.add("show");
  bgMusic.play().catch(() => {}); // prevent autoplay error
});

letsGoBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  bgMusic.pause();

  const wish = wishes[Math.floor(Math.random() * wishes.length)].replace("{name}", name);
  wishDisplay.textContent = `🎉 ${wish}`;
  wishDisplay.style.display = "block";

  startConfetti();
  speakWish(`Happy Friendship Day, ${name}! ${wish}`);
});

// ============ Exit Button ================
const exitBtn = document.createElement("button");
exitBtn.textContent = "Exit ❌";
exitBtn.classList.add("exit-btn");
exitBtn.addEventListener("click", () => {
  location.reload();
});
document.body.appendChild(exitBtn);
