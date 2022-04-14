const htmlElement = document.getElementsByClassName("scoreNumber");
const numScoreEle = document.getElementsByClassName("numScore");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let game = new Game();

canvas.width = 1366;
canvas.height = 768;

let amountOfAnimates = 0;

const values = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
  p: {
    pressed: false,
  },
};

function startGame() {
  game.start();
  game.toggleScreen("explained", true);
  setTimeout(() => {
    game.toggleScreen("explained", false);
  }, 3000);
}

function restartGame() {
  game = new Game();
  game.gameRestart();
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? "block" : "none";
  element.style.display = display;
}

document.addEventListener("keydown", function (event) {
  const keyCode = event.keyCode;
  switch (keyCode) {
    case 80:
      console.log("hello");
      values.p.pressed = true;
      game.pauseGame();
      console.log(game.game.active);
      break;
  }
});

document.addEventListener("keydown", function (event) {
  const keyCode = event.keyCode;
  if (values.a.pressed === false || values.d.pressed === false) {
    switch (keyCode) {
      case 37:
        values.a.pressed = true;
        break;
      case 39:
        values.d.pressed = true;
        break;
    }
  }
});

document.addEventListener("keydown", ({ key }) => {
  if (game.game.over) {
    return;
  } else if (!game.game.over) {
    switch (key) {
      case "a":
        values.a.pressed = true;
        break;
      case "d":
        values.d.pressed = true;
        break;
      case "A":
        values.a.pressed = true;
        break;
      case "D":
        values.d.pressed = true;
        break;
      case " ":
        values.space.pressed = true;
        if (game.player.powerUp === "MachineGun") return;
        else {
          game.projectiles.push(
            new Projectile({
              position: {
                x: game.player.position.x + game.player.width / 2,
                y: game.player.position.y,
              },
              speed: {
                x: 0,
                y: -10,
              },
            })
          );
          break;
        }
    }
  }
});

document.addEventListener("keyup", ({ key }) => {
  if (game.game.over) return;
  switch (key) {
    case "a":
      values.a.pressed = false;
      break;
    case "d":
      values.d.pressed = false;
      break;
    case " ":
      values.space.pressed = false;
      break;
    case "A":
      values.a.pressed = false;
      break;
    case "D":
      values.d.pressed = false;
      break;
  }
});

document.addEventListener("keyup", function (e) {
  if (game.game.over) return;
  const keyCode = e.keyCode;
  switch (keyCode) {
    case 37:
      values.a.pressed = false;
      break;
    case 39:
      values.d.pressed = false;
      break;
  }
});
