let fs = require('fs');
let input = fs.readFileSync('Day24.in', 'utf8');
let arr = input.split('\n');

function eql(a, b) {
  if(a === b) return 1;
  return 0;
}

function rdiv(a, b) {
  return Math.floor(a/b);
}

function calc(arr, instructions) {
  let w = 0;
  let x = 0;
  let y = 0;
  let z = 0;

  let drun = 0;
  for(let i = 0; i < instructions.length; i++) {
    let inst = instructions[i];

    if(inst.op === 'inp') {
      let digit = arr[drun];
      w = Number(digit);
      drun += 1;
      if(isNaN(w)) { console.log('error inp'); }
    }
    else if(inst.op === 'add') {
      let num = null;
      if(inst.b !== 'x' && inst.b !== 'y' && inst.b !== 'z' && inst.b !== 'w' ) { num = Number(inst.b); }
      
      if(inst.a === 'x') {
        if(num !== null) { x += num; }
        else if(inst.b === 'y') { x += y; }
        else if(inst.b === 'z') { x += z; }
        else if(inst.b === 'w') { x += w; }
        else { console.log('error add ->', inst.a, inst.b); }
      }
      else if(inst.a === 'y') {
        if(num !== null) { y += num; }
        else if(inst.b === 'x') { y += x; }
        else if(inst.b === 'z') { y += z; }
        else if(inst.b === 'w') { y += w; }
        else { console.log('error add ->', inst.a, inst.b); }
      }
      else if(inst.a === 'z') {
        if(num !== null) { z += num; }
        else if(inst.b === 'x') { z += x; }
        else if(inst.b === 'y') { z += y; }
        else if(inst.b === 'w') { z += w; }
        else { console.log('error add ->', inst.a, inst.b); }
      }
      else if(inst.a === 'w') {
        if(num !== null) { w += num; }
        else if(inst.b === 'x') { w += x; }
        else if(inst.b === 'y') { w += y; }
        else if(inst.b === 'z') { w += z; }
        else { console.log('error add ->', inst.a, inst.b); }
      }
    }
    else if(inst.op === 'mul') {
      let num = null;
      if(inst.b !== 'x' && inst.b !== 'y' && inst.b !== 'z' && inst.b !== 'w' ) { num = Number(inst.b); }
      
      if(inst.a === 'x') {
        if(num !== null) { x *= num; }
        else if(inst.b === 'y') { x *= y; }
        else if(inst.b === 'z') { x *= z; }
        else if(inst.b === 'w') { x *= w; }
        else { console.log('error mul->', inst.a, inst.b); }
      }
      else if(inst.a === 'y') {
        if(num !== null) { y *= num; }
        else if(inst.b === 'x') { y *= x; }
        else if(inst.b === 'z') { y *= z; }
        else if(inst.b === 'w') { y *= w; }
        else { console.log('error mul->', inst.a, inst.b); }
      }
      else if(inst.a === 'z') {
        if(num !== null) { z *= num; }
        else if(inst.b === 'x') { z *= x; }
        else if(inst.b === 'y') { z *= y; }
        else if(inst.b === 'w') { z *= w; }
        else { console.log('error mul->', inst.a, inst.b); }
      }
      else if(inst.a === 'w') {
        if(num !== null) { w *= num; }
        else if(inst.b === 'x') { w *= x; }
        else if(inst.b === 'y') { w *= y; }
        else if(inst.b === 'z') { w *= z; }
        else { console.log('error mul->', inst.a, inst.b); }
      }
    }
    else if(inst.op === 'div') {
      let num = null;
      if(inst.b !== 'x' && inst.b !== 'y' && inst.b !== 'z' && inst.b !== 'w' ) { num = Number(inst.b); }
      
      if(inst.a === 'x') {
        if(num !== null) { x = rdiv(x, num); }
        else if(inst.b === 'y') { x = rdiv(x, y); }
        else if(inst.b === 'z') { x = rdiv(x, z); }
        else if(inst.b === 'w') { x = rdiv(x, w); }
        else { console.log('error div->', inst.a, inst.b); }
      }
      else if(inst.a === 'y') {
        if(num !== null) { y = rdiv(y, num); }
        else if(inst.b === 'x') { y = rdiv(y, x); }
        else if(inst.b === 'z') { y = rdiv(y, z); }
        else if(inst.b === 'w') { y = rdiv(y, w); }
        else { console.log('error div->', inst.a, inst.b); }
      }
      else if(inst.a === 'z') {
        if(num !== null) { z = rdiv(z, num); }
        else if(inst.b === 'x') { z = rdiv(z, x); }
        else if(inst.b === 'y') { z = rdiv(z, y); }
        else if(inst.b === 'w') { z = rdiv(z, w); }
        else { console.log('error div->', inst.a, inst.b); }
      }
      else if(inst.a === 'w') {
        if(num !== null) { w = rdiv(w, num); }
        else if(inst.b === 'x') { w = rdiv(w, x); }
        else if(inst.b === 'y') { w = rdiv(w, y); }
        else if(inst.b === 'z') { w = rdiv(w, z); }
        else { console.log('error div->', inst.a, inst.b); }
      }
    }
    else if(inst.op === 'mod') {
      let num = null;
      if(inst.b !== 'x' && inst.b !== 'y' && inst.b !== 'z' && inst.b !== 'w' ) { num = Number(inst.b); }
      
      if(inst.a === 'x') {
        if(num !== null) { x %= num; }
        else if(inst.b === 'y') { x %= y; }
        else if(inst.b === 'z') { x %= z; }
        else if(inst.b === 'w') { x %= w; }
        else { console.log('error mod->', inst.a, inst.b); }
      }
      else if(inst.a === 'y') {
        if(num !== null) { y %= num; }
        else if(inst.b === 'x') { y %= x; }
        else if(inst.b === 'z') { y %= z; }
        else if(inst.b === 'w') { y %= w; }
        else { console.log('error mod->', inst.a, inst.b); }
      }
      else if(inst.a === 'z') {
        if(num !== null) { z %= num; }
        else if(inst.b === 'x') { z %= x; }
        else if(inst.b === 'y') { z %= y; }
        else if(inst.b === 'w') { z %= w; }
        else { console.log('error mod->', inst.a, inst.b); }
      }
      else if(inst.a === 'w') {
        if(num !== null !== null) { w %= num; }
        else if(inst.b === 'x') { w %= x; }
        else if(inst.b === 'y') { w %= y; }
        else if(inst.b === 'z') { w %= z; }
        else { console.log('error mod->', inst.a, inst.b); }
      }
    }
    else if(inst.op === 'eql') {
      let num = null;
      if(inst.b !== 'x' && inst.b !== 'y' && inst.b !== 'z' && inst.b !== 'w' ) { num = Number(inst.b); }
      
      if(inst.a === 'x') {
        if(num !== null) { x = eql(x,num); }
        else if(inst.b === 'y') { x = eql(x,y); }
        else if(inst.b === 'z') { x = eql(x,z); }
        else if(inst.b === 'w') { x = eql(x,w); }
        else { console.log('error eql x->', inst.a, inst.b, num); }
      }
      else if(inst.a === 'y') {
        if(num !== null) { y = eql(y,num); }
        else if(inst.b === 'x') { y = eql(y, x); }
        else if(inst.b === 'z') { y = eql(y, z); }
        else if(inst.b === 'w') { y = eql(y, w); }
        else { console.log('error eql y->', inst.a, inst.b); }
      }
      else if(inst.a === 'z') {
        if(num !== null) { z = eql(z, num); }
        else if(inst.b === 'x') { z = eql(z, x); }
        else if(inst.b === 'y') { z = eql(z, y); }
        else if(inst.b === 'w') { z = eql(z, w); }
        else { console.log('error eql z->', inst.a, inst.b); }
      }
      else if(inst.a === 'w') {
        if(num !== null) { w = eql(w, num); }
        else if(inst.b === 'x') { w = eql(w, x); }
        else if(inst.b === 'y') { w = eql(w, y); }
        else if(inst.b === 'z') { w = eql(w, z); }
        else { console.log('error eql w->', inst.a, inst.b); }
      }
    }
  }

  return z;
}

