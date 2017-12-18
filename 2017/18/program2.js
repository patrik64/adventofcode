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

    arg1 = arg1.trim();
    arg2 = arg2.trim();
    
    ret = { "op" : op, "arg1" : arg1, "arg2" : arg2 };
    return ret;
}

function initState(a, b, f, i, p, idx)
{
    var s = {};
    s["a"] = a;
    s["b"] = b;
    s["f"] = f;
    s["i"] = i;
    s["p"] = p; 
    s["idx"] = idx;
    return s;
}

function saveState(s, a, b, f, i, p, idx)
{
    s["a"] = a;
    s["b"] = b;
    s["f"] = f;
    s["i"] = i;
    s["p"] = p; 
    s["idx"] = idx;
}

var valSent = 0;

var q1 = [];
var q2 = [];

var state1 = initState(0, 0, 0, 0, 0, 0);
var state2 = initState(0, 0, 0, 0, 1, 0);

function processInstruction(instructions, state, sndQ, rcvQ, prg)
{
    var idx = state.idx;
    var a = state["a"];
    var b = state["b"];
    var f = state["f"];
    var i = state["i"];
    var p = state["p"];

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
                    else if(arg2 == "p")
                        val = p;
                    else 
                    {
                        console.log("Error!");
                        process.exit();
                    }
                }
                else
                    val = parseInt(arg2, 10);

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
                else
                {
                    console.log("Error!");
                    process.exit();
                }
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
                    else if(arg2 == "p")
                        val = p;
                    else 
                    {
                        console.log("Error!");
                        process.exit();
                    }
                }
                else
                    val = parseInt(arg2, 10);

                if(arg1 == "a")
                    a = a + val;
                else if(arg1 == "b")
                    b = b + val;
                else if(arg1 == "f")
                    f = f + val;
                else if(arg1 == "i")
                    i = i + val;
                else if(arg1 == "p")
                    p = p + val;
                else
                {
                    console.log("Error!");
                    process.exit();
                }
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
                    {
                        console.log("error!");
                        process.exit();
                    }
                }
                else
                    val = parseInt(arg2, 10);

                if(arg1 == "a")
                    a = a * val;
                else if(arg1 == "b")
                    b = b * val;
                else if(arg1 == "f")
                    f = f * val;
                else if(arg1 == "i")
                    i = i * val;
                else if(arg1 == "p")
                    p = p * val;
                else
                {
                    console.log("Error!");
                    process.exit();
                }
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
                    else if(arg2 == "p")
                        val = p;
                    else
                    {
                        console.log("error!");
                        process.exit();
                    }
                }
                else
                    val = parseInt(arg2, 10);

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
                else
                {
                    console.log("Error!");
                    process.exit();
                }
            }
            idx++;
        }
        else if(op == "snd")
        {
            var val;
            if(arg1 == "a")
                val = a;
            else if(arg1 == "b")
                val = b;
            else if(arg1 == "f")
                val = f;
            else if(arg1 == "i")
                val = i;
            else if(arg1 == "p")
                val = p;
            else
                val = parseInt(arg1, 10);

            sndQ.push(val);

            if(prg == 1)
                valSent++;
            idx++;
        }
        else if(op == "rcv")
        {
            if(rcvQ.length > 0)
            {
                var val = rcvQ.shift();

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
                else
                {
                    console.log("Error!");
                    process.exit();
                }
                idx++;
            }
            else
            {
                saveState(state, a, b, f, i, p, idx);
                if(prg == 0)
                {
                    prg = 1;
                    state = state2;
                    idx = state.idx;
                    a = state["a"];
                    b = state["b"];
                    i = state["i"];
                    f = state["f"];
                    p = state["p"];
                    sndQ = q2;
                    rcvQ = q1;
                }
                else
                {
                    prg = 0;
                    state = state1;
                    idx = state.idx;
                    a = state["a"];
                    b = state["b"];
                    i = state["i"];
                    f = state["f"];
                    p = state["p"];
                    sndQ = q1;
                    rcvQ = q2;
                }
                if(sndQ.length == 0 && rcvQ.length == 0)
                    return;
            }
        }
        else if(op == "jgz")
        {
            if( (arg1 == "a" && a > 0) ||
                (arg1 == "b" && b > 0) ||
                (arg1 == "f" && f > 0) ||
                (arg1 == "i" && i > 0) ||
                (arg1 == "p" && p > 0) ||
                (Number(arg1) > 0))
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
                    else  
                    {
                        console.log("Error!");
                        process.exit();
                    }
                
                    idx = idx + j;
                    if(idx >= instructions.length || idx < 0)
                    {
                        console.log("Error!");
                        process.exit();
                    }
                }
                else
                {
                    var val = parseInt(arg2, 10);
                    idx = idx + val;
                    
                    if(idx >= instructions.length || idx < 0)
                    {
                        console.log("Error!");
                        process.exit();
                    }
                }
            }
            else idx++;
        }
        else
        {
            console.log("Error!!");
        }
    }
}

var instructions = [];

for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    instructions.push(obj);
}

processInstruction(instructions, state1, q1, q2, 0);
console.log(valSent);