let fs = require('fs');
let input = fs.readFileSync('Day6.in', 'utf8');
let arr = input.split('\n');

function findFour(str) {
    for(let i = 0; i < str.length-3; i++) {
        let ch1 = str[i];
        let ch2 = str[i+1];
        let ch3 = str[i+2];
        let ch4 = str[i+3];

        if( ch1 !== ch2 && ch1 !== ch3 && ch1 !== ch4 &&
            ch2 !== ch3 && ch2 !== ch4 && 
            ch3 !== ch4) {
                return i+4;
            }
    }
}


let str = arr[0];
let res = findFour(str);
console.log(res);

