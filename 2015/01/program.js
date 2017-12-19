var fs = require('fs');

var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split('\n');

var line = arr[0];

var floor = 0;
for (var x in line)
{
    var ch = line[x];
    if(ch == ')')
        floor--;
    else
        floor++;
}

console.log(floor);