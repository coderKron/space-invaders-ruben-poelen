class Game {
  constructor() {
    this.player = null;
    this.grids = [];
    this.projectiles = [];
    this.invader = [];
    this.invaderProjectiles = [];
    this.explosions = [];
    this.stars = [];
    this.game = {
      over: false,
      active: false,
    };
    this.score = 0;
    this.elementHtml = document.querySelector("span.scoreNumber");
  }

  start() {
    this.player = new Player();

    game.animate();
  }

  createStars() {
    for (let i = 0; i < 100; i++) {
      this.stars.push(
        new Stars({
          position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
          },
          speed: {
            x: 0,
            y: 0.5,
          },
          radius: Math.random() * 2,
          color: "white",
          disappear: true,
        })
      );
    }
  }

  createExplosions(element, color) {
    for (let i = 0; i < 15; i++) {
      this.explosions.push(
        new Explosions({
          position: {
            x: element.position.x + element.width / 2,
            y: element.position.y + element.height / 2,
          },
          speed: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          },
          radius: Math.random() * 3,
          color: color,
        })
      );
    }
  }

  updateScore() {
    this.elementHtml.innerText = this.score;
    console.log(this.elementHtml);
  }

  animate() {
    if (!this.game.active)
      requestAnimationFrame(() => {
        this.animate();
      });
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.updatePilot();

    if (this.stars.length < 100) {
      this.createStars();
    }
    this.stars.forEach((star, index) => {
      if (star.position.y - star.radius >= canvas.height) {
        star.position.x = Math.random() * canvas.width;
        star.position.y = -star.radius;
      } else {
        star.updateStars();
      }
    });
    this.explosions.forEach((explosion, index) => {
      if (explosion.shineThrough <= 0) {
        setTimeout(() => {
          this.explosions.splice(index, 1);
        }, 0);
      } else {
        explosion.updateExplosion();
      }
    });

    //killing stuff
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
      if (
        invaderProjectile.position.y + invaderProjectile.height >=
          this.player.position.y &&
        invaderProjectile.position.x + invaderProjectile.width >=
          this.player.position.x &&
        invaderProjectile.position.x <=
          this.player.position.x + this.player.width
      ) {
        setTimeout(() => {
          this.invaderProjectiles.splice(index, 1);
        }, 0);

        console.log("YOU LOST");
        setTimeout(() => {
          this.invaderProjectiles.splice(index, 1);
          this.player.seeing = 0;
          this.game.over = true;
        }, 0);
        setTimeout(() => {
          this.game.active = true;
        }, 2000);
        this.createExplosions(this.player, "red");
      }
    });

    this.projectiles.forEach((projectile, index) => {
      if (projectile.position.y + projectile.radius <= 0) {
        this.projectiles.splice(index, 1);
      } else {
        projectile.updateProjectile();
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
            this.createExplosions(invader, "yellow");
            grid.invaders.splice(i, 1);
            this.projectiles.splice(j, 1);
            this.score += 100;
            console.log(this.score);
            this.updateScore();
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
