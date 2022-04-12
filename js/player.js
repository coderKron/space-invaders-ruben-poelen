class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.turn = 0;
    this.seeing = 1;

    const image = new Image();
    image.src = "./images/spaceship.png";
    image.onload = () => {
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    };
  }

  draw() {
    context.save();
    context.globalAlpha = this.seeing;
    context.translate(
      game.player.position.x + game.player.width / 2,
      game.player.position.y + game.player.height / 2
    );
    context.rotate(game.player.turn);

    context.translate(
      -game.player.position.x - game.player.width / 2,
      -game.player.position.y - game.player.height / 2
    );
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    context.restore();
  }
}
