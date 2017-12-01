var fs = require('fs');

var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split('\n');

var line = arr[0];
var sum = 0;
for(var i = 0; i < line.length; i++)
{
    var half = (line.length / 2) + i;
    if(half > line.length -1)
        half = half - line.length;

    var n0 = Number(line[i]);
    var n1 = line[half];

    if(n0 == n1)
        sum += n0;
}

console.log(sum);