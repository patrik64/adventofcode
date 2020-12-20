let fs = require('fs');
let input = fs.readFileSync('Day19.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let ret = {};
    let idx = 0;
    let type = '';
    let rulenr = '';
    let rule1 = '';
    let rule2 = '';
    let rule3 = '';
    let rule4 = '';

    let message = [];
    if(str[0] === 'a' || str[0] === 'b')
        type = 'message';
    else
        type = 'rule';

    if(type === 'message') {
        while(idx < str.length) {
            let ch = str[idx];
            ch = ch.trim();
            if(ch !== '')
                message.push(ch);
            idx++;
        }

        ret = { 'type' : type,
                'message' : message
            }
    } else {
        while(str[idx] !== ':') {
            rulenr += str[idx];
            idx++;
        }
        rulenr = rulenr.trim();

        idx++;
        idx++;

        while(str[idx] !== ' ' && idx < str.length) {
            rule1 += str[idx];
            idx++;
        }

        rule1 = rule1.trim();

        if(rule1[0] === '"') {
            rule1 = rule1.substring(1);
            rule1 = rule1.slice(0, -1);;
            let ret = { 'type' : type,
                        'rulenr' : rulenr,
                        'letter' : rule1
                    }
                    return ret;
        }

        idx++;

        if(str[idx] !== "|") {

            while(str[idx] !== ' ' && idx < str.length) {
                rule2 += str[idx];
                idx++;
            }

                idx++;
        }

        if(idx < str.length && str[idx] === '|') {
            idx++;
            idx++;

            while(str[idx] !== ' ' && idx < str.length) {
                rule3 += str[idx];
                idx++;
            }

            idx++;

            while(str[idx] !== ' ' && idx < str.length) {
                rule4 += str[idx];
                idx++;
            }
        }

        rule1 = rule1.trim();
        rule2 = rule2.trim();
        rule3 = rule3.trim();
        rule4 = rule4.trim();

        if(rule1 === '') rule1 = -1;
        if(rule2 === '') rule2 = -1;
        if(rule3 === '') rule3 = -1;
        if(rule4 === '') rule4 = -1;

        ret = { 'type' : type,
                'rulenr' : Number(rulenr),
                'rule1' : Number(rule1),
                'rule2' : Number(rule2),
                'rule3' : Number(rule3),
                'rule4' : Number(rule4) }
    }


    return ret;
}

function getRules(arr) {
    let ret = {};
    for(let x in arr) {
        if(arr[x].type === 'rule' && !arr[x]['letter']) {
            let rulenr = arr[x]['rulenr'];
            ret[rulenr] = arr[x];
        }
    }
    return ret;
}

function getMessages(arr){
    let ret = [];
    for(let x in arr) {
        if(arr[x].type === 'message')
            ret.push(arr[x].message)
    }
    return ret;
}

function getLetter(arr, letter) {
    for(let x in arr) {
        if (arr[x]['letter'] === letter)
            return arr[x]['rulenr'];
    }
    return -1;
}

function generateTreeForRule(rulenr, rules, aNr, bNr) {
    let tree = {};
    let rule = rules[rulenr];

    let left1 = rule['rule1'];
    let left2 = rule['rule2'];
    let right1 = rule['rule3'];
    let right2 = rule['rule4'];

    if(Number.isInteger(left1) && left1 !== aNr && left1 !== bNr && left1 !== -1) {
        let temp = generateTreeForRule(left1, rules, aNr, bNr);
        left1 = temp;
    }

    if(Number.isInteger(left2) && left2 !== aNr && left2 !== bNr && left2 !== -1) {
        let temp = generateTreeForRule(left2, rules, aNr, bNr);
        left2 = temp;
    }

    if(Number.isInteger(right1) && right1 !== aNr && right1 !== bNr && right1 !== -1) {
        let temp = generateTreeForRule(right1, rules, aNr, bNr);
        right1 = temp;
    }

    if(Number.isInteger(right2) && right2 !== aNr && right2 !== bNr && right2 !== -1) {
        let temp = generateTreeForRule(right2, rules, aNr, bNr);
        right2 = temp;
    }

    let left = {'left1' : left1, 'left2' : left2};
    let right = {'right1' : right1, 'right2' : right2};

    tree['left'] = left;
    tree['right'] = right;
    return tree;
}

