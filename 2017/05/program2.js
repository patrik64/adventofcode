var fs = require('fs');

var input = fs.readFileSync('Day5.in', 'utf8');
var arr = input.split('\n');

var pos = 0;
var lastPos = arr.length-1;
var steps = 0;
while(pos <= lastPos)
{
    var offset = Number(arr[pos]);
    arr[pos] = Number(arr[pos]) + 1;
    if(offset > 2)
        arr[pos] = Number(arr[pos]) - 2;
    pos += offset;
    steps++;
}
console.log(steps);

