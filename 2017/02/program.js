var fs = require('fs');

var input = fs.readFileSync('Day2.in', 'utf8');
var arr = input.split('\n');

var sum = 0;
for(var i = 0; i < arr.length; i++)
{
    var line = arr[i];
    var arrN = line.split('	').map(function(item) {
        return parseInt(item, 10);
    });

    var max = arrN[0];
    var min = arrN[0];

    for(var j = 0; j < arrN.length; j++)
    {
        if(arrN[j] < min)
            min = arrN[j];
        if(arrN[j] > max)
            max = arrN[j];
    
    }
    var diff = max - min;
    sum = sum + diff;
}
console.log(sum);