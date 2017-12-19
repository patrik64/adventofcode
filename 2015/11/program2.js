var input = 'hepxxyzz';

function reverseString(str) 
{
    return str.split("").reverse().join("");
}

function turn(str)
{
    var res = '';
    var s = reverseString(str);

    var pos = 0;
    var ch = s[0];
    var propagate = false;
    var chcode = ch.charCodeAt(0);
    if(chcode == 122)
    {
        chcode = 97;
        propagate = true;
        pos++;
    }
    else 
        chcode++;

    res += String.fromCharCode(chcode);
    
    while(propagate)
    {
        var cht = s[pos];
        var chtcd = cht.charCodeAt(0);
        if(chtcd == 122)
        {
            chtcd = 97;
            propagate = true;
            pos++;
        }
        else
        {
            chtcd++;
            propagate = false;
        }
        res += String.fromCharCode(chtcd);
    }
    
    res += s.substring(pos + 1, s.length);

    res = reverseString(res);
    return res;
}

function check1(str)
{
    for(var i = 0; i < str.length-2; i++)
    {
        var c1 = str[i].charCodeAt(0);
        var c2 = str[i+1].charCodeAt(0);
        var c3 = str[i+2].charCodeAt(0);
        if((c1 == (c2-1)) && (c2 == (c3-1)))
            return true;
    }
    return false;
}

function check2(str)
{
    for(var i = 0; i < str.length; i++)
    {
        var ch = str[i];
        if((ch == 'i') || (ch == 'l') || (ch == 'o'))
            return false;
    }
    return true;
}

function check3(str)
{
    var firstCh = '';
    for(var i = 0; i < str.length-1; i++)
    {
        var ch1 = str[i];
        var ch2 = str[i+1];
        if(ch1 == ch2 && firstCh.length == 0)
            firstCh = ch1;
        else if(ch1 == ch2 && firstCh != ch1)
            return true;
    }
    return false;
}

function check(str)
{
    if(!check1(str))
        return false;
    if(!check2(str))
        return false;
    if(!check3(str))
        return false;
    return true;
}

var test = turn(input);
while(!check(test))
    test = turn(test);
console.log(test);