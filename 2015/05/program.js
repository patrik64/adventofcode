let fs = require('fs');
let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

function req1(str) {
    let vow = [];
    let cV = 0;
    for(var i = 0; i < str.length; i++) {
        let ch = str[i];
        if(ch == 'a') {
            if(!(ch in vow)) {
                vow.push(ch);
                cV++;
            }
        }
        else if(ch == 'e') {
            if(!(ch in vow)) {
                vow.push(ch);
                cV++;
            }
        }
        else if(ch == 'i') {
            if(!(ch in vow)) {
                vow.push(ch);
                cV++;
            }
        }
        else if(ch == 'o') {
            if(!(ch in vow))
            {
                vow.push(ch);
                cV++;
            }
        }
        else if(ch == 'u') {
            if(!(ch in vow)) {
                vow.push(ch);
                cV++;
            }
        }

        if(cV >= 3)
            return true;
    }
    return false;
}

function req2(str) {
    for(let i = 0; i < str.length; i++) {
        if((i+1) < str.length) {
            if(str[i] == str[i+1]) {
                return true;
            }
        }
    }
    return false;
}

function req3(str) {
    for(let i = 0; i < str.length; i++) {
        if((i+1) < str.length) {
            let ch1 = str[i];
            let ch2 = str[i+1];
            if(ch1 == 'a' && ch2 == 'b')
                return false;
            else if(ch1 == 'c' && ch2 == 'd')
                return false;
            else if(ch1 == 'p' && ch2 == 'q')
                return false;
            else if(ch1 == 'x' && ch2 == 'y')
                return false;
        }
    }
    return true;
}

function isNiceString(str) {
    if(!req1(str))
        return false;
    if(!req2(str))
        return false;
    if(!req3(str))
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
