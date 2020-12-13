let fs = require('fs');

let input = fs.readFileSync('Day13.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let ret = [];
    let idx = 0;

    str = str.trim();

    let n = '';
    let offset = 0;

    while(idx < str.length) {
        let ch = str[idx];
        if(ch === ',') {
            if(n !== 'x')
                ret.push( { 'n' : Number(n), 'offset' : offset });
            n = '';
            offset++;
        } else
            n += ch;
        idx++;
    }
    if(n !== 'x')
        ret.push( { 'n' : Number(n), 'offset' : offset });
    return ret;
}

let ids = parse(arr[1]);

function inverseMod(N, mod) {
    let x = 1;
    while(true) {
        if(((N*x) % mod) === 1) {
            return x;
        }
        x++;
    }
}

//set first offset to the same value as n
let first = ids[0];
first.offset = ids[0].n;

//fix offsets for the rest to be positive values
for(let i = 1; i < ids.length; i++) {
    ids[i].offset = -1 * ids[i].offset;
    if(ids[i].n > Math.abs(ids[i].offset)) {
        ids[i].offset = ids[i].n - Math.abs(ids[i].offset);
    }
    else {
        let temp = Math.abs(ids[i].offset) % ids[i].n;
        temp = ids[i].n - temp;
        ids[i].offset = temp;
    }
}

//use chinese remainder theorem

let N = 1;
for(let i = 0; i < ids.length; i++) {
    N = N * ids[i].n;
}

let b = [];
for(let i = 0; i < ids.length; i++) {
    let bi = 0;
    bi = ids[i].offset;
    b.push(bi);
}

let Ni = [];
for(let i = 0; i < ids.length; i++) {
    let n = N / ids[i].n;
    Ni.push(n);
}

let Xi = [];
for(let i = 0; i < ids.length; i++) {
    let n = Ni[i];
    let mod = ids[i].n;
    let x = inverseMod(n, mod);
    Xi.push(x);
}

let res = 0;
for(let i = 0; i < ids.length; i++) {
    let xi = Xi[i];
    let bi = b[i];
    let ni = Ni[i];
    res += xi*bi*ni;
}

res = res % N;

console.log(res);