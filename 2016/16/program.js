var input = "10111100110001111";
var len1 = 272;
var len2 = 35651584;

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

var d0 = dragon(input);

var d1 = d0;
while(d1.length <= len1)
    d1 = dragon(d1);
d1 = d1.substring(0, len1);
var chs1 = checksum(d1);
while(isEven(chs1.length))
    chs1 = checksum(chs1);
console.log(chs1);

var d2 = d0;
while(d2.length <= len2)
    d2 = dragon(d2);
d2 = d2.substring(0, len2);
var chs2 = checksum(d2);
while(isEven(chs2.length))
    chs2 = checksum(chs2);
console.log(chs2);