var fs = require('fs');

var input = fs.readFileSync('Day21.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var inRule = '';
    var outRule = '';
    
    while(str[idx] != '=')
    {
        inRule += str[idx];
        idx++;
    }
    inRule = inRule.trim();
    idx += 3;

    while(idx < str.length)
    {
        outRule += str[idx];
        idx++;
    }
    outRule = outRule.trim();
    
    var ret = { "inRule" : inRule, 
                "outRule" : outRule
             };
    return ret;
}

function str2mtx(str)
{
    var ret = [];
    var idx = 0;
    while(idx < str.length)
    {
        var row = [];
        while(str[idx] != '/' && idx < str.length)
        {
            row.push(str[idx]);
            idx++;
        }
        idx++;
        ret.push(row);
    }
    return ret;
}

function mtx2str(mtx)
{
    var ret = '';
    for(var i = 0; i < mtx.length; i++)
    {
        var row = mtx[i];
        ret += row.join('');
        if(i < mtx.length-1)
            ret+= '/';
    }
    return ret;
}

function printMtx(m)
{
    for(var i = 0; i < m.length; i++)
    {
        var str = m[i].join(' ');
        console.log(str);
    }        
}


function flip(str)
{
    var mtx = str2mtx(str);

    var flipped = [];
    for(var i = 0; i < mtx.length; i++)
    {
        var row = mtx[i];
        row.reverse();
        flipped.push(row);
    }

    var ret = mtx2str(flipped);
    return ret;
}

function rotate(str)
{
    var mtx = str2mtx(str);
    var dim = mtx.length;

    var rot = [];
    for(r = 0; r < dim; r++)
        rot.push([]);

    for(var i = 0; i < dim; i++)
    {
        var row = mtx[i];
        for(var j = 0; j < dim; j ++)
        {
            var el = row[dim - j - 1 ];
            rot[j].push(el);
        }
    }

    var ret = mtx2str(rot);
    return ret;
}

function mtxJoin(m1, m2, m3, m4)
{
    var ret = [];
    for(var i = 0; i < m1.length; i++)
    {
        var row1 = m1[i];
        var row2 = m2[i];
        var row = row1.concat(row2);
        ret.push(row);
    }
    for(var i = 0; i < m3.length; i++)
    {
        var row1 = m3[i];
        var row2 = m4[i];
        var row = row1.concat(row2);
        ret.push(row);
    }
    return ret;
}

function mtxJoin3( m1, m2, m3, 
                   m4, m5, m6,
                   m7, m8, m9 )
{
    var ret = [];
    for(var i = 0; i < m1.length; i++)
    {
        var row1 = m1[i];
        var row2 = m2[i];
        var row3 = m3[i]
        var row = row1.concat(row2).concat(row3);
        ret.push(row);
    }
    for(var i = 0; i < m4.length; i++)
    {
        var row1 = m4[i];
        var row2 = m5[i];
        var row3 = m6[i];
        var row = row1.concat(row2).concat(row3);
        ret.push(row);
    }
    for(var i = 0; i < m7.length; i++)
    {
        var row1 = m7[i];
        var row2 = m8[i];
        var row3 = m9[i];
        var row = row1.concat(row2).concat(row3);
        ret.push(row);
    }
    return ret;
}

function calcPixels(str)
{
    var sum = 0;
    for(var i = 0; i < str.length; i++)
    {
        if(str[i] == '#')
            sum ++;
    }
    return sum;
}

function genInputPatterns(str)
{
    var ret = {};

    str = str.trim();

    ret[str] = str;

    var test = str;
    for(var i = 0; i < 3; i++)
    {
        var test = rotate(test);
        ret[test] = str;
    }

    var test = flip(str);
    ret[test] = str;

    for(var i = 0; i < 3; i++)
    {
        test = rotate(test);
        ret[test] = str;
    }
    
    return ret;
}

