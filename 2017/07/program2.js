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

function constructTree(strNode, arr)
{
    var node = { "node": strNode, "weight": 0, nodes: []}
    for(var i = 0; i < arr.length; i++)
    {
        var obj = arr[i];
        if(obj.base == strNode)
        {
            node.weight = Number(obj.weight);
            for(var j = 0; j < obj.branches.length; j++)
            {
                var branch = obj.branches[j];
                var leafNode = constructTree(branch, arr);
                node.nodes.push(leafNode);
            }
        }
    }
    return node;
}

function getSumWeight(tree, w)
{
    for(var i = 0; i < tree.nodes.length; i++)
    {   
        var node = tree.nodes[i];
        if(node.nodes.length > 0)
            w = getSumWeight(node, w);
        else
            w += node.weight;
    }
    w += tree.weight;
    return w;
}

function findTreeShaker(nd, diff)
{
    var test = [];
    for(var i = 0; i < nd.nodes.length; i++)
    {
        var node = nd.nodes[i];
        var w = getSumWeight(node, 0);
        var obj = { "n" : node, "sum" : w}
        test.push(obj);   
    }
    if(!test.every((val, i, arr) => val.sum == arr[0].sum))
    {
        var ret;
        test.sort(function(a, b){return a.sum-b.sum});
        if(test[0].sum < test[1].sum)
        {
            diff = test[1].sum - test[0].sum;
            ret = test[0].n;
        }
        else
        {
            diff = (-1)*(test[test.length-1].sum - test[0].sum);
            ret = test[test.length-1].n;
        }
        return findTreeShaker(ret, diff);
    }
    nd.weight += diff;
    return nd;
}

var lst = [];
for(var i in arr)
{
    var obj = parse(arr[i]);
    lst.push(obj);
}

//see part one
var root = 'svugo';

var tree = constructTree(root, lst);
var diff = 0;
var shaker = findTreeShaker(tree, diff);
console.log(shaker.weight);