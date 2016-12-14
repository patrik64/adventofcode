var fs = require('fs');
 
var input = fs.readFileSync('Day7.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var inPart = true;
    var inHyper = false;

    var parts = [];
    var hypers = [];
    var currentPart = '';
    var currentHyper = '';

    for(var i = 0; i < str.length; i++)
    {
        var ch = str[i];
        if(ch == '[' && !inHyper)
        {
            inHyper = true;
            inPart = false;
            if(currentPart.length > 0)
            {
                parts.push(currentPart);
                currentPart = '';
            }
        }
        else if(inHyper && ch == ']')
        {
            inHyper = false;
            inPart = true;
            if(currentHyper.length > 0)
            {
                hypers.push(currentHyper);
                currentHyper = '';
            }
        }
        else if(inHyper)
        {
            currentHyper += ch;
        }
        else if(inPart)
        {
            currentPart += ch;
        }
        else
        {
            console.log('parsing error!');
        }
    }

    if(currentPart.length > 0)
        parts.push(currentPart);


    var ret = { "parts" : parts, "hypers" : hypers };
    return ret;
}

function isABBA(str)
{
    if(str.length >= 4)
    {
        for(var i = 0; i < str.length; i++)
        {
            var ch1 = str[i];
            var ch2 = str[i+1];
            var ch3 = str[i+2];
            var ch4 = str[i+3];

            if((ch1 != ch2) && (ch1 == ch4) && (ch2 == ch3))
            {
                return true;
            }
        }
    }
    return false;
}

function validateParse(line, obj)
{
    var hypers = obj["hypers"];
    var parts = obj["parts"];

    var str = '';
    for(var x in hypers)
    {
        str += '[' + hypers[x] + ']';
    }

    for(var y in parts)
    {
        str += parts[y];
    }

    if(line.length != str.length)
    {
        console.log("PARSE ERROR!!!!")
        console.log(line);
        console.log(str);
        console.log("*********************");
        return false;
    }
    return true;
}

var counter = 0;
var all = 0;
var errors = 0;
for (i in arr)
{
    all++;
    var line = arr[i];
    var obj = parse(arr[i]);

    if(!validateParse(line, obj))
        errors++;

    var hypers = obj["hypers"];
    var parts = obj["parts"];

    var cont = true;
    for(var h in hypers)
    {
        if(isABBA(hypers[h]))
            cont = false;
    }

    if(cont)
    {
        for(var p in parts)
        {
            if(isABBA(parts[p]))
            {
                counter++;
                break;
            }
        }
    }
}
console.log(counter);
if(errors)
    console.log("errors --> " + errors);