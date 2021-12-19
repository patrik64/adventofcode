let fs = require('fs');
let input = fs.readFileSync('Day19.in', 'utf8');
let arr = input.split('\n');

function getRotations() {
  let ret = [];

  let directions = [1,-1];
  let permutations = [];
  permutations.push([0,1,2]);
  permutations.push([0,2,1]);
  permutations.push([1,0,2]);
  permutations.push([1,2,0]);
  permutations.push([2,0,1]);
  permutations.push([2,1,0]);

  for(p in permutations) {
    let perm = permutations[p];
    for(dX in [1,-1]) {
      for(dY in [1,-1]) {
        for(dZ in [1,-1]) {
          ret.push([directions[dX], directions[dY], directions[dZ], ...perm])
        }
      }
    }
  }
  return ret;
}

function allBeacons(scanners) {
  ret = [];
  for(let s in scanners) { 
    ret = [...ret, ...scanners[s]]; 
  }
  return ret;
}

function rotate(pos, rot) {
  let newPos = [pos[0]*rot[0], pos[1]*rot[1], pos[2]*rot[2]];
  return [newPos[rot[3]], newPos[rot[4]], newPos[rot[5]]];
}

function distance(x, y) {
  return [x[0] - y[0], x[1] - y[1], x[2] - y[2]];
}

function add(pos1, pos2) {
  let p0 = Number(pos1[0]) + Number(pos2[0]);
  let p1 = Number(pos1[1]) + Number(pos2[1]);
  let p2 = Number(pos1[2]) + Number(pos2[2]);
  let ret = [Number(p0), Number(p1), Number(p2)];
  return ret;
}

function removeBeaconDuplicates(scanners) {
  for(let s in scanners) {
    let positions = scanners[s];
   
    const res = new Set();
    positions.map(x => res.add(x.toString()));
    positions = [];
    for (let item of res) {
      positions.push(item.split(','));
    }
    scanners[s] = positions;
  }
  return scanners;
}

function manhattanDistance(x, y) {
  return [Math.abs(x[0] - y[0]), Math.abs(x[1] - y[1]), Math.abs(x[2] - y[2])];
}

function collect(scanners) {
  let ret = [];
  let processed_scanners = {}
  let rot = getRotations();
  
  let allPos = [];
  allPos.push([0,0,0]);

  processed_scanners[0] = [...scanners[0]];
  while(Object.keys(processed_scanners).length < Object.keys(scanners).length) {
    let beacons = [...allBeacons(processed_scanners)];
    for(let b in beacons) {
      for(let s in scanners) {
        if (!(s in processed_scanners)) {
          let positions = scanners[s];
          for(let r in rot) {
            let rotation = rot[r];
            let changed = [];

            changed = positions.map(x => rotate(x, rotation));

            let distances = {}
            for(let x in beacons) {
              for(let y in changed) {
                let dist = distance(beacons[x], changed[y]).toString();
                if(dist in distances) {
                  distances[dist] += 1;
                } else {
                  distances[dist] = 1;
                }
              }
            } 

            let pt = null; 
            for(let d in distances) {
              if(distances[d] >= 12) {
                pt = d;
                break;
              }
            }
          
            if(pt) {
              pt = pt.split(',').map(x => Number(x));
              allPos.push(pt);
              let moved = changed.map(x => add(x, pt));
              processed_scanners[s] = moved;
              processed_scanners = removeBeaconDuplicates(processed_scanners);
            }
          }
        }
      }
    }
  }

  const res = new Set();

  for(let ps in processed_scanners) {
    let beacons = processed_scanners[ps];
    for(let b in beacons) {
      let beacon = beacons[b].toString();
      res.add(beacon);
    }
  }

  let manhattans = [];
  const reducer = (p, c) => p + c;

  for(let i = 0; i < allPos.length-1; i++) {
    for(let j = i+1; j < allPos.length; j++) {
      let md = manhattanDistance(allPos[i],allPos[j]);
      manhattans.push(md.reduce(reducer));
    }
  }

  manhattans.sort((a, b) => b - a);
  
  return manhattans[0];
}

let scanners = {};
let positions = [];

let idx = 0;
for(let i in arr) {
    let test = arr[i];
   
    if(test.substring(0,2) !== '---') {
      let pos = test.split(',').map(x => Number(x));
      if(pos.length === 1 && pos[0] === 0) {
        scanners[idx]=positions;
        idx += 1;
        positions = [];
      }
      if(pos.length === 3){
        positions.push(pos);
      }
    }
}

console.log('processing ....');
let max = collect(scanners);
console.log(max);