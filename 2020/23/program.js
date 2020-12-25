let cups = [7,1,6,8,9,2,5,4,3];

function rotate(arr) {
    let res = [];
    for(let i = 0; i < arr.length; i++) {
        if(i+1 === arr.length)
            res.push(arr[0]);
        else
            res.push(arr[i+1]);
    }
    return res;
}

function move(cups, currentIdx) {
    let currentCup = cups[currentIdx];

    let idx1 = currentIdx+1;
    if( idx1 >= cups.length) idx1 = 0;
    let idx2 = idx1+1;
    if( idx2>= cups.length) idx2 = 0;
    let idx3 = idx2+1;
    if( idx3>= cups.length) idx3 = 0;

    let picked = [];
    picked.push(cups[idx1]);
    picked.push(cups[idx2]);
    picked.push(cups[idx3]);

    cups.splice(idx1, 1);
    if( idx1 >= cups.length) idx1 = 0;
    cups.splice(idx1, 1);
    if( idx1 >= cups.length) idx1 = 0;
    cups.splice(idx1, 1);

    let destination = currentCup - 1;
    while(picked.includes(destination)) {
        destination = destination - 1;
    }
    if(destination < 1) {
        destination = 9;
        while(picked.includes(destination)) {
            destination = destination - 1;
        }
    }

    let destinationIdx = cups.indexOf(destination);

    for(let x = 0; x < destinationIdx; x++) {
        cups = rotate(cups, destinationIdx);
    }

    idx1 = 1;
    if( idx1 >= cups.length) idx1 = 0;
    cups.splice(idx1, 0, picked[0]);

    idx2 = idx1 + 1;
    if( idx2 >= cups.length) idx2 = 0;
    cups.splice(idx2, 0, picked[1]);

    idx3 = idx2 + 1;
    if( idx3 >= cups.length) idx3 = 0;
    cups.splice(idx3, 0, picked[2]);

    currentIdx = cups.indexOf(currentCup);
    let nextIdx = currentIdx + 1;
    if(nextIdx >= cups.length) nextIdx = 0;

    return [cups, nextIdx];
}

let moves = 100;
let i = 1;
let res = move(cups, 0);

while(i < moves) {
    res = move(res[0], res[1]);
    i++;
}

let result = res[0];
let oneIdx = res[0].indexOf(1);
for(let i = 0; i < oneIdx; i++) {
    result = rotate(result);
}

result.shift();
console.log(result.join(''));