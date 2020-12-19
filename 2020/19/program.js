let fs = require('fs');
let input = fs.readFileSync('Day19.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;
    let type = '';
    let rulenr = '';
    let rule1 = '';
    let rule2 = '';
    let rule3 = '';
    let rule4 = '';

    let message = [];
    if(str[0] === 'a' || str[0] === 'b')
        type = 'message';
    else
        type = 'rule';

    console.log(type)

    if(type === 'message') {
        while(idx < str.length) {
            let ch = str[idx];
            message.push(ch);
            idx++;
        }
    } else {
        while(str[idx] !== ':') {
            rulenr += str[idx];
            idx++;
        }
        rulenr = rulenr.trim();

        idx++;
        idx++;

        while(str[idx] !== ' ' && idx < str.length) {
            rule1 += str[idx];
            idx++;
        }

        rule1 = rule1.trim();

        console.log(rule1)

        if(rule1[0] === '"') {
            rule1 = rule1.substring(1);
            rule1 = rule1.slice(0, -1);;
            let ret = { 'type' : type, 
                        'message' : message, 
                        'rulenr' : rulenr,
                        'letter' : rule1
                    }
                    return ret;
        }

        idx++;

        while(str[idx] !== ' ' && idx < str.length) {
            rule2 += str[idx];
            idx++;
        }

        idx++;
        if(idx < str.length && str[idx] === '|') {
            idx++;
            idx++;

            while(str[idx] !== ' ' && idx < str.length) {
                rule3 += str[idx];
                idx++;
            }

            idx++;

            while(str[idx] !== ' ' && idx < str.length) {
                rule4 += str[idx];
                idx++;
            }
        }

        rule2 = rule2.trim();
    }

    let ret = { 'type' : type, 
                'message' : message, 
                'rulenr' : rulenr,
                'rule1' : rule1,
                'rule2' : rule2,
                'rule3' : rule3,
                'rule4' : rule4 }
    return ret;
}

let mess = [];

for (let i in arr) {
    let line = arr[i];
    if(line.length) {
        let obj = parse(line);
        console.log(obj);
        mess.push(obj);
    }
}