var xx = 40;
var yy = 41;
var resx = 31;
var resy = 39;
var favorite = 1350;
var walkLimit = 50;

function isEven(n) 
{
   return n % 2 == 0;
}

function dec2bin(dec)
{
    return (dec >>> 0).toString(2);
}

function isOpenSpace(x, y, favorite)
{
    var res = x*x + 3*x + 2*x*y + y + y*y;
    res = res + favorite;
    var bin = dec2bin(res);
    var n = 0;
    for(var i in bin)
    {
        if(bin[i] == '1')
            n++;
    }
    if(isEven(n))
        return true;
    return false;
}

var graph = [];

function createAdj(x, y, xx, yy)
{
    var adj = [];
    var xplus1 = x + 1;
    var yplus1 = y + 1;
    var xminus1 = x -1;
    var yminus1 = y - 1;

    if(yplus1 < yy && isOpenSpace(x, yplus1, favorite))
        adj.push({ "x" : x, "y" : yplus1 });
    if(xminus1 >= 0 && isOpenSpace(xminus1, y, favorite))
        adj.push({ "x" : xminus1, "y" : y });
    if(yminus1 >= 0 && isOpenSpace(x, yminus1, favorite))
        adj.push({ "x" : x, "y" : yminus1 });
    if(xplus1 < xx && isOpenSpace(xplus1, y, favorite))
        adj.push({ "x" : xplus1, "y" : y });

    return adj;
}

function createGraph(xx, yy)
{
    var ret = [];
    for(var x = 0; x < xx; x++)
    {
        for(var y = 0; y < yy; y++)
        {
            if(isOpenSpace(x, y, favorite))
            {
                var node = {"x" : x, "y" : y};    
                var adj = createAdj(x, y, xx, yy);
                ret.push({ "node" : node, "adj" : adj, "distance" : -1, "parent" : {} });
            }
        }
    }
    return ret;
}

function printGraph (g) 
{
    for(var n in g)
    {
        console.log("node -> x : " + g[n]["node"]["x"] + "; y : " + g[n]["node"]["y"]);
        var adj = g[n]["adj"];
        for(var a in adj)
            console.log(adj[a]);
    }
}

function printScreen(scr)
{
    for(var r in scr)
    {
        var row = scr[r];
        var line = '';
        for(var c in row)
            line += row[c];
        console.log(line);
    }
}

function inPath(path, x, y)
{
    for(var p in path)
    {
        var xp = path[p]["x"];
        var yp = path[p]["y"];
        if(xp == x && yp == y)
            return true;
    }
    return false;
}

function makeScreen(x, y, path)
{
    var ret = [];

    for(var i = 0; i < y; i++)
    {
        var row = [];
        for(var j = 0; j < x; j++)
        {
            var os = isOpenSpace(j,i, favorite);
            if(!os)
                row.push('#');
            else
            {
                if(inPath(path, j, i))
                    row.push('0');
                else
                    row.push('.');
            }
        }
        ret.push(row);
    }
    return ret;
}

function getNodeFromGraph(g, x, y)
{
    for(var n in g)
    {
        var node = g[n]["node"];
        if(node["x"] == x && node["y"] == y)
            return g[n];
    }
    return {};
}

function BFS(g, xroot, yroot)
{
    var queue = [];
    var nodeRoot = getNodeFromGraph(g, 1, 1);
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
            var xa = adj[a]["x"];
            var ya = adj[a]["y"];
            var nodeTest = getNodeFromGraph(g, xa, ya);
            if(nodeTest["distance"] < 0)
            {
                nodeTest["distance"] = currentDist + 1;
                nodeTest["parent"] = nodeCurrent;
                queue.push(nodeTest);

                if(nodeTest["node"]["x"] == resx && nodeTest["node"]["y"] == resy)
                    return nodeTest;
            }
        }
    }
}

function BFS2(g, xroot, yroot, walkLimit)
{
    var nodesVisited = 0;
    var queue = [];
    var nodeRoot = getNodeFromGraph(g, 1, 1);
    nodeRoot["distance"] = 0;
    nodeRoot["parent"] = {};

    queue.push(nodeRoot);

    while(queue.length > 0)
    {
        var nodeCurrent = queue.shift();
        var currentDist = nodeCurrent["distance"];
        
        if(currentDist <= walkLimit)
        {
            var adj = nodeCurrent["adj"];
            for(var a in adj)
            {
                var xa = adj[a]["x"];
                var ya = adj[a]["y"];
                var nodeTest = getNodeFromGraph(g, xa, ya);
                if(nodeTest["distance"] < 0)
                {
                    nodeTest["distance"] = currentDist + 1;
                    nodeTest["parent"] = nodeCurrent;
                    queue.push(nodeTest);
                    nodesVisited++;
                }
            }
        }
    }
    console.log(nodesVisited);
}

function createPath(node)
{
    var ret = [];
    var x = node["node"]["x"];
    var y = node["node"]["y"];
    ret.push({"x": x, "y": y});

    var p = node["parent"];
    while(p["node"] !== undefined)
    {
        var x = p["node"]["x"];
        var y = p["node"]["y"];
        ret.push({"x": x, "y": y});        
        p = p["parent"];    
    }
    return ret;
}

graph = createGraph(xx, yy);
BFS2(graph, 1, 1, walkLimit);