function iterate(str, rules)
{
    var ret = '';
    str = str.trim();

    var len = str2mtx(str).length;
    
    if(len == 2 || len == 3)
    {
        var combi = genInputPatterns(str);

        for(var r in rules)
        {
            var rule = rules[r];
            if(rule.inRule in combi)
                return rules[r].outRule;
        }
    }
    else if((len % 3) == 0)
    {
        var hdim = len / 3;
        var m1 = [];
        var m2 = [];
        var m3 = [];
        var m4 = [];
        var m5 = [];
        var m6 = [];
        var m7 = [];
        var m8 = [];
        var m9 = [];

        var m = str2mtx(str);

        for(var i = 0; i < hdim; i++)
        {
            var r1 = m[i];
            var r2 = m[i+hdim];
            var r3 = m[i+hdim+hdim];
            var rm1 = [];
            var rm2 = [];
            var rm3 = [];
            var rm4 = [];
            var rm5 = [];
            var rm6 = [];
            var rm7 = [];
            var rm8 = [];
            var rm9 = [];

            for(var j = 0; j < hdim; j++)
            {
                rm1.push(r1[j]);
                rm2.push(r1[j+hdim]);
                rm3.push(r1[j+hdim+hdim]);

                rm4.push(r2[j]);
                rm5.push(r2[j+hdim]);
                rm6.push(r2[j+hdim+hdim]);

                rm7.push(r3[j]);
                rm8.push(r3[j+hdim]);
                rm9.push(r3[j+hdim+hdim]);
            }
            m1.push(rm1);
            m2.push(rm2);
            m3.push(rm3);
            m4.push(rm4);
            m5.push(rm5);
            m6.push(rm6);
            m7.push(rm7);
            m8.push(rm8);
            m9.push(rm9);
        }

        var res1 = iterate(mtx2str(m1), rules);
        var res2 = iterate(mtx2str(m2), rules);
        var res3 = iterate(mtx2str(m3), rules);
        var res4 = iterate(mtx2str(m4), rules);
        var res5 = iterate(mtx2str(m5), rules);
        var res6 = iterate(mtx2str(m6), rules);
        var res7 = iterate(mtx2str(m7), rules);
        var res8 = iterate(mtx2str(m8), rules);
        var res9 = iterate(mtx2str(m9), rules);

        m1 = str2mtx(res1);
        m2 = str2mtx(res2);
        m3 = str2mtx(res3);
        m4 = str2mtx(res4);
        m5 = str2mtx(res5);
        m6 = str2mtx(res6);
        m7 = str2mtx(res7);
        m8 = str2mtx(res8);
        m9 = str2mtx(res9);

        var mtx = mtxJoin3( m1, m2, m3, 
                            m4, m5, m6,
                            m7, m8, m9 );

        return mtx2str(mtx);
    }
    else if((len % 2) == 0)
    {
        var hdim = len / 2;
        var m1 = [];
        var m2 = [];
        var m3 = [];
        var m4 = [];

        var m = str2mtx(str);

        for(var i = 0; i < hdim; i++)
        {
            var r1 = m[i];
            var r2 = m[i+hdim];
            var rm1 = [];
            var rm2 = [];
            var rm3 = [];
            var rm4 = [];

            for(var j = 0; j < hdim; j++)
            {
                rm1.push(r1[j]);
                rm2.push(r1[j+hdim]);
                rm3.push(r2[j]);
                rm4.push(r2[j+hdim]);
            }
            m1.push(rm1);
            m2.push(rm2);
            m3.push(rm3);
            m4.push(rm4);
        }

        var res1 = iterate(mtx2str(m1), rules);
        var res2 = iterate(mtx2str(m2), rules);
        var res3 = iterate(mtx2str(m3), rules);
        var res4 = iterate(mtx2str(m4), rules);

        m1 = str2mtx(res1);
        m2 = str2mtx(res2);
        m3 = str2mtx(res3);
        m4 = str2mtx(res4);

        var mtx = mtxJoin(m1, m2, m3, m4 );
        return mtx2str(mtx);
    }
    return "error";
}

var rules = [];

for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   rules.push(obj);
   rules[obj.inRule] = obj.outRule;
}

var res = ".#./..#/###";

for(var i = 0; i < 5; i++)
    res = iterate(res, rules);

console.log(calcPixels(res));