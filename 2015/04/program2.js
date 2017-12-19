var md5 = require('./md5');
var input = "iwrupvqb";
var counter = 1;
var password = '';
for(;;)
{
    var test = input + counter.toString();
    var hash = md5.md5(test);
    if(hash.indexOf('000000') == 0)
    {
        console.log(counter);
        process.exit();
    }    
    counter++;
}