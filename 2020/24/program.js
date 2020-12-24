let fs = require('fs');
let input = fs.readFileSync('Day24.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;
    var dir = '';
    var ret = [];

    while(idx < str.length) {
        if( str[idx] == 's' || str[idx] == 'n') {
            dir += str[idx];
            idx++;
            dir += str[idx];
            dir = dir.trim();
            ret.push(dir);
            dir = '';
        } else {
          dir += str[idx];
          dir = dir.trim();
          if(dir.length)
            ret.push(dir);
          dir = '';
        }
        idx++;
    }
    return ret;
}

function move(dir, dirs)
{
    if(dir === 'e')
        dirs['ew'] += 1;
    else if(dir === 'w')
        dirs['ew'] -= 1;
    else if(dir === 'ne') {
        dirs['ns'] += 1;
        dirs['ew'] += 0.5;
    }
    else if(dir === 'nw') {
        dirs['ns'] += 1;
        dirs['ew'] -= 0.5;
    }
    else if(dir === 'sw') {
        dirs['ns'] -= 1;
        dirs['ew'] -= 0.5;
    }
    else if(dir === 'se') {
        dirs['ns'] -=1;
        dirs['ew'] +=0.5;
    } else {
      console.log("error!");
    }
}



let occ = {};

for(let x in arr) {
  let line = arr[x];
  let mvs = parse(line);

  let dirs = { 'ew' : 0, 'ns' : 0 };
  for(let x in mvs) {
    move(mvs[x], dirs);
  }

  let str = 'X' + dirs['ew'] + 'Y' + dirs['ns'];

  if(occ[str])
    occ[str] += 1;
  else
    occ[str] = 1;
}

let res = 0;

for(let o in occ) {
  if(occ[o] % 2 === 1)
    res++;
}

console.log(res)
