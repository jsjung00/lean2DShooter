class Player {
  constructor(x, y) {
    this.health = 100;
    this.pos = createVector(x, y);
    this.rad = 50;
    this.speed = 3;
    this.gunOutBy = 10;
  }
  show() {
    push();
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.pos);
    dir.normalize();
    translate(this.pos.x, this.pos.y);
    const refVector = createVector(0, 1);
    let angleBetween = refVector.angleBetween(dir);
    rotate(angleBetween);
    //draw the player
    fill(0);
    ellipse(0, 0, this.rad, this.rad);
    //draw the gun
    translate(0, this.gunOutBy);
    fill(255);
    rect(0, 0, 10, 50);
    pop();
  }
  //takes in string "N", "E", "S", "W" to determine direction to move
  move(dir) {
    switch (dir) {
      case "N":
        this.pos.add(0, -this.speed);
        break;
      case "E":
        this.pos.add(this.speed, 0);
        break;
      case "S":
        this.pos.add(0, this.speed);
        break;
      case "W":
        this.pos.add(-this.speed, 0);
        break;
    }
  }
}
