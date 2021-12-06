let fs = require('fs');
let input = fs.readFileSync('Day6.in', 'utf8');
let arr = input.split('\n');

function step(table) {
    let zeros = table['0'];
    let ones = table['1'];
    let twos = table['2'];
    let threes = table['3'];
    let fours = table['4'];
    let fives = table['5'];
    let sixes = table['6'];
    let sevens = table['7'];
    let eights = table['8'];

    table['8'] = zeros;
    table['7'] = eights;
    table['6'] = sevens + zeros;
    table['5'] = sixes;
    table['4'] = fives;
    table['3'] = fours;
    table['2'] = threes;
    table['1'] = twos;
    table['0'] = ones;

    return table;
}

function calc(table) {
    return table['8'] + table['7'] + table['6'] + table['5'] + table['4'] + table['3'] + table['2'] + table['1'] + table['0'];
}

let dist = arr[0].split(',');

let fish = {
    '0' : 0,
    '1' : 0,
    '2' : 0,
    '3' : 0,
    '4' : 0,
    '5' : 0,
    '6' : 0,
    '7' : 0,
    '8' : 0,
}

for(let x in dist) {
    let ch = dist[x];
    fish[ch] = fish[ch] + 1; 
}

for(let i = 0; i < 256; i++){
    fish = step(fish);
}

let sum = calc(fish);
console.log(sum);

