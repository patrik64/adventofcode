let fs = require('fs');
let input = fs.readFileSync('Day6.in', 'utf8');
let arr = input.split('\n');

function findFour(str) {
    for(let i = 0; i < str.length-13; i++) {
        let ch1 = str[i];
        let ch2 = str[i+1];
        let ch3 = str[i+2];
        let ch4 = str[i+3];
        let ch5 = str[i+4];
        let ch6 = str[i+5];
        let ch7 = str[i+6];
        let ch8 = str[i+7];
        let ch9 = str[i+8];
        let ch10 = str[i+9];
        let ch11 = str[i+10];
        let ch12 = str[i+11];
        let ch13 = str[i+12];
        let ch14 = str[i+13];
        
        if( ch1 !== ch2 && ch1 !== ch3 && ch1 !== ch4 && ch1 !== ch5 && ch1 !== ch6 && ch1 !== ch7 && ch1 !== ch8 && ch1 !== ch9 && ch1 !== ch10 && ch1 !== ch11 && ch1 !== ch12 && ch1 !== ch13 && ch1 !== ch14 &&
            ch2 !== ch3 && ch2 !== ch4 && ch2 !== ch5 && ch2 !== ch6 && ch2 !== ch7 && ch2 !== ch8 && ch2 !== ch9 && ch2 !== ch10 && ch2 !== ch11 && ch2 !== ch12 && ch2 !== ch13 && ch2 !== ch14 &&
            ch3 !== ch4 && ch3 !== ch5 && ch3 !== ch6 && ch3 !== ch7 && ch3 !== ch8 && ch3 !== ch9 && ch3 !== ch10 && ch3!== ch11 && ch3 !== ch12 && ch3 !== ch13 && ch3 !== ch14 &&
            ch4 !== ch5 && ch4 !== ch6 && ch4 !== ch7 && ch4 !== ch8 && ch4 !== ch9 && ch4 !== ch10 && ch4 !== ch11 && ch4 !== ch12 && ch4 !== ch13 && ch4 !== ch14 &&
            ch5 !== ch6 && ch5 !== ch7 && ch5 !== ch8 && ch5 !== ch9 && ch5 !== ch10 && ch5 !== ch11 && ch5 !== ch12 && ch5 !== ch13 && ch5 !== ch14 &&
            ch6 !== ch7 && ch6 !== ch8 && ch6 !== ch9 && ch6 !== ch10 && ch6 !== ch11 && ch6 !== ch12 && ch6 !== ch13 && ch6 !== ch14 &&
            ch7 !== ch8 && ch7 !== ch9 && ch7 !== ch10 && ch7 !== ch11 && ch7 !== ch12 && ch7 !== ch13 && ch7 !== ch14 &&
            ch8 !== ch9 && ch8 !== ch10 && ch8 !== ch11 && ch8 !== ch12 && ch8 !== ch13 && ch8 !== ch14 &&
            ch9 !== ch10 && ch9 !== ch11 && ch9 !== ch12 && ch9 !== ch13 && ch9 !== ch14 &&
            ch10 !== ch11 && ch10 !== ch12 && ch10 !== ch13 && ch10 !== ch14 &&
            ch11 !== ch12 && ch11 !== ch13 && ch11 !== ch14 &&
            ch12 !== ch13 && ch12 !== ch14 &&
            ch13 !== ch14) {
                return i+14;
            }
    }
}

let str = arr[0];
let res = findFour(str);
console.log(res);

