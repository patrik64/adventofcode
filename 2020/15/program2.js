let input = [7,12,1,0,16,2];

function isSpoken(val, occurences) {
    if(occurences[val] && occurences[val].n > 1)
            return true;
    return false;
}

let occurences = {};
occurences[7] = { 'n': 1, 'last1' : 0, 'last2': 0 };
occurences[12] = { 'n': 1, 'last1' : 1, 'last2': 1 };
occurences[1] = { 'n': 1, 'last1' : 2, 'last2': 2 };
occurences[0] = { 'n': 1, 'last1' : 3, 'last2': 3 };
occurences[16] = { 'n': 1, 'last1' : 4, 'last2': 4 };
occurences[2] = { 'n': 1, 'last1' : 5, 'last2': 5 };

let limit = 30000000;
for(let i = 6; i < limit; i++) {
    let last = input[input.length-1];
    if(!isSpoken(last, occurences)) {
        input.push(0);
        if(occurences[0]) {
            occurences[0].n +=1 ;
            occurences[0].last2 = occurences[0].last1;
            occurences[0].last1 = i;
        }
        else {
            occurences[0] = { 'n': 1, 'last1' : i, 'last2': i };
        }
    } else {
        let pos1 = occurences[last].last1;
        let pos2 = occurences[last].last2;
        let diff = pos1 - pos2;
        input.push(diff);
        if(occurences[diff]) {
            occurences[diff].n +=1 ;
            occurences[diff].last2 = occurences[diff].last1;
            occurences[diff].last1 = i;
        }
        else {
            occurences[diff] = { 'n': 1, 'last1' : i, 'last2': i };
        }
        if(i % 100000 === 0) {
            console.log('processing', i.toLocaleString(), 'out of', limit.toLocaleString());
        }
    }
}

console.log(input[input.length-1])