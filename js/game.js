class Game {
  constructor() {
    this.player = null;
    this.grids = [];
    this.projectiles = [];
    this.invader = [];
    this.invaderProjectiles = [];
  }

  start() {
    this.player = new Player();

    game.animate();
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.updatePilot();

    this.invaderProjectiles.forEach((invaderProjectile, index) => {
      if (
        invaderProjectile.position.y + invaderProjectile.height >=
        canvas.height
      ) {
        setTimeout(() => {
          this.invaderProjectiles.splice(index, 1);
        }, 0);
      } else {
        invaderProjectile.updateProjectile();
      }
    });

    this.projectiles.forEach((projectile, index) => {
      if (projectile.position.y + projectile.radius <= 0) {
        this.projectiles.splice(index, 1);
      } else {
        projectile.updateProjectile();
      }
      if (
        invaderProjectile.position.y + invaderProjectile.height >=
        this.player.position.y
      ) {
        console.log("YOU LOST BITCH");
      }
    });

    this.grids.forEach((grid, index) => {
      grid.updateGrid();

      if (
        amountOfAnimates % Math.floor(Math.random(500) + 250) === 0 &&
        grid.invaders.length > 0
      ) {
        grid.invaders[
          Math.floor(Math.random() * grid.invaders.length)
        ].invaderShoot(this.invaderProjectiles);
      }

      grid.invaders.forEach((invader, i) => {
        invader.updateInvader({ speed: grid.speed });

        this.projectiles.forEach((projectile, j) => {
          if (
            projectile.position.y - projectile.radius <=
              invader.position.y + invader.height &&
            projectile.position.x + projectile.radius >= invader.position.x &&
            projectile.position.x - projectile.radius <=
              invader.position.x + invader.width &&
            projectile.position.y + projectile.radius >= invader.position.y
          ) {
            grid.invaders.splice(i, 1);
            this.projectiles.splice(j, 1);

            if (grid.invaders.length > 0) {
              const firstInvader = grid.invaders[0];
              const lastInvader = grid.invaders[grid.invaders.length - 1];

              grid.width =
                lastInvader.position.x -
                firstInvader.position.x +
                lastInvader.width;
              grid.position.x = firstInvader.position.x;
            } else {
              this.grids.splice(index, 1);
            }
          }
        });
      });
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

    if (
      amountOfAnimates % Math.floor(Math.random(500) + 750) === 0 &&
      this.grids.length <= 7
    ) {
      game.grids.push(new Grid());
    }
    amountOfAnimates++;
  }

  updatePilot() {
    if (this.player.image) {
      this.player.draw();
      this.player.position.x += this.player.velocity.x;
    }
  }
}
