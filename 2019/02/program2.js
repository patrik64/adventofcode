const { RSA_PKCS1_OAEP_PADDING } = require('constants');
let fs = require('fs');

let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let line = arr[0];

function parse(str)
{
    var idx = 0;
    var num = '';
    var ret = [];

    while(idx < str.length)
    {
        var ch = str[idx];
        if( ch == ',')
        {
            num = Number(num.trim());
            ret.push(num);
            num = '';
        }
        else
        {
            num += ch;
        }
        idx++;
    }
    ret.push(Number(num.trim()));
    return ret;
}

function opAdd(ops, idx) {
    let a = ops[idx+1];
    let b = ops[idx+2];
    let res = ops[idx+3];
    let x = ops[a];
    let y = ops[b];
    ops[res] = x + y;
}

function opMult(ops, idx) {
    let a = ops[idx+1];
    let b = ops[idx+2];
    let res = ops[idx+3];
    let x = ops[a];
    let y = ops[b];
    ops[res] = x * y;
}

let clean = parse(line);

let op1 = 0;
let op2 = 0;

for(let op1 = 0; op1 < 100; op1++){
    for (let op2 = 0; op2 < 100; op2++) {
        let ops = [...clean];
        ops[1] = op1;
        ops[2] = op2;

        for(let i = 0; i < ops.length; i++) {
            if (ops[i] == 1) {
                opAdd(ops, i)
                i += 3
            }
            else if(ops[i] == 2) {
                opMult(ops, i)
                i += 3
            }
            else if(ops[i] == 99)
                break;
            else {
                console.log('error op code!!!');
            }
        }

        if (ops[0] === 19690720) {
            console.log('YAY!!!')
            console.log('op1 -->', op1);
            console.log('op2 -->', op2);
            console.log('answer -->', 100*op1+op2);
            process.exit(0);
        }
    }
}



console.log(ops[0]);