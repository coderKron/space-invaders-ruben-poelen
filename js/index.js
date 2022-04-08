const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game();
const keys = {
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
  switch (key) {
    case "a":
      //   game.movePlayer("right");
      console.log("moving left");
      keys.a.pressed = true;
      break;
    case "d":
      console.log("moving right");
      keys.d.pressed = true;
      break;
    case 32:
      keys.space.pressed = true;
      break;
  }
});

document.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case " ":
      keys.space.pressed = false;
      break;
  }
});

window.addEventListener("load", () => {
  game.start();
  game.animate();
});
