var fs = require('fs');

var input = fs.readFileSync('Day16.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var op = '';
    var x = '';
    var y = '';
    var ret = [];

    while(idx < str.length)
    {
        op = str[idx];

        idx++;
        if(op == 's')
        {
            while(idx < str.length && str[idx] != ',')
            {
                x += str[idx];
                idx++;
            }
            idx++;
        }
        else
        {
            while(idx < str.length && str[idx] != '/')
            {
                x += str[idx];
                idx++;
            }
            idx++;
            while(idx < str.length && str[idx] != ',')
            {
                y += str[idx];
                idx++;
            }
            idx++;
        }
        x = x.trim();
        y = y.trim();
        var obj = { "op" : op,  "x" : x, "y" : y };

        x = '';
        y = '';
        ret.push(obj);
    }

    return ret;
}

var line = arr[0];
var dancing = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

var mvs = parse(line);

function spin(arr, x)
{
    for(var k = 0; k < x; k++)
    {
        var temp = [];
        temp.push(arr[arr.length-1]);
        for(var i = 0; i < arr.length-1; i++)
            temp.push(arr[i]);
        arr = temp;
    }
    return arr;
}

function exchange(arr, x, y)
{
    var temp = arr[y];
    arr[y] = arr[x];
    arr[x] = temp;
    return arr;
}

function partner(arr, x, y)
{
    var xpos = -1;
    var ypos = -1;
    for(var i = 0; i < arr.length; i++)
    {
        if(arr[i] == x)
            xpos = i;
        if(arr[i] == y)
            ypos = i;
    }
    var temp = arr[ypos];
    arr[ypos] = arr[xpos];
    arr[xpos] = temp;
    return arr;

}

function singleDance(arr)
{
    for(var i = 0; i < mvs.length; i++)
    {
        var obj = mvs[i];
        if(obj.op == 's')
        {
            var sNr = parseInt(obj.x, 10);
            arr = spin(arr, sNr);
        }
        else if(obj.op == 'x')
        {
            var x = parseInt(obj.x, 10);
            var y = parseInt(obj.y, 10);
            arr = exchange(arr, x, y);    
        }
        else if(obj.op == 'p')
        {
            var x = obj.x;
            var y = obj.y;
            arr = partner(arr, x, y);    
        }
    }

    var res = '';
    for(var d in arr)
        res += arr[d];

    return {"res": res, "arr": arr};
}

//find repeating pos
var coll = [];
var pos = 0;
var testArr = dancing.slice(0);

for(;;)
{
    var obj = singleDance(testArr);
    coll.push(obj.res);
    testArr = obj.arr;

    var first = coll[0];
    if(first == obj.res && pos > 0)
        break;

    pos++;
}

var res = '';
var len = 1000000000 % pos;

for(var z = 0; z < len; z++)
{
    var obj = singleDance(dancing);
    res = obj.res;
    dancing = obj.arr;
}

console.log(res);