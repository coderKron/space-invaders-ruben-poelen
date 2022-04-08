// const player = new Player();
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Game {
  constructor(canvas, context) {
    this.player = new Player();
    this.context = context;
    this.canvas = canvas;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();
  }
}

// function animate() {
//   requestAnimationFrame(animate);
//   context.fillStyle = "black";
//   context.fillRect(0, 0, canvas.width, canvas.height);
//   game.player.draw();
//   // console.log(this.player);
// }

// window.addEventListener("load", () => {
const game = new Game(canvas, context);
game.animate();
//   const newPlayer = new Player()
// });
