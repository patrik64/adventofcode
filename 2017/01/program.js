var fs = require('fs');

var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split('\n');

var line = arr[0];
var sum = 0;
for(var i = 0; i < line.length; i++)
{
    var n0 = Number(line[i]);
    var n1 = 0;
    if(i+1 < line.length)
        n1 = Number(line[i+1]);
    else
        n1 = Number(line[0]);

    if(n0 == n1)
        sum += n0;
}

console.log(sum);