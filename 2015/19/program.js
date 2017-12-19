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

var replacements = [];

for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    replacements.push(obj);
}

function isInArray(value, array) 
{
    return array.indexOf(value) > -1;
}

var inputStr = "CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr";

var combi = [];

for(var i = 0; i < replacements.length; i++)
{
    var r = replacements[i];
    var k = r["x"];
    for(var s = 0; s < inputStr.length; s++)
    {
        var klen = k.length;
        var ss = inputStr.substring(s, s+klen);
        if(k == ss)
        {
            var newStr = inputStr.substring(0, s);
            newStr += r["y"];
            newStr += inputStr.substring(s+klen, inputStr.length);
            if(!isInArray(newStr, combi))
                combi.push(newStr);
        }
    }
}

console.log(combi.length);