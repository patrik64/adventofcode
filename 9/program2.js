var fs = require('fs');
 
var input = fs.readFileSync('Day9.in', 'utf8');
var arr = input.split('\n');

function getXY(str, idx)
{
     //idx is '('
    if(str[idx] != '(')
        console.log("ERROR!");

    idx++; //'('

    var x = '';
    while(str[idx] != 'x')
    {
        x += str[idx];
        idx++;
    }

    idx++;//'x'

    var y = '';
    while(str[idx] != ')')
    {
        y+= str[idx];
        idx++;
    }

    if(str[idx] != ')')
        console.log("ERROR!");
    idx++;//)
    
    var x = Number(x);
    var y = Number(y);
    var ret = { "X": x, "Y": y, "idx": idx};
    return ret;
}

function decompress(str, a, b)
{
    var ret = 0;
    
    var i = 0;
    var bstr = str.substring(0, a);

    for(var j = 0; j < b; j++)
    {
        var ll = bstr.length;
        if(bstr[0] == '(')
           ll = process(bstr);
        ret += ll;
    }
    var estr = str.substring(a);
    ret += estr.length;

    return ret;
}

function process(str)
{
    var ret = 0;

    for(var i = 0; i < str.length; i++)
    {
        var ch = str[i];
        if(ch == '(')
        {
            var obj = getXY(str, i);
            var x = Number(obj["X"]);
            var y = Number(obj["Y"]);
            var idx = obj["idx"];
            
            i = idx-1;
            var sstr = str.substring(i+1, i+x+1);
            i = i + x;
            ret += decompress(sstr, x, y);
        }
        else if(ch != '/n' && ch != ' ')
        {
            ret++;
        }
    }
    return ret;
}

var len = 0;
for (var i in arr)
{
    var line = arr[i];
    len += process(line);
}
console.log(len);