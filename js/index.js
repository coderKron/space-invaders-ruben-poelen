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
};

document.addEventListener("keydown", ({ key }) => {
  if (game.game.over) {
    return;
  }
  switch (key) {
    case "a":
      values.a.pressed = true;
      break;
    case "d":
      values.d.pressed = true;
      break;
    case " ":
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
});

document.addEventListener("keyup", ({ key }) => {
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
  }
});

function startGame() {
  game.start();
}

function restartGame() {
  game = new Game();
  game.gameRestart();
}
