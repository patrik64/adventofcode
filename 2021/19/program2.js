let fs = require('fs');
let input = fs.readFileSync('Day19.in', 'utf8');
let arr = input.split('\n');

class Node {
    constructor() {
      let x = null;
      let y = null;
      let level = 0;
      let parent = null;
    }
}

function createTree(pair, tree, level) {
  let node = new Node();
  node.parent = tree;
  node.level = level;
  if(isNaN(pair.x)) { 
    node.x = createTree(pair.x, node, level+1); 
  } else {
    node.x = pair.x;
  }
  if(isNaN(pair.y)) { 
    node.y = createTree(pair.y, node, level+1); 
  } else {
    node.y = pair.y;
  }
  return node;
}

function getNode(tree, level, i) {
  if(tree.level === level) {
    return tree;
  }

  let finalx = -1;
  i += 1;

  let nodeX = tree.x;
  let nodeY = tree.y;
  let testX = null;
  let testY = null;
  if(isNaN(nodeX)) { 
    testX = getNode(nodeX, level, i); 
  }
  if(isNaN(nodeY)) { 
    testY = getNode(nodeY, level, i); 
  }
  
  if(testX) return testX;
  return testY;
}

function findClosingIdx(str, startIdx) {
  let brackets = 0;
  for(let i = startIdx; i < str.length; i++) {
    let ch = str[i];
    if(ch === ']' && brackets === 0) return i;
    else if(ch === ']' && brackets > 0) brackets -= 1;
    else if(ch === '[' ) brackets += 1;
  }
  return -1;
}

function addY(node, val) {
  let parent = node.parent;
  if(parent === null) { return; }
  if(parent.y !== node) {
    if(isNaN(parent.y)) {
      addXDown(parent.y, val);
    } else {
      parent.y += val;
    }
  } else {
    addY(parent, val);
  }
}

function addX(node, val) {
  let parent = node.parent;
  if(parent === null) { return; }
  if(parent.x !== node) {
    if(isNaN(parent.x)) {
      addYDown(parent.x, val);
    } else {
      parent.x += val;
    }
  } else {
    addX(parent, val);
  }
}

function addXDown(node, val) {
  let x = node.x;
  if(isNaN(x)) {
    addXDown(node.x, val);
  } else {
    node.x += val;
  }
}

function addYDown(node, val) {
  let y = node.y;
  if(isNaN(y)) {
    addYDown(node.y, val);
  } else {
    node.y += val;
  }
}
  

function createPair(tree) {

  let pair = {}
  let x = tree.x;
  let y = tree.y;
  
  if(!isNaN(x)) { 
    pair.x = x;
  } else  {
    pair.x = createPair(tree.x);
  }
  if(!isNaN(y)) { 
    pair.y = y;
  } else  {
    pair.y = createPair(tree.y);
  }

  return pair;
}

function explode(pair, count, lastX, lastY) {
  
  let root = createTree(pair, null, 0);
  let node = getNode(root, 4, 0);
  if(node !== null) {

    addX(node, node.x);
    addY(node, node.y);

    let parent = node.parent;
    if(parent.x === node) {
          parent.x = 0;
    } else {
      parent.y = 0;
    }
    return createPair(root);
  }
  return pair;
}

function split(pair) {
  let done = false;
  if(!isNaN(pair.x) && pair.x >= 10) {
    let half1 = Math.floor(pair.x/2);
    let half2 = Math.ceil(pair.x/2);
    pair.x = { 'x': half1, 'y': half2 }
    return true;
  }
  else if(!isNaN(pair.y) && pair.y >= 10) {
    let half1 = Math.floor(pair.y/2);
    let half2 = Math.ceil(pair.y/2);
    pair.y = { 'x': half1, 'y': half2 }
    return true;
  }
  if(!done) {
    if(isNaN(pair.x)) {
      done = split(pair.x);
    }
  }
  if(!done) {
    if(isNaN(pair.y)) {
      done = split(pair.y);
    }
  }
  return done;
}

function reduce(pair) {
  let copy = JSON.stringify(pair);
  pair = step(pair);
  while(copy !== JSON.stringify(pair)){
    copy = JSON.stringify(pair);
    pair = step(pair);
  }
  return pair;
}

function step(pair) {
  let copy = JSON.stringify(pair);
  pair = explode(pair);
  while(copy !== JSON.stringify(pair)){
    copy = JSON.stringify(pair);
    pair = explode(pair);
  }
  split(pair);
  return pair;
}

function add(pair1, pair2) {
  return { 'x': pair1, 'y': pair2 };
}

function parse(str) {
  let ret = {};

  let idx = 0;
  let ch = str[idx];
  if(ch !== '[') { console.log('error!!!'); process.exit(-1); }
  idx += 1;
  ch = str[idx];
  if(ch === '[') {
    let closingIdx = findClosingIdx(str, 2);
    let substr = str.substring(1, closingIdx+1);
    str = str.substring(0,2) + str.substring(substr.length+1);
    let subpair = parse (substr);
    ret['x'] = subpair;
    idx += 1 ;
  } else {
    let n = '';
    while(str[idx] !== ',') {
      n += str[idx];
      idx += 1;
    }
    
    ret['x'] = Number(n);
  }
  ch = str[idx];
  if(ch !== ',') { console.log('error comma !!!', ch); process.exit(-1); }
  idx += 1;
  
  ch = str[idx];

  if(ch === '[') {
    let substr = str.substring(idx, str.length-1);
    str = str.substring(0,idx) + str.substring(idx + substr.length-1);
    let subpair = parse(substr);
    ret['y'] = subpair;
  } else {
    let n = '';
    while(!isNaN(str[idx])) {
      n += str[idx];
      idx += 1;
    }
    ret['y'] = Number(n);
  }
  ch = str[idx];
  if(ch !== ']') { console.log('error!!! ]'); process.exit(-1); }

  return ret;
}

function magnitude(pair) {
  let ret = 0;
  if(!isNaN(pair.x)) {
    ret += pair.x * 3;
  }
  else if(isNaN(pair.x)) {
    ret += 3* magnitude(pair.x);
  }
  if(!isNaN(pair.y)) {
    ret += pair.y * 2;
  }
  else if(isNaN(pair.y)) {
    ret += 2* magnitude(pair.y);
  }
  return ret;
}

let pairs = [];
for(let i = 0; i < arr.length; i++) {
  let p = parse(arr[i]);
  pairs.push(p);
}

let maxmag = 0;

for(let i = 0; i < pairs.length-1; i++) {
  let pair1 = pairs[i];
  for(let j = i + 1; j < pairs.length; j++) {
    let pair2 = pairs[j];
    let test = add(pair1, pair2);
    test = reduce(test);
    let res = magnitude(test);
    if(res > maxmag) maxmag = res;
  }
}

console.log(maxmag);