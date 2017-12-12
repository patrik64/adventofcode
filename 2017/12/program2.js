var fs = require('fs');

var input = fs.readFileSync('Day12.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var num = '';
    var lst = [];
    while(str[idx] != '<')
    {
        num += str[idx];
        idx++;
    }
    num = num.trim();
    num = parseInt(num, 10);
    
    idx+= 3;
    var n = '';
    while(idx < str.length)
    {
        if(str[idx] != ',')
        {
            n += str[idx];
        }
        else
        {
            n = n.trim();
            n = parseInt(n, 10);
            lst.push(n);
            n = '';
        }
        idx++;
    }

    n = n.trim();
    n = parseInt(n, 10);
    lst.push(n);
    
    var ret = { "num": num, "lst":lst};
    //console.log(ret);
    return ret;
}

function trace(x, dict, resdict)
{
    var lst = dict[x];
    for(var i in lst)
    {
        var n = lst[i];
        resdict[n] = n;
    }
}

function createGroup(x, dict, gd)
{
    var temp = {};
    temp[x] = x;
    for(;;)
    {
        var sz1 = Object.keys(temp).length;
        for (var key in temp)
            trace(temp[key], dict, temp);
        var sz2 = Object.keys(temp).length;
        if(sz1 == sz2)
            break;    
    }
    Object.assign(gd, temp);
}

function getNextIdx(gd, len)
{
    var ret = 0;
    for(var i = 0; i < len; i++)
    {
        if(!(i in gd))
            return i;
    }
    return i;
}

var nums = {};
for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   nums[obj.num] = obj.lst;
}

var len = Object.keys(nums).length;
var groups = 0;
var gd = {};

while(Object.keys(gd).length < len)
{
    var x = getNextIdx(gd, len);
    createGroup(x, nums, gd);
    groups++;
}
console.log(groups);
