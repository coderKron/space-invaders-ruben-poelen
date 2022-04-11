class Game {
  constructor() {
    this.player = null;
    this.grids = [];
    this.projectiles = [];
    this.invader = [];
  }

  start() {
    this.player = new Player();

    game.animate();
  }

  createProjectiles() {
    const intervalID = setInterval(() => {
      if (
        (values.space.pressed === true && values.a.pressed === true) ||
        values.d.pressed === true
      ) {
        this.projectiles.push(
          new Projectile({
            position: {
              x: game.player.position.x + game.player.width / 2,
              y: game.player.position.y,
            },
            speed: {
              x: 0,
              y: -10,
            },
          })
        );
      } else if (values.space.pressed === false) {
        clearInterval(intervalID);
      }
    }, 400);
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.updatePilot();

    this.projectiles.forEach((projectile, index) => {
      if (projectile.position.y + projectile.radius <= 0) {
        this.projectiles.splice(index, 1);
      } else {
        projectile.updateProjectile();
      }
    });

    this.grids.forEach((grid) => {
      grid.updateGrid();
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

    if (amountOfAnimates % 1000 === 0) {
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
