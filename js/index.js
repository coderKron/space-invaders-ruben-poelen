const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game();
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
  switch (key) {
    case "a":
      values.a.pressed = true;
      break;
    case "d":
      values.d.pressed = true;
      break;
  }
});

document.addEventListener("keydown", function (e) {
  if (
    e.keyCode === 32 &&
    values.a.pressed === false &&
    values.d.pressed === false
  ) {
    console.log("pressed space");
    game.createProjectiles(
      new Projectile({
        position: {
          x: game.player.position.x,
          y: game.player.position.y,
        },
        velocity: {
          x: 0,
          y: -9,
        },
      })
    );
    game.animateProjectile();
    values.space.pressed = true;
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

window.addEventListener("load", () => {
  game.start();
  game.animatePilot();
});
