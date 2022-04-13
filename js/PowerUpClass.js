class PowerUp {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
    this.radius = 20;
  }

  drawPowerUpBullet() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "pink";
    context.fill();
    context.closePath();
  }

  updatePowerUpBullet() {
    this.drawPowerUpBullet();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
