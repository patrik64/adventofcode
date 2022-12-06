let fs = require('fs');
let input = fs.readFileSync('Day4.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let ret = {
        'x1': 0,
        'x2': 0,
        'y1': 0,
        'y2': 0
    };

    let arrx1y2 = str.split('-');
    let arrx2y1 = arrx1y2[1].split(',');

    ret['x1'] = parseInt(arrx1y2[0],10);
    ret['x2'] = parseInt(arrx2y1[0],10);
    ret['y1'] = parseInt(arrx2y1[1],10);
    ret['y2'] = parseInt(arrx1y2[2],10);

    return ret;
}

function exchange(pair) {
    let temp = pair.x2;
    pair.x2 = pair.y2;
    pair.y2 = temp;
    
    temp = pair.y1;
    pair.y1 = pair.x1;
    pair.x1 = temp;
    return pair;
}


let sum = 0;
for(let i = 0; i < arr.length; i++) {
    let pair = parse(arr[i]);

    if((pair.x1 <= pair.y1) && (pair.x2 >= pair.y2)) {
        sum += 1;
    } else if((pair.y1 <= pair.x1) && (pair.y2 >= pair.x2)) {
        sum += 1;
    }
}

console.log(sum);