var fs = require('fs');

var input = fs.readFileSync('Day8.in', 'utf8');
var arr = input.split('\n');

function calc(str)
{
    var len = str.length;
    var chars = 0;
    if(len > 2)
    {
        for(var i = 1; i < str.length-1; i++)
        {
            var ch = str[i];
            if(ch == '\\')
            {
                if(str[i+1] == 'x')
                    i += 3;
                else if(str[i+1] == '"')
                    i++;
                else if(str[i+1] == '\\')
                    i++;
            }
            chars++;
        }
    }
    return len - chars;
}

var sum = 0;
for (var i in arr)
{
   var line = arr[i];
   line = line.trim();
   sum += calc(line);
}

console.log(sum);

