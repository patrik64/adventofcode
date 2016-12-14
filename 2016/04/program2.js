var fs = require('fs');
 
var input = fs.readFileSync('Day4.in', 'utf8');
var arr = input.split('\n');

function reverseString(str) 
{
  return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

function parse(str)
{
    var inChecksum = false;
    var inNumber = false;
    var strChecksum = '';
    var strId = '';
    var strCode = '';

    for(var i = str.length-1; i >= 0; i--)
    {
        var ch = str[i];
        if(ch == ']' && !inChecksum)
        {
            inChecksum = true;
        }
        else if(inChecksum && ch == '[')
        {
            inChecksum = false;
            inNumber = true;
        }
        else if(inChecksum)
        {
            strChecksum += ch;
        }
        else if(inNumber && ch != '-')
        {
            strId += ch;
        }
        else if(inNumber && ch == '-')
        {
            inNumber = false;
        }
        else
        {
            strCode += ch;
        }
    }
    strChecksum = reverseString(strChecksum);
    strId = reverseString(strId);
    strCode = reverseString(strCode);
    var ret = { "checksum" : strChecksum, "id" : strId, "code" : strCode };
    return ret;
}

function shiftCipher(str, id)
{
    var ret = '';
    for(var s in str)
    {
        var ch = str[s];
        var c = '';
        if(ch == '-')
            c = ' ';
        else
        {
            var n = ((ch.charCodeAt(0)- 97 + Number(id)) % 26) + 97;
            c = String.fromCharCode(n);   
        }
        ret += c;
    }
    return ret;
}

var all;
for (i in arr)
{
    var obj = parse(arr[i]);    
    var str = obj["code"];
    var id = obj["id"];
    var text = shiftCipher(str, id);
    if(text.indexOf("north") > -1)
    {
        console.log(text);
        console.log(id);
    }
    all += text;
    all += '\n';
}

var stream = fs.createWriteStream("all.txt");
stream.once('open', function(fd) {
  stream.write(all);
  stream.end();
});
