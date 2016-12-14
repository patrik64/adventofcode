var md5 = require('./md5');
var input = "zpqevtbw";

var cacheHash = {};

function getTripletChar(str)
{
    for(var i = 0; i < str.length-2; i++)
    {
        var ch1 = str[i];
        var ch2 = str[i+1];
        var ch3 = str[i+2];
        if(ch1 == ch2 && ch2 == ch3 )
          return ch1;
    }
    return 'z';
}

function has5(str, ch)
{
    for(var i = 0; i < str.length-4; i++)
    {
        var ch1 = str[i];
        var ch2 = str[i+1];
        var ch3 = str[i+2];
        var ch4 = str[i+3];
        var ch5 = str[i+4];
        if(ch == ch1 && ch1 == ch2 && ch2 == ch3 && ch3 == ch4 && ch4 == ch5)
            return true;
    }
    return false;
}

function hash2017(str)
{
    if(cacheHash[str] === undefined)
    {
        var h = str;
        for(var i = 0; i < 2017; i++)
            h = md5.md5(h);

        cacheHash[str] = h;
        return h;
    }
    return cacheHash[str];
}

function findFirst(input, counter)
{
    var test = input + counter.toString();
    var hash = hash2017(test);
    return getTripletChar(hash);
}

function findSecond(input, ch, cnt)
{
    var i = cnt;
    while(i <= (cnt + 1000))
    {
        var test = input + i.toString();
        var hash = hash2017(test);
        if(has5(hash, ch))
            return true;
        i++;
    }
    return false;
}

var counter = 0;
var password = '';
var keys = [];

while(keys.length < 64)
{
    var ch = findFirst(input, counter);
    if(ch != 'z')
    {
        if(findSecond(input, ch, counter + 1))
        {
            console.log("key : " + (keys.length+1).toString() + " --> " + counter);
            keys.push(counter);
        }
    }
    counter++;
}