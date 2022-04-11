class Invader {
  constructor({ position }) {
    this.speed = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./images/invader.png";
    image.onload = () => {
      const scale = 0.06;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
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

  updateInvader({ speed }) {
    this.draw();
    this.position.x += speed.x;
    this.position.y += speed.y;
  }
}
