class Invader {
  constructor() {
    this.speed = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./images/invader.png";
    image.onload = () => {
      const scale = 0.09;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height / 2,
      };
    };
  }

  draw() {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  updateInvader() {
    this.draw();
    this.invader.position.x += this.invader.speed.x;
    this.invader.position.y += this.invader.speed.y;
    console.log("hello");
  }
}
