let fs = require('fs');
let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

function req1(str) {
    for(let i = 0; i < str.length-2; i++) {
        let pair1 = str[i] + str[i+1];

        for(let j = i+2; j < str.length; j++) {
            let pair2 = str[j] + str[j+1];
            if(pair1 == pair2) {
                return true;
            }
        }
    }
    return false;
}

function req2(str) {
    for(let i = 0; i < str.length-2; i++)
    {
        let ch1 = str[i];
        let ch3 = str[i+2];
        if(ch1 == ch3)
            return true;
    }
    return false;
}

function isNiceString(str) {
    if(!req1(str))
        return false;
    if(!req2(str))
        return false;
    return true;
}

let sum = 0;

for (let i in arr) {
    let line = arr[i];
    if(isNiceString(line))
        sum++;
}
console.log(sum);
