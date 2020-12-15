let mtx = [];

let dim = 5975;

for(let i = 0; i < dim; i++ ) {
    let row = [];
    for(let j = 0; j < dim; j++) {
        row.push(0);
    }
    mtx.push(row);
}

let x = 20151125;
let mult = 252533;
let modd = 33554393;

let i = 0;
let j = 0;
for(let k = 0; k < dim; k++) {
    j = k;
    i = 0;
    for(let l = 0; l <= k; l++) {
        mtx[j][i] = x;
        x = x*mult;
        x = x % modd;
        j--;
        i++;
    }
}

let xx = 3029;
let yy = 2947;
xx--;
yy--;

console.log(mtx[yy][xx]);
