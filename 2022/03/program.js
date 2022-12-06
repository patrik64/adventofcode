let fs = require('fs');
let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function findItem(str) {
    let len = str.length / 2;

    let part1 = str.substring(0, len);
    let part2 = str.substring(len);
    
    if(part1.length != part2.length) {
        console.log('error - parts are not equal length!');
        process.exit(-1);
    }

    
    for(let x in part1) {
        let ch = part1[x];
        if(part2.indexOf(ch) > -1) {
            return ch;
        }
    }

    return 'xxx';
}

function getPriority(ch) {
    let test = ch.charCodeAt(0);
    if(test >= 97) {
        return test - 96;
    }
    return test - 38
    
}


let sum = 0;
for(let i = 0; i < arr.length; i++) {
    let ch = findItem(arr[i]);

    if(ch === 'xxx') {
        console.log('error - letter not found!');
        process.exit(-1);
    }
    sum += getPriority(ch);
}

console.log(sum);
