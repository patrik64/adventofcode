var fs = require('fs');

var input = fs.readFileSync('Day13.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var x = '';
    var y = '';
    var hp = '';
    var val = 1;

    while(str[idx] != ' ')
    {
        x += str[idx];
        idx++;
    }
    x = x.trim();

    idx += 7;

    if(str[idx] == 'g')
        idx += 5;
    else if(str[idx] == 'l')
    {
        idx += 5;
        val *= -1;
    }

    while(str[idx] != ' ')
    {
        hp += str[idx];
        idx++;
    }
    hp = hp.trim();
    hp = parseInt(hp, 10);
    hp *= val;

    idx += 35;
    while(str[idx] != '.')
    {
        y += str[idx];
        idx++;
    }
    y = y.trim();
    
    var ret = { "x" : x, "y" : y, "hp" : hp};
    return ret;
}

var dict = {}

for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    var temp = {};
    temp[obj.y] = obj.hp;

    if(obj.x in dict)
        dict[obj.x].push(temp);
    else
    {
        dict[obj.x] = [];
        dict[obj.x].push(temp);
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
        sum += getDistance(node2, node1, dict);
    }

    var node1 = path[path.length-1];
    var node2 = path[0];
    sum += getDistance(node1, node2, dict);
    sum += getDistance(node2, node1, dict);

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
sums.reverse();
console.log(sums[0]);