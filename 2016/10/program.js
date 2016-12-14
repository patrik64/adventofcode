var fs = require('fs');
 
var input = fs.readFileSync('Day10.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var bot = '';
    var val = '';
    var low = '';
    var high = '';
    var low_output = '';
    var high_output = '';
    var type = '';

    var idx = 0;
    if(str[idx] == 'v')
    {
        type = "assign";
        idx = 6;
        while(str[idx] != ' ')
        {
            val += str[idx];
            idx++;
        }
        idx += 13;
        while(idx < str.length)
        {
            bot += str[idx];
            idx++;
        }
    }
    else
    {
        type = "direction";
        idx = 4;
        while(str[idx] != ' ')
        {
            bot += str[idx];
            idx++;
        }
        idx += 14;
        if(str[idx] == 'o')
        {
            idx += 7;
            while(str[idx] != ' ')
            {
                low_output += str[idx];
                idx++;    
            }
            idx += 13;
            if(str[idx] == 'o')
            {
                idx += 7;
                while(idx < str.length)
                {
                    high_output += str[idx];
                    idx++;
                }
            }
            else
            {
                idx += 4;
                while(idx < str.length)
                {
                    high += str[idx];
                    idx++;
                }
            }
        }
        else
        {
            idx += 4;
            while(str[idx] != ' ')
            {
                low += str[idx];
                idx++;
            }
            idx += 16;
            while(idx < str.length)
            {
                high += str[idx];
                idx++;
            }
        }

        
    }

    var b = (bot.length > 0) ? Number(bot) : -1;
    var v = (val.length > 0) ? Number(val) : -1;
    var l = (low.length > 0) ? Number(low) : -1;
    var h = (high.length > 0) ? Number(high) : -1;
    var lo = (low_output.length > 0) ? Number(low_output) : -1;
    var ho = (high_output.length > 0) ? Number(high_output) : -1;
    
    var ret = {
        "type" : type, 
        "bot" : b, 
        "val" : v, 
        "low" : l, 
        "high" : h, 
        "low_output" : lo,
        "high_output" : ho
    };
    return ret;
}

function findChip(arr, low, high)
{
    var low_obj;
    var high_obj;
    for(var x in arr)
    {
        var obj = arr[x];
        if(obj["val"] == low)
            low_obj = obj;
        else if(obj["val"] == high)
            high_obj = obj;
    }

    console.log(low_obj);
    console.log(high_obj);
    return 0;
}

function getVal(arr, bot)
{
    for(var x in arr)
    {
        var obj = arr[x];
        if(obj["bot"] == bot)
            return obj["val"];
    }
    return -1;
}

function traverse(solved, assigns, directions)
{
    var ret = assigns;
    for(var x in solved)
    {
        var o1 = solved[x];
        var bot = o1["bot"];
        var low = o1["low"];
        var high = o1["high"];
        for(var y in directions)
        {
            var o2 = directions[y];
            var dbot = o2["bot"];
            if(bot == dbot)
            {   
                var dlow = o2["low"];
                var dhigh = o2["high"];

                if(dlow > -1)
                {
                    var ol = { "bot" : dlow, "val" : low };
                    assigns.push(ol);    
                }
                if(dhigh > -1)
                {
                    var oh = { "bot" : dhigh, "val" : high };
                    assigns.push(oh);
                }
            }
        }
    }
    return ret;
}

function notIn(arr, bot)
{
    for(var x in arr)
    {
        if(bot == arr[x]["bot"])
            return false;
    }
    return true;
}

function solve(arr)
{
    var ret = [];
    for(var i = 0; i < arr.length-1; i++)
    {
        var bot = arr[i]["bot"];
        var val1 = arr[i]["val"];
        for(var j = i+1; j < arr.length; j++)
        {
            var bot2 = arr[j]["bot"];
            if(bot == bot2)
            {
                var val2 = arr[j]["val"];
                if(val1 != val2)
                {
                    var l = (val1 < val2) ? val1 : val2;
                    var h = (val1 > val2) ? val1 : val2;
                    var ro = { "bot" : bot, "low" : l, "high" : h };
                    if(notIn(ret, bot))
                        ret.push(ro);
                }
            }
        }
    }
    return ret;
}

