var fs = require('fs');

var input = fs.readFileSync('Day9.in', 'utf8');
var arr = input.split('\n');

function match(arr, n, pos) {
    for(let i = pos-25; i < pos-1; i++) {
        let x = arr[i];
        for(let j = i; j < pos; j++) {
            let y = arr[j];
            // console.log('x --> ', x, 'y--> ', y, 'n --> ', n);
            if((x + y) === n)
                return true;
        }
    }
    return false;
}
var inst = []

for (let i in arr) {
    let line = arr[i];
    line.trim();
    let val = Number(line);
    inst.push(val);
}

let pos = 25;

for(let i = 25; i < inst.length; i++ ) {
    if(!match(inst, inst[i], i)) {
        console.log(inst[i]);
        process.exit();
    }
}

