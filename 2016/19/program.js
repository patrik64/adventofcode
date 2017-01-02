var input = 3001330;
var arr = [];

for(var k = 0; k < input; k++)
    arr.push(k);

while(arr.length > 1)
{
    arr.splice(1, 1); 
    var x = arr.shift();
    arr.push(x);
}

console.log(arr[0]+1);
