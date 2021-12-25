let fs = require('fs');
let input = fs.readFileSync('Day25.in', 'utf8');
let arr = input.split('\n');

function moveEast(m) {
  let retM = JSON.parse(JSON.stringify(m));
  let retB = false;
  let dimX = m[0].length;

  for(let y = m.length-1; y >= 0; y--) {
    for(let x = m[0].length-1; x>=0; x--) {
      let cucum = m[y][x];
      if(cucum === '>') {
        let nx = -1;
        if(x < dimX-1) {
          nx = x+1;
        } else {
          nx = 0;
        }
        if(m[y][nx] === '.') {
          retM[y][x] = '.';
          retM[y][nx] = '>';
          retB = true;
        }
      }
    }
  }
  return { 'retB': retB, 'retM': retM };
}

function moveSouth(m) {
  let retM = JSON.parse(JSON.stringify(m));
  let retB = false;
  let dimY = m.length;

  for(let y = m.length-1; y >= 0; y--) {
    for(let x = m[0].length-1; x>=0; x--) {
      let cucum = m[y][x];
      if(cucum === 'v') {
        let ny = -1;
        if(y < dimY-1) {
          ny = y+1;
        } else {
          ny = 0;
        }
        if(m[ny][x] === '.') {
          retM[y][x] = '.';
          retM[ny][x] = 'v';
          retB = true;
        }
      }
    }
  }
  return { 'retB': retB, 'retM': retM };
}

function step(m) {
  let retE = moveEast(m);
  let retS = moveSouth(retE.retM);
  retS.retB = retS.retB || retE.retB;
  return retS;
}

let dimY = arr.length;
let dimX = arr[0].length;

let matrix = new Array(dimY);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dimX).fill('.');
}

for(let i in arr) {
    let line = arr[i].split('');
    matrix[i] = line;
}

let sum = 1;
let res = step(matrix);

while(res.retB) {
  res = step(res.retM);
  sum += 1;
}

console.log(sum);