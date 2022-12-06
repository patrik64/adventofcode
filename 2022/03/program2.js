let fs = require('fs');
let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function findItem(str1, str2, str3) {
        
    for(let x in str1) {
        let ch = str1[x];
        if(str2.indexOf(ch) > -1 && str3.indexOf(ch) > -1)  {
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
for(let i = 0; i < arr.length; i +=3 ) {
    let ch = findItem(arr[i], arr[i+1], arr[i+2]);

    if(ch === 'xxx') {
        console.log('error - letter not found!');
        process.exit(-1);
    }
    sum += getPriority(ch);
}

console.log(sum);