function traverseTree(tree) {
    let res = [];
    let resleft = [];
    let resright = [];

    let left1 = tree['left']['left1'];
    let left2 = tree['left']['left2'];

    if(Number.isInteger(left1)) {
        if(left1 >= 0)
            resleft.push([left1]);
    }
    else {
        let temp = traverseTree(left1);
        for(let t in temp) {
            resleft.push(temp[t]);
        }
    }

    if(Number.isInteger(left2)) {
        if(left2 >= 0) {
            for(let rl in resleft) {
                resleft[rl] = [...resleft[rl], left2];
            }
        }
    } else {
        let temp = traverseTree(left2);
        let coll = [];
        for(let rl in resleft) {
            for(let t in temp) {
                coll.push([...resleft[rl], ...temp[t]]);
            }
        }
        resleft = coll;
    }

    let right1 = tree['right']['right1'];
    let right2 = tree['right']['right2'];

    if(Number.isInteger(right1)) {
        if(right1 >= 0)
            resright.push([right1]);
    }
    else {
        let temp = traverseTree(right1);
        for(let t in temp) {
            resright.push(temp[t]);
        }
    }

    if(Number.isInteger(right2)) {
        if(right2 >= 0) {
            for(let rr in resright) {
                resright[rr] = [...resright[rr], right2];
            }
        }
    } else {
        let temp = traverseTree(right2);
        let coll = [];
        for(let rr in resright) {
            for(let t in temp) {
                coll.push([...resright[rr], ...temp[t]]);
            }
        }
        resright = coll;
    }

    for(let l in resleft) {
        res.push(resleft[l]);
    }
    for(let r in resright) {
        res.push(resright[r]);
    }

    return res;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

function arrayIn(test, mtx) {
    for(let m in mtx) {
        let arr = mtx[m];
        if(arraysEqual(test, arr))
            return true;
    }
    return false;
}

function convertMessages(messages, aNr, bNr) {
    let ret = [];
    for(let x in messages) {
        let message = messages[x];
        let temp = [];
        for(let y in message) {
            if(message[y] === 'a')
                temp.push(aNr);
            else
                temp.push(bNr);
        }
        let obj = {'arr' : temp, 'found' : false }
        ret.push(obj);
    }
    return ret;
}

function fetchMessagePart(message, start, size) {
  let ret = [];
  for(let i = start; i < start+size; i++) {
    ret.push(message[i]);
  }
  return ret;
}

let all = [];

for (let i in arr) {
    let line = arr[i];
    if(line.length > 1) {
        let obj = parse(line);
        all.push(obj);
    }
}

let aNr = Number(getLetter(all, 'a'));
let bNr = Number(getLetter(all, 'b'));
let rules = getRules(all);
let messages = getMessages(all);
let converted = convertMessages(messages, aNr, bNr);

let sum = 0;

let rTree42 = generateTreeForRule(42, rules, aNr, bNr);
let gm42 = traverseTree(rTree42);

let rTree31 = generateTreeForRule(31, rules, aNr, bNr);
let gm31 = traverseTree(rTree31);

let blockSize = gm42[0].length;

let len = converted.length
for(let m in converted) {
    let message = converted[m];
    let mlen = message['arr'].length;
    let check31 = Math.floor(((mlen/blockSize)-1)/2);
    let blockStart = mlen - blockSize;
    let pass = true;
    let firstPass = true;
    while(blockStart >= 0) {
      let msg = fetchMessagePart(message['arr'], blockStart, blockSize);
      if(firstPass) {
        firstPass = false;
        if(!arrayIn(msg, gm31)) {
          pass = false;
          break;
        }
      } else {
        if(!arrayIn(msg, gm42)) {
            if(check31 > 0) {
              if(!arrayIn(msg, gm31)) {
                pass = false;
                break;
              }
            } else {
              pass = false;
              break;
            }
        }
      }
      check31--;
      blockStart -= blockSize;
    }
    if(pass) {
      message['found'] = true;
    }
}


for(let c in converted) {
    if(converted[c]['found']) {
      sum += 1;
    }
}
console.log(sum);