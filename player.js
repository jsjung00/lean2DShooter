class Player {
  constructor(x, y) {
    this.health = 100;
    this.pos = createVector(x, y);
    this.width = 50;
    this.height = 50;
    this.speed = 3;
  }
  show() {
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.pos);
    dir.normalize();
    translate(this.pos.x, this.pos.y);
    const refVector = createVector(0, 1);
    let angleBetween = refVector.angleBetween(dir);
    rotate(angleBetween);
    //draw the player
    fill(0);
    ellipse(0, 0, this.width, this.height);
    //draw the gun
    translate(0, 10);
    fill(255);
    rect(0, 0, 10, 50);
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
