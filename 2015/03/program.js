let fs = require('fs');
let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');
let mvs = arr[0];

function createKey(x, y) {
    let ret = '';
    if(x < 0)
        ret += 'm' + (Math.abs(x)).toString();
    else
        ret += 'p' + (Math.abs(x)).toString();

    ret += 'x';

    if(y < 0)
        ret += 'm' + (Math.abs(y)).toString();
    else
        ret += 'p' + (Math.abs(y)).toString();

    return ret;
}

let x = 0;
let y = 0;
dict = {};
let key = createKey(x, y);
dict[key] = 1;

for(let i = 0; i < mvs.length; i++) {
    let m = mvs[i];
    if( m == 'v')
        y--;
    else if( m == '^')
        y++;
    else if( m == '>')
        x--;
    else if( m == '<')
        x++;
    else 
        console.log("error!!");

    key = createKey(x, y);

    if(key in dict)
        dict[key]++;
    else
        dict[key] = 1;
}

console.log(Object.keys(dict).length);
