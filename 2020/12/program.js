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

let trueDirection = 'E';
let distanceX = 0;
let distanceY = 0;

for(let i in inst) {
    let instruction = inst[i];

    if(instruction.dir === 'F') {
        if(trueDirection === 'E')
            distanceX += instruction.n;
        else if(trueDirection === 'W')
            distanceX -= instruction.n;
        else if(trueDirection === 'N')
            distanceY -= instruction.n;
        else if(trueDirection === 'S')
            distanceY += instruction.n;
    }
    else if(instruction.dir === 'R') {
        if(instruction.n === 90) {
            if(trueDirection === 'E')
                trueDirection = 'S'
            else if(trueDirection === 'S')
                trueDirection = 'W'
            else if(trueDirection === 'W')
                trueDirection = 'N'
            else if(trueDirection === 'N')
                trueDirection = 'E'
            else
                console.log('error!');
        }
        if(instruction.n === 180) {
            if(trueDirection === 'E')
                trueDirection = 'W'
            else if(trueDirection === 'S')
                trueDirection = 'N'
            else if(trueDirection === 'W')
                trueDirection = 'E'
            else if(trueDirection === 'N')
                trueDirection = 'S'
            else
                console.log('error!');
        }
        if(instruction.n === 270) {
            if(trueDirection === 'E')
                trueDirection = 'N'
            else if(trueDirection === 'S')
                trueDirection = 'E'
            else if(trueDirection === 'W')
                trueDirection = 'S'
            else if(trueDirection === 'N')
                trueDirection = 'W'
            else
                console.log('error!');
        }
    }
    else if(instruction.dir === 'L') {
        if(instruction.n === 90) {
            if(trueDirection === 'E')
                trueDirection = 'N'
            else if(trueDirection === 'N')
                trueDirection = 'W'
            else if(trueDirection === 'W')
                trueDirection = 'S'
            else if(trueDirection === 'S')
                trueDirection = 'E'
            else
                console.log('error!');
        }
        if(instruction.n === 180) {
            if(trueDirection === 'E')
                trueDirection = 'W'
            else if(trueDirection === 'S')
                trueDirection = 'N'
            else if(trueDirection === 'W')
                trueDirection = 'E'
            else if(trueDirection === 'N')
                trueDirection = 'S'
            else
                console.log('error!');
        }
        if(instruction.n === 270) {
            if(trueDirection === 'E')
                trueDirection = 'S'
            else if(trueDirection === 'N')
                trueDirection = 'E'
            else if(trueDirection === 'W')
                trueDirection = 'N'
            else if(trueDirection === 'S')
                trueDirection = 'W'
            else
                console.log('error!');
        }
    }
    else if(instruction.dir === 'N')
        distanceY -= instruction.n;
    else if(instruction.dir === 'S')
        distanceY += instruction.n;
    else if(instruction.dir === 'E')
        distanceX += instruction.n;
    else if(instruction.dir === 'W')
        distanceX -= instruction.n;
    else {
        console.log('error!');
    }
}

let distance = Math.abs(distanceX) + Math.abs(distanceY);

console.log(distance);