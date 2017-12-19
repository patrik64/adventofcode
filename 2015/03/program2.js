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

var x1 = 0;
var y1 = 0;

var x2 = 0;
var y2 = 0;
dict = {};

var key = createKey(x1,y1);

dict[key] = 1;

for(var i = 0; i < mvs.length; i++)
{
    var m = mvs[i];
    if( m == 'v')
        y1--;
    else if( m == '^')
        y1++;
    else if( m == '>')
        x1--;
    else if( m == '<')
        x1++;
    else 
        console.log("error!!");
    
    var key1 = createKey(x1,y1);
        
    if(key1 in dict)
        dict[key1]++;
    else
        dict[key1] = 1;

    i++;
    if(i < mvs.length)
    {
        m = mvs[i];
        if( m == 'v')
            y2--;
        else if( m == '^')
            y2++;
        else if( m == '>')
            x2--;
        else if( m == '<')
            x2++;
        else 
            console.log("error!!");

        var key2 = createKey(x2,y2);

        if(key2 in dict)
            dict[key2]++;
        else
            dict[key2] = 1;
    }
}

console.log(Object.keys(dict).length);