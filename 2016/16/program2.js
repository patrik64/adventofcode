var input = "10111100110001111";
var len = 35651584;

function reverseString(str) 
{
    return str.split("").reverse().join("");
}

String.prototype.replaceAll = function(target, replacement) 
{
    return this.split(target).join(replacement);
}

function dragon(a)
{
    var b = a;
    b = reverseString(b);
    b = b.replaceAll('1', 'x');
    b = b.replaceAll('0', '1');
    b = b.replaceAll('x', '0');

    var ret = a + '0';
    ret += b;
    return ret;
}

function isEven(n)
{
   return n % 2 == 0;
}

function checksum(x)
{
    var ret = '';
    for( var i = 0; i < x.length; i = i+2 )
    {
        var ch1 = x[i];
        var ch2 = x[i+1];
        if(ch1 == ch2)
            ret += "1";
        else
            ret += "0";
    }
    return ret;
}

var d = dragon(input);
while(d.length <= len)
    d = dragon(d);
d = d.substring(0, len);
var chs = checksum(d);
while(isEven(chs.length))
    chs = checksum(chs);
console.log(chs);