class Projectile {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
    this.radius = 4;
  }

  drawProjectile() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "aqua";
    context.fill();
    context.closePath();
  }

  updateProjectile() {
    this.drawProjectile();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
