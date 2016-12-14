var fs = require('fs');
 
var input = fs.readFileSync('Day8.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var op = '';
    var param1 = '';
    var param2 = '';
    var param3 = '';
    var pos = 1;

    if(str[pos] == 'e')
        op = "rect";
    else 
        op = "rotate";

    if(op == "rect")
    {
        pos = 5;
        for(var i = 5; i < str.length; i++)
        {
            pos = i;
            var ch = str[i];
            if(ch != 'x')
                param1 += ch;
            else
                break;
        }
        pos++;
        for(var j = pos; j < str.length; j++)
        {
            var ch = str[j];
            param2 +=ch;
        }

    }
    else
    {
        pos = 7;
        if(str[pos] == 'r')
        {
            param1 = "row";
            pos = 11;
        }
        else
        {
            param1 = "column";
            pos = 14;
        }

        pos++; //x or y
        pos++; //=

        while(str[pos] != ' ')
        {
            param2 += str[pos];
            pos++;
        }

        pos++;
        pos += 2;//by
        pos++;

        for(var i = pos; i < str.length; i++)
        {
            var ch = str[i];
            param3 += ch;
        }
    }

    var ret = { "op" : op, "param1" : param1, "param2" : param2, "param3" : param3 };
    return ret;
}

function printScreen(scr)
{
    for(var r in scr)
    {
        var row = scr[r];
        var line = '';
        for(var c in row)
        {
            line += row[c];
        }
        console.log(line);
    }
}

function pixelCount(scr)
{
    var ret = 0;
    for(var r in scr)
    {
        var row = scr[r];
        for(var c in row)
        {
            var ch = row[c];
            if(ch == '#')
                ret++;
        }
    }
    return ret;
}

function rect(scr, x, y)
{
    for(var i = 0; i < x; i++)
    {
        for(var j = 0; j < y; j++)
        {
            scr[j][i] = '#';
        }
    }
}

function getRow(arr, r)
{
    var ret = [];
    var row = arr[r];
    for(var x in row)
    {
        ret.push(row[x]);
    }
    return ret;
}

function getColumn(arr, c)
{
    var ret = [];
    for(var x in arr)
    {
        var row = arr[x];
        for(var y in row)
        {
            if(y == c)
            {
                ret.push(row[y]);
            }
        }
    }
    return ret;
}

function rotate(scr, p1, p2, p3)
{
    if(p1 == "row")
    {

        var len = scr[0].length;
        var temp = getRow(scr,p2);
        for(var i = 0; i < len; i++)
        {
            var ch = scr[p2][i];
            temp[(p3+i)%len] = ch;
        }
        scr[p2] = temp;
    }
    else
    {
        var len = scr.length;
        var temp = getColumn(scr, p2);

        for(var i = 0; i < len; i++)
        {
            var ch = scr[i][p2];
            temp[(p3+i)%len] = ch;
        }
        for(var i = 0; i < len; i++)
        {
            var ch = temp[i];
            scr[i][p2] = ch;
        }
    }
}

function makeScreen(x, y)
{
    var ret = [];

    for(var i = 0; i < y; i++)
    {
        var row = [];
        for(var j = 0; j < x; j++)
        {
            row.push('.');
        }
        ret.push(row);
    }
    return ret;
}

var x = 50;
var y = 6;

var scr = makeScreen(x, y);

//var scr = [
//['.', '.', '.', '.', '.', '.', '.', ],
//['.', '.', '.', '.', '.', '.', '.', ],
//['.', '.', '.', '.', '.', '.', '.', ]
//];

for (var i in arr)
{
    var obj = parse(arr[i]);

    if(obj["op"] == "rect")
    {
        var p1 = Number(obj["param1"]);
        var p2 = Number(obj["param2"]);
        rect(scr, p1, p2);
    }
    else
    {
        var p1 = obj["param1"];
        var p2 = Number(obj["param2"]);
        var p3 = Number(obj["param3"]);
        rotate(scr, p1, p2, p3);
    }
}

printScreen(scr);
console.log(pixelCount(scr));