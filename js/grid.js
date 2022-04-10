class Grid {
  constructor() {
    this.poistion = {
      x: 0,
      y: 0,
    };
    this.speed = {
      x: 0,
      y: 0,
    };

    this.invaders = [];

    for (let i = 0; i < 10; i++) {
      this.invaders.push([new Invader()]);
    }
  }
}
