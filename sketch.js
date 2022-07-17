var player;
function setup() {
  createCanvas(1000, 1000);
  player = new Player(width / 2, height / 2);
  rectMode(CENTER);
}

function draw() {
  background(220);
  moving();
  player.show();
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
