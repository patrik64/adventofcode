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

function getABAs(str)
{
    var ret = [];
    if(str.length >= 3)
    {
        for(var i = 0; i < str.length; i++)
        {
            var ch1 = str[i];
            var ch2 = str[i+1];
            var ch3 = str[i+2];

            if((ch1 != ch2) && (ch1 == ch3))
            {
                var s = ch1 + ch2 + ch3;
                ret.push(s);
            }
        }
    }
    return ret;
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
var errors = 0;
for(var i in arr)
{
    var line = arr[i];
    var obj = parse(arr[i]);

    if(!validateParse(line, obj))
        errors++;

    var hypers = obj["hypers"];
    var parts = obj["parts"];

    var ABAs = [];
    var BABs = [];

    for(var h in hypers)
        BABs = getABAs(hypers[h]).concat(BABs);

    for(var p in parts)
        ABAs = getABAs(parts[p]).concat(ABAs);

    if(ABAs.length > 0 && BABs.length > 0)
    {
        var found = false;

        for(var a in ABAs)
        {
            if(!found)
            {
                var aba = ABAs[a];
                for(var b in BABs)
                {
                    var bab = BABs[b];
                    if(aba[0] == bab[1] && aba[1] == bab[0])
                    {
                        //console.log(ABAs);
                        //console.log(BABs);
                        //console.log(aba);
                        //console.log("******************");            
                        
                        counter++;
                        found = true;
                        break;
                    }
                }
            }
        }
        
    }
}
console.log(counter);
if(errors)
    console.log("errors --> " + errors);