function loop(subject, key) {
  let value = 1;
  let loopsize = 0;
  while(value !== key ) {
    value = value * subject;
    value = value % 20201227;
    loopsize++;
  }
  return loopsize;
}

let subject = 7;
let keyCard = 18356117;
let keyDoor = 5909654;
let loopsize = loop(subject, keyDoor);

let value = 1;
for(let i = 0; i < loopsize; i++) {
  value = value * keyCard;
  value = value % 20201227;
}

console.log(value)
