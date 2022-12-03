function getSumForLetter(letter, sum) {
  let ret = sum;
  if(letter === 'A') return ret;
  if(letter === 'B') return 10 * ret; 
  if(letter === 'C') return 100 * ret; 
  if(letter === 'D') return 1000 * ret; 

  console.log('error!!!');
  process.exit(-1);  
}

function createNewState(state, apod, oldPos, newPos, val) {
  if(apod.current === undefined) {
    console.log(state);
  }
  let ns = JSON.parse(JSON.stringify(state));
  ns.sum += getSumForLetter(apod.current, val);
  ns.path += ' ' + apod.current + ' (' + apod.name + '->' +  ns[newPos].name + ') ' + ns.sum + ' # ';

  ns[oldPos].current = '.';
  ns[newPos].current = apod.current;
  
  return ns;      
}

function move(apod, state) {
  let ret = [];

  //shortcuts
  if(apod.name === 'A2' && apod.current !== '.' && state.A1.current !== '.') { return ret; }
  if(apod.name === 'B2' && apod.current !== '.' && state.B1.current !== '.') { return ret; }
  if(apod.name === 'C2' && apod.current !== '.' && state.C1.current !== '.') { return ret; }
  if(apod.name === 'D2' && apod.current !== '.' && state.D1.current !== '.') { return ret; }
  
  if(apod.name === 'A3' && apod.current !== '.' && state.A2.current !== '.' && state.A1.current !== '.') { return ret; }
  if(apod.name === 'B3' && apod.current !== '.' && state.B2.current !== '.' && state.A1.current !== '.') { return ret; }
  if(apod.name === 'C3' && apod.current !== '.' && state.C2.current !== '.' && state.A1.current !== '.') { return ret; }
  if(apod.name === 'D3' && apod.current !== '.' && state.D2.current !== '.' && state.A1.current !== '.') { return ret; }

  if(apod.name === 'A4' && apod.current !== '.' && state.A3.current !== '.' && state.A2.current !== '.' && state.A1.current !== '.') { return ret; }
  if(apod.name === 'B4' && apod.current !== '.' && state.B3.current !== '.' && state.A2.current !== '.' && state.A1.current !== '.') { return ret; }
  if(apod.name === 'C4' && apod.current !== '.' && state.C3.current !== '.' && state.A2.current !== '.' && state.A1.current !== '.') { return ret; }
  if(apod.name === 'D4' && apod.current !== '.' && state.D3.current !== '.' && state.A2.current !== '.' && state.A1.current !== '.') { return ret; }

  if(apod.name === 'H1' && apod.current !== '.' && state.H2.current !== '.') { return ret; }
  if(apod.name === 'H11' && apod.current !== '.' && state.H10.current !== '.') { return ret; }

  if(apod.name === 'A1' && apod.current === 'A' && state.A2.current === 'A') { return ret; }
  if(apod.name === 'B1' && apod.current === 'B' && state.B2.current === 'B') { return ret; }
  if(apod.name === 'C1' && apod.current === 'C' && state.C2.current === 'C') { return ret; }
  if(apod.name === 'D1' && apod.current === 'D' && state.D2.current === 'D') { return ret; }

  if(apod.name === 'A2' && apod.current === 'A' && state.A3.current === 'A') { return ret; }
  if(apod.name === 'B2' && apod.current === 'B' && state.B3.current === 'B') { return ret; }
  if(apod.name === 'C2' && apod.current === 'C' && state.C3.current === 'C') { return ret; }
  if(apod.name === 'D2' && apod.current === 'D' && state.D3.current === 'D') { return ret; }

  if(apod.name === 'A3' && apod.current === 'A' && state.A4.current === 'A') { return ret; }
  if(apod.name === 'B3' && apod.current === 'B' && state.B4.current === 'B') { return ret; }
  if(apod.name === 'C3' && apod.current === 'C' && state.C4.current === 'C') { return ret; }
  if(apod.name === 'D3' && apod.current === 'D' && state.D4.current === 'D') { return ret; }
  
  if(apod.name === 'A4' && apod.current === 'A') { return ret; }
  if(apod.name === 'B4' && apod.current === 'B') { return ret; }
  if(apod.name === 'C4' && apod.current === 'C') { return ret; }
  if(apod.name === 'D4' && apod.current === 'D') { return ret; }

  //for A1
  if(apod.name === 'A1') {
    if(apod.current !== '.'){
      if(state.H1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A1', 'H1', 3));
      }
      if(state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A1', 'H2', 2));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'A1', 'H4', 2));
      }
      if(state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'A1', 'H6', 4));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'A1', 'H8', 6));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'A1', 'H10', 8));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'A1', 'H11', 9));
      }
      //check slots for A1
      if(apod.current ==='B') {
        if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'B4', 7));
        }
        else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'B3', 6));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'B2', 5));
        }
        else if(state.B4.current === 'B' &&  state.B3.current === 'B' && state.B2.current === 'B' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'B1', 4));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'C4', 9));
        }
        else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'C3', 8));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'C2', 7));
        }
        else if(state.C4.current === 'C' &&  state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'C1', 6));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'D4', 11));
        }
        else if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'D3', 10));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'D2', 9));
        }
        else if(state.D4.current === 'D' &&  state.D3.current === 'D' && state.D2.current === 'D' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A1', 'D1', 8));
        }
      }
    }
  }

  //for A2
  if(apod.name === 'A2') {
    if(apod.current !== '.' && state.A1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A2', 'H1', 4));
      }
      if(state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A2', 'H2', 3));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'A2', 'H4', 3));
      }
      if(state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'A2', 'H6', 5));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'A2', 'H8', 7));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'A2', 'H10', 9));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'A2', 'H11', 10));
      }
      //check slots for A2
      if(apod.current ==='B') {
        if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'B4', 8));
        }
        else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'B3', 7));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'B2', 6));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === 'B' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'B1', 5));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'C4', 10));
        }
        if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'C3', 9));
        }
        if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'C2', 8));
        }
        if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'C1', 7));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'D4', 12));
        }
        if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'D3', 11));
        }
        if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'D2', 10));
        }
        if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A2', 'D1', 9));
        }
      }
    }
  }

  //for A3
  if(apod.name === 'A3') {
    if(apod.current !== '.' && state.A2.current === '.' && state.A1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A3', 'H1', 5));
      }
      if(state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A3', 'H2', 4));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'A3', 'H4', 4));
      }
      if(state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'A3', 'H6', 6));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'A3', 'H8', 8));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'A3', 'H10', 10));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'A3', 'H11', 11));
      }
      //check slots for A3
      if(apod.current ==='B') {
        if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'B4', 9));
        }
        else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'B3', 8));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'B2', 7));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === 'B' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'B1', 6));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'C4', 11));
        }
        if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'C3', 10));
        }
        if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'C2', 9));
        }
        if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'C1', 8));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'D4', 13));
        }
        if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'D3', 12));
        }
        if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'D2', 11));
        }
        if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A3', 'D1', 10));
        }
      }
    }
  }

  //for A4
  if(apod.name === 'A4') {
    if(apod.current !== '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A4', 'H1', 6));
      }
      if(state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'A4', 'H2', 5));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'A4', 'H4', 5));
      }
      if(state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'A4', 'H6', 7));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'A4', 'H8', 9));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'A4', 'H10', 11));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'A4', 'H11', 12));
      }
      //check slots for A4
      if(apod.current ==='B') {
        if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'B4', 10));
        }
        else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'B3', 9));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'B2', 8));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === 'B' && state.B1.current === '.' && state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'B1', 7));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'C4', 10));
        }
        if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'C3', 9));
        }
        if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'C2', 8));
        }
        if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'C1', 7));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'D4', 14));
        }
        if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'D3', 13));
        }
        if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'D2', 12));
        }
        if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'A4', 'D1', 11));
        }
      }
    }
  }

  //for B1
  if(apod.name === 'B1') {
    if(apod.current !== '.'){
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B1', 'H1', 5));
      }
      if(state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B1', 'H2', 4));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B1', 'H4', 2));
      }
      if(state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'B1', 'H6', 2));
      }
      if(state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'B1', 'H8', 4));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'B1', 'H10', 6));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'B1', 'H11', 7));
      }
      //check slots for B1
      if(apod.current ==='A') {
        if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'A4', 7));
        }
        else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'A3', 6));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'A2', 5));
        }
        if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'A1', 4));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'C4', 7));
        }
        else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'C3', 6));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'C2', 5));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'C1', 4));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'D4', 9));
        }
        else if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'D3', 8));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'D2', 7));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B1', 'D1', 6));
        }
      }
    }
  }

  //for B2
  if(apod.name === 'B2') {
    if(apod.current !== '.' && state.B1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B2', 'H1', 6));
      }
      if(state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B2', 'H2', 5));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B2', 'H4', 3));
      }
      if(state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'B2', 'H6', 3));
      }
      if(state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'B2', 'H8', 5));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'B2', 'H10', 7));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'B2', 'H11', 8));
      }
      //check slots for B1
      if(apod.current ==='A') {
        if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'A4', 8));
        }
        else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'A3', 7));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'A2', 6));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'A1', 5));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'C4', 10));
        }
        else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'C3', 9));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'C2', 8));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'C1', 7));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'D4', 10));
        }
        else if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'D3', 9));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'D2', 8));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B2', 'D1', 7));
        }
      }
    }
  }

  //for B3
  if(apod.name === 'B3') {
    if(apod.current !== '.' && state.B2.current === '.' && state.B1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B3', 'H1', 7));
      }
      if(state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B3', 'H2', 6));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B3', 'H4', 4));
      }
      if(state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'B3', 'H6', 4));
      }
      if(state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'B3', 'H8',6));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'B3', 'H10', 8));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'B3', 'H11', 9));
      }
      //check slots for B3
      if(apod.current ==='A') {
        if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'A4', 9));
        }
        else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'A3', 8));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'A2', 7));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'A1', 6));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'C4', 11));
        }
        else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'C3',10));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'C2', 9));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'C1', 8));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'D4', 11));
        }
        else if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'D3', 10));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'D2', 9));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B3', 'D1', 8));
        }
      }
    }
  }

  //for B4
  if(apod.name === 'B4') {
    if(apod.current !== '.' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B4', 'H1', 8));
      }
      if(state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B4', 'H2', 7));
      }
      if(state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'B4', 'H4', 5));
      }
      if(state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'B4', 'H6', 5));
      }
      if(state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'B4', 'H8',7));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'B4', 'H10', 9));
      }
      if(state.H6.current === '.' && state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'B4', 'H11', 10));
      }
      //check slots for B4
      if(apod.current ==='A') {
        if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'A4', 10));
        }
        else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'A3', 9));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'A2', 8));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.'&& state.H4.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'A1', 7));
        }
      }
      if(apod.current ==='C') {
        if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'C4', 10));
        }
        else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'C3', 9));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'C2', 8));
        }
        else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'C1', 7));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'D4', 10));
        }
        else if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'D3', 9));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'D2', 8));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'B4', 'D1', 7));
        }
      }
    }
  }

  //for C1
  if(apod.name === 'C1') {
    if(apod.current !== '.'){
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C1', 'H1', 7));
      }
      if(state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C1', 'H2', 6));
      }
      if(state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C1', 'H4', 4));
      }
      if(state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C1', 'H6', 2));
      }
      if(state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'C1', 'H8', 2));
      }
      if(state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'C1', 'H10', 4));
      }
      if(state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'C1', 'H11', 5));
      }
      //check slots for C1
      if(apod.current ==='A') {
        if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'A4', 9));
        }
        else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'A3', 8));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'A2', 7));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'A1', 6));
        }
      }
      if(apod.current ==='B') {
        if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'B4', 7));
        }
        else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' && state.B1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'B3', 6));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' && state.B1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'B2', 5));
        }
        else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === 'B' && state.B1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'B1', 4));
        }
      }
      if(apod.current ==='D') {
        if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'D4', 9));
        }
        else if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'D3', 8));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' &&  state.D1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'D2', 7));
        }
        else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' &&  state.D1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'C1', 'D1', 6));
        }
      }
    }
  }

  //for C2
  if(apod.name === 'C2') {
    if(apod.current !== '.' && state.C1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C2', 'H1', 8));
      }
      if(state.H2.current === '.'  && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C2', 'H2', 7));
      }
      if(state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C2', 'H4', 5));
      }
      if(state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'C2', 'H6', 3));
      }
      if(state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'C2', 'H8', 3));
      }
      if(state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'C2', 'H10', 5));
      }
      if(state.H8.current === '.' && state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'C2', 'H11', 6));
      }
      //check slots for C2
      if(apod.current ==='A') {
        if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'A4', 10));
        }
        else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'A3', 9));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'A2', 8));
        }
        else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'A1', 7));
        }
      }
      if(apod.current ==='B') {
        if(state.B2.current === '.' && state.B1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'B2', 6));
        }
        else if(state.B2.current === 'B' && state.B1.current === '.' && state.H6.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'B1', 5));
        }
      }
      if(apod.current ==='D') {
        if(state.D2.current === '.' &&  state.D1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'D2', 6));
        }
        else if(state.D2.current === 'D' && state.D1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'C2', 'D1', 5));
          
        }
      }
    }
  }

  //for D1
  if(apod.name === 'D1') {
    if(apod.current !== '.'){
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D1', 'H1', 9));
      }
      if(state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D1', 'H2', 8));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D1', 'H4', 6));
      }
      if(state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D1', 'H6', 4));
      }
      if(state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D1', 'H8', 2));
      }
      if(state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'D1', 'H10', 2));
      }
      if(state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'D1', 'H11', 3));
      }
      //check slots for D1
      if(apod.current ==='A') {
        if(state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D1', 'A2', 9));
        }
        else if(state.A2.current === 'A' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D1', 'A1', 8));
        }
      }
      if(apod.current ==='B') {
        if(state.B2.current === '.' && state.B1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D1', 'B2', 7));
        }
        else if(state.B2.current === 'B' && state.B1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D1', 'B2', 6));
        }
      }
      if(apod.current ==='C') {
        if(state.C2.current === '.' &&  state.C1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D1', 'C2', 5));
        }
        else if(state.C2.current === 'C' && state.C1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D1', 'C1', 4));
        }
      }
    }
  }

  //for D2
  if(apod.name === 'D2') {
    if(apod.current !== '.' && state.D1.current === '.') {
      if(state.H1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D2', 'H1', 10));
      }
      if(state.H2.current === '.'  && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D2', 'H2', 9));
      }
      if(state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D2', 'H4', 7));
      }
      if(state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D2', 'H6', 5));        
      }
      if(state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'D2', 'H8', 3));
      }
      if(state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'D2', 'H10', 3));                                              
      }
      if(state.H10.current === '.' && state.H11.current === '.') {
        ret.push(createNewState(state, apod, 'D2', 'H11', 4));                                      
      }
      //check slots for D2
      if(apod.current ==='A') {
        if(state.A2.current === '.' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D2', 'A2', 10));                              
        }
        else if(state.A2.current === 'A' && state.A1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D2', 'A1', 9));                              
        }
      }
      if(apod.current ==='B') {
        if(state.B1.current === '.' && state.B2.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D2', 'B2', 8));                              
        }
        else if(state.B2.current === 'B' && state.B1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D2', 'B1', 7));                    
        }
      }
      if(apod.current ==='C') {
        if(state.C2.current === '.' &&  state.C1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D2', 'C2', 6));                    
        }
        else if(state.C2.current === 'C' && state.C1.current === '.' && state.H8.current === '.') {
          ret.push(createNewState(state, apod, 'D2', 'C1', 5));
        }
      }
    }
  }

  //for H1
  if(apod.name === 'H1') {
    if(apod.current ==='A') {
      if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'A4 ', 6));
      }
      else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'A3 ', 5));
      }
      else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'A2 ', 4));
      }
      else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.' && state.H2.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'A1 ', 3));
      }
    }
    if(apod.current ==='B') {
      if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' &&  state.B1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'B4', 8));
      }
      else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' &&  state.B1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'B3', 7));
      }
      else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' &&  state.B1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'B2', 6));
      }
      else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === 'B' &&  state.B1.current === '.' && state.H2.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'B1', 5));
      }
    }
    if(apod.current ==='C') {
      if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' &&  state.C1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'C4', 10));
      }
      else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' &&  state.C1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'C3', 9));
      }
      else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' &&  state.C1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'C2', 8));
      }
      else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' && state.C1.current === '.' && state.H2.current === 'C' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'C1', 7));
      }
    }
    if(apod.current ==='D') {
      if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'D4', 12));
      }
      else if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'D3', 11));
      }
      else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' &&  state.D1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'D2', 10));
      }
      else if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' &&  state.D1.current === '.' && state.H2.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H1', 'D1', 9));
      }
    }
  }

  //for H2
  if(apod.name === 'H2') {
    if(apod.current ==='A') {
      if(state.A4.current === '.' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'A4', 5));
      }
      else if(state.A4.current === 'A' && state.A3.current === '.' && state.A2.current === '.' && state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'A3', 4));
      }
      else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === '.' && state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'A2', 3));
      }
      else if(state.A4.current === 'A' && state.A3.current === 'A' && state.A2.current === 'A' && state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'A1', 2));
      }
    }
    if(apod.current ==='B') {
      if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' &&  state.B1.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'B4', 7));
      }
      else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' &&  state.B1.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'B3', 6));
      }
      else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' &&  state.B1.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'B2', 5));
      }
      else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === 'B' &&  state.B1.current === '.' && state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'B1', 4));
      }
    }
    if(apod.current ==='C') {
      if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' &&  state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'C4', 9));
      }
      else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' &&  state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'C3', 8));
      }
      else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' &&  state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'C2', 7));
      }
      else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' &&  state.C1.current === '.' && state.H4.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'C1', 6));
      }
    }
    if(apod.current ==='D') {
      if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'D4', 11));
      }
      else if(state.D2.current === 'D' && state.D1.current === '.' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'D3', 10));
      }
      else if(state.D2.current === 'D' && state.D1.current === 'D' && state.H4.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'D2', 9));
      }
      else if(state.D2.current === 'D' && state.D1.current === 'D' && state.H4.current === 'D' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H2', 'D1', 8));
      }
    }
  }

  //for H4
  if(apod.name === 'H4') {
    if(apod.current ==='A') {
      if(state.A4.current === '.' && state.A3.current === '.' &&  state.A2.current === '.' &&  state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'A4', 5));
      }
      else if(state.A4.current === 'A' && state.A3.current === '.' &&  state.A2.current === '.' &&  state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'A3', 4));
      }
      else if(state.A4.current === 'A' && state.A3.current === 'A' &&  state.A2.current === '.' &&  state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'A2', 3));
      }
      else if(state.A4.current === 'A' && state.A3.current === 'A' &&  state.A2.current === 'A' &&  state.A1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'A1', 2));
      }
    }
    if(apod.current ==='B') {
      if(state.B4.current === '.' && state.B3.current === '.' && state.B2.current === '.' &&  state.B1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'B4', 5));
      }
      else if(state.B4.current === 'B' && state.B3.current === '.' && state.B2.current === '.' &&  state.B1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'B3', 4));
      }
      else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === '.' &&  state.B1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'B2', 3));
      }
      else if(state.B4.current === 'B' && state.B3.current === 'B' && state.B2.current === 'B' &&  state.B1.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'B4', 2));
      }
    }
    if(apod.current ==='C') {
      if(state.C4.current === '.' && state.C3.current === '.' && state.C2.current === '.' &&  state.C1.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'C4', 7));
      }
      else if(state.C4.current === 'C' && state.C3.current === '.' && state.C2.current === '.' &&  state.C1.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'C3', 6));
      }
      else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === '.' &&  state.C1.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'C2', 5));
      }
      else if(state.C4.current === 'C' && state.C3.current === 'C' && state.C2.current === 'C' &&  state.C1.current === '.' && state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'C1', 4));
      }
    }
    if(apod.current ==='D') {
      if(state.D4.current === '.' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'D4', 9));
      }
      if(state.D4.current === 'D' && state.D3.current === '.' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'D3', 8));
      }
      if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === '.' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'D2', 7));
      }
      if(state.D4.current === 'D' && state.D3.current === 'D' && state.D2.current === 'D' &&  state.D1.current === '.' && state.H6.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H4', 'D1', 6));
      }
    }
  }

  //for H6
  if(apod.name === 'H6') {
    if(apod.current ==='A') {
      if(state.A2.current === '.' &&  state.A1.current === '.' &&  state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'A2', 5));
      }
      else if(state.A2.current === 'A' && state.A1.current === '.' &&  state.H4.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'A1', 4));
      }
    }
    if(apod.current ==='B') {
      if(state.B2.current === '.' &&  state.B1.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'B2', 3));
      }
      else if(state.B2.current === 'B' && state.B1.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'B1', 2));
      }
    }
    if(apod.current ==='C') {
      if(state.C2.current === '.' &&  state.C1.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'C2', 3));
      }
      else if(state.C2.current === 'C' && state.C1.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'C1', 2));
      }
    }
    if(apod.current ==='D') {
      if(state.D2.current === '.' &&  state.D1.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'D2', 5));
      }
      else if(state.D2.current === 'D' && state.D1.current === '.' && state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H6', 'D1', 4));
      }
    }
  }

  //for H8
  if(apod.name === 'H8') {
    if(apod.current ==='A') {
      if(state.A2.current === '.' &&  state.A1.current === '.' &&  state.H4.current === '.' &&  state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'A2', 7));
      }
      else if(state.A2.current === 'A' && state.A1.current === '.' &&  state.H4.current === '.' &&  state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'A1', 6));
      }
    }
    if(apod.current ==='B') {
      if(state.B2.current === '.' &&  state.B1.current === '.' &&  state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'B2', 5));
      }
      else if(state.B2.current === 'B' && state.B1.current === '.' &&  state.H6.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'B1', 4));
      }
    }
    if(apod.current ==='C') {
      if(state.C2.current === '.' &&  state.C1.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'C2', 3));
      }
      else if(state.C2.current === 'C' && state.C1.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'C1', 2));
      }
    }
    if(apod.current ==='D') {
      if(state.D2.current === '.' &&  state.D1.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'D2', 3));
        
      }
      else if(state.D2.current === 'D' && state.D1.current === '.') {
        ret.push(createNewState(state, apod, 'H8', 'D1', 2));
      }
    }
  }

  //for H10
  if(apod.name === 'H10') {
    if(apod.current ==='A') {
      if(state.A2.current === '.' &&  state.A1.current === '.' &&  state.H4.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'A2', 9));
      }
      else if(state.A2.current === 'A' && state.A1.current === '.' &&  state.H4.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'A1', 8));
      }
    }
    if(apod.current ==='B') {
      if(state.B2.current === '.' &&  state.B1.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'B2', 7));
      }
      else if(state.B2.current === 'B' && state.B1.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'B1', 6));
      }
    }
    if(apod.current ==='C') {
      if(state.C2.current === '.' &&  state.C1.current === '.' &&  state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'C2', 5));
      }
      else if(state.C2.current === 'C' && state.C1.current === '.' &&  state.H8.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'C1', 4));
      }
    }
    if(apod.current ==='D') {
      if(state.D2.current === '.' &&  state.D1.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'D2', 3));
      }
      else if(state.D2.current === 'D' && state.D1.current === '.') {
        ret.push(createNewState(state, apod, 'H10', 'D1', 2));
      }
    }
  }

  //for H11
  if(apod.name === 'H11') {
    if(apod.current ==='A') {
      if(state.A2.current === '.' &&  state.A1.current === '.' &&  state.H4.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.' &&  state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'A2', 10));
      }
      else if(state.A2.current === 'A' && state.A1.current === '.' &&  state.H4.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'A1', 9));
      }
    }
    if(apod.current ==='B') {
      if(state.B2.current === '.' &&  state.B1.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'B2', 8));
      }
      else if(state.B2.current === 'B' && state.B1.current === '.' &&  state.H6.current === '.' &&  state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'B1', 7));
      }
    }
    if(apod.current ==='C') {
      if(state.C2.current === '.' &&  state.C1.current === '.' &&  state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'C2', 6));
      }
      else if(state.C2.current === 'C' && state.C1.current === '.' &&  state.H8.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'C1', 5));
        
      }
    }
    if(apod.current ==='D') {
      if(state.D2.current === '.' &&  state.D1.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'D2', 4));
      }
      else if(state.D2.current === 'D' && state.D1.current === '.' && state.H10.current === '.') {
        ret.push(createNewState(state, apod, 'H11', 'D1', 3));
      }
    }
  }

  return ret;
}

