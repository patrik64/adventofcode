var input = 361527;

var i = 1;
var level = 0;
var sq = i*i;
while(sq < input)
{
    i += 2;
    sq = i*i;
    level++;
}
sq = (i-2)*(i-2);

var diffs = [];
var right = 1;
var up = 3;
var left = 5;
var down = 7;

right = (right*level) + sq;
diffs.push(Math.abs(input - right));

up = (up * level) + sq;
diffs.push(Math.abs(input - up));

left = (left * level) + sq;
diffs.push(Math.abs(input - left));

down = (down*level) + sq;
diffs.push(Math.abs(input - down));

diffs.sort(function(a, b){return a-b});

var res = diffs[0] + level;
console.log(res);