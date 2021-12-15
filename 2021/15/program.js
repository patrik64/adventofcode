let fs = require('fs');
let input = fs.readFileSync('Day15.in', 'utf8');
let arr = input.split('\n');

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}
    
class PriorityQueue {
  constructor() {
    this.values = [];
  }
    
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
          leftChild = this.values[leftChildIdx];
          if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
          }
      }

      if (rightChildIdx < length) {
          rightChild = this.values[rightChildIdx];
          if (
            (swap === null && rightChild.priority < element.priority) ||
            (swap !== null && rightChild.priority < leftChild.priority)
          ) {
            swap = rightChildIdx;
          }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}
    
class WeightedGraph {

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;

    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
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

var graph = new WeightedGraph();

for(let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    let p = 'P' + '-' + i;
    for(let j = 0; j < row.length; j++) {
        pt = p + '-' + j;
        graph.addVertex(pt);
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
            graph.addEdge(pt1, pt2, val2+val1);
        }
        if(i+1 < matrix.length) {
            let pt1 = 'P' + '-' + i + '-' + j;
            let pt2 = 'P' + '-' + (i+1) + '-' + j;
            let val2 = matrix[i+1][j];
            graph.addEdge(pt1, pt2, val2+val1);
        }
    }
    
}

let firstPt = 'P-0-0';
let lastPt = 'P-' + (matrix.length - 1) + '-' + (matrix.length - 1);

let path = graph.dijkstra(firstPt, lastPt);

let sum = 0;
for(let p = 1; p < path.length; p++) {
    let pt = path[p];
    let coords = pt.split('-');
    let y = Number(coords[1]);
    let x = Number(coords[2]);

    sum += matrix[y][x];
}
    
console.log(sum);