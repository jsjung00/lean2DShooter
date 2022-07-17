class Bullet {
  //x:num, y:num, dir: unit vector
  constructor(x, y, dir) {
    this.pos = createVector(x, y);
    this.dir = dir;
    this.speed = 30;
    this.rad = 5;
  }
  show() {
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
  }
  update() {
    this.pos.add(p5.Vector.mult(this.dir, this.speed));
  }
}
