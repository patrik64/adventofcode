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

function incMatrix(m) {

    let dim = m.length;
    
    let matrix = new Array(dim);

    for (let i = 0; i < m.length; i++) {
        matrix[i] = new Array(dim).fill('.');
    }
    
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            let val = row[j] + 1;
            if(val > 9) {
                matrix[i][j] = 1;
            } else {
                matrix[i][j] = val;
            }
        }
    }
    return matrix;
}

function fillMM(mm, m, y, x) {
    
    for(let i = 0; i < m.length; i++ ) {
        for(let j = 0; j < m[i].length; j++) {
            let yy = y + i;
            let xx = x + j;
            mm[yy][xx] = m[i][j];
        }
    }
    return mm;
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

let m1 = incMatrix(matrix);
let m2 = incMatrix(m1);
let m3 = incMatrix(m2);
let m4 = incMatrix(m3);
let m5 = incMatrix(m4);
let m6 = incMatrix(m5);
let m7 = incMatrix(m6);
let m8 = incMatrix(m7);

let dim = dimY * 5;

let MM = new Array(dim);

for (let i = 0; i < MM.length; i++) {
    MM[i] = new Array(dim).fill('.');
}

let currentX = 0;
let currentY = 0;

//first row
MM = fillMM(MM, matrix, 0, 0);
currentX += dimY;
MM = fillMM(MM, m1, 0, currentX);
currentX += dimY;
MM = fillMM(MM, m2, 0, currentX);
currentX += dimY;
MM = fillMM(MM, m3, 0, currentX);
currentX += dimY;
MM = fillMM(MM, m4, 0, currentX);

//second row
currentX = 0;
currentY += dimY;

MM = fillMM(MM, m1, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m2, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m3, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m4, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m5, currentY, currentX );

//third row
currentX = 0;
currentY += dimY;

MM = fillMM(MM, m2, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m3, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m4, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m5, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m6, currentY, currentX );

//fourth row
currentX = 0;
currentY += dimY;

MM = fillMM(MM, m3, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m4, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m5, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m6, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m7, currentY, currentX );

//fifth row
currentX = 0;
currentY += dimY;

MM = fillMM(MM, m4, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m5, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m6, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m7, currentY, currentX );
currentX += dimY;
MM = fillMM(MM, m8, currentY, currentX );


let vertices = [];
let edges = [];

for(let i = 0; i < MM.length; i++) {
    let row = MM[i];
    let p = 'P' + '-' + i;
    for(let j = 0; j < row.length; j++) {
        pt = p + '-' + j;
        vertices.push(pt);
    }
}

for(let i = 0; i < MM.length; i++) {
    let row = MM[i];
    let pt = 'P-' + i;
    for(let j = 0; j < row.length; j++) {
        let val1 = row[j];
        if (j+1 < row.length) {
            let pt1 = pt + '-' + j;
            let pt2 = pt + '-' + (j+1);
            let val2 = row[j+1];
            //g.addEdge(pt1, pt2, val2+val1);
            let edge = { u: pt1, v: pt2, w: val2+val1};
            edges.push(edge);

        }
        if(i+1 <MM.length) {
            let pt1 = 'P' + '-' + i + '-' + j;
            let pt2 = 'P' + '-' + (i+1) + '-' + j;
            let val2 = MM[i+1][j];
            //g.addEdge(pt1, pt2, val2+val1);
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
traverseParents(result.parents, result.distances, MM);
