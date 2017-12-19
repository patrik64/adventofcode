var input = 1321131112;

function turn(str)
{
    var res = '';
    var idx = 0;
    var ch = str[idx];
    var nr = 1;
    while(idx < str.length)
    {
        if((idx+1) < str.length)
        {
            var ch1 = str[idx+1];
            if(ch != ch1)
            {
                res += nr.toString() + ch;
                ch = ch1;
                nr = 1;
            }
            else
            {
                nr++;
            }
        }
        else
        {
            res += nr.toString() + ch;
            nr = 1;
        }
        idx++;
    }
    return res;
}

var res = input.toString();

for(var i = 0; i < 40; i++)
{
    res = turn(res);
}
console.log(res.length);