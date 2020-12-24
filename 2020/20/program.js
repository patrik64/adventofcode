var fs = require('fs');
var input = fs.readFileSync('Day20.in', 'utf8');
var arr = input.split('\n');

function parseID(str) {
    let idx = 4;
    let id = '';
    while(str[idx] !== ':') {
        id += str[idx];
        idx++;
    }
    id = id.trim();
    return id;
}

function parseRow(str) {
    let idx = 0;
    let ret = [];

    while(idx < str.length) {
        let ch = str[idx];
        if(ch === '.') {
            ret.push(0);
        } else if(ch === '#') {
            ret.push(1);
        }
        idx++;
    }
    return ret;
}

function printImage(img) {
    for(let i in img) {
        var row = img[i];
        var line = '';
        for(var r in row)
        {
            line += row[r];
        }
        console.log(line);
    }
}

function getRow(arr, r) {
    let ret = [];
    let row = arr[r];
    for(let x in row) {
        ret.push(row[x]);
    }
    return ret;
}

function getColumn(arr, c) {
    let ret = [];
    for(let x in arr) {
        let row = arr[x];
        for(let y in row) {
            if(y == c) {
                ret.push(row[y]);
            }
        }
    }
    return ret;
}

function flipV(arr) {
    let ret = [];
    for(let x in arr) {
        ret.unshift(arr[x]);
    }
    return ret;
}

function flipH(arr) {
    let ret = [];
    for(let x in arr) {
        let temp = [...arr[x]]
        temp.reverse();
        ret.push(temp);
    }
    return ret;
}

function rotate(arr) {
    let dim = arr[0].length;
    let ret = [];
    for(let i = 0; i < dim; i++) {
        let row = [];
        for(let j = 0; j < dim; j++) {
            row.push(-1);
        }
        ret.push(row);
    }

    for(let i = 0; i < dim; i++) {
        for(let j = 0; j < dim; j++) {
            ret[i][dim-j-1] = arr[j][i];
        }
    }
    return ret;
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

function variants(img) {
    let ret = [];

    ret.push(img);

    let fV = flipV(img);
    ret.push(fV);

    let fH = flipH(img);
    ret.push(fH);

    let r1 = rotate(img);
    let r2 = rotate(r1);
    let r3 = rotate(r2);

    ret.push(r1);
    ret.push(r2);
    ret.push(r3);

    let r3fH = flipH(r3);

    ret.push(r3fH);
    return ret;
}

function imagesEqual(img1, img2) {
    for(let x in img1) {
        let row1 = img1[x];
        let row2 = img2[x];
        if(!arraysEqual(row1, row2))
            return false;
    }
    return true;
}

function matchEdgeR(img1, img2) {
    let colL = getColumn(img1, 9);
    let colR = getColumn(img2, 0);
    if(arraysEqual(colL, colR))
        return true;
    return false;
}

function matchEdgeU(img1, img2) {
    let rowD = getRow(img1, 9);
    let rowU = getRow(img2, 0);
    if(arraysEqual(rowD, rowU))
        return true;
    return false;
}

function arrayIn(test, mtx) {
    for(let m in mtx) {
        let arr = mtx[m];
        if(arraysEqual(test, arr))
            return true;
    }
    return false;
}

function fillVariants(imgs) {
    for(let i in imgs) {
        let img = imgs[i]['mtx'];
        let vars = variants(img);
        imgs[i]['variants'] = vars;
    }
    return imgs;
}

function filterImages(matrix, images) {
    let res = [];
    let usedIDS = [];
    for(let row in matrix) {
        for(let col in matrix) {
            if(matrix[row][col] !== 0) {
                let usedId = matrix[row][col]['id'];
                usedIDS.push(usedId);
            }
        }
    }

    for(let i in images) {
        if(!usedIDS.includes(images[i]['id']))
            res.push(images[i]);
    }
    return res;
}

function assembleImage(matrix, images) {
    let dim = Math.sqrt(images.length);
    let row = 0;
    let col = 0;
    let checkUnused = false;

    for (row = 0; row < matrix.length; row++) {
      for (col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === 0) {
            checkUnused = true;
          break;
        }
      }
      if (checkUnused === true) {
        break;
      }
    }
    if (checkUnused === false) {
      return true;
    }

    let filtered = filterImages(matrix, images);

    for(let i in filtered) {
        let id = filtered[i]['id'];
        for(let v in filtered[i]['variants']) {
            let image = filtered[i]['variants'][v];
            if (isMatch(matrix, row, col, image, dim)) {
                let obj = { 'image' : image, 'id': id }
                matrix[row][col] = obj;
                if (assembleImage(matrix, images)) {
                    return true;
                }
                matrix[row][col] = 0;
            }
        }
    }
    return false;
  }

function isMatch(matrix, row, col, image, dim) {
    let pass = false;

    //find previous
    if(col === 0) {
        pass = true;
    }
    else if(matrix[row][col-1] === 0) {
        pass = true;
    } else {
        let img = matrix[row][col-1];
        if(matchEdgeR(img['image'], image))
            pass = true;
        else
            pass = false;
    }

    if(pass) {
        //find under
        if(row < 1) {
            pass = true;
        }
        else if(matrix[row-1][col] === 0) {
            pass = true;
        } else {
            let img = matrix[row-1][col];
            if(matchEdgeU(image, img['image']))
                pass = true;
            else
                pass = false;
        }
    }

    return pass;
}

let id = '';
let images = [];
let imageMtx = [];
for (let i in arr) {
    if(arr[i][0] ==='T') {
        id = parseID(arr[i]);
    } else if(arr[i][0] === '.' || arr[i][0] === '#') {
        let row = parseRow(arr[i]);
        imageMtx.push(row);
    } else {
        let image = {};
        image['id'] =  id;
        image['mtx']  = JSON.parse(JSON.stringify(imageMtx));
        images.push(image);
        imageMtx = [];
        id = '';
    }
}

images = fillVariants(images);
let limit = images.length;

let dim = Math.sqrt(limit);

let resultMtx = [];

//initialize resultMatx
for(let i = 0; i < dim; i++) {
    resultMtx.push([])
    for(let j = 0; j < dim; j++) {
        resultMtx[i].push(0);
    }
}

if(assembleImage(resultMtx, images)) {

    let corner00 = resultMtx[0][0]['id'];
    let corner0N = resultMtx[0][dim-1]['id'];
    let cornerN0 = resultMtx[dim-1][0]['id'];
    let cornerNN = resultMtx[dim-1][dim-1]['id'];

    let res = Number(corner00) * Number(corner0N) * Number(cornerN0) * Number(cornerNN);
    console.log(res);
} else {
    console.log('damn');
}