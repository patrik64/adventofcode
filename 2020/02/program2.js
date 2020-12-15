let fs = require('fs');
let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
   let idx = 0;
   let lower = '';
   let upper = '';
   let letter = '';
   let password = '';
   let ret = {};

   while(str[idx] != '-') {
        lower += str[idx];
        idx++;
   }
   lower = lower.trim();
   lower = parseInt(lower, 10);

   idx++;

   while(str[idx] != ' ') {
        upper += str[idx];
        idx++;
   }
   upper = upper.trim();
   upper = parseInt(upper, 10);
   idx++;
   letter = str[idx];
   idx++;
   idx++;

    while(idx < str.length)
    {
        password += str[idx];
        idx++;
    }
    password = password.trim();
   
   ret = { "lower": lower, "upper" : upper, "letter": letter, "password":password };
   return ret;
}


function validpass(lower, upper, letter, password) {
    let res = 0;
    let ret = false;
    if (lower > 0 && lower <= password.length) {
        if(password[lower-1] === letter) {
            ret = true;
        }
    }

    if (upper > 0 && upper <= password.length) {
        if(password[upper-1] === letter) {
            if (ret === true ) return false;
            ret = true;
        }
    }
    return ret;
}

let sum = 0;
for (let i in arr) {
   let line = arr[i];
   let obj = parse(line);
   if (validpass(obj.lower, obj.upper, obj.letter, obj.password))
    sum += 1
}

console.log(sum);
