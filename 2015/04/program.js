let md5 = require('./md5');
let input = "iwrupvqb";
let counter = 1;
let password = '';
for(;;) {
    let test = input + counter.toString();
    let hash = md5.md5(test);
    if(hash.indexOf('00000') == 0) {
        console.log(counter);
        process.exit();
    }    
    counter++;
}
