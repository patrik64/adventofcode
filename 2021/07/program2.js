let fs = require('fs');
let input = fs.readFileSync('Day7.in', 'utf8');
let arr = input.split('\n');

let pos = arr[0].split(',');

let positions = [];
for(let x in pos) {
    positions.push(Number(pos[x]));
}

let min = Math.min(...positions);
let max = Math.max(...positions);

let minFuel = 100000000000000000;
for(let i = min; i <= max; i++){
    let fuel = 0;
    for(let x in positions) {
        let pos = positions[x];
        let a = 0;
        let b = 0;
        if(pos > i) {
            a = i;
            b = pos;
        } else {
            a = pos;
            b = i;
        }
        for(let j = 1; j <= (b-a); j++) {
            fuel += j;
        }
    }
    if(minFuel > fuel) minFuel = fuel;
}

console.log(minFuel);