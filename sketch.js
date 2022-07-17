var player;
let bullets = [];
function setup() {
  createCanvas(1000, 1000);
  player = new Player(width / 2, height / 2);
  rectMode(CENTER);
}

function draw() {
  background(220);
  //Player
  moving();
  player.show();
  //Bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    //remove if bullet is off screen
    const x_pos = bullets[i].pos.x;
    const y_pos = bullets[i].pos.y;
    if (x_pos < 0 || x_pos > width || y_pos < 0 || y_pos > height) {
      bullets.splice(i, 1);
    } else {
      bullets[i].show();
      bullets[i].update();
    }
  }
}

function mouseClicked() {
  var mouse = createVector(mouseX, mouseY);
  const pos = this.player.pos;
  var dir = p5.Vector.sub(mouse, pos);
  dir.normalize();
  let bulletPos = p5.Vector.add(
    pos,
    p5.Vector.mult(dir, this.player.rad + this.player.gunOutBy)
  );
  bullets.push(new Bullet(bulletPos.x, bulletPos.y, dir));
}

function moving() {
  if (keyIsDown(87)) {
    player.move("N");
  }
  if (keyIsDown(68)) {
    player.move("E");
  }
  if (keyIsDown(65)) {
    player.move("W");
  }
  if (keyIsDown(83)) {
    player.move("S");
  }
}
