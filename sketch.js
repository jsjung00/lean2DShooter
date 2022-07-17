var player;
var enemies = [];
let bullets = [];
var enemyBullets = [];
var count = 0;
var enemiesBodyCount = 0;
const MIN_ENEMIES = 2;
let playerShotSound;
let enemyShotSound;
function setup() {
  playerShotSound = loadSound("assets/ak47_01.mp3");
  playerShotSound.setVolume(0.1);
  enemyShotSound = loadSound("assets/ots38_01.mp3");
  enemyShotSound.setVolume(0.07);
  createCanvas(1000, 1000);
  player = new Player(width / 2, height / 2);
  rectMode(CENTER);
  //create enemies
  for (let i = 0; i < MIN_ENEMIES; i++) {
    let noise_pert = createVector(0, min(300, randomGaussian(500, 100))).rotate(
      random(PI)
    );
    const enemy_pos = p5.Vector.add(player.pos, noise_pert);
    enemies.push(new Enemy(enemy_pos.x, enemy_pos.y));
  }
}

function draw() {
  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`Kills: ${enemiesBodyCount}`, width / 2, 30);
  fill(0, 102, 153);
  count++;
  //Player
  if (player.health <= 0) {
    console.log("Game OVER");
    noLoop();
  }
  moving();
  player.show();
  player.regenerate();
  //Generate Enemies
  if (count % 1000 == 0) {
    let noise_pert = createVector(0, min(300, randomGaussian(500, 100))).rotate(
      random(PI)
    );
    const enemy_pos = p5.Vector.add(player.pos, noise_pert);
    enemies.push(new Enemy(enemy_pos.x, enemy_pos.y));
  }
  while (enemies.length < MIN_ENEMIES) {
    let noise_pert = createVector(0, min(300, randomGaussian(500, 100))).rotate(
      random(PI)
    );
    const enemy_pos = p5.Vector.add(player.pos, noise_pert);
    enemies.push(new Enemy(enemy_pos.x, enemy_pos.y));
  }

  //Enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].health <= 0) {
      enemies.splice(i, 1);
      enemiesBodyCount++;
    } else {
      enemies[i].move(player, count);
      enemies[i].show(player);
      enemies[i].shoot(player, enemyBullets, count);
    }
  }
  //Bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    //remove if bullet is off screen
    const x_pos = bullets[i].pos.x;
    const y_pos = bullets[i].pos.y;
    if (x_pos < 0 || x_pos > width || y_pos < 0 || y_pos > height) {
      bullets.splice(i, 1);
    } else {
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (bulletHitBody(bullets[i], enemies[j])) {
          enemies[j].hit();
        }
      }
      bullets[i].show();
      bullets[i].update();
    }
  }
  //Enemy Bullets
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    //remove if bullet is off screen
    const x_pos = enemyBullets[i].pos.x;
    const y_pos = enemyBullets[i].pos.y;
    if (x_pos < 0 || x_pos > width || y_pos < 0 || y_pos > height) {
      enemyBullets.splice(i, 1);
    } else {
      if (bulletHitBody(enemyBullets[i], player)) {
        player.hit();
      }
      enemyBullets[i].show();
      enemyBullets[i].update();
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
  playerShotSound.play();
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

function bulletHitBody(bullet, body) {
  const body_xs = [body.pos.x - body.rad, body.pos.x + body.rad];
  const body_ys = [body.pos.y - body.rad, body.pos.y + body.rad];
  return (
    body_xs[0] < bullet.pos.x &&
    bullet.pos.x < body_xs[1] &&
    body_ys[0] < bullet.pos.y &&
    bullet.pos.y < body_ys[1]
  );
}
