var fs = require('fs');

var input = fs.readFileSync('Day2.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    let ret = {};
    for(let i = 0; i < str.length; i++){
        let ch = str[i];
        if(ch in ret)
            ret[ch] += 1;
        else
            ret[ch] = 1;
    }
   return ret;
}

let lst = [];
for(var i in arr)
{
    lst.push(arr[i]);
}

function cmp(a,b){
    let diff = 0;
    for(let i = 0; i < a.length; i++)
    {
        let cha = a[i];
        let chb = b[i];
        if(cha != chb)
            diff += 1;
        if(diff > 1)
            return false;
    }
    if(diff == 1)
        return true;
    return false;
}

for(let j = 0; j < lst.length-1; j++)
{
    let a = lst[j];
    for(let k = 1; k < lst.length; k++)
    {
        let b = lst[k];
        if(cmp(a,b))
        {
            let res = '';
            for(let x = 0; x < a.length; x++)
            {
                if(a[x] == b[x])
                    res += a[x];
            }
            console.log(res);
            process.exit(0);
        }
    }
}