let fs = require('fs');
let input = fs.readFileSync('Day17.in', 'utf8');
let arr = input.split('\n');

function step(pos, vel) {
  let retPos = { ... pos };
  let retVel = { ... vel };

  retPos.x += retVel.x;
  retPos.y += retVel.y;

  if(retVel.x > 0) retVel.x -= 1;
  if(retVel.x < 0) retVel.x += 1;

  retVel.y -= 1;
  return { pos: retPos, vel: retVel };
}

let line = arr[0].split(' ');

let xx = line[2].split('=');
xx = xx[1].split('..');
xx[1] = xx[1].slice(0, -1);
xx = xx.map(x => Number(x));

let yy = line[3].split('=');
yy = yy[1].split('..').map(x => Number(x));
yy = yy.map(x => Number(x));

let pos = { x: 0, y: 0 };
let vel = { x: 8, y: -1 };    

let hit = false;
let ymax = -1000000000000000;
let y = -100000000000000000;

for(let vx = 0; vx < 95; vx++) {
  for(let vy = -171; vy < 171; vy++) {
    let pos = { x: 0, y: 0 };
    let vel = { x: vx, y: vy };    

    for(let i = 0; i < 342; i ++) {
      let ret = step(pos, vel);
      pos = ret.pos;
      vel = ret.vel;
      if(pos.x >= xx[0] && pos.x <= xx[1] && pos.y >= yy[0] && pos.y <= yy[1]) hit = true;
      if(ymax < pos.y) ymax = pos.y; 
    }
    if(hit) {
      if(y < ymax) y = ymax;
    }
    hit = false;
    ymax = -1000000000000000000;
  }
}
console.log(y);