
const tasks = [
  "Revise Math Topic",
  "Solve Physics DPP",
  "Chemistry Notes",
  "Mock Test (1 hr)",
  "Mistake Review",
  "Evening Gym / Walk"
];

const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const streakText = document.getElementById("streak");

let streak = parseInt(localStorage.getItem("jee_streak") || "0");
let lastDate = localStorage.getItem("jee_last_date");
let today = new Date().toDateString();

if (lastDate && lastDate !== today) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (lastDate !== yesterday.toDateString()) streak = 0;
}

localStorage.setItem("jee_last_date", today);
streakText.innerText = "Streak: " + streak + " days";

tasks.forEach((task, i) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = "task_" + i;
  input.addEventListener("change", updateProgress);
  const label = document.createElement("label");
  label.htmlFor = "task_" + i;
  label.innerText = task;
  li.appendChild(input);
  li.appendChild(label);
  taskList.appendChild(li);
});

function updateProgress() {
  const total = tasks.length;
  const done = [...document.querySelectorAll("input[type=checkbox]")].filter(cb => cb.checked).length;
  const percent = Math.floor((done / total) * 100);
  progressFill.style.width = percent + "%";
  progressText.innerText = "Progress: " + percent + "%";
  if (percent === 100) {
    localStorage.setItem("jee_streak", (streak + 1).toString());
  }
}

updateProgress();

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Galaxy Particle Background
const canvas = document.getElementById("galaxyBackground");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawGalaxy() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });
}

setInterval(drawGalaxy, 40);
