let fs = require('fs');
let input = fs.readFileSync('Day22.in', 'utf8');
let arr = input.split('\n');

function size(cuboid) {

  let x = Math.abs(cuboid.x[1] - cuboid.x[0]);
  let y = Math.abs(cuboid.y[1] - cuboid.y[0]);
  let z = Math.abs(cuboid.z[1] - cuboid.z[0]);

  return x*y*z;
}


function holdsCuboid(cuboidA, cuboidB) {

  if( cuboidA.x[0] <= cuboidB.x[0] &&
      cuboidA.x[1] >= cuboidB.x[1] &&
      cuboidA.y[0] <= cuboidB.y[0] &&
      cuboidA.y[1] >= cuboidB.y[1] &&
      cuboidA.z[0] <= cuboidB.z[0] &&
      cuboidA.z[1] >= cuboidB.z[1]) {
        return true;
  }
  return false;
}

function cutsCuboid(cuboidA, cuboidB) {

  if( cuboidA.x[1] > cuboidB.x[0] &&
      cuboidA.x[0] < cuboidB.x[1] &&
      cuboidA.y[1] > cuboidB.y[0] &&
      cuboidA.y[0] < cuboidB.y[1] &&
      cuboidA.z[1] > cuboidB.z[0] &&
      cuboidA.z[0] < cuboidB.z[1]) {
        return true;
    }
  return false;
}

function getCrossPoints(newPt, oldPt) {
  
  let collect = [];
  
  collect.push(oldPt[0]);

  if(newPt[0] > oldPt[0] && newPt[0] < oldPt[1]){
    collect.push(newPt[0]);
  }

  if(newPt[1] > oldPt[0] && newPt[1] < oldPt[1]){
    collect.push(newPt[1]);
  }
  
  collect.push(oldPt[1]);

  let ret = [];
  ret.push([collect[0], collect[1]]);

  if(collect.length > 2) {
    ret.push([collect[1], collect[2]]);
  }

  if(collect.length > 3) {
    ret.push([collect[2], collect[3]]);
  }
  
  return ret;
}

function takeApart(oldCuboid, newCuboid) {

  let ret = [];
  
  if(holdsCuboid(newCuboid, oldCuboid)) { return []; }
  if(!cutsCuboid(newCuboid, oldCuboid)) { return [oldCuboid]; }

  let xcross = getCrossPoints(newCuboid.x, oldCuboid.x);
  let ycross = getCrossPoints(newCuboid.y, oldCuboid.y);
  let zcross = getCrossPoints(newCuboid.z, oldCuboid.z);

  for(let i in xcross) {
    for(let j in ycross) {
      for(let k in zcross) {
        let cutCuboid = { x: xcross[i], y: ycross[j], z: zcross[k], on: true };

        if(!holdsCuboid(newCuboid, cutCuboid)){
          ret.push(cutCuboid);
        }
      }
    }
  }
  
  return ret;
}

function step(cuboids, newCuboid) {

  let ret = [];
  for(let c in cuboids) {
    let oldCuboid = cuboids[c];
    ret = [...ret, ...takeApart(oldCuboid, newCuboid)];
  }
  
  if(newCuboid.on) {
    ret.push(newCuboid);
  }

  return ret;
}

let instructions = [];

for(let i in arr) {
    let line = arr[i].split(',');

    let inst = { on: false, x: [-1, -1], y: [-1, -1], z: [-1, -1]};
    let on = false;
    let onoff = line[0].substring(0,2);

    let y = line[1].split('..');
    let y0 = Number(y[0].substring(2));
    let y1 = Number(y[1]) + 1;
    inst.y = [y0,y1];

    let z = line[2].split('..');
    let z0 = Number(z[0].substring(2));
    let z1 = Number(z[1]) + 1;
    inst.z = [z0,z1];

    
    if (onoff === 'on') {
      inst.on = true;
      
      let x = line[0].split('..');
      let x0 = Number(x[0].substring(5));
      let x1 = Number(x[1]) + 1;
      inst.x = [x0,x1];
    } else {
      inst.on = false;
      let x = line[0].split('..');
      let x0 = Number(x[0].substring(6));
      let x1 = Number(x[1]) + 1;
      inst.x = [x0,x1];
    }
    instructions.push(inst);
}

console.log('processing ...');
let cuboids = [];
instructions.map( x => cuboids = step(cuboids, x) );
const sum = cuboids.map(item => size(item)).reduce((prev, curr) => prev + curr, 0);
console.log(sum);