let fs = require('fs');
let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
let results = [];
for(let i = 0; i < arr.length-2; i++){
    for(let j = i+1; j < arr.length-1; j++) {
        for(let k = j+1; k < arr.length; k++) {
            let a = Number(arr[i]);
            let b = Number(arr[j]);
            let c = Number(arr[k]);
            if(a+b+c === 2020) {
                console.log(a*b*c);
                process.exit();
            }
        }
    }
}
