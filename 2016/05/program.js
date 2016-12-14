var md5 = require('./md5');
var input = "reyedfim";

var counter = 0;
var password = '';
for(;;)
{
    var test = input + counter.toString();
    var hash = md5.md5(test);
    if(hash.indexOf('00000') == 0)
    {
        console.log(hash);
        password += hash[5];
        if(password.length == 8)
        {
          console.log("ID --> " + input);
          console.log("password --> " + password);
          process.exit();
        }
    }    
    counter++;
}