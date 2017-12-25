var fs = require('fs');

var input = fs.readFileSync('Day16.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    str += ',';

    var idx = 4;
    var x = '';
    var ar = [];

    while(str[idx] != ':')
    {
        x += str[idx];
        idx++;
    }
    x = x.trim();
    idx++;

    for(var i = 0; i < 3; i++)
    {
        var y = '';
        var val = '';

        while(str[idx] != ':')
        {
            y += str[idx];
            idx++;
        }
        y = y.trim();
        idx++;
        while(str[idx] != ',')
        {
            val += str[idx];
            idx++;
        }
        idx++;
        val = val.trim();
        val = parseInt(val, 10);
        var o = {};
        o[y] = val;
        ar.push(o);
    }
    
    
    var ret = { 
                "x" : x, 
                "props" : ar,
                "grade" : 0
            };
    return ret;
}

var sues = [];

for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    sues.push(obj);
}

var dict = {};

dict["children"] = 3;
dict["cats"] = 7;
dict["samoyeds"] = 2;
dict["pomeranians"] = 3;
dict["akitas"] =  0;
dict["vizslas"] = 0;
dict["goldfish"] = 5;
dict["trees"] = 3;
dict["cars"] = 2;
dict["perfumes"] = 1;

for(var i = 0; i < sues.length; i++)
{
    var grade = 0;
    var sue = sues[i];
    var props = sue["props"];
    for(var p in props)
    {
        var pp = props[p];
        var k = Object.keys(pp)[0];
        if(k == 'cats' || k == 'trees')
        {
            if(props[p][k] > dict[k])
                grade++;
        }
        else if(k == 'pomeranians' || k == 'goldfish')
        {
            if(props[p][k] < dict[k])
                grade++;
        }
        else
        {
            if(props[p][k] == dict[k])
                grade++;
        }
        
    }
    sue["grade"] = grade;
    if(grade == 3)
        console.log(sue.x);
}
