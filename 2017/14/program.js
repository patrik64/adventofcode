var input = 'stpzcrnm';

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

function knothash(str)
{
    var lengths = [];
    for(var s in str)
    {
        var cc = str.charCodeAt(s);
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
    
    return res;
}

function hex2bin(ch)
{
    switch(ch)
    {
        case '0':
            return '0000';
        case '1':
            return '0001';
        case '2':
            return '0010';
        case '3':
            return '0011';
        case '4':
            return '0100';
        case '5':
            return '0101';
        case '6':
            return '0110';
        case '7':
            return '0111';
        case '8':
            return '1000';
        case '9':
            return '1001';
        case 'a':
            return '1010';
        case 'b':
            return '1011';
        case 'c':
            return '1100';
        case 'd':
            return '1101';
        case 'e':
            return '1110';
        case 'f':
            return '1111';
        default:
            console.log('error!!!'); 
    }
}

var arr = [];
var sum = 0;
for(var i = 0; i < 128; i++)
{
    var x = input + '-' + i.toString();
    var kx = knothash(x);

    var r = '';
    for(var ii = 0; ii < kx.length; ii++)
    {
        var ch = kx[ii];
        var bn = hex2bin(ch);
        r += bn;
    }

    for(var c in r)
    {
        var ch = r[c];
        if(ch == '1')
            sum++;
    }
}

console.log(sum);  
