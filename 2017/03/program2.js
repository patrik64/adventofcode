var input = 361527;

var mtx = [];
var dim = 9;

for(var i = 0; i < dim; i++)
{
    mtx[i] = [];
    for(var j = 0; j < dim; j++)
    {
        mtx[i].push(-1);
    }
}

function printMatrix(m, dim)
{
    for(var i = 0; i < dim; i++)
    {
        var str = "";
        for(var j = 0; j < dim; j++)
        {
            var n = (mtx[i][j]);
            var s = "";
            s += n;
            while(s.length < 7)
            s+= " ";
            str += s;
        }
        console.log(str);
    }
}

var center = Math.floor(dim/2);

mtx[center][center] = 1;

function fillSquare(m, x, y)
{
    var val = 0;
    //left
    if(x > 0)
    {
        var valL = m[y][x-1];
        if(valL > 0)
            val += valL;
    }
    //up
    if(y > 0)
    {
        var valU = m[y-1][x];
        if(valU > 0)
            val += valU;
    }
    //down
    if(y < (dim-1))
    {
        var valD = m[y+1][x];
        if(valD > 0)
        val += valD;
    }
    //right
    if(x < dim-1)
    {
        var valR = m[y][x+1];
        if(valR > 0)
        val += valR; 
    }

    //leftup
    if(x > 0 && y > 0)
    {
        var valLU = m[y-1][x-1];
        if(valLU > 0)
            val += valLU;
    }
    //leftdown
    if(x > 0 && (y < dim - 1))
    {
        var valLD = m[y+1][x-1];
        if(valLD > 0)
            val += valLD;
    }
    //rightup
    if((x < dim - 1) && y > 0)
    {
        var valRU = m[y-1][x+1];
        if(valRU > 0)
            val += valRU;
    }
    //rightdown
    if((x < (dim - 1)) && (y < (dim -1)))
    {
        var valRD = m[y+1][x+1];
        if(valRD > 0)
            val += valRD;
    }
    
    m[y][x] = val;
}
fillSquare(mtx, center+1, center);
fillSquare(mtx, center+1, center-1);
fillSquare(mtx, center,   center-1);
fillSquare(mtx, center-1, center-1);
fillSquare(mtx, center-1, center);
fillSquare(mtx, center-1, center+1);
fillSquare(mtx, center,   center+1);
fillSquare(mtx, center+1, center+1);

fillSquare(mtx, center+2, center+1);
fillSquare(mtx, center+2, center);
fillSquare(mtx, center+2, center-1);
fillSquare(mtx, center+2, center-2);
fillSquare(mtx, center+1, center-2);
fillSquare(mtx, center,   center-2);
fillSquare(mtx, center-1, center-2);
fillSquare(mtx, center-2, center-2);
fillSquare(mtx, center-2, center-1);
fillSquare(mtx, center-2, center);
fillSquare(mtx, center-2, center+1);
fillSquare(mtx, center-2, center+2);
fillSquare(mtx, center-1, center+2);
fillSquare(mtx, center,   center+2);
fillSquare(mtx, center+1, center+2);
fillSquare(mtx, center+2, center+2);

fillSquare(mtx, center+3, center+2);
fillSquare(mtx, center+3, center+1);
fillSquare(mtx, center+3, center);
fillSquare(mtx, center+3, center-1);
fillSquare(mtx, center+3, center-2);
fillSquare(mtx, center+3, center-3);
fillSquare(mtx, center+2, center-3);
fillSquare(mtx, center+1, center-3);
fillSquare(mtx, center  , center-3);
fillSquare(mtx, center-1, center-3);
fillSquare(mtx, center-2, center-3);
fillSquare(mtx, center-3, center-3);
fillSquare(mtx, center-3, center-2);
fillSquare(mtx, center-3, center-1);
fillSquare(mtx, center-3, center);
fillSquare(mtx, center-3, center+1);
fillSquare(mtx, center-3, center+2);
fillSquare(mtx, center-3, center+3);
fillSquare(mtx, center-2, center+3);
fillSquare(mtx, center-1, center+3);
fillSquare(mtx, center  , center+3);
fillSquare(mtx, center+1, center+3);
fillSquare(mtx, center+2, center+3);
fillSquare(mtx, center+3, center+3);

fillSquare(mtx, center+4, center+3);
fillSquare(mtx, center+4, center+2);
fillSquare(mtx, center+4, center+1);
fillSquare(mtx, center+4, center);
fillSquare(mtx, center+4, center-1);
fillSquare(mtx, center+4, center-2);
fillSquare(mtx, center+4, center-3);
fillSquare(mtx, center+4, center-4);
fillSquare(mtx, center+3, center-4);
fillSquare(mtx, center+2, center-4);
fillSquare(mtx, center+1, center-4);
fillSquare(mtx, center  , center-4);
fillSquare(mtx, center-1, center-4);
fillSquare(mtx, center-2, center-4);
fillSquare(mtx, center-3, center-4);

printMatrix(mtx, dim);

console.log("result -> " + mtx[center-4][center-3]);