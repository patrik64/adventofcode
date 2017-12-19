var fs = require('fs');

var input = fs.readFileSync('Day9.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var x = '';
    var y = '';
    var km = '';

    while(str[idx] != ' ')
    {
        x += str[idx];
        idx++;
    }
    x = x.trim();

    idx += 4;

    while(str[idx] != ' ')
    {
        y += str[idx];
        idx++;
    }
    y = y.trim();

    idx += 2;
    while(idx < str.length)
    {
        km += str[idx];
        idx++;
    }
    km = km.trim();
    km = parseInt(km, 10);
    
    var ret = { "x" : x, "y" : y, "km" : km};
    return ret;
}

var dict = {}
for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    var temp1 = {};
    temp1[obj.y] = obj.km;
    var temp2 = {};
    temp2[obj.x] = obj.km;

    if(obj.x in dict)
        dict[obj.x].push(temp1);
    else
    {
        dict[obj.x] = [];
        dict[obj.x].push(temp1);
    }

    if(obj.y in dict)
        dict[obj.y].push(temp2);
    else
    {
        dict[obj.y] = [];
        dict[obj.y].push(temp2);
    }
}

function isInArray(value, array) 
{
    return array.indexOf(value) > -1;
}

function createPath(node, path, dict)
{
    if(!(isInArray(node, path)))
        path.push(node);
    var arr = dict[node];
    for(var key in arr)
    {
        var obj = arr[key];
        var nn = Object.keys(obj)[0];
    }
    return path;
}

function getDistance(n1, n2, dict)
{
    var arr = dict[n1];

    for(var key in arr)
    {
        var o = arr[key];
        var nn = Object.keys(o)[0];
        if(nn == n2)
            return o[nn];
    }
    return 0;
}

function calcPath(path, dict)
{
    var sum = 0;
    for(var i = 0; i < path.length-1; i++)
    {
        var node1 = path[i];
        var node2 = path[i+1];

        sum += getDistance(node1, node2, dict);
    }
    return sum;
}

var nodes = [];
for(var key in dict)
    nodes.push(key);

function permutator(inputArr) 
{
    var results = [];
  
    function permute(arr, memo) 
    {
        var cur, memo = memo || [];
  
        for (var i = 0; i < arr.length; i++) 
        {
            cur = arr.splice(i, 1);
            if (arr.length === 0) 
            {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }
        return results;
    }
    return permute(inputArr);
}

var perms = permutator(nodes);

var sums = [];
for(var i = 0; i < perms.length; i++)
{
    var sum = calcPath(perms[i], dict);
    sums.push(sum);
}

sums.sort(function(a, b){return a-b});
console.log(sums[0]);