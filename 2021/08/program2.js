let fs = require('fs');
let input = fs.readFileSync('Day8.in', 'utf8');
let arr = input.split('\n');

function get235(n, aaaa, bb, cc, dddd, ee, ff, gggg) {
    n = n.replace(aaaa, '');
    n = n.replace(dddd, '');
    n = n.replace(gggg, '');

    n = n.replace(bb, '');
    if(n.length === 1) return '5';

    n = n.replace(ee, '');
    if(n.length === 1) return '2';
    return '3';
}

function get069(n, aaaa, bb, cc, dddd, ee, ff, gggg) {
    n = n.replace(dddd, '');
    if(n.length === 6) return '0';

    n = n.replace(ee, '');
    if(n.length === 5) return '9';

    return '6';
}

let p8 = '';
let p1 = '';
let p7 = '';
let p4 = '';
let p069 = [];
let p235 = [];

let aaaa = '';
let bb = '';
let cc ='';
let dddd = '';
let ee = '';
let ff = '';
let gggg = '';

let sum = 0;

for(let x in arr) {
    let outputs = arr[x].split(' ');
    for(let i = 0; i < 10; i++) {
        let pattern = outputs[i];
        if(pattern.length === 2) {
            p1 = pattern;
        }
        if(pattern.length === 3) {
            p7 = pattern;
        }
        if(pattern.length === 4) {
            p4 = pattern;
        }
        if(pattern.length === 5) {
            p235.push(pattern);
        }
        if(pattern.length === 6) {
            p069.push(pattern);
        }
        if(pattern.length === 7) {
            p8 = pattern;
        }
    
    }
    
   
    cc = p1[0];
    ff = p1[1];
    
    p7 = p7.replace(cc, '');
    p7 = p7.replace(ff, '');
    aaaa = p7;

    p4 = p4.replace(cc, '');
    p4 = p4.replace(ff, '');
    let bbdddd1 = p4[0];
    let bbdddd2 = p4[1];

    let ggggdddd1 = '';
    let ggggdddd2 = '';

    for(let p in p235) {
        let test = p235[p];
        test = test.replace(cc, '');
        test = test.replace(ff, '');
        test = test.replace(aaaa, '');
        if(test.length === 2) {
            ggggdddd1 = test[0];
            ggggdddd2 = test[1];
            break;
        }
    }

    if(bbdddd1 === ggggdddd1){
        dddd = bbdddd1;
        bb = bbdddd2;
        gggg = ggggdddd2;
    } else if(bbdddd2 === ggggdddd1){
            dddd = bbdddd2;
            bb = bbdddd1;
            gggg = ggggdddd2;
    } else if(bbdddd1 === ggggdddd2){
        dddd = bbdddd1;
        bb = bbdddd2;
        gggg = ggggdddd1;
    } else {
        dddd = bbdddd2;
        bb = bbdddd1;
        gggg = ggggdddd1;
    }

    let all = 'abcdefg';
    all = all.replace(aaaa, '');
    all = all.replace(bb, '');    
    all = all.replace(cc, '');    
    all = all.replace(dddd, '');    
    all = all.replace(ff, '');    
    all = all.replace(gggg, '');
    ee = all;

    p069 = [];
    p235 = [];

    let final = '';
    for(let i = 11; i < 15; i++) {
        let num = outputs[i];
        if(num.length === 2) {
            final += '1';
        } else if(num.length === 3) {
            final += '7';
        } else if(num.length === 4) {
            final += '4'
        } else if(num.length === 7) {
            final += '8'
        } else if(num.length === 5) {
            final += get235(num, aaaa, bb, cc, dddd, ee, ff, gggg);
        } else if(num.length === 6) {
            final += get069(num, aaaa, bb, cc, dddd, ee, ff, gggg);
        }
    }
    sum += Number(final);
}

console.log(sum);


