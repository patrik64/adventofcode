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

let subjectCard = 7;
let keyCard = 18356117;
let lsCard = loop(subjectCard, keyCard);

let subjectDoor = 7;
let keyDoor = 5909654;
let lsDoor = loop(subjectDoor, keyDoor);

let value = 1;
for(let i = 0; i < lsDoor; i++) {
  value = value * keyCard;
  value = value % 20201227;
}

console.log(value)