let state = {};

//input 

//  #############
//  #...........#
//  ###C#B#D#A###
//    #D#C#B#A#
//    #D#B#A#C#
//    #B#D#A#C#
//    #########

state.A1 = { current: 'C', name: 'A1' };
state.A2 = { current: 'D', name: 'A2' };
state.A3 = { current: 'D', name: 'A1' };
state.A4 = { current: 'B', name: 'A2' };

state.B1 = { current: 'B', name: 'B1' };
state.B2 = { current: 'C', name: 'B2' };
state.B3 = { current: 'B', name: 'B1' };
state.B4 = { current: 'D', name: 'B2' };

state.C1 = { current: 'D', name: 'C1' };
state.C2 = { current: 'B', name: 'C2' };
state.C3 = { current: 'A', name: 'C1' };
state.C4 = { current: 'A', name: 'C2' };

state.D1 = { current: 'A', name: 'D1' };
state.D2 = { current: 'A', name: 'D2' };
state.D3 = { current: 'C', name: 'D1' };
state.D4 = { current: 'C', name: 'D2' };

state.H1 = { current: '.', name: 'H1' };
state.H2 = { current: '.', name: 'H2' };
state.H4 = { current: '.', name: 'H4' };
state.H6 = { current: '.', name: 'H6' };
state.H8 = { current: '.', name: 'H8' };
state.H10 = { current: '.', name: 'H10' };
state.H11 = { current: '.', name: 'H11' };
state.sum = 0;
state.path = '';

