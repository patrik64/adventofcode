const { ifError } = require('assert');
let fs = require('fs');
const { off } = require('process');
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

function containLowercase(v, path) {
    if(!isLowerCase(v)) return false;

    for(let p in path) {
        let pp = path[p];
        if(v === pp) 
         return true;
    }
    return false;
}

function makePathForVertice(v, vertices, edges, paths) {

    let resultPaths = [];
    for (let p in paths) {
        let path = paths[p];
        let lastVertex = path[path.length -1];

        if(lastVertex === v) {
            for(let e in edges[v]) {
                let w = edges[v][e];
                let newPath = [...path];
                newPath.push(w);
                if(!containLowercase(w, path)){
                    resultPaths.push(newPath);                    
                    if(w !== 'end') {
                        resultPaths = makePathForVertice(w, vertices, edges, resultPaths);                    
                    }
                }
            }        
        } else {
            resultPaths.push(path);
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
let paths = [['start']];

paths = makePathForVertice('start', vertices, edges, paths);
console.log(paths.length);
