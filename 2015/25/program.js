var mtx = [];

dim = 5975;

for(var i = 0; i < dim; i++ )
{
    var row = [];
    for(var j = 0; j < dim; j++)
    {
        row.push(0);
    }
    mtx.push(row);
}

var x = 20151125;
var mult = 252533;
var modd = 33554393;

var i = 0;
var j = 0;
for(var k = 0; k < dim; k++)
{
    j = k;
    i = 0;
    for(var l = 0; l <= k; l++)
    {
        mtx[j][i] = x;
        x = x*mult;
        x = x % modd;
        j--;
        i++;
    }
}

var xx = 3029;
var yy = 2947;
xx--;
yy--;

console.log(mtx[yy][xx]);