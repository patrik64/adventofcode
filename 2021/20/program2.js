let fs = require('fs');
let input = fs.readFileSync('Day20.in', 'utf8');
let arr = input.split('\n');

function calc(m) {
  let ret = 0;
  for(let i = 0; i < m.length; i++) {
      let row = m[i];
      for(let j = 0; j < row.length; j++) {
          if(m[j][i] === '#') ret += 1;
      }
  }
  return ret;
}

function printMatrix(m) {
  for(let i = 0; i < m.length; i++) {
      let row = m[i];
      let s = '';
      for(let j = 0; j < row.length; j++) {
          s += row[j];
      }
      console.log(s);
  }
}

function getNumFromString(str) {
  let ret = 0;
  if(str[0] === '#') { ret += 256; }
  if(str[1] === '#') { ret += 128; }
  if(str[2] === '#') { ret += 64; }
  if(str[3] === '#') { ret += 32; }
  if(str[4] === '#') { ret += 16; }
  if(str[5] === '#') { ret += 8; }
  if(str[6] === '#') { ret += 4; }
  if(str[7] === '#') { ret += 2; }
  if(str[8] === '#') { ret += 1; }

  return ret;
}

function getBinString(m) {
  let s = '';
  for(let i = 0; i < m.length; i++) {
    let row = m[i];
    for(let j = 0; j < row.length; j++) {
        s += row[j];
    }
  }
  return s;
}

function getPixel(m, y, x, mask, flip) {
  
  let ret = 0;
  let dim = m[0].length;

  let m33 = new Array(3);

  let fch = '.';
  if(flip) { fch = '#';}

  for (let i = 0; i < 3; i++) {
      m33[i] = new Array(3).fill(fch);
  }
   
  //up-left
  if (y-1 >= 0 && y-1 < dim && x-1 >= 0 && x-1 < dim ) {
      m33[0][0] = m[y-1][x-1];
  }
  //up
  if (y-1 >= 0 && y-1 < dim) {
    m33[0][1] = m[y-1][x];
  }
  //up-right
  if (y-1 >= 0 && y-1 < dim && x+1 >= 0 && x+1 < dim ) {
    m33[0][2] = m[y-1][x+1];
  }
  //left
  if(x-1 >= 0 && x-1 < dim) {
      m33[1][0] = m[y][x-1];
  }
  //middle
  m33[1][1] = m[y][x];

  //right
  if (x+1 >= 0 && x+1 < dim) {
    m33[1][2] = m[y][x+1];
  }
  //down-left
  if (y+1 >= 0 && y+1 < dim && x-1 >= 0 && x-1 < dim ) {
    m33[2][0] = m[y+1][x-1];
  }
  //down
  if (y+1 >= 0 && y+1 < dim) {
    m33[2][1] = m[y+1][x];
  }
  //down-right
  if (y+1 >= 0 && y+1 < dim && x+1 >= 0 && x+1 < dim ) {
    m33[2][2] = m[y+1][x+1];
  }

  let binString = getBinString(m33);
  let bin = getNumFromString(binString);
    
  return mask[bin];
}

function enhance(m, mask, flip) {
  
  let dim = m[0].length+2;

  let fch = '.';
  if(flip) { fch = '#'; }

  let inM = new Array(dim);

  for (let i = 0; i < dim; i++) {
    inM[i] = new Array(dim).fill(fch);
  }

  for(let i = 0; i < m.length; i++) {
    for(let j = 0; j < m.length; j++) {
      inM[j+1][i+1] = m[j][i];
    }
  }

  let retM = new Array(dim);

  for (let i = 0; i < dim; i++) {
    retM[i] = new Array(dim).fill('.');
  }

  for(let i = 0; i < dim; i++) {
    for(let j = 0; j < dim; j++) {
      retM[j][i] = getPixel(inM, j, i, mask, flip);
    }
  }

  return retM;
}

let dim = arr.length-2;

let matrix = new Array(dim);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dim).fill('.');
}

let mask = arr[0];

for(let i=2; i< arr.length; i++) {
    let row = arr[i].split('');
    matrix[i-2] = row;
}

let em = enhance(matrix, mask, false);
for(let i = 1; i < 50; i++) {
  let flip = i%2 ? true : false;
  em = enhance(em, mask, flip);
}

console.log(calc(em));
