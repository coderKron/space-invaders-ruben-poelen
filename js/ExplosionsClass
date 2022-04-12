class Explosions {
  constructor({ position, speed, radius, color }) {
    this.position = position;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.shineThrough = 1;
  }

  drawExplosion() {
    context.save();
    context.globalAlpha = this.shineThrough;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
    context.restore();
  }

  updateExplosion() {
    this.drawExplosion();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.shineThrough -= 0.01;
  }
}
