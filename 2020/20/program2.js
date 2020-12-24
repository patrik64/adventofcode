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
            line = line.replace('1', '#')
            line = line.replace('0', '.')
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

    let fH = flipH(img);
    let fV = flipV(img);
    let r1 = rotate(img);
    let r2 = rotate(r1);
    let r3 = rotate(r2);
    let r3fH = flipH(r3);

    ret.push(fV);
    ret.push(fH);
    ret.push(r3fH);
    ret.push(img);
    ret.push(r3);
    ret.push(r1);
    ret.push(r2);

    return ret;
}

function variants2(img) {
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

    let r1fH = flipH(r1);
    let r2fH = flipH(r2);
    let r3fH = flipH(r3);
    ret.push(r1fH);
    ret.push(r2fH);
    ret.push(r3fH);

    let r1fV = flipV(r1);
    let r2fV = flipV(r2);
    let r3fV = flipV(r3);
    ret.push(r1fV);
    ret.push(r2fV);
    ret.push(r3fV);
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
    filtered = filtered.reverse();

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
            if(matchEdgeU(img['image'], image))
                pass = true;
            else
                pass = false;
        }
    }

    return pass;
}

function cropImage(image) {
    let res = [];
    for(let row = 1; row < image.length-1; row++) {
        res.push([]);
        for(let col = 1; col < image.length-1; col++) {
            res[row-1].push(image[row][col]);
        }
    }
    return res;
}

function createFinalImage(matrix) {
    let res = [];
    //initialize final image
    for(let row = 0; row < matrix.length*8; row++) {
        res.push([]);
        for(let col = 0; col < matrix.length*8; col++) {
            res[row].push('x');
        }
    }

    for(let row = 0; row < matrix.length; row++) {
        for(let col = 0; col < matrix.length; col++) {
            let tile = cropImage(matrix[row][col]['image']);
            for(let trow = 0; trow < tile.length; trow++) {
                for(let tcol = 0; tcol < tile.length; tcol++) {
                    res[row*8+trow][col*8+tcol] = tile[trow][tcol];
                }
            }
        }
    }
    return res;
}

function checkPattern(image, row, col) {

    //row 1
    let r1_18 = image[row][col+18];
    if(r1_18 === 0) return false;

    //row 2
    let r2_0 = image[row+1][col];
    if(r2_0 === 0) return false;

    let r2_5 = image[row+1][col+5];
    if(r2_5 === 0) return false;

    let r2_6 = image[row+1][col+6];
    if(r2_6 === 0) return false;

    let r2_11 = image[row+1][col+11];
    if(r2_11 === 0) return false;

    let r2_12 = image[row+1][col+12];
    if(r2_12 === 0) return false;

    let r2_17 = image[row+1][col+17];
    if(r2_17 === 0) return false;

    let r2_18 = image[row+1][col+18];
    if(r2_18 === 0) return false;

    let r2_19 = image[row+1][col+19];
    if(r2_19 === 0) return false;

    //row3
    let r3_1 = image[row+2][col+1];
    if(r3_1 === 0) return false;

    let r3_4 = image[row+2][col+4];
    if(r3_4 === 0) return false;

    let r3_7 = image[row+2][col+7];
    if(r3_7 === 0) return false;

    let r3_10 = image[row+2][col+10];
    if(r3_10 === 0) return false;

    let r3_13 = image[row+2][col+13];
    if(r3_13 === 0) return false;

    let r3_16 = image[row+2][col+16];
    if(r3_16 === 0) return false;

    return true;
}

function hasSeaMonsters(image) {
    let nFound = 0;
    for(let row = 0; row < image.length-2; row++) {
        for(let col = 0; col < image.length-20; col++) {
            if(checkPattern(image, row, col)) {
                nFound++;
                if (col+20 < image.length-20)
                    col +=20;
                else if(row+2 < image.length-2) {
                    col = 0;
                    row += 2;
                }
            }
        }
    }
    return nFound;
}

function calculateOnes(image) {
    let res = 0;
    for(let row = 0; row < image.length; row++) {
        for(let col = 0; col < image.length; col++) {
            if(image[row][col] === 1)
                res++;
        }
    }
    return res;
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

assembleImage(resultMtx, images);

let finalImage = createFinalImage(resultMtx);

let vars = variants2(finalImage);

let resultImage = [];
let nSeaMonsters = 0;

for(let v in vars) {
    let image = vars[v];
    nSeaMonsters = hasSeaMonsters(image);
    if(nSeaMonsters > 0) {

        resultImage = image;
        break;
    }
}

let allOnes = calculateOnes(resultImage);

let res = allOnes - (nSeaMonsters * 15);
console.log(res)