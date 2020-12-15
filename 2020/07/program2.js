let fs = require('fs');
let input = fs.readFileSync('Day7.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;
    let val = -1;

    let bag = '';
    [bag, idx] = getBagName(str, idx);

    if(str[idx] === ' ')
        idx += 14;

    val = str[idx];

    if(val === 'n') {
        return { "bagColor" : bag, "contains": []}
    } else {
        let cont = [];
        idx += 2;
        let cbag = {};
        let bc = '';
        [bc, idx] = getBagName(str, idx);
        idx++;
        cbag = { 'bagColor': bc, 'val' : Number(val) }
        cont.push(cbag);
        idx = hasMoreBags(str, idx);
        while (idx > 0 ) {
            val = str[idx];
            idx++;
            idx++;
            let cbag = {};
            let bc = '';
            [bc, idx] = getBagName(str, idx);
            cbag = { 'bagColor': bc, 'val' : Number(val) }
            cont.push(cbag);
            idx = hasMoreBags(str, idx);
        }
        return { "bagColor" : bag, "contains": cont}
    }
}

function hasMoreBags(str, idx) {
    while(str[idx] !== '.')
    {
        if(str[idx] === ',') {
            idx+=2;
            return idx;
        }
        idx++;
    }
    return -1;
}

function getBagName(str, idx) {
    let attr = '';
    let color = '';

    while(str[idx] !== ' ')
    {
        attr += str[idx];
        idx++;
    }
    attr.trim();
    idx ++;

    while(str[idx] != ' ')
    {
        color += str[idx];
        idx++;
    }
    color.trim();

    let bag = attr + '-' + color;
    return [bag, idx];
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function getBagCount(b, bags) {
    let res = 0;
    let arr = bags[b];
    for(let x in arr) {
        let bc = arr[x].bagColor;
        let val = arr[x].val;
        val += val * getBagCount(bc, bags);
        res += val;
    }
    return res;

}

let bags = {}

for (let i in arr) {
    let line = arr[i];
    let obj = parse(line);
    bags[obj.bagColor] = obj.contains;
}

let inputBag = 'shiny-gold';

let count = 0;

count += getBagCount('shiny-gold', bags);

console.log(count);
