let fs = require('fs');

let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
for(let i = 0; i < arr.length; i++)
{
    for(let j = i+1; j < arr.length; j++) {
        let a = Number(arr[i]);
        let b = Number(arr[j]);
        if(a+b === 2020) {
            console.log(a*b);
            process.exit();
        }
    }

}
