var graph = {};

function addToGraph(g, node)
{
    var str = node["node"].toString();
    if(g[str] === undefined)
        g[str] = node;
}

function getNodeFromGraph(g, node)
{
    var str = node.toString();

    if(g[str] !== undefined)
        return g[str];
    else
        return false;
}

function isNodeInGraph(g, node)
{
    var str = node.toString();
    if(g[str] !== undefined)
        return true;
    return false;
}

function isEven(n) 
{
   return n % 2 == 0;
}

function hasGenerators(node, val)
{
    for(var i = 0; i < node.length; i++)
    {
        if(isEven(i))
        {
            if((node[i] != node[i+1]) && (node[i] == val))
                return true;
        }
    }
    return false;
}

function filterAllowedMoves(arr)
{
    var ret = [];

    for(var x in arr)
    {
        var node = arr[x];
        var passCheck = true;
        for(var i = 0; i < node.length-1; i++)
        {
            if(!isEven(i))
            {
                var val = node[i];
                if(node[i-1] != val && hasGenerators(node, val))
                {
                    passCheck = false;
                }
            }
        }
        if(passCheck == true)
            ret.push(node);
    }
    return ret;
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
                    ret.push(nm);
                }
            }
        }
    }
    ret = filterAllowedMoves(ret);
    var moves = {"floor" : floor, "nbors" : ret }; 
    return moves;
}

function extendGraph(g, adj)
{
    if(adj.length == 0)
        return g;

    var nbors = adj["nbors"];
    var floor = adj["floor"];
    var floorUp = floor + 1;
    var floorDown = floor - 1;

    for(var n in nbors)
    {
        var node = nbors[n];
        if(!isNodeInGraph(g, node))
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
            addToGraph(g, obj);
            
            if(floorUp < 4)
            {
                g = extendGraph(g, adjUp);
            }
            if(floorDown >= 0)
            {
                g = extendGraph(g, adjDown);
            }
        }
    }
    return g;
}

function createGraph(ns)
{
    var floor = ns[ns.length-1];
    var g = [];
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
    addToGraph(g, obj);

    if(floorUp < 4)
    {
        g = extendGraph(g, adjUp);
    }
    if(floorDown >= 0)
    {
        g = extendGraph(g, adjDown);
    }

    return g;
}

function printGraph(g)
{
    for(var n in g)
    {
        var node = g[n]["node"];
        console.log("node --> " + node);
        /*var adj = g[n]["adj"];
        for(var a in adj)
        {
            console.log("floor " + adj[a]["floor"]);
            console.log(adj[a]["nbors"]);
        }
        console.log("-----------------------");*/
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

function isFinalNodeEx(node)
{
    for(var x in node)
    {
        if(node[x] != 3)
            return false;
    }
    return true;
}

function BFS(g, nodeStart)
{
    var queue = [];
    var nodeRoot = getNodeFromGraph(g, nodeStart);
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
                if(isNodeInGraph(g, na))
                {
                    var nodeTest = getNodeFromGraph(g, na);
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

function printPath(node)
{
    console.log(node["node"]);
    var nodeParent = node["parent"];
    while(nodeParent["node"] !== undefined)
    {
        console.log(nodeParent["node"]);
        nodeParent = nodeParent["parent"];
    }
}

var nodeStart = [1,0,2,0,0];
graph = createGraph(nodeStart);
//printGraph(graph);
var nodeFinal = BFS(graph, nodeStart);
printPath(nodeFinal);
console.log(nodeFinal["distance"]);