var fs = require('fs');
 
var input = fs.readFileSync('Day3.in', 'utf8');
var arr = input.split('\n');

function getTriangleNr(arr)
{
    var res = 0;

    for(var i = 0; i < arr.length; i=i+3)
    {
        var a,b,c;
        if( arr[i] > arr[i+1] )
        {
            b = arr[i];
            a = arr[i+1];
        }
        else
        { 
            a = arr[i];
            b = arr[i+1];
        }

        if( b > arr[i+2] )
        {
            c = b;
            b = arr[i+2];
        }
        else
        {
            c = arr[i+2];
        }

        if( (a + b) > c )
            res++;
        
    }
    return res;
}

var counter = 0;
var one = [];
var two = [];
var three = [];

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
    {
        counter = counter+1;
    }
    one.push(tri[0]);
    two.push(tri[1]);
    three.push(tri[2]);
}
var cum = [];
cum.push(one);
cum.push(two);
cum.push(three);
cum = [].concat.apply([], cum);
var cres = getTriangleNr(cum);
console.log(cres);

var res = getTriangleNr(one);
res += getTriangleNr(two);
res += getTriangleNr(three);
console.log(res);
