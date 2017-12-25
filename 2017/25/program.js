function move(state, currPos, tape, instructions)
{
    var inst = instructions[state];
    var currVal = tape[currPos];

    inst = inst[currVal];
    tape[currPos] = inst.write;

    if(inst.move == "R")
    {
        if((currPos + 1) >= tape.length)
            tape.push(0);
        currPos++;
    }
    else if(inst.move == "L")
    {
        if((currPos-1) < 0)
        {
            tape.unshift(0);
            currPos = 0;
        }
        else
            currPos--;
    }
    var ret = { "currPos" : currPos, "nextState" : inst.next };
    return ret;

}

var instructions = {};

var iA = [  { "write" : 1, "move" : "R", "next" : "B" },
            { "write" : 0, "move" : "L", "next" : "B" }];

instructions["A"] = iA;

var iB = [  { "write" : 1, "move" : "L", "next" : "C" },
            { "write" : 0, "move" : "R", "next" : "E" }];

instructions["B"] = iB;

var iC = [  { "write" : 1, "move" : "R", "next" : "E" },
            { "write" : 0, "move" : "L", "next" : "D" }];

instructions["C"] = iC;

var iD = [  { "write" : 1, "move" : "L", "next" : "A" },
            { "write" : 1, "move" : "L", "next" : "A" }];

instructions["D"] = iD;

var iE = [  { "write" : 0, "move" : "R", "next" : "A" },
            { "write" : 0, "move" : "R", "next" : "F" }];

instructions["E"] = iE;

var iF = [  { "write" : 1, "move" : "R", "next" : "E" },
            { "write" : 1, "move" : "R", "next" : "A" }];

instructions["F"] = iF;

var tape = [0];

var checksum = 12683008;
var ob = { "currPos" : 0, "nextState" : "A" };

while(checksum > 0)
{
    ob = move(ob.nextState, ob.currPos, tape, instructions);
    checksum--;
}
var sum = tape.reduce((a, b) => a + b, 0);
console.log(sum);