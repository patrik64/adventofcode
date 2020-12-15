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

let x1 = 0;
let y1 = 0;

let x2 = 0;
let y2 = 0;
dict = {};

let key = createKey(x1,y1);

dict[key] = 1;

for(let i = 0; i < mvs.length; i++) {
    let m = mvs[i];
    if( m == 'v')
        y1--;
    else if( m == '^')
        y1++;
    else if( m == '>')
        x1--;
    else if( m == '<')
        x1++;
    else 
        console.log("error!!");
    
    let key1 = createKey(x1,y1);
        
    if(key1 in dict)
        dict[key1]++;
    else
        dict[key1] = 1;

    i++;
    if(i < mvs.length) {
        m = mvs[i];
        if( m == 'v')
            y2--;
        else if( m == '^')
            y2++;
        else if( m == '>')
            x2--;
        else if( m == '<')
            x2++;
        else 
            console.log("error!!");

        let key2 = createKey(x2,y2);

        if(key2 in dict)
            dict[key2]++;
        else
            dict[key2] = 1;
    }
}

console.log(Object.keys(dict).length);
