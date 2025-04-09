const length = 20;
const cursor = document.getElementById("cursor");

let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(length).fill({ x: 0, y: 0 });

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function onClick(event) {
  for (let i = 0; i < length; i++) {
    cursorHistory[i].x += Math.random() * 100 - 50;
    cursorHistory[i].y += Math.random() * 100 - 50;
  }
}

function initCursor() {
  for (let i = 0; i < length; i++) {
    let div = document.createElement("div");
    div.classList.add("cursor-circle");
    cursor.append(div);
  }
  cursorCircles = Array.from(document.querySelectorAll(".cursor-circle"));
}

function updateCursor() {
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });

  for (let i = 0; i < length; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i + 1] || cursorHistory[length - 1];

    let xDiff = next.x - current.x;
    let yDiff = next.y - current.y;

    current.x += xDiff * 0.35;
    current.y += yDiff * 0.35;
    cursorCircles[i].style.transform = `translate(${current.x}px, ${
      current.y
    }px) scale(${i / length})`;
  }
  requestAnimationFrame(updateCursor);
}

document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("click", onClick, false);

initCursor();
updateCursor();