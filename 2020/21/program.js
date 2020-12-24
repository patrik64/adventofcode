let fs = require('fs');
let input = fs.readFileSync('Day21.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;

    let ingredients = [];
    let ing = '';
    let allergens = [];
    let allrg = '';

    while(str[idx] !== '(') {
        let ch = str[idx];
        if(ch === ' ') {
            ingredients.push(ing);
            ing = '';
        } else {
            ing += str[idx];
        }
        idx++;

    }
    if(ing.length)
        ingredients.push(ing);
    idx += 10;

    while(str[idx] !== ')') {
        let ch = str[idx];
        if(ch === ',') {
            allrg = allrg.trim();
            allergens.push(allrg);
            allrg = '';
        } else {
            allrg += str[idx];
        }
        idx++;
    }

    if(allrg.length) {
        allrg = allrg.trim();
        allergens.push(allrg);
    }

    let ret = { 'ingredients': ingredients, 'allergens' : allergens };
    return ret;
}

function areAllUniqe(dict) {
    for(let d in dict) {
        if(dict[d].length > 1)
            return false;
    }
    return true;
}

function allUniques(dict) {
    let res = [];
    for(let d in dict) {
        if(dict[d].length === 1) {
            res.push(dict[d]);
        }
    }
    return res;
}

function allergenIn(ingredient, dict) {
    for(let d in dict) {
        if(dict[d][0] === ingredient) {
            return true;
        }
    }
    return false;
}

let coll = []
for (let i in arr) {
    let line = arr[i];
    let test = parse(line);
    coll.push(test);
}

let dict = {};

for(let c in coll) {
    let food = coll[c];
    for(let a in food['allergens']) {
        let allergen = food['allergens'][a];
        if(dict[allergen]) {
            let res = [];
            for(let i in food['ingredients']) {
                let ingredient = food['ingredients'][i];
                if(dict[allergen].includes(ingredient))
                    res.push(ingredient);
            }
            dict[allergen] = res;
        } else {
            dict[allergen] = food['ingredients'];
        }
    }
}

while(!areAllUniqe(dict)) {
    let uqs = allUniques(dict);
    for(let u in uqs) {
        let uniqe = uqs[u];
        let allergen = uniqe[0];
        for(let d in dict) {
            if(dict[d].length > 1) {
                const result = dict[d].filter(el => el !== allergen);
                dict[d] = result;
            }
        }
    }
}

let sum = 0;
for(let c in coll) {
    let food = coll[c];
    for(let i in food['ingredients']) {
        if(!allergenIn(food['ingredients'][i], dict))
            sum+=1;
    }
}

console.log(sum)