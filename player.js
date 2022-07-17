class Player {
  constructor(x, y) {
    this.maxHealth = 100;
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
    //draw health bar
    push();
    translate(0, -this.rad + 10);
    stroke(0);
    noFill();
    rect(this.pos.x, this.pos.y, this.rad, 10);
    fill(color(255, 99, 71));
    rectMode(CORNER);
    rect(
      this.pos.x - this.rad / 2,
      this.pos.y - 5,
      max(0, this.rad * (this.health / this.maxHealth)),
      10
    );
    rectMode(CENTER);
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
  hit() {
    this.health -= 1.5;
  }
  regenerate() {
    if (this.health < this.maxHealth) {
      this.health += 0.05;
    }
  }
}