function findLowHigh(arr, low, high)
{
    for(var x in arr)
    {
        if(low == arr[x]["low"] && high == arr[x]["high"])
            return arr[x]["bot"];
    }
    return -1;
}

function getLow(arr, bot)
{
    for(var x in arr)
    {
        if(bot == arr[x]["bot"])
            return arr[x]["low"];
    }
    return -1;
}

function getHigh(arr, bot)
{
    for(var x in arr)
    {
        if(bot == arr[x]["bot"])
            return arr[x]["high"];
    }
    return -1;
}

function compare(a,b) 
{
    if (a.bot < b.bot)
        return -1;
    if (a.bot > b.bot)
        return 1;
    return 0;
}

function classify(arr)
{
    var assigns = [];
    var directions = [];
    var solved = [];

    for(var x in arr)
    {
        var obj = arr[x];
        if(obj["type"] == "assign")
        {
            var bot = obj["bot"];
            var val1 = getVal(assigns, bot);
            if(val1 > 0)
            {
                var val2 = obj["val"];
                if(val1 != val2)
                {
                    var low = 0;
                    var high = 0;
                    if(val1 > val2)
                    {
                        low = val2;
                        high = val1;
                    } 
                    else
                    {
                        low = val1;
                        high = val2;
                    }
                    var sb = { "bot" : bot, "low" : low, "high" : high};
                    solved.push(sb);
                }
            }
            var o = { "bot" : obj["bot"], "val" : obj["val"]}
            assigns.push(o);
        }
        else
        {
            directions.push(obj);
        }
    }

    var max = 210;
    for(var i = 0; i < max; i++)
    {
        var notSolved = notIn(solved, i);
        while(notIn(solved, i))
        {
            assigns = traverse(solved, assigns, directions);
            solved = solve(assigns);
        }
    }

    solved.sort(compare);

    var bot = findLowHigh(solved, 17, 61);
    console.log("bot for low 17 and high 61 --> " + bot);

    var output0_bot = -1;
    var output0_bot_lh = '';
    var output1_bot = -1;
    var output1_bot_lh = '';
    var output2_bot = -1;
    var output2_bot_lh = '';

    for(var x in directions)
    {
        if(directions[x]["low_output"] == 0)
        {
            output0_bot = directions[x]["bot"];
            output0_bot_lh = "low";
        }
        else if(directions[x]["high_output"] == 0)
        {
            output0_bot = directions[x]["bot"];
            output0_bot_lh = "high";
        }

        if(directions[x]["low_output"] == 1)
        {
            output1_bot = directions[x]["bot"];
            output1_bot_lh = "low";
        }
        else if(directions[x]["high_output"] == 1)
        {
            output1_bot = directions[x]["bot"];
            output1_bot_lh = "high";
        }

        if(directions[x]["low_output"] == 2)
        {
            output2_bot = directions[x]["bot"];
            output2_bot_lh = "low";
        }
        else if(directions[x]["high_output"] == 2)
        {
            output2_bot = directions[x]["bot"];
            output2_bot_lh = "low";
        }
    }

    console.log("bot output 0 --> " + output0_bot);
    console.log("bot output 0 low or high --> " + output0_bot_lh);
    var output0;
    if(output0_bot_lh == "low")
        output0 = getLow(solved, output0_bot);
    else
        output0 = getHigh(solved, output0_bot);

    console.log("bot output 1 --> " + output1_bot);
    console.log("bot output 1 low or high --> " + output1_bot_lh);
    var output1;
    if(output1_bot_lh == "low")
        output1 = getLow(solved, output1_bot);
    else
        output1 = getHigh(solved, output0_bot);

    console.log("bot output 2 --> " + output2_bot);
    console.log("bot output 2 low or high --> " + output2_bot_lh);
    var output2;
    if(output2_bot_lh == "low")
        output2 = getLow(solved, output2_bot);
    else
        output2 = getHigh(solved, output2_bot);

    console.log("chip output 0 --> " + output0);
    console.log("chip output 1 --> " + output1);
    console.log("chip output 2 --> " + output2);

    var m = output0 * output1 * output2;
    console.log("output0 * output1 * output2 = " + m);

    //for(var x in solved)
    //    console.log(solved[x]);
}

var bots = [];
for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    bots.push(obj);
}
classify(bots);