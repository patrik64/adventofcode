var fs = require('fs');

var input = fs.readFileSync('Day24.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var ret = {};
    var idx = 0;
    var a = '';
    var b = '';

    str = str.trim();
 
    while(str[idx] != '/')
    {
        a += str[idx];
        idx++;
    }
    a = a.trim();
    a = parseInt(a, 10);
    idx++;

    while(idx < str.length)
    {
        b += str[idx];
        idx++;
    }
    b = b.trim();
    b = parseInt(b, 10);

    ret = { "a": a, "b": b, "used" : -1 };   
    //console.log(ret);
    return ret;
}

function createChain(idx, inArr, outArr)
{
    var clArr = inArr.slice(0);
    var x = inArr[idx];
    outArr.push(x);
    clArr.splice(idx, 1);
    var node = [];

    for(var i = 0; i < clArr.length; i++)
    {
        var y = clArr[i];
        if(x.used == 0)
        {
            if(y.a == x.b)
            {
                y.used = 0;
                var oA = outArr.slice(0);
                var ret = createChain(i, clArr, oA);
                if(ret.length > 0)
                    node.push(ret);
            }
            else if(y.b == x.b)
            {
                y.used = 1;
                var oA = outArr.slice(0);
                var ret = createChain(i, clArr, oA);
                if(ret.length > 0)
                    node.push(ret);
            }
        }
        else if(x.used = 1)
        {
            if(y.a == x.a)
            {
                y.used = 0;
                var oA = outArr.slice(0);
                var ret = createChain(i, clArr, oA);
                if(ret.length > 0)
                    node.push(ret);
            }
            else if(y.b == x.a)
            {
                y.used = 1;
                var oA = outArr.slice(0);
                var ret = createChain(i, clArr, oA);
                if(ret.length > 0)
                    node.push(ret);
            }
        }
    }
    if(node.length > 0)
        return node;
    else
        return outArr;
}

var comb = [];
for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    comb.push(obj);
}

function findLongestLen(tree, lens)
{
    var len = 0;
    for(var i = 0; i <tree.length; i++)
    {
        var obj = tree[i];
        if(Array.isArray(obj))
        {
            findLongestLen(obj, lens);
            len = 0;
        }
        else
        {
            len++;
        }
    }
    if(len > 0)
        lens.push(len);
}

function flattenTree(tree, sums, len)
{
    var sum = 0;
    var lenCheck = 0;
    for(var i = 0; i <tree.length; i++)
    {
        var obj = tree[i];
        if(Array.isArray(obj))
        {
            flattenTree(obj, sums, len);
        }
        else
        {
            sum += obj.a + obj.b;
            lenCheck++;
        }
    }
    if(sum > 0 && lenCheck == len)
        sums.push(sum);
}

var tree = [];
for(var i = 0; i < comb.length; i++)
{
    var x = comb[i];
    var out = [];
    var node = [];

    if(x.a == 0)
    {
        x.used = 0;
        tree.push(createChain(i, comb, out));
    }
    else if(x.b == 0)
    {
        x.used = 1;
        tree.push(createChain(i, comb, out));
    }
}

var lenghts = [];
findLongestLen(tree, lenghts);
lenghts.sort((x,y) => (x-y));
lenghts.reverse();
var len = lenghts[0];
var sums = [];
flattenTree(tree, sums, len);
sums.sort((x, y) => (x-y));
sums.reverse();
console.log(sums[0]);