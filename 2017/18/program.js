var fs = require('fs');
 
var input = fs.readFileSync('Day18.in', 'utf8');
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
        if(str[idx] == 'n')
        {
            op = 'snd';
            idx = 4;
            while(idx < str.length)
            {
                arg1 += str[idx];
                idx++;
            }
        }
        else
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
    }
    else if(str[idx] == 'm')
    {
        idx++;
        if(str[idx] == 'u')
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
            op = 'mod';
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
    else if(str[idx] == 'a')
    {
        op = "add";
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
    else if(str[idx] == 'j')
    {
        op = "jgz";
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
    else if(str[idx] == 'r')
    {
        op = "rcv";
        idx = 4;
        while(idx < str.length)
        {
            arg1 += str[idx];
            idx++;
        }
    }
    
    ret = { "op" : op, "arg1" : arg1, "arg2" : arg2 };
    return ret;
}

var lastFreq = 0;

function processInstructions(instructions)
{
    var a = 0;
    var b = 0;
    var i = 0;
    var f = 0;
    var p = 0;

    var output = [];

    var idx = 0;
    while (idx < instructions.length)
    {
        var inst = instructions[idx];
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
                    else if(arg2 == "f")
                        val = f;
                    else if(arg2 == "i")
                        val = i;
                    else 
                        val = p;
                }
                else
                    val = Number(arg2);

                if(arg1 == "a")
                    a = val;
                else if(arg1 == "b")
                    b = val;
                else if(arg1 == "f")
                    f = val;
                else if(arg1 == "i")
                    i = val;
                else if(arg1 == "p")
                    p = val;
            }
            idx++;
        }
        else if(op == "add")
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
                    else if(arg2 == "f")
                        val = f;
                    else if(arg2 == "i")
                        val = i;
                    else 
                        val = p;
                }
                else
                    val = Number(arg2);

                if(arg1 == "a")
                    a += val;
                else if(arg1 == "b")
                    b += val;
                else if(arg1 == "f")
                    f += val;
                else if(arg1 == "i")
                    i += val;
                else if(arg1 == "p")
                    p += val;
            }
            idx++;
        }
        else if(op == "mul")
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
                    else if(arg2 == "f")
                        val = f;
                    else if(arg2 == "i")
                        val = i;
                    else if(arg2 == "p")
                        val = p;
                    else
                        console.log("error!");
                }
                else
                    val = parseInt(arg2, 10);

                if(arg1 == "a")
                    a *= val;
                else if(arg1 == "b")
                    b *= val;
                else if(arg1 == "f")
                    f *= val;
                else if(arg1 == "i")
                    i *= val;
                else if(arg1 == "p")
                    p *= val;
            }
            idx++;
        }
        else if(op == "mod")
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
                    else if(arg2 == "f")
                        val = f;
                    else if(arg2 == "i")
                        val = i;
                    else 
                        val = p;
                }
                else
                    val = Number(arg2);

                if(arg1 == "a")
                    a = a % val;
                else if(arg1 == "b")
                    b = b % val;
                else if(arg1 == "f")
                    f = f % val;
                else if(arg1 == "i")
                    i = i % val;
                else if(arg1 == "p")
                    p = p % val;
            }
            idx++;
        }
        else if(op == "snd")
        {
            if(arg1 == "a")
                lastFreq = a;
            else if(arg1 == "b")
                lastFreq = b;
            else if(arg1 == "f")
                lastFreq = f;
            else if(arg1 == "i")
                lastFreq = i;
            else if(arg1 == "p")
                lastFreq = p;
            idx++;
        }
        else if(op == "rcv")
        {
            var v = arg1;

            if(arg1 == "a")
                v = a;
            else if(arg1 == "b")
                v = b;
            else if(arg1 == "f")
                v = f;
            else if(arg1 == "i")
                v = i;
            else if(arg1 == "p")
                v = p;

            if(v != 0)
            {
                console.log(lastFreq);
                process.exit();
            }
            idx++;
        }
        else //jgz
        {
            if( (arg1 == "a" && a != 0) ||
                (arg1 == "b" && b != 0) ||
                (arg1 == "f" && f != 0) ||
                (arg1 == "i" && i != 0) ||
                (arg1 == "p" && p != 0) ||
                (arg1 > 0))
            {
                if(isNaN(arg2))
                {
                    var j = 0;

                    if(arg2 == "a")
                        j = a;
                    else if(arg2 == "b")
                        j = b;
                    else if(arg2 == "f")
                        j = f;
                    else if(arg2 == "i")
                        j = i;
                    else if(arg2 == "p")
                        j = p;
                
                    idx = idx + j;
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
                else
                {
                    var val = Number(arg2);

                    idx = idx + Number(val);
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
            }
            else
            {
                if(!isNaN(arg1) && Number(arg1) != 0)
                {
                    idx = idx + Number(arg2);
                    if(idx >= instructions.length || idx < 0)
                        break;   
                }
                else
                    idx++;
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

processInstructions(instructions);