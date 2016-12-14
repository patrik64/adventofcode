var fs = require('fs');
 
var input = fs.readFileSync('Day3.in', 'utf8');
var arr = input.split('\n');

var counter = 0;
for (i in arr)
{
    var triplet = arr[i].split(' ');
    var tri = [];
    for(x in triplet)
    {
        if(triplet[x].length > 0)
            tri.push(Number(triplet[x]));
    }

    var a,b,c;
    if( tri[0] > tri[1] )
    {
        b = tri[0];
        a = tri[1];
    }
    else
    { 
        a = tri[0];
        b = tri[1];
    }

    if( b > tri[2] )
    {
        c = b;
        b = tri[2];
    }
    else
    {
        c = tri[2];
    }

    if( a + b > c )
        counter = counter+1;
}

console.log(counter);
