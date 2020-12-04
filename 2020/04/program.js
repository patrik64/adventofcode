let fs = require('fs');

let input = fs.readFileSync('Day4.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    var idx = 0;
    var key = '';
    var prop = '';
    var ret = {};

    while(idx < str.length) {

        while(str[idx] != ':') {
            key += str[idx];
            idx++;
        }
        key.trim();

        idx++;

        while(str[idx] != ' ') {
            prop += str[idx];
            idx++;
            if(str[idx] === '\r') break;
        }
        prop.trim();
        ret[key] = prop;
        key = '';
        prop = '';
        idx++;
    }
    return ret;
 }
function isValidPassport(p) {
    if (!("byr" in p)) return false;
    if (!("iyr" in p)) return false;
    if (!("eyr" in p)) return false;
    if (!("hgt" in p)) return false;
    if (!("hcl" in p)) return false;
    if (!("ecl" in p)) return false;
    if (!("pid" in p)) return false;
    return true;
}

let sum = 0;
let passport = {}
for (let i in arr) {
    let line = arr[i];
    if(line.length > 2) {
        let obj = parse(line);
        passport = {...passport, ...obj};
    } else {
        if (isValidPassport(passport)) {
            sum += 1;
        }
        passport = {}
    }
}

console.log(sum);