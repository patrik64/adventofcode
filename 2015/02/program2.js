let fs = require('fs');
let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;
    let x = '';
    let y = '';
    let z = '';

    while(str[idx] != 'x') {
        x += str[idx];
        idx++;
    }

    idx++;
    while(str[idx] != 'x') {
        y += str[idx];
        idx++;
    }
    idx++;

    while(idx < str.length) {
        z += str[idx];
        idx++;
    }

    x = x.trim();
    x = parseInt(x, 10);
    y = y.trim();
    y = parseInt(y, 10);
    z = z.trim();
    z = parseInt(z, 10);

    return { "x": x, "y": y, "z": z};
}

function getBowLen(box) {
    return (box.x*box.y*box.z);
}

function getMinLen(box) {
    let mdim = 'x';
    let min1 = box.x;
    if(box.y < min1) {
        min1 =  box.y;
        mdim = 'y';
    }
    if(box.z < min1) {
        min1 = box.z;
        mdim = 'z';
    }

    let min2;
    if(mdim == 'x')
        min2 = Math.min(box.y, box.z);
    else if(mdim == 'y')
        min2 = Math.min(box.x, box.z);
    else if(mdim == 'z')
        min2 = Math.min(box.x, box.y);
    
    return min1+min1+min2+min2;
}

let boxes = [];
let sum = 0;

for (let i in arr) {
   let line = arr[i];
   let obj = parse(line);
   boxes.push(obj);
}

for(let i in boxes) {
    let box = boxes[i];
    sum += getBowLen(box) + getMinLen(box);
}

console.log(sum);
