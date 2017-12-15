var factorA = 16807;
var factorB = 48271;
var dd = 2147483647;

var a = 722;
var b = 354;

var sum = 0;

for(var i = 0; i < 40000000; i++)
{
    a *= factorA;
    b *= factorB;

    a = a % dd;
    b = b % dd;

    var binA = a.toString(2);
    var binB = b.toString(2);

    while(binA.length < 17)
        binA = '0' + binA;
    while(binB.length < 17)
        binB = '0' + binB;

    binA = binA.slice(binA.length-16, binA.length);
    binB = binB.slice(binB.length-16, binB.length);

    if(binA == binB)
        sum++;
}

console.log(sum);