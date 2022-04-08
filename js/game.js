class Game {
  constructor() {
    this.player = null;
    this.projectiles = [];
  }

  start() {
    this.player = new Player();
  }

  createProjectiles(value) {
    this.projectiles.push(value);
    // this.animateProjectile();
  }

  //   animateProjectile() {
  //     requestAnimationFrame(() => {
  //       this.animateProjectile();
  //     });
  //     game.projectiles.forEach((projectile, index) => {
  //       if (projectile.position.y + projectile.radius <= 0) {
  //         this.projectiles.splice(index, 1);
  //       } else {
  //         projectile.updateProjectile();
  //       }
  //     });
  //   }

  animatePilot() {
    requestAnimationFrame(() => {
      this.animatePilot();
    });
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.updatePilot();

    game.projectiles.forEach((projectile, index) => {
      if (projectile.position.y + projectile.radius <= 0) {
        this.projectiles.splice(index, 1);
      } else {
        projectile.updateProjectile();
      }
    });

    if (values.a.pressed && this.player.position.x >= 0) {
      this.player.velocity.x = -7;
      this.player.turn = -0.15;
    } else if (
      values.d.pressed &&
      this.player.position.x <= canvas.width - this.player.width
    ) {
      this.player.velocity.x = 7;
      this.player.turn = +0.15;
    } else {
      this.player.velocity.x = 0;
      this.player.turn = 0;
    }
  }

  updatePilot() {
    if (this.player.image) {
      this.player.draw();
      this.player.position.x += this.player.velocity.x;
    }
  }
}
