var fs = require('fs');
 
var input = fs.readFileSync('Day23.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var op = '';
    var arg1 = '';
    var arg2 = '';
    var ret = {};

    if(str[idx] == 's')
    {
        idx++;
        if(str[idx] == 'e')
        {
            op = 'set';
            idx = 4;

            while(str[idx] != ' ')
            {
                arg1 += str[idx];
                idx++;
            }
            idx++;
            while(idx < str.length)
            {
                arg2 += str[idx];
                idx++;
            }
        }
        else
        {
            op = 'sub';
            idx = 4;

            while(str[idx] != ' ')
            {
                arg1 += str[idx];
                idx++;
            }
            idx++;
            while(idx < str.length)
            {
                arg2 += str[idx];
                idx++;
            }
        }
    }
    else if(str[idx] == 'm')
    {
        op = 'mul';
        idx = 4;

        while(str[idx] != ' ')
        {
            arg1 += str[idx];
            idx++;
        }
        idx++;
        while(idx < str.length)
        {
            arg2 += str[idx];
            idx++;
        }
    }
    else
    {
        op = "jnz";
        idx = 4;

        while(str[idx] != ' ')
        {
            arg1 += str[idx];
            idx++;
        }
        idx++;
        while(idx < str.length)
        {
            arg2 += str[idx];
            idx++;
        }
    }

    arg1 = arg1.trim();
    arg2 = arg2.trim();
    
    ret = { "op" : op, "arg1" : arg1, "arg2" : arg2 };
    return ret;
}

function processInstructions(instructions)
{
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var f = 0;
    var g = 0;
    var h = 0;

    var i = 0;
    var mull = 0;
    while (i < instructions.length)
    {
        var inst = instructions[i];
        var op = inst["op"];
        var arg1 = inst["arg1"];
        var arg2 = inst["arg2"];

        if(op == "set")
        {
            if(isNaN(arg1))
            {
                var val = 0;
                if(isNaN(arg2))
                {
                    if(arg2 == "a")
                        val = a;
                    else if(arg2 == "b")
                        val = b;
                    else if(arg2 == "c")
                        val = c;
                    else if(arg2 == "d")
                        val = d;
                    else if(arg2 == "e")
                        val = e;
                    else if(arg2 == "f")
                        val = f;
                    else if(arg2 == "g")
                        val = g;
                    else 
                        val = h;
                }
                else
                    val = parseInt(arg2, 10);

                if(arg1 == "a")
                    a = val;
                else if(arg1 == "b")
                    b = val;
                else if(arg1 == "c")
                    c = val;
                else if(arg1 == "d")
                    d = val;
                else if(arg1 == "e")
                    e = val;
                else if(arg1 == "f")
                    f = val;
                else if(arg1 == "g")
                    g = val;
                else if(arg1 == "h")
                    h = val;
            }
            i++;
        }
        else if(op == "sub")
        {
            if(isNaN(arg1))
            {
                var val = 0;
                if(isNaN(arg2))
                {
                    if(arg2 == "a")
                        val = a;
                    else if(arg2 == "b")
                        val = b;
                    else if(arg2 == "c")
                        val = c;
                    else if(arg2 == "d")
                        val = d;
                    else if(arg2 == "e")
                        val = e;
                    else if(arg2 == "f")
                        val = f;
                    else if(arg2 == "g")
                        val = g;
                    else 
                        val = h;
                }
                else
                    val = parseInt(arg2, 10);

                if(arg1 == "a")
                    a -= val;
                else if(arg1 == "b")
                    b -= val;
                else if(arg1 == "c")
                    c -= val;
                else if(arg1 == "d")
                    d -= val;
                else if(arg1 == "e")
                    e -= val;
                else if(arg1 == "f")
                    f -= val;
                else if(arg1 == "g")
                    g -= val;
                else if(arg1 == "h")
                    h -= val;
            }
            i++;
        }
        else if(op == "mul")
        {
            mull++;
            if(isNaN(arg1))
            {
                var val = 0;
                if(isNaN(arg2))
                {
                    if(arg2 == "a")
                        val = a;
                    else if(arg2 == "b")
                        val = b;
                    else if(arg2 == "c")
                        val = c;
                    else if(arg2 == "d")
                        val = d;
                    else if(arg2 == "e")
                        val = e;
                    else if(arg2 == "f")
                        val = f;
                    else if(arg2 == "g")
                        val = g;
                    else 
                        val = h;
                }
                else
                    val = parseInt(arg2, 10);

                if(arg1 == "a")
                    a *= val;
                else if(arg1 == "b")
                    b *= val;
                else if(arg1 == "c")
                    c *= val;
                else if(arg1 == "d")
                    d *= val;
                else if(arg1 == "e")
                    e *= val;
                else if(arg1 == "f")
                    f *= val;
                else if(arg1 == "g")
                    g *= val;
                else if(arg1 == "h")
                    h *= val;
            }
            i++;
        }
        else
        {
            if( (arg1 == "a" && a != 0) ||
                (arg1 == "b" && b != 0) ||
                (arg1 == "c" && c != 0) ||
                (arg1 == "d" && d != 0) ||
                (arg1 == "e" && e != 0) ||
                (arg1 == "f" && f != 0) ||
                (arg1 == "g" && g != 0) ||
                (arg1 == "h" && h != 0) ||
                (parseInt(arg1, 10) > 0))
            {
                if(isNaN(arg2))
                {
                    var j = 0;

                    if(arg2 == "a")
                        j = a;
                    else if(arg2 == "b")
                        j = b;
                    else if(arg2 == "c")
                        j = c;
                    else if(arg2 == "d")
                        j = d;
                    else if(arg2 == "e")
                        j = e;
                    else if(arg2 == "f")
                        j = f;
                    else if(arg2 == "g")
                        j = g;
                    else if(arg2 == "h")
                        j = h;
                
                    i = i + j;
                    if(i >= instructions.length || i < 0)
                        break;
                }
                else
                {
                    var val = Number(arg2);

                    i = i + Number(val);
                    if(i >= instructions.length || i < 0)
                        break;
                }
            }
            else
                i++;
        }
    }
    console.log(mull);
}

var instructions = [];
for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    instructions.push(obj);
}

processInstructions(instructions);