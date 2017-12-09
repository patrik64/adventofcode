var fs = require('fs');

var input = fs.readFileSync('Day9.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var currentLevel = 0;
    var inGroup = false;
    var inGarbage = false;
    var sum = 0;
    var gchs = 0;

    while(idx < str.length)
    {
        var ch = str[idx];
        if( ch == '!')
            idx++;
        else if( ch == '>')
            inGarbage = false;
        else if( ch == '}' && !inGarbage)
        {
            sum = sum + currentLevel;
            currentLevel--;
        }
        else if( ch == '<' && !inGarbage)
        {
            inGarbage = true;
        }
        else if( ch == '{' && !inGarbage)
        {
            currentLevel++;
        }
        else if( inGarbage )
        {
            gchs++;
        }

        idx++;
    }
    return gchs;
}

for (var i in arr)
{
   var line = arr[i];
   var gchs = parse(line);
   console.log(gchs);
}
