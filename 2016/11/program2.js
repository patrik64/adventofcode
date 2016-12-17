graph = {};

function addToGraph(node)
{
    var str = node["node"].toString();
    if(graph[str] === undefined)
        graph[str] = node;
}

function getNodeFromGraph(node)
{
    var str = node.toString();

    if(graph[str] !== undefined)
        return graph[str];
    else
        return false;
}

function isNodeInGraph(node)
{
    var str = node.toString();
    if(graph[str] !== undefined)
        return true;
    return false;
}

function isEven(n) 
{
   return n % 2 == 0;
}

function hasGenerators(j, node, val)
{
    for(var i = 0; i < node.length-1; i++)
    {
        if(isEven(i))
        {
            if(node[i] == val && (i+1 != j))
                return true;
        }
    }
    return false;
}

function moveAllowed(node)
{
    for(var i = 0; i < node.length-1; i++)
    {
        if(!isEven(i))
        {
            var val = node[i];
            if(node[i-1] != val && hasGenerators(i, node, val))
                return false;
        }
    }
    return true;
}

function move(node, dir)
{
    var ret = [];
    var floor = node[node.length-1] + dir;

    for(var i = 0; i < node.length-1; i++)
    {
        var nm = node.slice();
        nm[i] = nm[i] + dir;
        if(nm[i] == floor && nm[i] >= 0 && nm[i] < 4)
        { 
            nm[nm.length-1] = floor;
            if(moveAllowed(nm))
                ret.push(nm);
        }
    }
    for(var i = 0; i < node.length-2; i++)
    {
        for(var j = i+1; j < node.length-1; j++)
        {
            if(i != j)
            {
                var nm = node.slice();
                nm[i] = nm[i] + dir;
                nm[j] = nm[j] + dir;
                if( nm[i] == floor &&
                    nm[i] >= 0 && 
                    nm[i] < 4 && 
                    nm[j] >= 0 && 
                    nm[j] < 4 && 
                    nm[i] == nm[j])
                {
                    nm[nm.length-1] = floor;
                    if(moveAllowed(nm))
                        ret.push(nm);
                }
            }
        }
    }
    var moves = {"floor" : floor, "nbors" : ret }; 
    return moves;
}

function extendGraph(adj)
{
    if(adj.length == 0)
        return;

    var adjTest = [];
    adjTest.push(adj);

    while(adjTest.length > 0)
    {
        adj = adjTest.pop();
        
        var nbors = adj["nbors"];
        var floor = adj["floor"];
        var floorUp = floor + 1;
        var floorDown = floor - 1;

        for(var n in nbors)
        {
            var node = nbors[n];
            if(!isNodeInGraph(node))
            {
                var adjNew = [];
                var adjUp = {};
                var adjDown = {};
                
                if(floorUp < 4)
                {
                    adjUp = move(node, 1);
                    adjNew.push(adjUp);    
                }
                if(floorDown >= 0)
                {
                    adjDown = move(node, -1);
                    adjNew.push(adjDown);
                }
        
                var obj = { "node" : node, "adj" : adjNew, "distance" : -1, "parent" : {} };
                addToGraph(obj);
                
                if(floorUp < 4)
                    adjTest.push(adjUp);
                if(floorDown >= 0)
                    adjTest.push(adjDown);
            }
        }
    }
}

function createGraph(ns)
{
    var floor = ns[ns.length-1];
    var adj = [];
    var adjUp = {};
    var adjDown = {};
    var floorUp = floor + 1;
    var floorDown = floor - 1;

    if(floorUp < 4)
    {
        adjUp = move(ns, 1);
        adj.push(adjUp);    
    }
    if(floorDown >= 0)
    {
        adjDown = move(ns, -1);
        adj.push(adjDown);
    }
    
    var obj = { "node" : ns, "adj" : adj, "distance" : -1, "parent" : {} };
    addToGraph(obj);

    if(floorUp < 4)
        extendGraph(adjUp);
    if(floorDown >= 0)
        extendGraph(adjDown);
}

function printGraph()
{
    for(var n in graph)
    {
        var node = graph[n]["node"];
        console.log("node --> " + node);
    }
}

function isFinalNode(node)
{
    var n = node["node"];

    for(var x in n)
    {
        if(n[x] != 3)
            return false;
    }
    return true;
}

function BFS(nodeStart)
{
    var queue = [];
    var nodeRoot = getNodeFromGraph(nodeStart);
    nodeRoot["distance"] = 0;
    nodeRoot["parent"] = {};

    queue.push(nodeRoot);

    while(queue.length > 0)
    {
        var nodeCurrent = queue.shift();
        var currentDist = nodeCurrent["distance"];
        var adj = nodeCurrent["adj"];
        for(var a in adj)
        {
            var nbors = adj[a]["nbors"];
        
            for(var nb in nbors)
            {
                var na = nbors[nb];
                if(isNodeInGraph(na))
                {
                    var nodeTest = getNodeFromGraph(na);
                    if(nodeTest["distance"] < 0)
                    {
                        nodeTest["distance"] = currentDist + 1;
                        nodeTest["parent"] = nodeCurrent;
                        queue.push(nodeTest);

                        if(isFinalNode(nodeTest))
                            return nodeTest;
                    }
                }
            }
        }
    }
    return nodeRoot;
}

function printNode(n)
{
    var j = 0;
    var str = "";
    for(var i in n)
    {
        if(isEven(i))
            j++;

        if(i == n.length-1)
            str = "[ FLOOR[" + n[i] + "] : " + str;
        else if(isEven(i))
            str += "G" + j + "[" + n[i] + "], ";
        else
            str += "M" + j + "[" + n[i] + "], ";
    }
    str = str.substring(0, str.length-2);
    str += " ]";
    console.log(str);
}

function printPath(node)
{
    printNode(node["node"]);
    var nodeParent = node["parent"];
    while(nodeParent["node"] !== undefined)
    {
        printNode(nodeParent["node"]);
        nodeParent = nodeParent["parent"];
    }
}

var nodeStart = [0,0,0,0,3,3,3];
createGraph(nodeStart);
var nodeFinal = BFS(nodeStart);
printPath(nodeFinal);
var previousDist = 33;
var partialDist = nodeFinal["distance"];
console.log(previousDist + " + " + partialDist + " = " + (previousDist+partialDist));