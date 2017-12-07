var fs = require('fs');

var input = fs.readFileSync('Day7.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
   var inBase = true;
   var inWeight = false;
   var inBranches = false;

   var strBase = '';
   var strWeight = '';
   var branches = [];
   var currentBase = '';
   var currentWeight = '';
   var currentBranch = '';

   for(var i = 0; i < str.length; i++)
   {
       var ch = str[i];
       if(ch == '(' && !inBranches && !inWeight)
       {
           inBase = false;
           inWeight = true;
           inBranches = false;
           if(currentBase.length > 0)
           {
               strBase = currentBase.trim();
           }
       }
       else if(inWeight && ch == ')')
       {
           inBase = false;
           inWeight = false;
           inBranches = true;
           if(currentWeight.length > 0)
           {
               strWeight = currentWeight.trim();
           }
       }
       else if(inBranches && ch == '-')
       {
           inBase = false;
           inWeight = false;
           inBranches = true;
           i++;
       }
       else if(inBranches && ch == ',')
       {
           inBase = false;
           inWeight = false;
           inBranches = true;
           if(currentBranch.length > 0)
           {
                strBranch = currentBranch.trim();
                branches.push(strBranch);
                currentBranch = '';
           }
       }
       else if(inBase)
       {
           currentBase += ch;
       }
       else if(inWeight)
       {
           currentWeight += ch;
       }
       else if(inBranches)
       {
           currentBranch += ch;
       }
       else
       {
           console.log('parsing error!');
       }
   }

   if(currentBranch.length > 0)
       branches.push(currentBranch.trim());


   var ret = { "base" : strBase, "weight" : Number(strWeight), "branches" : branches };
   return ret;
}

function inArr(str, arr)
{
    for(var i = 0; i < arr.length; i++)
    {
        var s = arr[i].base;
        if(str == s)
            return true;
    }
    return false;
}

function findRoot(arr)
{
    var res = [];
    for(var i = 0; i < arr.length; i++)
    {
        var obj = arr[i];
        if(obj.branches.length > 0)
            res.push(obj);
    }

    for(var i = 0; i < res.length; i++)
    {
        var cleanBranches = [];
        var obj = res[i];
        for(var j = 0; j < obj.branches.length; j++)
        {
            var base = obj.branches[j];
            if(inArr(base, res))
                cleanBranches.push(base);
        }
        obj.branches = cleanBranches;
    }
    return res;
}

var lst = [];
for(var i in arr)
{
    var obj = parse(arr[i]);
    lst.push(obj);
}

while(lst.length > 1)
    lst = findRoot(lst);

console.log(lst[0].base);