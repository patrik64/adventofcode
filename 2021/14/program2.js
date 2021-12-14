let fs = require('fs');
let input = fs.readFileSync('Day14.in', 'utf8');
let arr = input.split('\n');

function getOccurences(template, occurences) {
    let ret = { ... occurences };
    for(let t in template) {
        let ch = template[t];
        ret[ch] += 1;
    }
    return ret;
}

function step(todo, instructions, occurences) {
    let ret = { ... todo };
    for(let t in todo) {
        if(todo[t] > 0) {
             ret[t] -= todo[t];
                
            let oc = instructions[t];
            if(todo[t] > 0 ){
                occurences[oc] += todo[t];
            } else {
                occurences[oc] += 1;
            }
            let insert = oc;
            let ch1 = t[0]; 
            let ch2 = t[1];
            let newPair1 = ch1 + insert;
            let newPair2 = insert +ch2;

            if(todo[t] > 0 ){
                ret[newPair1] += todo[t];
                ret[newPair2] += todo[t];
            } else {
                ret[newPair1] += 1;
                ret[newPair2] += 1;
            }
        }
    }
    return ret;
}

let template = arr[0];

let instructions = {};
let occurences = {};
let todo = {};

for(let i = 2; i < arr.length; i++) {
    let line = arr[i];
    let insertion = line.split('->');
    let pair = insertion[0].trim();
    let insert = insertion[1].trim();
    instructions[pair] = insert;
    todo[pair] = 0;
    if (!(pair[0] in occurences)) {
        occurences[pair[0]] = 0;
    }
    if (!(pair[1] in occurences)) {
        occurences[pair[1]] = 0;
    }
    if (!(insert in occurences)) {
        occurences[insert] = 0;
    }
}

for(let i = 1; i < template.length; i++) {
    let pair = template[i-1] + template[i];
    todo[pair] += 1;
}

occurences = getOccurences(template, occurences);

for(let i = 0; i < 40; i++) {
    todo = step(todo, instructions, occurences); 
}

let min = 100000000000000000000;
let max = 0;
for(let o in occurences) {
    if(occurences[o] < min) min = occurences[o];
    if(occurences[o] > max) max = occurences[o];
}

console.log(max - min);
