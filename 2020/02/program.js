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

    while(idx < str.length) {
        password += str[idx];
        idx++;
    }
    password.trim();

   ret = {  "lower": lower,
            "upper" : upper,
            "letter": letter,
            "password":password };
   return ret;
}

function validpass(lower, upper, letter, password) {
    let res = 0;
    let ret = false;
    for(let i = 0; i < password.length; i++) {
        if (password[i] === letter) {
            res += 1;
        }
    }

    if (res === 0) return false;
    if (res > upper) return false;
    if (res < lower) return false;
    return true;
}

let sum = 0;
for (let i in arr) {
   let line = arr[i];
   let obj = parse(line);
   if (validpass(obj.lower, obj.upper, obj.letter, obj.password))
    sum += 1
}

console.log(sum);
