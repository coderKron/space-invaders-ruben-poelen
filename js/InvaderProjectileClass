class InvaderProjectile {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
    this.width = 4;
    this.height = 10;
  }

  drawProjectile() {
    context.fillStyle = "#ff0066";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  updateProjectile() {
    this.drawProjectile();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
