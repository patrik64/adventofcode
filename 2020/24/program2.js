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
        dirs['ew'] += 2;
    else if(dir === 'w')
        dirs['ew'] -= 2;
    else if(dir === 'ne') {
        dirs['ns'] += 1;
        dirs['ew'] += 1;
    }
    else if(dir === 'nw') {
        dirs['ns'] += 1;
        dirs['ew'] -= 1;
    }
    else if(dir === 'sw') {
        dirs['ns'] -= 1;
        dirs['ew'] -= 1;
    }
    else if(dir === 'se') {
        dirs['ns'] -= 1;
        dirs['ew'] += 1;
    } else {
      console.log("error!");
    }
}

function getAdjacent(tile, occ) {
  let res = [];
  let x = tile['x'];
  let y = tile['y'];

  //east
  let eTile = { 'x' : x + 2, 'y': y, 'color' : 'white' };
  let strID = 'X' + eTile['x'] + 'Y' + eTile['y'];
  if(occ[strID]) {
    res.push( { 'id': strID, 'tile' : occ[strID] });
  } else {
    res.push( { 'id': strID, 'tile' : eTile });
  }

  //west
  let wTile = { 'x' : x - 2, 'y': y, 'color' : 'white' };
  strID = 'X' + wTile['x'] + 'Y' + wTile['y'];
  if(occ[strID]) {
    res.push( { 'id': strID, 'tile' : occ[strID] });
  } else {
    res.push( { 'id': strID, 'tile' : wTile });
  }

  //north east
  let neTile = { 'x' : x + 1, 'y': y + 1, 'color' : 'white' };
  strID = 'X' + neTile['x'] + 'Y' + neTile['y'];
  if(occ[strID]) {
    res.push( { 'id': strID, 'tile' : occ[strID] });
  } else {
    res.push( { 'id': strID, 'tile' : neTile });
  }

  //north west
  let nwTile = { 'x' : x - 1, 'y': y + 1, 'color' : 'white' };
  strID = 'X' + nwTile['x'] + 'Y' + nwTile['y'];
  if(occ[strID]) {
    res.push( { 'id': strID, 'tile' : occ[strID] });
  } else {
    res.push( { 'id': strID, 'tile' : nwTile });
  }

  //south east
  let seTile = { 'x' : x + 1, 'y': y - 1, 'color' : 'white' };
  strID = 'X' + seTile['x'] + 'Y' + seTile['y'];
  if(occ[strID]) {
    res.push( { 'id': strID, 'tile' : occ[strID] });
  } else {
    res.push( { 'id': strID, 'tile' : seTile });
  }

  //south west
  let swTile = { 'x' : x - 1, 'y': y - 1, 'color' : 'white' };
  strID = 'X' + swTile['x'] + 'Y' + swTile['y'];
  if(occ[strID]) {
    res.push( { 'id': strID, 'tile' : occ[strID] });
  } else {
    res.push( { 'id': strID, 'tile' : swTile });
  }

  return res;
}

function turn(occ) {
  let res = {};

  expandAdjacent(occ);

  for(let o in occ) {
    let blacks = 0;
    res[o] = JSON.parse(JSON.stringify(occ[o]));

    let x = occ[o]['x'];
    let y = occ[o]['y'];


    let strID = 'X' + (x + 2) + 'Y' + y;
    if(occ[strID] && occ[strID]['color'] === 'black')
      blacks++;

    strID = 'X' + (x - 2) + 'Y' + y;
    if(occ[strID] && occ[strID]['color'] === 'black')
      blacks++;

    strID = 'X' + (x + 1) + 'Y' + (y + 1);
    if(occ[strID] && occ[strID]['color'] === 'black')
        blacks++;

    strID = 'X' + (x + 1) + 'Y' + (y - 1);
    if(occ[strID] && occ[strID]['color'] === 'black')
      blacks++;

    strID = 'X' + (x - 1) + 'Y' + (y + 1);
    if(occ[strID] && occ[strID]['color'] === 'black')
      blacks++;

    strID = 'X' + (x - 1) + 'Y' + (y - 1);
    if(occ[strID] && occ[strID]['color'] === 'black')
      blacks++;

    if(occ[o]['color'] === 'black') {
      if(blacks == 0 || blacks > 2) {
        res[o]['color'] = 'white';
      }
    }
    else if(occ[o]['color'] === 'white') {
      if(blacks == 2) {
        res[o]['color'] = 'black';
      }
    }
  }

  return res;
}

function expandAdjacent(occ) {
  let adjacents = [];
  for(let o in occ) {
    let tile = occ[o];
    let res = getAdjacent(tile, occ);
    if(res.length > 0)
      adjacents = [...adjacents, ...res];
  }
  for(let a in adjacents) {
    let adj = adjacents[a];
    if(!occ[adj['id']]) {
      occ[adj['id']] = adj['tile'];
    }
  }
}

function calcBlack(occ) {
  let res = 0;
  for(let o in occ) {
    if(occ[o]['color'] === 'black') {
      res++;
    }
  }
  return res;
}

let occ = {};

for(let x in arr) {
  let line = arr[x];
  let mvs = parse(line);

  let dirs = { 'ew' : 0, 'ns' : 0 };
  for(let x in mvs) {
    move(mvs[x], dirs);
  }

  let tile = { 'x' : dirs['ew'], 'y' : dirs['ns'], 'color' : 'black' }
  let str = 'X' + dirs['ew'].toString() + 'Y' + dirs['ns'].toString();

  if(occ[str]) {
    if(occ[str]['color'] == 'black')
    occ[str]['color'] = 'white';
    else
      occ[str]['color'] = 'black';
  } else
    occ[str] = tile;
}

let test = turn(occ);
let res = calcBlack(test);
console.log('day --> ', 1, ':', res);

for(let i = 2; i < 101; i++) {
  test = turn(test);
  let res = calcBlack(test);
  console.log('day --> ', i, ':', res);
}
