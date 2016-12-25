var fs = require('fs');
 
var input = fs.readFileSync('Day25.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var op = '';
    var arg1 = '';
    var arg2 = '';
    var ret = {};

    if(str[idx] == 'c')
    {
        op = 'cpy';
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
    else if(str[idx] == 'i')
    {
        op = "inc";
        idx = 4;
        while(idx < str.length)
        {
            arg1 += str[idx];
            idx++;
        }
    }
    else if(str[idx] == 'd')
    {
        op = "dec";
        idx = 4;
        while(idx < str.length)
        {
            arg1 += str[idx];
            idx++;
        }
    }
    else if(str[idx] == 't')
    {
        op = "tgl";
        idx = 4;
        while(idx < str.length)
        {
            arg1 += str[idx];
            idx++;
        }
    }
    else if(str[idx] == 'o')
    {
        op = "out";
        idx = 4;
        while(idx < str.length)
        {
            arg1 += str[idx];
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
    
    ret = { "op" : op, "arg1" : arg1, "arg2" : arg2 };
    return ret;
}

function check0101(lst) 
{
    for(var i = 0; i < lst.length; i = i + 2)
    {
        if(lst[i] == 0 && lst[i+1] == 0)
            return false;
        else if(lst[i] == 1 && lst[i+1] == 1)
            return false;
        else if(lst[i] == 1 && lst[i+1] == 0)
            return false;
    }    
    return true;
}

function processInstructions(x, instructions)
{
    var a = x;
    var b = 0;
    var c = 0;
    var d = 0;

    var output = [];

    var i = 0;
    while (i < instructions.length)
    {
        var inst = instructions[i];
        var op = inst["op"];
        var arg1 = inst["arg1"];
        var arg2 = inst["arg2"];

        if(op == "cpy")
        {
            if(isNaN(arg2))
            {
                var val = 0;
                if(isNaN(arg1))
                {
                    if(arg1 == "a")
                        val = a;
                    else if(arg1 == "b")
                        val = b;
                    else if(arg1 == "c")
                        val = c;
                    else 
                        val = d;
                }
                else
                    val = Number(arg1);

                if(arg2 == "a")
                    a = val;
                else if(arg2 == "b")
                    b = val;
                else if(arg2 == "c")
                    c = val;
                else if(arg2 == "d")
                    d = val;
            }
            i++;
        }
        else if(op == "inc")
        {
            if(arg1 == "a")
                a = a + 1;
            else if(arg1 == "b")
                b = b + 1;
            else if(arg1 == "c")
                c = c + 1;
            else if(arg1 == "d")
                d = d + 1;
            i++;
        }
        else if(op == "dec")
        {
            if(arg1 == "a")
                a = a - 1;
            else if(arg1 == "b")
                b = b - 1;
            else if(arg1 == "c")
                c = c - 1;
            else if(arg1 == "d")
                d = d - 1;
            i++;
        }
        else if(op == "out")
        {
            var v = arg1;

            if(arg1 == "a")
                v = a;
            else if(arg1 == "b")
                v = b;
            else if(arg1 == "c")
                v = c;
            else if(arg1 == "d")
                v = d;

            output.push(v);
            if(output.length == 10)
            {
                if(check0101(output))
                {
                    console.log(x);
                    process.exit();
                }

                output = [];
                return;
            }

            i++;
        }
        else
        {
            if( (arg1 == "a" && a != 0) ||
                (arg1 == "b" && b != 0) ||
                (arg1 == "c" && c != 0) ||
                (arg1 == "d" && d != 0) ||
                (arg1 > 0))
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
            {
                if(!isNaN(arg1) && Number(arg1) != 0)
                {
                    i = i + Number(arg2);
                    if(i >= instructions.length || i < 0)
                        break;   
                }
                else
                    i++;
            }
        }
    }
    console.log("a --> ", a);
}

var instructions = [];
for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    instructions.push(obj);
}

for(var i = 1; i < 100000; i++)
    processInstructions(i, instructions);