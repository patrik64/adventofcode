let fs = require('fs');
let input = fs.readFileSync('Day12.in', 'utf8');
let arr = input.split('\n');

function isLowerCase(str) {
    return str == str.toLowerCase() && str != str.toUpperCase();
}

function addVertice(v, vertices) {
    if(!vertices.includes(v)) {
        vertices.push(v);
    }
    return vertices;
}

function addEdge(v,w, edges) {
    if(!edges[v]) {
        edges[v] = [];    
    }
    if(w !== 'start'){
        edges[v].push(w);
    }

    if(!edges[w]) {
        edges[w] = [];    
    }
    if(v !== 'start'){
        edges[w].push(v);
    }
    return edges;
}

function initTracker(vertices){
    let tracker = {};
    for(let v in vertices) {
        let vertex = vertices[v];
        if(isLowerCase(vertex) &&
            vertex !== 'start' &&
            vertex !== 'end') {
            tracker[vertex] = 0;
        }
    }
    tracker['doubleFound'] = 0;
    return tracker;
}

function applyTracker(v, tracker) {
    if (!(v in tracker)) return tracker;
    tracker[v] = tracker[v] + 1;
    if(tracker[v] > 1) {
        tracker['doubleFound'] = tracker['doubleFound'] + 1;
    }
    return tracker;
}

function checkTracker(v, tracker) {
    if (!(v in tracker)) return false;

    if(tracker[v] > 1 && tracker['doubleFound'] > 1)
        return true;
    
    return false;
}

function makePathForVertice(v, vertices, edges, paths) {

    let resultPaths = [];
    for (let p in paths) {
        let path = paths[p].path;
        let tracker = paths[p].tracker;
        let lastVertex = path[path.length -1];

        if(lastVertex === v) {
            for(let e in edges[v]) {
                let w = edges[v][e];
                let newPath = [...path];
                let newTracker = JSON.parse(JSON.stringify(paths[p].tracker));
                newTracker = applyTracker(w, newTracker);

                newPath.push(w);
                if(!checkTracker(w, newTracker)){
                    let newFullPath = {
                        'path' : newPath,
                        'tracker' : newTracker
                    }

                    resultPaths.push(newFullPath);                    
                    if(w !== 'end') {
                        resultPaths = makePathForVertice(w, vertices, edges, resultPaths);                    
                    }
                }
            }        
        } else {
            resultPaths.push(paths[p]);
        }
    }
    return resultPaths;
}

let vertices = [];
let edges = [];

for(let i in arr) {
    let line = arr[i].split('-');

    let v = line[0];
    let w = line[1];

    vertices = addVertice(v, vertices);
    vertices = addVertice(w, vertices);

    edges = addEdge(v,w,edges);
}

edges['end'] = [];
let tracker = initTracker (vertices);
let startPath = {
    'path': ['start'],
    'tracker' : tracker
}
let paths = [];
paths.push(startPath);

paths = makePathForVertice('start', vertices, edges, paths);
console.log('paths num --> ', paths.length);