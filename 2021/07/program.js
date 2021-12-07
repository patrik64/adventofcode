let fs = require('fs');
let input = fs.readFileSync('Day7.in', 'utf8');
let arr = input.split('\n');

let positions = arr[0].split(',').map(x => Number(x));

let min = Math.min(...positions);
let max = Math.max(...positions);

let minFuel = 100000000000000000;
for(let i = min; i <= max; i++){
    let fuel = 0;
    for(let x in positions) {
        let pos = positions[x];
        fuel += Math.abs(pos - i);
    }
    if(minFuel > fuel) minFuel = fuel;
}

console.log(minFuel);