let instructions = [];
for(let i in arr) {
    let line = arr[i].split(' ');
    let inst = { op: '', a: null, b: null }
    inst.op = line[0];
    inst.a = line[1];
    inst.b = line[2];

    instructions.push(inst);
}

//from instructions we can read that d14 - d1 = 5
//for max number that means d1 = 1 and d13 = 6
//from instructions we can read that d13 - d2 = 4
//for max number that means d2 = 1  and d13 = 5
//from instructions we can read that d3 - d11 = 8
//only combination is d3 = 9 and d11 = 1
//this gives us the following number:
// 119xxxxxxxx156

for(let i3 = 1; i3 <=9; i3++) {
  for(let i4 = 1; i4 <=9; i4++) {
    for(let i5 = 1; i5 <=9; i5++) {
      for(let i6 = 1; i6 <=9; i6++) {
        for(let i7 = 1; i7 <=9; i7++) {
          for(let i8 = 1; i8 <=9; i8++) {
            for(let i9 = 1; i9 <=9; i9++) {
              for(let i10 = 1; i10 <=9; i10++) {
                let test = 11911111111156;
                let inarr = test.toString().split('').map( x=> Number(x));  
                inarr[3] = i3;
                inarr[4] = i4;
                inarr[5] = i5;
                inarr[6] = i6;
                inarr[7] = i7;
                inarr[8] = i8;
                inarr[9] = i9;
                inarr[10] = i10;
                let z = calc(inarr, instructions);
                if(z === 0) {
                  let res = Number(inarr.join(''));
                  console.log(res);
                  process.exit(0);
                }
              }
            }
          }
        }
      }
    }
  }
}