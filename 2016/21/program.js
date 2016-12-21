var fs = require('fs');
 
var input = fs.readFileSync('Day21.in', 'utf8');
var arr = input.split('\n');

function reverseString(str) 
{
  return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

String.prototype.replaceAt=function(index, character) 
{
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function parse(str)
{
    var op;
    var param1;
    var param2;
    var param3;

    if(str.substring(0,6) == "rotate")
    {
        op = "rotate";
        if(str[7] == "l")
        {
            param1 = "left";
            param2 = str[12];
        }
        else if(str[7] == "r")
        {
            param1 = "right";
            param2 = str[13];
        }
        else
        {
            param1 = "position";
            param2 = str[str.length-1];
        }
    }
    if(str.substring(0,7) == "reverse")
    {
        op = "reverse";
        param1 = str[18];
        param2 = str[str.length-1];
    }
    else if(str.substring(0,4) == "swap")
    {
        op = "swap";
        if(str[5] == 'p')
        {
            param1 = "position";
            param2 = str[14];
            param3 = str[str.length-1];
        }
        else if(str[5] == 'l')
        {
            param1 = "letter";
            param2 = str[12];
            param3 = str[str.length-1];
        }
    }
    else if(str.substring(0,4) == "move")
    {
        op = "move";
        param1 = str[14];
        param2 = str[str.length-1];
    }
        
    var ret = {"op" : op, "param1" : param1, "param2" : param2, "param3" : param3 };
    return ret;
}

function swapPos(str, pos1, pos2)
{
    var chPos1 = str[pos1];
    var chPos2 = str[pos2];
    str = str.replaceAt(pos1, chPos2);
    str = str.replaceAt(pos2, chPos1);
    return str;
}

function move(str, inst)
{
    var arr = str.split('');
    var idx1 = Number(inst.param1);
    var idx2 = Number(inst.param2);

    var ch = arr[idx1];
    arr.splice(idx1,1);
    arr.splice(idx2, 0, ch);
    str = arr.join('');

    return str;
}

function swap(str, inst)
{
    if(inst.param1 == "position")
    {
        var pos1 = Number(inst.param2);
        var pos2 = Number(inst.param3);
    }
    else if(inst.param1 == "letter")
    {
        var pos1 = str.indexOf(inst.param2);
        var pos2 = str.indexOf(inst.param3);
    }
    str = swapPos(str, pos1, pos2);
    return str;
}

function rotate(str, inst)
{
    var arr = str.split('');

    if(inst.param1 == "left")
    {
        var steps = Number(inst.param2);
        while(steps > 0)
        {
            var ch = arr.shift();
            arr.push(ch);
            steps--;
        }
    }
    else if(inst.param1 == "right")
    {
        var steps = Number(inst.param2);
        while(steps > 0)
        {
            var ch = arr.pop();
            arr.unshift(ch);
            steps--;
        }
    }
    else if(inst.param1 == "position")
    {
        var idx = str.indexOf(inst.param2);
        var additional = false;
        if(idx > 3)
            additional = true;

        var steps = idx+1;
        while(steps > 0)
        {
            var ch = arr.pop();
            arr.unshift(ch);
            steps--;
        }
        if(additional)
        {
            var ch = arr.pop();
            arr.unshift(ch);
        }
    }
    str = arr.join('');
    return str;
}

function reverse(str, inst)
{
    var pos1 = Number(inst.param1);
    var pos2 = Number(inst.param2);

    var str0 = str.substring(0, pos1);
    var str1 = str.substring(pos1, pos2+1);
    var str2 = str.substring(pos2+1);

    str1 = reverseString(str1);

    str = str0 + str1 + str2;

    return str;
}

var str = "abcdefgh";
console.log(str);

for (var i in arr)
{
    var obj = parse(arr[i]);
    
    if(obj.op == "move")
        str = move(str, obj);
    else if(obj.op == "swap")
        str = swap(str, obj);
    else if(obj.op == "rotate")
        str = rotate(str,obj);
    else if(obj.op == "reverse")
        str = reverse(str, obj);
    else
        console.log("ERROR!");    
}

console.log(str);