let MIN = 100000000000000;

function check(state) {

  if(state.A1.current !== 'A') return false;
  if(state.A2.current !== 'A') return false;
  if(state.A3.current !== 'A') return false;
  if(state.A4.current !== 'A') return false;

  if(state.B1.current !== 'B') return false;
  if(state.B2.current !== 'B') return false;
  if(state.B3.current !== 'B') return false;
  if(state.B4.current !== 'B') return false;

  if(state.C1.current !== 'C') return false;
  if(state.C2.current !== 'C') return false;
  if(state.C3.current !== 'C') return false;
  if(state.C4.current !== 'C') return false;

  if(state.D1.current !== 'D') return false;
  if(state.D2.current !== 'D') return false;
  if(state.D3.current !== 'D') return false;
  if(state.D4.current !== 'D') return false;
 
  if(state.sum < MIN) {
    MIN = state.sum;
    console.log('current minimum ->', state.sum);
    console.log('path ->', state.path);
  }
  return true;
}

let depth = 0;

function solve(start, state, depth, mins) {

  if(check(state)) {
    if(state.sum < mins) { mins = state.sum; }
    return mins;
  }

  if(state.sum >= MIN) { return mins; }

  if(depth > 20) return mins;

  let res = move(start, state);
  for(let r in res) {
    let newState = res[r];
    for(let ns in newState) {
      let p = newState[ns];
      if(p.current === 'A' || p.current === 'B' || p.current === 'C' || p.current === 'D') {
        let sret = solve(p, newState, depth+1, mins);
        if(sret < mins) { mins = sret; }
      }
    } 
  }
  return mins;
}

console.log('processing ...');
let minsum = solve(state.D1, state, depth, MIN);
console.log(minsum);