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

function step(template, instructions) {
    let ret = '';
    let triplets = [];
    for(let i = 0; i < template.length-1; i++) {
        let tri = '';
        let ch1 = template[i];
        let ch2 = template[i+1];
        tri += ch1;
        for(let x in instructions) {
            let instruction = instructions[x];
            if(instruction.pair[0] === ch1 && instruction.pair[1] === ch2) {
                tri += instruction.insert;
                tri += ch2;
                triplets.push(tri);
                break;
            }
        }
    }

    for(let i = 0; i < triplets.length - 1; i++) {
        let tri1 = triplets[i];
        let tri2 = triplets[i+1];
        ret += tri1[0];
        ret += tri1[1];
        if(tri1[2] !== tri2[0]) {
            ret += tri1[2];
        }
    }
    ret += triplets[triplets.length-1][0];
    ret += triplets[triplets.length-1][1];
    ret += triplets[triplets.length-1][2];

    return ret;
}

let template = arr[0];
let instructions = [];
let occurences = {};

for(let i = 2; i < arr.length; i++) {
    let line = arr[i];
    let insertion = line.split('->');
    let pair = insertion[0].trim();
    let insert = insertion[1].trim();
    instructions.push({ 'pair': pair, 'insert' : insert});
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

for(let i = 0; i < 10; i++) {
    template = step(template, instructions);
}

for(let t in template) {
    let ch = template[t];
    occurences[ch] += 1;
}

let min = 10000000000000000;
let max = 0;
for(let o in occurences) {
    if(occurences[o] < min) min = occurences[o];
    if(occurences[o] > max) max = occurences[o];
}

console.log(max - min);


