var fs = require('fs');

var input = fs.readFileSync('Day19.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var x = '';
    var y = '';

    while(str[idx] != '=')
    {
        x += str[idx];
        idx++;
    }
    x = x.trim();

    idx += 2;

    while(idx < str.length)
    {
        y += str[idx];
        idx++;
    }
    y = y.trim();
    
    var ret = { "x" : x, "y" : y};
    return ret;
}

var replacements = {};

for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    replacements[obj.y] = obj.x;
}

function isInArray(value, array) 
{
    return array.indexOf(value) > -1;
}

var inputStr = "CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr";
var Ys = Object.keys(replacements);


Ys.sort((a,b) => (a.length - b.length));

var steps = 0;
function reduceStr(y, str)
{
    for(var s = 0; s < str.length; s++)
    {
        var ylen = y.length;
        var ss = str.substring(s, s+ylen);
        if(y == ss)
        {
            steps++;
            var newStr = str.substring(0, s);
            newStr += replacements[y];
            newStr += str.substring(s+ylen, str.length);
            return reduceStr(y, newStr);
        }
    }
    return str;
}

var minSteps = 1000;

for(;;)
{
    str = inputStr;
    Ys.sort(function() {return 0.5 - Math.random()});
    
    for(var i = 0; i < Ys.length; i++)
    {
        var y = Ys[i];
        if(replacements[y] != 'e')
        {
            var test = reduceStr(y, str);
            if(test != str)
            {
                str = test;
                test = reduceStr(y, str);
                i = 0;
            }
        }
    }

    if(str == 'NAl' || str == 'OMg' || str == 'HF')
    {
        steps++;
        if(minSteps > steps)
        {
            minSteps = steps;
            console.log(minSteps);
            process.exit();
        }
    }
    steps = 0;
}

