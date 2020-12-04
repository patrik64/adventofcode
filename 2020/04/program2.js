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

    if (("byr" in p)) {
        if(!isByrValid(p["byr"])) return false;
    }

    if (("iyr" in p)) {
        if(!isIyrValid(p["iyr"])) return false;
    }
    if (("eyr" in p)) {
        if(!isEyrValid(p["eyr"])) return false;
    }

    if (("hgt" in p)) {
        if(!isHgtValid(p["hgt"])) return false;
    }

    if (("hcl" in p)) {
        if(!isHclValid(p["hcl"])) return false;
    }

    if (("ecl" in p)) {
        if(!isEclValid(p["ecl"])) return false;
    }

    if (("pid" in p)) {
        if(!isPidValid(p["pid"])) return false;
    }

    return true;
}

function isPidValid(prop) {
    if(prop.length !== 9) return false;
    if (Number.isInteger(Number(prop))) {
        return true;
    }
    return false;
}

function isByrValid(prop) {
    if (Number.isInteger(Number(prop)) && (Number(prop) >= 1920) && (Number(prop) <= 2002)) {
        return true;
    }
    return false;
}

function isIyrValid(prop) {
    if (Number.isInteger(Number(prop)) && (Number(prop) >= 2010) && (Number(prop) <= 2020)) {
        return true;
    }
    return false;
}

function isEyrValid(prop) {
    if (Number.isInteger(Number(prop)) && (Number(prop) >= 2020) && (Number(prop) <= 2030)) {
        return true;
    }
    return false;
}

function isHex(ch) {
    if (ch === 'a') return true;
    if (ch === 'b') return true;
    if (ch === 'c') return true;
    if (ch === 'd') return true;
    if (ch === 'e') return true;
    if (ch === 'f') return true;
    let n = Number(ch);
    if(Number.isInteger(n)) return true;
    return false;
}

function isHclValid(prop) {
    if(prop.length !== 7) return false;
    if(prop[0] !== '#') return false;
    if(!isHex(prop[1])) return false;
    if(!isHex(prop[2])) return false;
    if(!isHex(prop[3])) return false;
    if(!isHex(prop[4])) return false;
    if(!isHex(prop[5])) return false;
    if(!isHex(prop[6])) return false;
    return true;
}

function isHgtValid(prop) {
    var idx = 0;
    var num = '';
    var unit = '';

    while(idx < prop.length) {
        while(prop[idx] != 'c' && prop[idx] != 'i') {
            num += prop[idx];
            idx++;
            if(idx >= prop.length) break;
        }
        num.trim();

        while(idx < prop.length) {
            unit += prop[idx];
            idx++;
        }
        unit.trim();
    }

    num = Number(num);
    if(unit === 'cm') {
        if(Number.isInteger(num) && num >= 150 && num <= 193)
            return true;
    } else if(unit === 'in') {
        if(Number.isInteger(num) && num >= 59 && num <= 76)
            return true;
    }
    return false;
}

function isEclValid(prop) {
    if(prop.length !== 3) return false;
    if(prop === 'amb') return true;
    if(prop === 'blu') return true;
    if(prop === 'brn') return true;
    if(prop === 'gry') return true;
    if(prop === 'grn') return true;
    if(prop === 'hzl') return true;
    if(prop === 'oth') return true;
    return false;
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