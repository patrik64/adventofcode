var fs = require('fs');

var input = fs.readFileSync('Day8.in', 'utf8');
var arr = input.split('\n');

function encode(str)
{
    var ret = '"';
    for(var i = 0; i < str.length; i++)
    {
        if(str[i] == '\\' || str[i] == '"')
            ret += "|";
        ret += str[i];
    }
    ret += '"';
    return ret;
}

var sum = 0;
for (var i in arr)
{
   var line = arr[i];
   line = line.trim();
   var l1 = line.length;
   line = encode(line);
   var l2 = line.length;
   sum += (l2 - l1);
}

console.log(sum);