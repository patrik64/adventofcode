var md5 = require('./md5');
var input = "reyedfim";

var counter = 0;
var password = ['.', '.', '.', '.', '.', '.', '.', '.' ];

for(;;)
{
    var test = input + counter.toString();
    var hash = md5.md5(test);
    if(hash.indexOf('00000') == 0)
    {
        var pos = Number(hash[5]);
        if(!isNaN(pos) && !(pos > 7) && password[pos] == '.')
        {
            var ch = hash[6];
            console.log(hash);
            password[pos] = ch;
            var cont = true;
            for(var x in password)
            {
              if(password[x] == '.')
                cont = false;
            }
            if(cont)
            {
                console.log("ID --> " + input);
                console.log("password --> " + password);
                process.exit();
            }
        }
    }    
    counter++;
}



