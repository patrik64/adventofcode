var fs = require('fs');
 
var input = fs.readFileSync('Day9.in', 'utf8');
var arr = input.split('\n');

function decompress(str)
{
    var ret = '';

    for(var i = 0; i < str.length; i++)
    {
        var ch = str[i];
        if(ch == '(')
        {
            i++;
            var x = '';
            while(str[i] != 'x')
            {
                x+= str[i];
                i++;
            }
            i++;//x
            var y = '';
            while(str[i] != ')')
            {
                y+= str[i];
                i++;
            }

            i++;//)
            var substr = '';
            x = Number(x);
            y = Number(y);

            for(var j = i; j < i+x; j++)
            {
                substr+= str[j];
            }
            for(var k = 0; k < y; k++)
                ret += substr;
            
            i = i+x-1;
        }
        else if(ch != ' ')
        {
            ret += ch;
        }
        else if(ch != '\n')
        {
            ret += ch;
        }
    }
    return ret;
}

var len = 0;
for (var i in arr)
{
    var line = arr[i];
    len += decompress(line).length;
}
console.log(len);