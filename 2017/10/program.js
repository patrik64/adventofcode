var input = [97,167,54,178,2,11,209,174,119,248,254,0,255,1,64,190];

var lst = [];
for(var i = 0;i < 256;i++)
    lst.push(i);

var skip = 0;
var pos = 0;

function rotate(pos, skip, len, lst)
{
    var ret;
    var subarr = [];
    var p = pos;
    for(var i = 0; i < len; i++)
    {
        if(p > lst.length-1)
            p = 0;

        subarr.push(lst[p]);
        p++;
    }

    subarr.reverse();
    p = pos;
    for(var x in subarr)
    {
        var el = subarr[x];
        if(p > lst.length-1)
            p = 0;
        lst[p] = el;
        p++;
    }
    p += skip;
    skip++;

    while( p >= lst.length )
        p = p - lst.length; 
    
    ret = { "pos": p, "skip": skip, "lst": lst };
    return ret;
}

for(var x in input)
{
    var l = input[x];
    var res = rotate(pos, skip, l, lst);
    pos = res.pos;
    skip = res.skip;
    lst = res.lst;
}

var res = lst[0]*lst[1];
console.log(res);

