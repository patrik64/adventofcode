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

    var dd = 0;

    for(var j = 0; j < arrN.length-1; j++)
    {
        for(var k = 1; k < arrN.length; k++)
        {
            var a = arrN[j];
            var b = arrN[k];

            if(j != k)
            {
                if(a % b == 0)
                {
                    dd = a/b;
                    break;
                }
                if(b % a == 0)
                {
                    dd = b/a;
                    break;
                }
            }
        }    
    }
    sum += dd;
}

console.log(sum);