class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.speed = {
      x: 3,
      y: 0,
    };

    this.invaders = [];
    const amountOfRows = Math.floor(Math.random() * 5 + 2);
    const amountOfColumns = Math.floor(Math.random() * 10 + 5);

    this.width = amountOfColumns * 30;

    for (let i = 0; i < amountOfColumns; i++) {
      for (let y = 0; y < amountOfRows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: i * 30,
              y: y * 30,
            },
          })
        );
      }
    }
  }

  updateGrid() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.speed.y = 0;

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.speed.x = -this.speed.x;
      this.speed.y = 30;
    }
  }
}
