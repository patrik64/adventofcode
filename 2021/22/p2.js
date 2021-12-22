let fs = require('fs');
const { kill } = require('process');
let input = fs.readFileSync('Day22.in', 'utf8');
let arr = input.split('\n');

function turnOnOff(cuboidX, cuboidY, cuboidZ, instruction) {

  let x0 = instruction.x[0];
  let x1 = instruction.x[1];
  let y0 = instruction.y[0];
  let y1 = instruction.y[1];
  let z0 = instruction.z[0];
  let z1 = instruction.z[1];

  let on = instruction.on;

  for(let i = x0; i <= x1; i++) {
    cuboidX[i] = on;
  }

  for(let j = y0; j <= y1; j++) {
    cuboidY[j] = on;
  }

  for(let k = z0; k <= z1; k++) {
    cuboidZ[k] = on;
  }
}

function calcOn(cuboidX, cuboidY, cuboidZ, minx, maxx, miny, maxy, minz, maxz) {

  let res = 0;

  for(let i = minx; i <= maxx; i++) {
    for(let j = miny; j <= maxy; j++) {
      for(let k = minz; k <= maxz; k++) {
        if(cuboidX[i] === true && 
           cuboidY[j] === true &&
           cuboidZ[k] === true) {
             res += 1 ;
        }
      }
    }
  }

  return res;
}

let instructions = [];

let minx = null;
let maxx = null;
let miny = null;
let maxy = null;
let minz = null;
let maxz = null;

for(let i in arr) {
    let line = arr[i].split(',');

    let inst = { on: false, x: [-1, -1], y: [-1, -1], z: [-1, -1]};
    let on = false;
    let onoff = line[0].substring(0,2);

    let y = line[1].split('..');
    let y0 = Number(y[0].substring(2));
    let y1 = Number(y[1]);
    inst.y = [y0,y1];

    let z = line[2].split('..');
    let z0 = Number(z[0].substring(2));
    let z1 = Number(z[1]);
    inst.z = [z0,z1];

    
    if (onoff === 'on') {
      inst.on = true;
      
      let x = line[0].split('..');
      let x0 = Number(x[0].substring(5));
      let x1 = Number(x[1]);
      inst.x = [x0,x1];
    } else {
      inst.on = false;
      let x = line[0].split('..');
      let x0 = Number(x[0].substring(6));
      let x1 = Number(x[1]);
      inst.x = [x0,x1];
    }
    //console.log(inst);
    //console.log('*****************')
    instructions.push(inst);

    if(minx === null || inst.x[0] < minx) { minx = inst.x[0]; }
    if(maxx === null || inst.x[1] > maxx) { maxx = inst.x[1]; }
    if(miny === null || inst.y[0] < miny) { miny = inst.y[0]; }
    if(maxy === null || inst.y[1] > maxy) { maxy = inst.y[1]; }
    if(minz === null || inst.z[0] < minz) { minz = inst.z[0]; }
    if(maxz === null || inst.z[1] > maxz) { maxz = inst.z[1]; }
}

console.log('min x0 -> ', minx);
console.log('max x1 -> ', maxx);
console.log('min y0 -> ', miny);
console.log('max y1 -> ', maxy);
console.log('min z0 -> ', minz);
console.log('max z1 -> ', maxz);

let cuboidX = {}
let cuboidY = {}
let cuboidZ = {}

for(let i = minx; i <= maxx; i++) {
  cuboidX[i] = false;
}

for(let i = miny; i <= maxy; i++) {
  cuboidY[i] = false;
}

for(let i = minz; i <= maxz; i++) {
  cuboidZ[i] = false;
}

/*for(let i in instructions) {

  if(instructions[i].x[0] < -50) { continue; }
  if(instructions[i].x[1] > 50) { continue; }
  if(instructions[i].y[0] < -50) { continue; }
  if(instructions[i].y[1] > 50) { continue; }
  if(instructions[i].z[0] < -50) { continue; }
  if(instructions[i].z[1] > 50) { continue; }

  turnOnOff(cuboidX, cuboidY, cuboidZ, instructions[i]);
}*/

//turnOnOff(cuboidX, cuboidY, cuboidZ, instructions[0]);
//turnOnOff(cuboidX, cuboidY, cuboidZ, instructions[1]);
//turnOnOff(cuboidX, cuboidY, cuboidZ, instructions[2]);
//turnOnOff(cuboidX, cuboidY, cuboidZ, instructions[3]);

let res = calcOn(cuboidX, cuboidY, cuboidZ, minx, maxx, miny, maxy, minz, maxz);

console.log(cuboidX);
console.log(cuboidY);
console.log(cuboidZ);
console.log(res);