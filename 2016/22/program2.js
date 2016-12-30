var fs = require('fs');
 
var input = fs.readFileSync('Day22.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var xpos = str.indexOf('x');
    var ypos = str.indexOf('y');

    var x = str[xpos+1];
    if(str[xpos+2] != '-')
        x += str[xpos+2];

    var y = str[ypos+1];
    if(str[ypos+2] != ' ')
        y += str[ypos+2];

    var pos = ypos+3;
    while(str[pos] == ' ')
        pos++;

    var size = str[pos];
    while(str[pos] != 'T')
    {
        pos++;
        size += str[pos];
    }
    size = size.substring(0, size.length-1);
    pos++;

    while(str[pos] == ' ')
        pos++;

    var used = str[pos];
    while(str[pos] != 'T')
    {
        pos++;
        used += str[pos];
    }
    used = used.substring(0, used.length-1);
    pos++;

    while(str[pos] == ' ')
        pos++;

    var avail = str[pos];
    while(str[pos] != 'T')
    {
        pos++;
        avail += str[pos];
    }
    avail = avail.substring(0, avail.length-1);

    var ret = { "x" : Number(x), "y" : Number(y), "size" : Number(size), "used" : Number(used), "avail" : Number(avail) };
    return ret;
}

function findZeroUsed(lst)
{
    for(var i = 0; i < lst.length; i++)
    {
        var o = lst[i];
        if(o.used == 0)
            return lst[i];
    }
    return -1;
}

function findMaxX(lst)
{
    var ret = 0;
    for(var i = 0; i < lst.length; i++)
    {
        var o = lst[i];
        if(o.x > ret)
            ret = o.x;
    }
    return ret;
}

function findMaxY(lst)
{
    var ret = 0;
    for(var i = 0; i < lst.length; i++)
    {
        var o = lst[i];
        if(o.y > ret)
            ret = o.y;
    }
    return ret;
}

function getNodeFromGrid(lst, x, y)
{
    for(var i = 0; i < lst.length; i++)
    {
        var o = lst[i];
        if(o.x == x && o.y == y)
            return o;
    }
    return {};
}

function isMovable(o1, o2)
{
    var u1 = o1["used"];
    var u2 = o2["used"];
    var s1 = o1["size"];
    var s2 = o2["size"];

    if(u1 <= s2 && s1 >= u2)
        return true;
    return false;
}

function createAdj(grid, x, y, xx, yy)
{
    var adj = [];
    var xplus1 = x + 1;
    var yplus1 = y + 1;
    var xminus1 = x -1;
    var yminus1 = y - 1;

    var o =  getNodeFromGrid(grid,x,y);

    if(yplus1 <= yy && isMovable(o, getNodeFromGrid(grid,x,yplus1)))
        adj.push({ "x" : x, "y" : yplus1 });
    if(xminus1 >= 0 && isMovable(o, getNodeFromGrid(grid,xminus1,y)))
        adj.push({ "x" : xminus1, "y" : y });
    if(yminus1 >= 0 && isMovable(o, getNodeFromGrid(grid,x,yminus1)))
        adj.push({ "x" : x, "y" : yminus1 });
    if(xplus1 <= xx && isMovable(o, getNodeFromGrid(grid,xplus1,y)))
        adj.push({ "x" : xplus1, "y" : y });

    return adj;
}

function createGraph(grid, mx, my)
{
    var ret = [];
    for(var i in grid)
    {
        var o = grid[i];
        var adj = createAdj(grid, o.x, o.y, mx, my);
        ret.push({"x" : o.x, "y" : o.y, "adj" : adj, "distance" : -1, "parent" : {}});
    }
    return ret;
}

function getNodeFromGraph(g, x, y)
{
    for(var i = 0; i < g.length; i++)
    {
        var o = g[i];
        if(o.x == x && o.y == y)
            return o;
    }
    return {};
}

function BFS(g, xroot, yroot, xfinish, yfinish)
{
    var queue = [];
    var nodeRoot = getNodeFromGraph(g, xroot, yroot);
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

                if(nodeTest["x"] == xfinish && nodeTest["y"] == yfinish)
                    return nodeTest;
            }
        }
    }
    return nodeRoot;
}


var all = [];
for (var i = 2; i < arr.length; i++)
{
    var obj = parse(arr[i]);
    all.push(obj);    
}

var mx = findMaxX(all);
var my = findMaxY(all);

var graph = createGraph(all, mx, my);

var zero = findZeroUsed(all);
var goalNode = getNodeFromGrid(all, mx, 0);

var gNode = BFS(graph, zero.x, zero.y, goalNode.x, goalNode.y);
var dist = gNode.distance;

gNode = gNode.parent;
var xdist = gNode.x;

while(xdist > 0)
{
    dist += 5;
    xdist--;
}
console.log(dist);