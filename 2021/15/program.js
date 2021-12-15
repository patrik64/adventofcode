let fs = require('fs');
let input = fs.readFileSync('Day15.in', 'utf8');
let arr = input.split('\n');

function bellmanFord(vertices, edges, source) {
    let distances = {};
    let parents = {};
  
    vertices.map(v => { distances[v] = Infinity; parents[v] = null; });
    distances[source] = 0;
  
    for (let i = 1; i < vertices.length; i++) {
        for (let { u, v, w } of edges) {
            if (distances[u] + w < distances[v]) {
                distances[v] = distances[u] + w;
                parents[v] = u;
            }
        }
    }
  
    /*for (let { u, v, w } of edges) {
        if (distances[u] + w < distances[v]) {
            throw "Graph contains a negative-weight cycle";
        }
    }*/
  
    return { parents, distances };
}

function traverseParents(parents, distances, matrix) {
    let dim = matrix.length - 1;
    
    let source = 'P-' + dim + '-' + dim;
    let coords = source.split('-');
    let y = Number(coords[1]);
    let x = Number(coords[2]);
    
    let ret = matrix[y][x];
    
    let parent = parents[source];
    
    while(parent) {
        coords = parent.split('-');
        let py = Number(coords[1]);
        let px = Number(coords[2]);

        if(py === 0 && px === 0) {
            console.log(ret);
            return ret;
        }
    
        ret += matrix[py][px];
        parent = parents[parent];
    }
    return ret;
}

let dimY = arr.length;
let dimX = arr[0].length;

let matrix = new Array(dimY);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dimX).fill('.');
}

for(let i in arr) {
    let nums = arr[i].split('').map(x => Number(x));
    matrix[i] = nums;
}

let vertices = [];
let edges = [];

for(let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    let p = 'P' + '-' + i;
    for(let j = 0; j < row.length; j++) {
        pt = p + '-' + j;
        vertices.push(pt);
    }
}

for(let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    let pt = 'P-' + i;
    for(let j = 0; j < row.length; j++) {
        let val1 = row[j];
        if (j+1 < row.length) {
            let pt1 = pt + '-' + j;
            let pt2 = pt + '-' + (j+1);
            let val2 = row[j+1];
            let edge = { u: pt1, v: pt2, w: val2+val1};
            edges.push(edge);

        }
        if(i+1 < matrix.length) {
            let pt1 = 'P' + '-' + i + '-' + j;
            let pt2 = 'P' + '-' + (i+1) + '-' + j;
            let val2 = matrix[i+1][j];
            let edge = { u: pt1, v: pt2, w: val2+val1};
            edges.push(edge);
        }
    }
    
}

const graph = {
    vertices: vertices,
    edges: edges
};

result = bellmanFord(graph.vertices, graph.edges, "P-0-0");
traverseParents(result.parents, result.distances, matrix);
