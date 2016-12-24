var fs = require('fs'); 
var input = fs.readFileSync('Day24.in', 'utf8');
var arr = input.split('\n');

function findNodes(grid)
{
    var ret = [];
    for(var i = 0; i < grid.length; i++)
    {
        var row = grid[i];
        for(var j = 0; j < row.length; j++)
        {
            if(row[j] != '#' && row[j] != '.')
            {
                var obj = { "node" : row[j], "x" : j, "y" : i};
                ret.push(obj);
            }
        }   
    }
    return ret;
}

function compare(a,b) 
{
  if (a.node < b.node)
    return -1;
  if (a.node > b.node)
    return 1;
  return 0;
}

function createAdj(x, y, grid)
{
    var yy = grid.length;
    var xx = grid[0].length;
    var adj = [];
    var xplus1 = x + 1;
    var yplus1 = y + 1;
    var xminus1 = x -1;
    var yminus1 = y - 1;

    if(yplus1 < yy && grid[yplus1][x] != '#')
        adj.push({ "x" : x, "y" : yplus1 });
    if(xminus1 >= 0 && grid[y][xminus1] != '#')
        adj.push({ "x" : xminus1, "y" : y });
    if(yminus1 >= 0 && grid[yminus1][x] != '#')
        adj.push({ "x" : x, "y" : yminus1 });
    if(xplus1 < xx && grid[y][xplus1] != '#')
        adj.push({ "x" : xplus1, "y" : y });

    return adj;
}

function createMaze(grid)
{
    var ret = [];
    var xx = grid[0].length;
    var yy = grid.length;

    for(var x = 0; x < xx; x++)
    {
        for(var y = 0; y < yy; y++)
        {
            if(grid[y][x] != '#')
            {
                var node = {"x" : x, "y" : y};    
                var adj = createAdj(x, y, grid);
                ret.push({ "node" : node, "adj" : adj, "distance" : -1, "parent" : {} });
            }
        }
    }
    return ret;
}

function getNodeFromMaze(maze, x, y)
{
    for(var n in maze)
    {
        var node = maze[n]["node"];
        if(node["x"] == x && node["y"] == y)
            return maze[n];
    }
    return {};
}

function BFS(maze, xroot, yroot, xfinish, yfinish)
{
    var queue = [];
    var nodeRoot = getNodeFromMaze(maze, xroot, yroot);
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
            var nodeTest = getNodeFromMaze(maze, xa, ya);
            if(nodeTest["distance"] < 0)
            {
                nodeTest["distance"] = currentDist + 1;
                nodeTest["parent"] = nodeCurrent;
                queue.push(nodeTest);

                if(nodeTest["node"]["x"] == xfinish && nodeTest["node"]["y"] == yfinish)
                    return nodeTest;
            }
        }
    }
    return nodeRoot;
}

function createGraph(arr, nodes)
{
    var ret = [];
    for(var i = 0; i < nodes.length; i++)
    {
        var nodeStart = nodes[i];
        var xstart = nodeStart.x;
        var ystart = nodeStart.y;
        
        var adj = [];
        for(var j = 0; j < nodes.length; j++)
        {
            var nodeFinish = nodes[j];
            var xfinish = nodeFinish.x;
            var yfinish = nodeFinish.y;
            var maze = createMaze(arr);
            var distance = BFS(maze, xstart, ystart, xfinish, yfinish).distance;

            if(distance > 0)
                adj.push({ "node" : nodeFinish.node, "sum" : distance });       
        }
        ret.push({ "node" : nodeStart.node, "adj" : adj, "sum" : 0 });
    }
    return ret;
}

function getNodeFromGraph(g, nodeName)
{
    for(var n in g)
    {
        var nd = g[n];
        if(nd.node == nodeName)
            return g[n];
    }
    return {};
}

function permutations(list)
{
    if (list.length == 0)
        return [[]];       
        
    var result = [];
    
    for(var i = 0; i < list.length; i++)
    {
        var copy = Object.create(list);
        var head = copy.splice(i, 1);
        var rest = permutations(copy);
        for(var j = 0; j < rest.length; j++)
        {
            var next = head.concat(rest[j]);
            result.push(next);
        }
    }
    return result;
}

function getDistanceForPerm(g, startNode, lst)
{
    var sum = 0;
    var sn = getNodeFromGraph(g, startNode);
    for(var i = 0; i < lst.length; i++)
    {
        var adj = sn.adj;
        var p = lst[i];
        for(var j = 0; j < adj.length; j++)
        {
            if(adj[j].node == p)
            {
                sum += adj[j].sum;
                break;
            }
        }
        sn = getNodeFromGraph(g, p);
    }
    return sum;
}

function getDistances(g, startNode, permList)
{
    var ret = [];
    for(var i = 0; i < permList.length; i++)
    {
        var p = permList[i];
        var d = getDistanceForPerm(g, startNode, p);
        ret.push(d);
    }
    return ret;
}

var nodes = [];
nodes = findNodes(arr);
nodes.sort(compare);
var graph = createGraph(arr, nodes);

var rest = [];
for(var i = 1; i < nodes.length; i++)
    rest.push(nodes[i].node);

var perms = permutations(rest);
var distances = getDistances(graph, "0", perms);
distances = distances.sort((a, b) => a - b);
console.log(distances[0]);