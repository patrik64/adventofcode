let fs = require('fs');
let input = fs.readFileSync('Day16.in', 'utf8');
let arr = input.split('\n');

function reverseString(str) {
  return str.split('').reverse().join('');
}

function hex2bin(hex) {
  let ret = '';

  let h2b = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
  }

  for(let x in hex) {
    ret += h2b[hex[x]];
  }
  return ret;
}

function binstring2num(bstr) {
  let ret = 0;
  bstr = reverseString(bstr);
  
  for(let i = 0; i < bstr.length; i++) {
    let n = Number(bstr[i]); 
    ret += n * Math.pow(2, i);
  }
  return ret;
}

function parsePacket(input) {

  let ret = input;
  if(ret['str'].length < 6) { 
    return ret; 
  }

  let str = ret['str'];
  str = str.substring(3);
  let id = str.substring(0,3);
  id = binstring2num(id);
  ret['obj']['id'] = id;
  ret['obj']['val'] = -1;
  str = str.substring(3);

  ret['str'] = str;
  if(id === 4) {
    ret = parseLiteral(ret);
  } else {
    ret = parseOperator(ret);
  }

  return ret;
}

function parseLiteral(input) {
  let str = input['str'];
  
  let bval = '';
  while(str.length >= 5) {
    let group = str.substring(0, 5);
    let bit = group[0];
    let gn = group.substring(1);
    bval += gn;
    if(bit === '0') {
      break;
    }
    str = str.substring(5);
  }
  let val = binstring2num(bval);
  input['obj']['val'] = val;
  str = str.substring(5);
  input['str'] = str;
  return input;
}

function parseOperator(input) {
  let ret = input;

  let str = input['str'];

  let length_type_id = str[0];
  
  str = str.substring(1);
  
  if(length_type_id === '0' ){
    let len = str.substring(0,15);
    len = binstring2num(len);
    str = str.substring(15);
    let rest = str.substring(0, len);
    input['str'] = rest;

    let val = 0;
    let vals = [];

    let id = input['obj']['id'];
    if(id === 0) {
      val = 0;
    } else if(id === 1) {
      val = 1;
    }

    while(rest.length > 0) {
      ret = parsePacket(input);

      if(id === 0) {
        val += ret['obj']['val'];
      } else if(id === 1) {
        val *= ret['obj']['val'];
      } else if(id === 2 || id === 3 || id === 5 || id === 6 || id === 7) {
        vals.push(ret['obj']['val']);
      }
      input = ret;
      rest = ret['str'];
    }

    if(id === 2) {
      val = Math.min(...vals);
    }
    if(id === 3) {
      val = Math.max(...vals);
    }
    if(id === 5) {
      if(vals[0] > vals[1]) {
        val = 1;
      } else {
        val = 0;
      }
    }
    if(id === 6) {
      if(vals[0] < vals[1]) {
        val = 1;
      } else {
        val = 0;
      }
    }
    if(id === 7) {
      if(vals[0] === vals[1]) {
        val = 1;
      } else {
        val = 0;
      }
    }

    str = str.substring(len);
    ret['str'] = str;
    ret['obj']['val'] = val;
    
  } else if(length_type_id === '1' ){
    let len = str.substring(0,11);
    len = binstring2num(len);
    str = str.substring(11);
    let val = 0;
    let vals = [];
    let id = input['obj']['id'];

    if(id === 0) {
      val = 0;
    } else if(id === 1) {
      val = 1;
    }

    while(len > 0) {
      let subInput = { 'str' : str, 'obj': {} };
      let subret = parsePacket(subInput);
      str = subret['str'];
      len -= 1;

      if(id === 0) {
        val += subret['obj']['val'];
      } else if(id === 1) {
        val *= subret['obj']['val'];
      } else if(id === 2 || id === 3 || id === 5 || id === 6 || id === 7) {
        vals.push(subret['obj']['val']);
      }
    }

    if(id === 2) {
      val = Math.min(...vals);
    }
    if(id === 3) {
      val = Math.max(...vals);
    }
    if(id === 5) {
      if(vals[0] > vals[1]) {
        val = 1;
      } else {
        val = 0;
      }
    }
    if(id === 6) {
      if(vals[0] < vals[1]) {
        val = 1;
      } else {
        val = 0;
      }
    }
    if(id === 7) {
      if(vals[0] === vals[1]) {
        val = 1;
      } else {
        val = 0;
      }
    }

    ret['obj']['val'] = val;
    ret['str'] = str;
  }
  return ret;
}

let hex = arr[0];
let bin = hex2bin(hex);
let start = { 'str' : bin, 'obj': {} }
let ret = parsePacket(start);

console.log(ret['obj']['val']);