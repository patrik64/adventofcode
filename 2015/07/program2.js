var fs = require('fs');

var input = fs.readFileSync('Day7.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;

    var x = '';
    var y = '';
    var z = '';
    var op = '';

    if(str[0] == 'N' && str[1] == 'O' && str[2] == 'T')
    {
        idx = 4;
        op = 'not';
    }
    while(str[idx] != ' ')
    {
        x += str[idx];
        idx++;
    }
    idx++;

    if(str[idx] == '-')
    {
        idx +=2;
        while(idx < str.length)
        {
            z += str[idx];
            idx++;
        }
        z = z.trim();
        if(op.length == 0)
            op = "assign";
    }
    else
    {
        if(str[idx] == 'A')
        {
            idx += 3;
            op = 'and';
        }
        else if(str[idx] == 'O')
        {
            idx += 2;
            op = 'or';
        }
        else if(str[idx] == 'L')
        {
            idx += 6;
            op = 'lshift';
        }
        else if(str[idx] == 'R')
        {
            idx += 6;
            op = 'rshift';
        }
        idx++;
        while(str[idx] != ' ')
        {
            y += str[idx];
            idx++;
        }
        idx++;
        y = y.trim();

        idx += 2;

        while(idx < str.length)
        {
            z += str[idx];
            idx++;
        }
        z = z.trim();
    }

    var ret = { "op" : op, "x" : x, "y" : y, "z" : z};
    //console.log(ret);
    return ret;
}

function performNot(inst, dict)
{
    var x = inst.x;
    var z = inst.z;
    if(x in dict)
    {
        var val = dict[x];
        val = 65535 - val;
        dict[z] = val;
    }
}

function performAssign(inst, dict)
{
    var x = inst.x;
    var z = inst.z;
    if(x in dict)
    {
        var val = dict[x];
        dict[z] = val;
    }
    else if(!isNaN(parseInt(x, 10)))
    {
        x = parseInt(x, 10);
        if(z == 'b')
            dict[z] = 16076;
        else
            dict[z] = x;
    }
}

function performAnd(inst, dict)
{
    var x = inst.x;
    var y = inst.y;
    var z = inst.z;

    if((x in dict) && (y in dict))
    {
        var val = dict[x] & dict[y];
        dict[z] = val;
    }
    else if(!isNaN(parseInt(x, 10)) && (y in dict))
    {
        var val = parseInt(x, 10) & dict[y];
        dict[z] = val;
    }
    else if(!isNaN(parseInt(y, 10)) && (x in dict))
    {
        var val = parseInt(y, 10) & dict[x];
        dict[z] = val;
    }
    else if(!isNaN(parseInt(x, 10)) && !isNaN(parseInt(y, 10)))
    {
        var val = parseInt(x, 10) & parseInt(y, 10);
        dict[z] = val;
    }
}

function performOr(inst, dict)
{
    var x = inst.x;
    var y = inst.y;
    var z = inst.z;

    if((x in dict) && (y in dict))
    {
        var val = dict[x] | dict[y];
        dict[z] = val;
    }
    else if(!isNaN(parseInt(x, 10)) && (y in dict))
    {
        var val = parseInt(x, 10) | dict[y];
        dict[z] = val;
    }
    else if(!isNaN(parseInt(y, 10)) && (x in dict))
    {
        var val = parseInt(y, 10) | dict[x];
        dict[z] = val;
    }
    else if(!isNaN(parseInt(x, 10)) && !isNaN(parseInt(y, 10)))
    {
        var val = parseInt(x, 10) | parseInt(y, 10);
        dict[z] = val;
    }
}

function performLShift(inst, dict)
{
    var x = inst.x;
    var y = parseInt(inst.y, 10);
    var z = inst.z;

    if(x in dict)
    {
        var val = dict[x] << y;
        dict[z] = val;
    }
}

function performRShift(inst, dict)
{
    var x = inst.x;
    var y = parseInt(inst.y, 10);
    var z = inst.z;

    if(x in dict)
    {
        var val = dict[x] >> y;
        dict[z] = val;
    }
}

var instructions = [];

for (var i in arr)
{
   var line = arr[i];
   var inst = parse(line);
   instructions.push(inst);
}

var dict = {};

for(;;)
{
    for(var i = 0; i < instructions.length; i++)
    {
        var obj = instructions[i];
        var op = obj.op;

        if(op == "not")
            performNot(obj, dict);
        else if(op == "assign")
            performAssign(obj, dict);
        else if(op == 'and')
            performAnd(obj, dict);
        else if(op == 'or')
            performOr(obj, dict);
        else if(op == 'lshift')
            performLShift(obj, dict);
        else if(op == 'rshift')
            performRShift(obj, dict);
    }
    if('a' in dict)
        break;
}


console.log(dict['a']);