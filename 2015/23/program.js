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

    if(str[idx] == 'j')
    {
        idx++;
        if(str[idx] == 'i')
        {
            idx++;
            if(str[idx] == 'e')
            {
                op = 'jie';
                idx = 4;

                while(str[idx] != ',')
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
                op = 'jio';
                idx = 4;

                while(str[idx] != ',')
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
        else
        {
            op = 'jmp';
            idx = 4;

            while(idx < str.length)
            {
                arg1 += str[idx];
                idx++;
            }
        }
    }
    else if(str[idx] == 'h')
    {
        op = "hlf";
        idx = 4;

        while(idx < str.length)
        {
            arg1 += str[idx];
            idx++;
        }
    }
    else if(str[idx] == 't')
    {
        op = "tpl";
        idx = 4;

        while(idx < str.length)
        {
            arg1 += str[idx];
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

    arg1 = arg1.trim();
    arg2 = arg2.trim();
    
    ret = { "op" : op, "arg1" : arg1, "arg2" : arg2 };
    return ret;
}

function processInstructions(instructions)
{
    var a = 0;
    var b = 0;

    var output = [];

    var idx = 0;
    while (idx < instructions.length)
    {
        var inst = instructions[idx];
        var op = inst["op"];
        var arg1 = inst["arg1"];
        var arg2 = inst["arg2"];

        if(op == "hlf")
        {
            if(isNaN(arg1))
            {
                if(arg1 == "a")
                    a = a / 2;
                else if(arg1 == "b")
                    b = b /2;
            }
            else
            {
                console.log("Error!");
            }
            idx++;
        }
        else if(op == "tpl")
        {
            if(isNaN(arg1))
            {
                if(arg1 == "a")
                    a = a * 3;
                else if(arg1 == "b")
                    b = b * 3;
            }
            else
            {
                console.log("Error!");
            }
            idx++;
        }
        else if(op == "inc")
        {
            if(isNaN(arg1))
            {
                if(arg1 == "a")
                    a = a + 1;
                else if(arg1 == "b")
                    b = b + 1;
            }
            else
            {
                console.log("Error!");
            }
            idx++;
        }
        else if(op == "jmp")
        {

            if( (arg1 == "a" && a != 0) ||
                (arg1 == "b" && b != 0) ||
                (Number(arg1) != 0))
            {
                if(isNaN(arg1))
                {
                    var j = 0;

                    if(arg1 == "a")
                        j = a;
                    else if(arg1 == "b")
                        j = b;
                
                    idx = idx + j;
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
                else
                {
                    var val = parseInt(arg1, 10);

                    idx = idx + Number(val);
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
            }
        }
        else if(op == "jie")
        {

            if( (arg1 == "a" && (a % 2 == 0)) ||
                (arg1 == "b" && (b % 2 == 0)))
            {
                if(isNaN(arg2))
                {
                    var j = 0;

                    if(arg2 == "a")
                        j = a;
                    else if(arg2 == "b")
                        j = b;
                
                    idx = idx + j;
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
                else
                {
                    var val = parseInt(arg2, 10);

                    idx = idx + Number(val);
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
            }
            else idx++;
        }
        else if(op == "jio")
        {

            if( (arg1 == "a" && (a == 1)) ||
                (arg1 == "b" && (b == 1)))
            {
                if(isNaN(arg2))
                {
                    var j = 0;

                    if(arg2 == "a")
                        j = a;
                    else if(arg2 == "b")
                        j = b;
                
                    idx = idx + j;
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
                else
                {
                    var val = parseInt(arg2, 10);

                    idx = idx + Number(val);
                    if(idx >= instructions.length || idx < 0)
                        break;
                }
            }
            else idx++;
        }
    }
    console.log("b --> ", b);
}

var instructions = [];
for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    instructions.push(obj);
}

processInstructions(instructions);