var fs = require('fs');

var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split('\n');

var line = arr[0];

var floor = 0;
for (var x = 0; x < line.length; x++)
{
    var ch = line[x];
    if(ch == ')')
        floor--;
    else
        floor++;
    if(floor == -1)
    {
        console.log(x+1);
        process.exit(0);
    }
}

console.log(floor);