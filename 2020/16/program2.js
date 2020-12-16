let fs = require('fs');
let input = fs.readFileSync('Day16.in', 'utf8');
let arr = input.split('\n');

function parseRanges(str) {
    let idx = 0;
    let name = '';
    let r1Start = '';
    let r1End = '';
    let r2Start = '';
    let r2End = '';
    
    
    while(str[idx] !== ':') {
        name += str[idx]; 
        idx++; 
    }
    name = name.trim();
    idx++;

    while(str[idx] !== '-') {
        r1Start += str[idx]; 
        idx++; 
    }

    idx++;

    while(str[idx] !== ' ') {
        r1End += str[idx]; 
        idx++; 
    }

    idx += 4;

    while(str[idx] !== '-') {
        r2Start += str[idx]; 
        idx++; 
    }

    idx++;

    while(idx < str.length) {
        r2End += str[idx]; 
        idx++; 
    }

    r1Start = r1Start.trim();
    r1Start = Number(r1Start);
    r1End = r1End.trim();
    r1End = Number(r1End);
    r2Start = r2Start.trim();
    r2Start = Number(r2Start);
    r2End = r2End.trim();
    r2End = Number(r2End);

    let ret = { 'name': name,
                'r1Start' : r1Start, 
                'r1End': r1End,
                'r2Start': r2Start, 
                'r2End' : r2End, 
                'used' : false };
    return ret;
}

function parseTicket(str) {
    ret = [];
    let idx = 0;
    let n = '';
    let r1End = '';
    let r2Start = '';
    let r2End = '';
    
    
    while(idx < str.length) {
        let ch = str[idx];
        if(ch === ',') {
            n = n.trim();
            ret.push(Number(n));
            n = '';
        } else {
            n += ch;
        }
        idx++; 
    }
    n = n.trim();
    ret.push(Number(n));
    return ret;
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function isTicketValid(ticket, ranges) {
    for(let x in ticket) {
        let t = ticket[x];
        let pass = false;
        for(let r in ranges) {
            let range = ranges[r];
            if((t >= range.r1Start && t <= range.r1End) ||
                (t >= range.r2Start && t <= range.r2End)) {
                    pass = true;
                }
        }
        if(!pass) {
            return false;
        }
    }
    return true;
}

function matchRange(range, positions) {
    for(let x in positions) {
        let position = positions[x];
        if(!position['used']) {
            let pass = false;
            for(let i = 0; i < position['arr'].length; i++) {
                let pos = position['arr'][i];
                if((pos >= range.r1Start && pos <= range.r1End) ||
                    (pos >= range.r2Start && pos <= range.r2End)) {
                        pass = true;
                    }
                else {
                    pass = false;
                    break;
                }
            }
            if (pass) {
                position['used'] = true;
                return { 'name': range.name, 'idx' : position['idx'] };
            }
        }
    }
    return { 'name': range.name, 'idx' : 'error' }
}

let ranges = [];
let ticket = [];
let nearby = [];

let i = 0;
let line = arr[i];
while (line.length > 4) {
    let obj = parseRanges(line);
    ranges.push(obj);
    i++;
    line = arr[i];
}

i+=2;
line = arr[i];

ticket = parseTicket(line);

i+=3;

while (i < arr.length) {
    line = arr[i];
    let near = parseTicket(line);
    nearby.push(near);
    i++;
}

let validTickets = []
for(let x in nearby) {
    let testTicket = nearby[x];
    if(isTicketValid(testTicket, ranges))
        validTickets.push(testTicket);
}

let positions = [];
for(let i = 0; i < ticket.length; i++) {
    positions.push({ 'idx' : i, 'arr' : [], 'used' : false });
}

//transpose
for(let x in validTickets) {
    let vt = validTickets[x]
    for(let i = 0; i < vt.length; i++ ){
        positions[i].arr.push(vt[i]);
    }
}

let res = [];

res.push(matchRange(ranges[17], positions));
res.push(matchRange(ranges[6], positions));
res.push(matchRange(ranges[8], positions));
res.push(matchRange(ranges[11], positions));
res.push(matchRange(ranges[9], positions));
res.push(matchRange(ranges[15], positions));
res.push(matchRange(ranges[10], positions));
res.push(matchRange(ranges[19], positions));
res.push(matchRange(ranges[18], positions));
res.push(matchRange(ranges[2], positions));
res.push(matchRange(ranges[4], positions));
res.push(matchRange(ranges[1], positions));
res.push(matchRange(ranges[3], positions));
res.push(matchRange(ranges[0], positions));
res.push(matchRange(ranges[5], positions));
res.push(matchRange(ranges[16], positions));
res.push(matchRange(ranges[12], positions));
res.push(matchRange(ranges[13], positions));
res.push(matchRange(ranges[14], positions));
res.push(matchRange(ranges[7], positions));

let mult = 1;
for(let x in res) {
    let r = res[x];
    let name = r.name.substring(0,9);
    if(name === 'departure')
        mult *= ticket[r.idx];
}

console.log(mult);