var fs = require('fs');
 
var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split(',');

var lastDirection = '';
var distanceX = 0;
var distanceY = 0;
var coords = [[0,0]];
var lastX = 0;
var lastY = 0;

function inArray(arr, pair){
    for(var i = 0; i < arr.length; i++){
        if(arr[i][0] == pair[0] && arr[i][1] == pair[1])
            return true;
    }
    return false;
}

for(var x in arr){

    var str = arr[x].trim();
    var direction = str[0];
    var quant = Number(str.slice(1, str.length));
    var coordinate;

    var trueDirection;
    if(lastDirection.length == 0){
        trueDirection = direction;
    } else if(lastDirection == 'L'){
        if(direction == 'L')
            trueDirection = 'D';
        else
            trueDirection = 'U';
    } else if(lastDirection == 'R'){
        if(direction == 'L')
            trueDirection = 'U';
        else
            trueDirection = 'D';
    } else if(lastDirection == 'U'){
        trueDirection = direction;
    } else if(trueDirection == 'D'){
        if(direction == 'L')
            trueDirection = 'R';
        else
            trueDirection = 'L';
    }

    if(trueDirection == 'L')    
        distanceX = distanceX - quant;
    else if(trueDirection == 'R')
        distanceX = distanceX + quant;
    else if(trueDirection == 'U')
        distanceY = distanceY - quant;
    else
        distanceY = distanceY + quant;

    lastDirection = trueDirection;
}

var distance = Math.abs(distanceX) + Math.abs(distanceY);
console.log(distance);