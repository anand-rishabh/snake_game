let starting = { x: 0, y: 0 };
const eatsound = new Audio("music/food.mp3");
const gameover = new Audio("music/gameover.mp3");
const move = new Audio("music/move.mp3");
let snakebody = [{ x: 13, y: 16 }];
let speed = 15;
let score = 0;
let lastTime = 0;
let food = { x: 5, y: 5 };

function main(render) {
  window.requestAnimationFrame(main);
  if ((render - lastTime) / 1000 < 1 / speed) {
    return;
  }
  lastTime = render;

  logic();
}
window.requestAnimationFrame(main);

window.addEventListener("keydown", (eve) => {
  starting = { x: 0, y: -1 };
  move.play();
  switch (eve.key) {
    case "ArrowUp":
      starting.x = 0;
      starting.y = -1;

      break;
    case "ArrowDown":
      starting.x = 0;
      starting.y = 1;

      break;
    case "ArrowLeft":
      starting.x = -1;
      starting.y = 0;

      break;
    case "ArrowRight":
      starting.x = 1;
      starting.y = 0;
      break;
    default:
      break;
  }
});

function isCrash(crash) {
  for (let i = 1; i < snakebody.length; i++) {
    if (crash[i].x === crash[0].x && crash[i].y === crash[0].y) {
      return true;
    }
  }
  if (
    crash[0].x >= 25 ||
    crash[0].x <= 0 ||
    crash[0].y >= 25 ||
    crash[0].y <= 0
  ) {
    return true;
  }
  return false;
}
function logic() {
  if (isCrash(snakebody)) {
    gameover.play();
    starting = { x: 0, y: 0 };
    alert("Game Over.");
    snakebody = [{ x: 13, y: 16 }];
    score = 0;
  }
  // speedBox.innerHTML = "Speed : " + speed;

  if (snakebody[0].x === food.x && snakebody[0].y === food.y) {
    eatsound.play();
    score += 1;
    ScoreBox.innerHTML = "Score : " + score;
    snakebody.unshift({
      x: snakebody[0].x + starting.x,
      y: snakebody[0].y + starting.y,
    });
    let a = 1;
    let b = 24;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakebody.length - 2; i >= 0; i--) {
    snakebody[i + 1] = { ...snakebody[i] };
  }

  snakebody[0].x += starting.x;
  snakebody[0].y += starting.y;

  board.innerHTML = "";
  snakebody.forEach((e, index) => {
    snakeparth = document.createElement("div");
    snakeparth.style.gridRowStart = e.y;
    snakeparth.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeparth.classList.add("head");
    } else {
      snakeparth.classList.add("snake");
    }
    board.appendChild(snakeparth);
  });

  foodparth = document.createElement("div");
  foodparth.style.gridRowStart = food.y;
  foodparth.style.gridColumnStart = food.x;
  foodparth.classList.add("food");
  board.appendChild(foodparth);
}

// document.querySelectorAll(".head").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     btn.classList.toggle("change");
//     btn.nextElementSibling.classList.toggle("chnge");
//   });
// });
