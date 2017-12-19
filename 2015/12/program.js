var fs = require('fs');

var input = fs.readFileSync('Day12.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var ret = 0;
    var idx = 0;
    var x = '';

    while(idx < str.length)
    {
        var ch = str[idx];
        if(ch == '-')
        {
            idx++;
            ch += str[idx];
        }
        while(!isNaN(parseInt(ch, 10)))
        {
            x += ch;
            idx++;
            ch = str[idx];
        }
        if(x.length > 0)
        {
            ret += parseInt(x, 10);
            x = '';
        }
        idx++;
    }
    
    return ret;
}

function processDict(dict)
{
    var ret = 0;
    //for(var x in dict)
    //{
    //    if(dict[x] == "red")
    //        return 0;
    //}

    for(var x in dict)
    {
        var o = dict[x];
        if(Array.isArray(o))
            ret += processArray(o);
        else if(typeof o === "object")
            ret += processDict(o);
        else
            if(Number.isInteger(o))
                ret += o;
    }
    return ret;
}

function processArray(ar)
{
    var ret = 0;
    for(var i = 0; i < ar.length; i++)
    {
        var o = ar[i];
        if(Array.isArray(o))
            ret += processArray(o);
        else if(typeof o === "object")
            ret += processDict(o);
        else
            if(Number.isInteger(o))
                ret += o;
    }
    return ret;
}

var str = arr[0];
var obj = JSON.parse(str);

var sum = 0;
if(Array.isArray(obj))
    sum += processArray(obj);
else if(typeof obj === "object")
    sum += processDict(obj);


console.log(sum);