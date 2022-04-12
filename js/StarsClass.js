class Stars {
  constructor({ position, speed, radius, color, disappear }) {
    this.position = position;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.shineThrough = 1;
    this.disappear = disappear;
  }

  drawStars() {
    context.save();
    context.globalAlpha = this.shineThrough;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
    context.restore();
  }

  updateStars() {
    if (this.disappear) {
      this.drawStars();
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }
  }
}
