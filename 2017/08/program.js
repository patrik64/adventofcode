var fs = require('fs');

var input = fs.readFileSync('Day8.in', 'utf8');
var arr = input.split('\n');

var registers = {};

function parse(str)
{
   var idx = 0;
   var reg = '';
   var op = '';
   var num = '';
   var arg1 = '';
   var arg2 = '';
   var bin = '';
   var ret = {};

   while(str[idx] != ' ')
   {
        reg += str[idx];
        idx++;
   }
   reg.trim();

   idx++;
    if(str[idx] == 'i')
       op = 'inc';
    else
        op = 'dec';
    
    idx+= 4;

    while(str[idx] != ' ')
    {
        num += str[idx];
        idx++;
    }
    num = parseInt(num, 10);
    idx+=4; ' if '

    while(str[idx] != ' ')
    {
        arg1 += str[idx];
        idx++;
    }   
    idx++;

    while(str[idx] != ' ')
    {
        bin += str[idx];
        idx++;
    }
    idx++;

    while(idx < str.length)
    {
        arg2 += str[idx];
        idx++;
    }
    arg2 = parseInt(arg2, 10);
   
   ret = { "reg": reg, "op" : op, "num": num, "bin":bin,  "arg1" : arg1, "arg2" : arg2 };
   return ret;
}

function process(instructions)
{
   var i = 0;
   while (i < instructions.length)
   {
       var inst = instructions[i];
       var reg = inst["reg"];
       var op = inst["op"];
       var num = inst["num"];
       var bin = inst["bin"];
       var arg1 = inst["arg1"];
       var arg2 = inst["arg2"];

       var rval = registers[arg1];
       var cond = false;
       if(bin == "==")
       {
            if(rval == arg2)
                cond = true;
       }
       else if(bin == "<")
       {
            if(rval < arg2)
                cond = true;

       }
       else if(bin == ">")
       {
            if(rval > arg2)
                cond = true;
       }
       else if(bin == "<=")
       {
            if(rval <= arg2)
                cond = true;
       }
       else if(bin == ">=")
       {
            if(rval >= arg2)
                cond = true;
       }
       else if(bin == "!=")
       {
            if(rval != arg2)
                cond = true;
       }
       else
       {
           console.log("error!");
           process.exit(0);
       }

       if(cond)
       {
            if(op == "inc")
                registers[reg] += num;
            else
                registers[reg] -= num;
       }
       i++;
    }
}

var instructions = [];
for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   instructions.push(obj);
   registers[obj.reg] = 0;
}

process(instructions);
var mx = 0;
for(var x in registers)
{
    if(registers[x] > mx)
        mx = registers[x];
}

console.log(mx);