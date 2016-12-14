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
    var ret = '';
    
    var i = 0;
    var bstr = str.substring(0, a);
    //console.log("bstr :" + bstr);

    for(var j = 0; j < b; j++)
    {
        if(bstr[0] == '(')
            bstr = process(bstr);
        ret += bstr;
    }
    var estr = str.substring(a);
    //console.log("estr : " + estr);
    ret += estr;

    //console.log("decompress : " + ret);
    return ret;
}

function process(str)
{
    var ret = '';

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
            //console.log("X :" + x);
            //console.log("Y :" + y);
            var sstr = str.substring(i+1, i+x+1);
            //console.log(sstr);
            i = i + x;
            var dstr = decompress(sstr, x, y);
            ret += dstr;
        }
        else if(ch != '/n' && ch != ' ')
        {
            ret += ch;
        }
    }
    return ret;
}

var len = 0;
//var all = '';
for (var i in arr)
{
    var line = arr[i];
    var dline = process(line);
    //all += dline;
    len += dline.length;

}
//console.log(all);
//console.log(all.length);
console.log(len);