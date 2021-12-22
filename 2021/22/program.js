let fs = require('fs');
let input = fs.readFileSync('Day22.in', 'utf8');
let arr = input.split('\n');

function step(cuboids, instruction){

  let x0 = instruction.x[0];
  let x1 = instruction.x[1];
  let y0 = instruction.y[0];
  let y1 = instruction.y[1];
  let z0 = instruction.z[0];
  let z1 = instruction.z[1];
  
  if(Math.abs(x0) > 50) return;
  if(Math.abs(x1) > 50) return;
  if(Math.abs(y0) > 50) return;
  if(Math.abs(y1) > 50) return;
  if(Math.abs(z0) > 50) return;
  if(Math.abs(z1) > 50) return;

  for(let i = x0; i <= x1; i++ ) {
    for(let j = y0; j <= y1; j++ ) {
      for(let k = z0; k <= z1; k++ ) {
        let str = i.toString() + '#' + j.toString() + '#' + k.toString();
        cuboids[str] = instruction.on;
      }
    }
  }
}

function calcOn(cuboids) {

  let res = 0;
  for(let i = -50; i <= 50; i++ ) {
    for(let j = -50; j <= 50; j++ ) {
      for(let k = -50; k <= 50; k++ ) {
        let str = i.toString() + '#' + j.toString() + '#' + k.toString();
        if(cuboids[str]) { 
          res += 1;
        }
      }
    }
  }
  return res;
}

let instructions = [];

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

    
    if(onoff === 'on') {
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
    instructions.push(inst);
}

let cuboids = {};

for(let i = -50; i <= 50; i++ ) {
  for(let j = -50; j <= 50; j++ ) {
    for(let k = -50; k <= 50; k++ ) {
      let str = i.toString() + '#' + j.toString() + '#' + k.toString();
      cuboids[str] = false;
    }
  }
}

instructions.map( x => step(cuboids, x) );
console.log(calcOn(cuboids));