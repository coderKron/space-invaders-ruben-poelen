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
