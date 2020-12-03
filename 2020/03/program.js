let fs = require('fs');

let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

function parse(str)
{
    var idx = 0;
   
    var ret = []
    while(idx < str.length)
    {
        if(str[idx] === '.')
            ret.push(0)
        else 
            ret.push(1)
        idx++;
    }
   
    return ret;
}

function printMatrix(m) {
    for(let i = 0; i < m.length; i++)
        console.log(m[i]);
}

let currPosX = 0;
let trees = 0;

function walk3right(m, row) {
    currPosX += 3;
}

function walk1down(m, row) {
    if(m[row][currPosX] === 1) {
        trees += 1;
    }
}

let matrix = [];
for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   let cp = []
   for(let i = 0; i < 200; i++)
    cp = [...cp, ...obj]
   matrix.push(cp);
        
}


for (let i = 0; i < matrix.length-1; i++) {
    currPosX += 3;
    if(matrix[i+1][currPosX] === 1) {
        trees += 1;
    }
}

console.log(trees);
