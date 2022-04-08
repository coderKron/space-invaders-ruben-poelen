// const player = new Player();
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Game {
  constructor(canvas, context) {
    this.player = null;
    this.context = context;
    this.canvas = canvas;
  }

  start() {
    this.player = new Player();
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    game.update();
    if (keys.a.pressed && this.player.position.x >= 0) {
      this.player.velocity.x = -5;
    } else if (
      keys.d.pressed &&
      this.player.position.x <= canvas.width - this.player.width
    ) {
      this.player.velocity.x = 5;
    } else {
      this.player.velocity.x = 0;
    }
  }

  update() {
    if (this.player.image) {
      this.player.draw();
      this.player.position.x += this.player.velocity.x;
    }
  }
}

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
