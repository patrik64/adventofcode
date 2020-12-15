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
        let cbag = '';
        [cbag, idx] = getBagName(str, idx);
        idx++;
        cont.push(cbag);
        idx = hasMoreBags(str, idx);
        while (idx > 0 ) {
            let cbag = '';
            [cbag, idx] = getBagName(str, idx);
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
            idx += 4;
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

function containsBag(bags, inputBag, testBag) {
    for (let x in bags) {
        if(x === testBag && x!== inputBag) {
            if (isInArray(inputBag, bags[x])) {
                return true;
            }
            for (let y in bags[x] ) {
                let t = bags[x][y]
                if(containsBag(bags, inputBag, t))
                    return true;
            }
        }
    }
    return false;
}

let bags = {}

for (let i in arr) {
    let line = arr[i];
    let obj = parse(line);
    bags[obj.bagColor] = obj.contains;
}

let inputBag = "shiny-gold";

let count = 0;
for (let x in bags) {
    if(x !== inputBag) {
        if(containsBag(bags, inputBag, x))
            count++;
    }
}

console.log(count)
