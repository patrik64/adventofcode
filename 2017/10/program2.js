var input = '97,167,54,178,2,11,209,174,119,248,254,0,255,1,64,190';

var lengths = [];
for(var s in input)
{
    var cc = input.charCodeAt(s);
    lengths.push(cc);
}

var suffix = [17, 31, 73, 47, 23];

for(var x in suffix)
    lengths.push(suffix[x]);

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

//64 rounds
for(var i = 0; i < 64; i++)
{
    for(var x in lengths)
    {
        var l = lengths[x];
        var res = rotate(pos, skip, l, lst);
        pos = res.pos;
        skip = res.skip;
        lst = res.lst;
    }
}

//dense hash
var dense = [];
for(var i = 0; i < 256; i+= 16)
{
    var d = lst[i] ^ lst[i+1] ^ lst[i+2] ^ lst[i+3] ^ lst[i+4] ^ lst[i+5] ^ lst[i+6] ^ lst[i+7] ^ lst[i+8] ^ lst[i+9] ^ lst[i+10] ^ lst[i+11] ^ lst[i+12] ^ lst[i+13] ^ lst[i+14] ^ lst[i+15];
    dense.push(d);
}

var res = '';
for(var x in dense)
{
    var num = dense[x];
    hexString = num.toString(16);
    
    if(hexString.length < 2)
        hexString = '0' + hexString;
    res += hexString;
}

console.log(res);