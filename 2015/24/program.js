function arrSum(arr)
{
    var ret = 0;
    for(var i = 0; i < arr.length; i++)
        ret += arr[i];
    return ret;
}

var input = [
1,
2,
3,
5,
7,
13,
17,
19,
23,
29,
31,
37,
41,
43,
53,
59,
61,
67,
71,
73,
79,
83,
89,
97,
101,
103,
107,
109,
113
];

var sum = arrSum(input);
var third = sum / 3;

var currQE = Number.MAX_SAFE_INTEGER;
for(var i = 0; i < 1000000; i++)
{
    input.sort(function() {return 0.5 - Math.random()});
    var a1 = input[0]
    var a2 = input[1];
    var a3 = input[2];
    var a4 = input[3];
    var a5 = input[4];
    var a6 = input[5];

    if((a1+a2+a3+a4+a5+a6) == third)
    {
        var QE = a1*a2*a3*a4*a5*a6;
        if(QE < currQE)
            currQE = QE;
    }
}

console.log(currQE);