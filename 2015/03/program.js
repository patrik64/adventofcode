var fs = require('fs');

var input = fs.readFileSync('Day3.in', 'utf8');
var arr = input.split('\n');
var mvs = arr[0];

function createKey(x, y)
{
    var ret = '';
    if(x < 0)
        ret += 'm' + (Math.abs(x)).toString();
    else
        ret += 'p' + (Math.abs(x)).toString();

    ret += 'x';

    if(y < 0)
        ret += 'm' + (Math.abs(y)).toString();
    else
        ret += 'p' + (Math.abs(y)).toString();

    return ret;
}

var x = 0;
var y = 0;
dict = {};
var key = createKey(x, y);
dict[key] = 1;

for(var i = 0; i < mvs.length; i++)
{
    var m = mvs[i];
    if( m == 'v')
        y--;
    else if( m == '^')
        y++;
    else if( m == '>')
        x--;
    else if( m == '<')
        x++;
    else 
        console.log("error!!");

    key = createKey(x, y);

    if(key in dict)
        dict[key]++;
    else
        dict[key] = 1;
}

console.log(Object.keys(dict).length);