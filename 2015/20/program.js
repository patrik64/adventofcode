function arrSum(arr)
{
    var ret = 0;
    for(var i = 0; i < arr.length; i++)
        ret += arr[i];
    return ret;
}

var arr = [];
var sz = 1000000;

for(var i = 0; i < sz; i++)
    arr.push(0);

var input = 29000000;
elf = 0;

while(elf < sz)
{
    for(var i = 0; i < sz; i++)
    {
        if((i*elf) >= sz)
            break;
        arr[i*elf] += (10 * elf);
    }
    elf++;
}

for(var i = 1; i < arr.length; i++)
{
    if(arr[i] >= input)
    {
        console.log(i);
        break;
    }
}