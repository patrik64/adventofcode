var fs = require('fs');
 
var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split(',');

var lastDirection = '';
var distanceX = 0;
var distanceY = 0;
var coords = [[0,0]];
var lastX = 0;
var lastY = 0;

function inArray(arr, pair)
{
    for(var i = 0; i < arr.length; i++)
    {
        if(arr[i][0] == pair[0] && arr[i][1] == pair[1])
            return true;
    }
    return false;
}

function checkCoordinate(coords, coordinate)
{
    if(inArray(coords, coordinate))
    {
        //console.log(coordinate);
        var distance = Math.abs(coordinate[0]) + Math.abs(coordinate[1]);
        console.log(distance);
        return true;
    }
    return false;
}

for(var x in arr)
{
    var str = arr[x].trim();
    var direction = str[0];
    var quant = Number(str.slice(1, str.length));
    var coordinate;

    var trueDirection;
    if(lastDirection.length == 0)
    {
        trueDirection = direction;
    }
    else if(lastDirection == 'L')
    {
        if(direction == 'L')
            trueDirection = 'D';
        else
            trueDirection = 'U';
    }
    else if(lastDirection == 'R')
    {
        if(direction == 'L')
            trueDirection = 'U';
        else
            trueDirection = 'D';
    }
    else if(lastDirection == 'U')
    {
        trueDirection = direction;
    }
    else if(trueDirection == 'D')
    {
        if(direction == 'L')
            trueDirection = 'R';
        else
            trueDirection = 'L';
    }

    if(trueDirection == 'L')
    {
        for(var i = 1; i < quant+1; i++)
        {
            lastX = lastX - 1;
            coordinate = [lastX, lastY];
            if(checkCoordinate(coords, coordinate))
                process.exit();
            coords.push(coordinate);    
        }
        
        distanceX = distanceX - quant;
    }
    else if(trueDirection == 'R')
    {
        for(var i = 1; i < quant+1; i++)
        {
            lastX = lastX + 1;
            coordinate = [lastX, lastY];
            if(checkCoordinate(coords, coordinate))
                process.exit();
            coords.push(coordinate);    
        }

        distanceX = distanceX + quant;
    }
    else if(trueDirection == 'U')
    {
        for(var i = 1; i < quant+1; i++)
        {
            lastY = lastY - 1;
            coordinate = [lastX, lastY];
            if(checkCoordinate(coords, coordinate))
                process.exit();
            coords.push(coordinate);    
        }
        distanceY = distanceY - quant;
    }
    else
    {
        for(var i = 1; i < quant+1; i++)
        {
            lastY = lastY + 1;
            coordinate = [lastX, lastY];
            if(checkCoordinate(coords, coordinate))
                process.exit();
            coords.push(coordinate);    
        }
        distanceY = distanceY + quant;
    }
    lastDirection = trueDirection;
}

var distance = Math.abs(distanceX) + Math.abs(distanceY);
console.log(distance);