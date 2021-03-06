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
    this.numScore = document.querySelector("span.numScore");
    this.powerUps = [];
    this.spawnTimer = 500;
    this.lives = 3;
    this.projectileSpawnTimer = 750;
  }

  start() {
    values.a.pressed = false;
    values.d.pressed = false;
    values.space.pressed = false;
    amountOfAnimates = 0;
    this.toggleScreen("start-screen", false);
    this.toggleScreen("logo", false);
    this.toggleScreen("canvas", true);
    this.toggleScreen("scoreboard", true);
    this.toggleScreen("restart", false);
    this.game.over = false;
    this.game.active = false;
    this.player = new Player();
    game.animate();
  }

  gameRestart() {
    this.player = null;
    this.grids = [];
    this.projectiles = [];
    this.invader = [];
    this.invaderProjectiles = [];
    this.explosions = [];
    this.stars = [];
    this.powerUps = [];
    this.score = 0;
    this.lives = 3;
    this.elementHtml.innerText = this.score;
    this.start();
  }

  restartButton() {
    this.numScore.innerText = this.score;
    this.toggleScreen("canvas", false);
    this.toggleScreen("scoreboard", false);
    this.toggleScreen("restart", true);
  }

  pauseGame() {
    if (this.game.active === false) {
      this.game.active = true;
      this.toggleScreen("explained", true);
    } else if (this.game.active === true) {
      this.game.active = false;
      this.toggleScreen("explained", false);
      this.animate();
    }
  }

  toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = toggle ? "block" : "none";
    element.style.display = display;
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
  }

  updateLives() {
    context.fillStyle = "white";
    context.font = "25px ArcadeClassic";
    context.textBaseline = "top";
    context.fillText(`LIVES: ${this.lives}`, 940, 20);
    context.fillText(`P: PAUSE`, 940, 40);
    context.fillText(`P: CONTROLS`, 940, 60);
    // const heartImage = new Image();
    // heartImage.src = "./jsImage/health.png";
    // context.drawImage(heartImage, 1180, 25, 20, 20);
  }

  animate() {
    if (!this.game.active)
      requestAnimationFrame(() => {
        this.animate();
      });
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.updatePilot();
    this.updateLives();

    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      if (powerUp.position.x - powerUp.radius >= canvas.width) {
        this.powerUps.splice(i, 1);
      } else {
        powerUp.updatePowerUpBullet();
      }
    }
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

    if (
      values.space.pressed === true &&
      this.player.powerUp === "MachineGun" &&
      amountOfAnimates % 2 === 0
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
          color: "red",
        })
      );
    }

    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      this.projectiles.forEach((projectile, index) => {
        if (
          Math.hypot(
            projectile.position.x - powerUp.position.x,
            projectile.position.y - powerUp.position.y
          ) <
          projectile.radius + powerUp.radius
        ) {
          this.projectiles.splice(index, 1);
          this.powerUps.splice(i, 1);
          if (this.score < 100000) {
            this.player.powerUp = "MachineGun";
            setTimeout(() => {
              this.player.powerUp = null;
            }, 5000);
          } else if (this.score > 100000) {
            this.player.powerUp = "MachineGun";
          }
        }
      });
    }
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

        if (this.lives < 1) {
          setTimeout(() => {
            this.invaderProjectiles.splice(index, 1);
            this.player.seeing = 0;
            this.game.over = true;
            this.restartButton();
          }, 0);
          setTimeout(() => {
            this.game.active = true;
          }, 500);
          this.createExplosions(this.player, "red");
        } else if (this.lives > 0) {
          setTimeout(() => {
            this.lives--;
          }, 0);
          this.createExplosions(this.player, "red");
        }
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
      if (grid.position.y + 60 > canvas.height) {
        setTimeout(() => {
          this.player.seeing = 0;
          this.game.over = true;
          this.restartButton();
        }, 0);
        setTimeout(() => {
          this.game.active = true;
        }, 100);
      }

      if (
        amountOfAnimates %
          Math.floor(Math.random(250) + this.projectileSpawnTimer) ===
          0 &&
        grid.invaders.length > 0
      ) {
        grid.invaders[
          Math.floor(Math.random() * grid.invaders.length)
        ].invaderShoot(this.invaderProjectiles);
        this.projectileSpawnTimer =
          this.projectileSpawnTimer < 200 ? 250 : this.projectileSpawnTimer;
        if (this.score < 20000) {
          this.projectileSpawnTimer -= 5;
        } else if (this.score > 20000 && this.score < 30000) {
          this.projectileSpawnTimer -= 10;
        } else if (this.score > 30000 && this.score < 50000) {
          this.projectileSpawnTimer -= 20;
        } else if (this.score > 50000) {
          this.projectileSpawnTimer -= 35;
        }
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
      amountOfAnimates % Math.floor(Math.random(500) + this.spawnTimer) ===
      0
    ) {
      this.spawnTimer = this.spawnTimer < 150 ? 200 : this.spawnTimer;
      this.grids.push(new Grid());
      if (this.score < 20000) {
        this.spawnTimer -= 10;
      } else if (this.score > 20000 && this.score < 50000) {
        this.spawnTimer -= 15;
      } else if (this.score > 50000 && this.score < 75000) {
        this.spawnTimer -= 30;
      } else if (this.score > 75000) {
        this.spawnTimer -= 75;
      }
    }

    if (
      amountOfAnimates % Math.floor(Math.random(200) + 500) === 0 &&
      this.player.powerUp === null &&
      this.powerUps.length === 0 &&
      this.grids.length > 1
    ) {
      this.powerUps.push(
        new PowerUp({
          position: {
            x: 0,
            y: Math.random() * 300 + 15,
          },
          speed: {
            x: 5,
            y: 0,
          },
        })
      );
    }
    if (amountOfAnimates > 1000) {
      amountOfAnimates = 0;
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
