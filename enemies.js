class Enemy {
  constructor(x, y) {
    this.health = 100;
    this.maxHealth = 100;
    this.pos = createVector(x, y);
    this.color = 100;
    this.speed = 2;
    this.gunOutBy = 10;
    this.rad = 40;
    this.dir;
    this.shootProb = 0.004;
    this.shootDuration = 0;
    this.avgDuration = 5;
    this.fireRate = 25;
  }
  show(player) {
    push();
    var dir = p5.Vector.sub(player.pos, this.pos);
    dir.normalize();
    translate(this.pos.x, this.pos.y);
    const refVector = createVector(0, 1);
    let angleBetween = refVector.angleBetween(dir);
    rotate(angleBetween);
    //draw the player
    fill(this.color);
    ellipse(0, 0, this.rad, this.rad);
    //draw the gun
    translate(0, this.gunOutBy);
    fill(255);
    rect(0, 0, 10, 50);
    pop();
    //draw health
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
  //move in the direction of player with some noise
  move(player, count) {
    if (count % 20 == 0) {
      var dir = p5.Vector.sub(player.pos, this.pos);
      dir.normalize();
      dir.rotate(randomGaussian(0, 2));
      this.dir = dir;
    }
    if (this.dir) {
      this.pos.add(p5.Vector.mult(this.dir, this.speed));
    }
  }
  shoot(player, enemyBullets, count) {
    if (this.shootDuration > 0) {
      //delay bullet fire rate
      if (count % this.fireRate == 0) {
        const pos = this.pos;
        var dir = p5.Vector.sub(player.pos, this.pos);
        dir.normalize();
        let bulletPos = p5.Vector.add(
          pos,
          p5.Vector.mult(dir, this.rad + this.gunOutBy)
        );
        enemyBullets.push(new Bullet(bulletPos.x, bulletPos.y, dir));
        enemyShotSound.play();
        this.shootDuration--;
      }
    } else {
      if (random(0, 1) < this.shootProb) {
        this.shootDuration = max(1, randomGaussian(this.avgDuration, 2));
      }
    }
  }
  hit() {
    this.health -= 10;
  }
}
