let fs = require('fs');

let input = fs.readFileSync('Day12.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;

    str = str.trim();

    let dir = str[0];
    idx++;

    let n = '';
    while(idx < str.length) {
        let ch = str[idx];
        n += ch;
        idx++;
    }

    n.trim();
    let ret = { 'dir' :  dir, 'n' : Number(n)};

    return ret;
}

let inst = [];
for (let i in arr) {
   let line = arr[i];
   let row = parse(line);
   inst.push(row);
}

function rotateR(x, y) {
    let resX = -1 * y;
    let resY = x;
    return [resX, resY];
}

function rotateL(x, y) {
    let resX = y;
    let resY = -1 * x;
    return [resX, resY];
}

let waypointX = 10;
let waypointY = -1;

let shipX = 0;
let shipY = 0;

for(let i in inst) {
    let instruction = inst[i];

    if(instruction.dir === 'F') {
        shipX = shipX + (instruction.n * waypointX)
        shipY = shipY + (instruction.n * waypointY)
    }
    else if(instruction.dir === 'R') {
        if(instruction.n === 90) {
            [waypointX, waypointY] = rotateR(waypointX, waypointY);
        }
        if(instruction.n === 180) {
            [waypointX, waypointY] = rotateR(waypointX, waypointY);
            [waypointX, waypointY] = rotateR(waypointX, waypointY);
        }
        if(instruction.n === 270) {
            [waypointX, waypointY] = rotateR(waypointX, waypointY);
            [waypointX, waypointY] = rotateR(waypointX, waypointY);
            [waypointX, waypointY] = rotateR(waypointX, waypointY);
        }
    }
    else if(instruction.dir === 'L') {
        if(instruction.n === 90) {
            [waypointX, waypointY] = rotateL(waypointX, waypointY);
        }
        if(instruction.n === 180) {
            [waypointX, waypointY] = rotateL(waypointX, waypointY);
            [waypointX, waypointY] = rotateL(waypointX, waypointY);
        }
        if(instruction.n === 270) {
            [waypointX, waypointY] = rotateL(waypointX, waypointY);
            [waypointX, waypointY] = rotateL(waypointX, waypointY);
            [waypointX, waypointY] = rotateL(waypointX, waypointY);
        }
    }
    else if(instruction.dir === 'N')
        waypointY -= instruction.n;
    else if(instruction.dir === 'S')
        waypointY += instruction.n;
    else if(instruction.dir === 'E')
        waypointX += instruction.n;
    else if(instruction.dir === 'W')
        waypointX -= instruction.n;
    else {
        console.log('error!');
    }
}

let distance = Math.abs(shipX) + Math.abs(shipY);

console.log(distance);