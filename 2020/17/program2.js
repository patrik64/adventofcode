let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;
let minZ = 0;
let maxZ = 0;
let maxW = 0;
let minW = 0;

function createPointKey(x, y, z, w) {
    let res = 'x' + x.toString() 
                + 'y' + y.toString()
                + 'z' + z.toString()
                + 'w' + w.toString();
    return res;
}

function createWorld() {
    let dim = 10;
    let res = {};

    for(let x = -1*dim; x <= dim; x++ ) {
        for(let y = -1*dim; y <= dim; y++ ) {
            for(let z = -1*dim; z <= dim; z++ ) {
                for(let w = -1*dim; w <= dim; w++ ) {
                    let pt = { 'x': x, 'y': y, 'z': z, 'w': w, 'active': false };
                    let key = createPointKey(x,y,z,w);
                    res[key] = pt;
                }
            }
        }
    }
    return res;
}

function getPoint(x, y, z, w, world) {
    let key = createPointKey(x,y,z,w);
    return world[key];
}

function calculateActiveNeighbors(pt, world) {
    let sum = 0;
    for(let xx = -1; xx <=1 ; xx++ ) {
        for(let yy = -1; yy <=1 ; yy++ ) {
            for(let zz = -1; zz <=1 ; zz++ ) {
                for(let ww = -1; ww <=1 ; ww++  ) {
                    if(!(xx === 0 && yy === 0 && zz === 0 && ww === 0)){
                        let x = pt['x'] + xx;
                        let y = pt['y'] + yy;
                        let z = pt['z'] + zz;
                        let w = pt['w'] + ww;
                        let nb = getPoint(x, y, z, w, world);
                        if(nb && nb['active'])
                            sum++;
                    }
                }
            }
        }
    }
    return sum;
}

function calculateActive(dict) {
    let sum = 0;
    for(let x in dict) {
        if(dict[x]['active'])
            sum++;
    }
    return sum;
}


function fixLimits(pt) {
    if(pt['x'] === maxX)
        maxX++;
    if(pt['y'] === maxY)
        maxY++;
    if(pt['z'] === maxZ)
        maxZ++;
    if(pt['x'] === minX)
        minX--;
    if(pt['y'] === minY)
        minY--;
    if(pt['z'] === minZ)
        minZ--;
    if(pt['w'] === maxW)
        maxW++;
    if(pt['w'] === minW)
        minW--;
}

function turn(world, n) {
    let copyWorld = JSON.parse(JSON.stringify(world));
    for(let i in copyWorld) {
        let pt = world[i];
        let cpt = copyWorld[i];
        if( pt['x'] <= maxX+1 && 
            pt['x'] >= minX-1 && 
            pt['y'] <= maxY+1 && 
            pt['y'] >= minY-1 &&
            pt['z'] <= maxZ+1 &&
            pt['z'] >= minZ-1 &&
            pt['w'] <= maxW+1 &&
            pt['w'] >= minW-1 ) {
            let nActive = calculateActiveNeighbors(pt, world);
            if(pt['active']) {
                if(nActive !== 2 && nActive !== 3) {
                    cpt['active'] = false;
                    fixLimits(pt);
                }
            }
            else {
                if(nActive === 3) {
                    cpt['active'] = true;
                    fixLimits(pt);
                }
            }
        }
    }
    console.log('after turn ', n, ' --> ', calculateActive(copyWorld))
    return copyWorld;
}

let world = createWorld();

/*let input1 = getPoint(0, 1, 0, 0, world);
let input2 = getPoint(1, 0, 0, 0, world);
let input3 = getPoint(-1, -1, 0, 0, world);
let input4 = getPoint(0, -1, 0, 0, world);
let input5 = getPoint(1, -1, 0, 0, world);

input1['active'] = true;
input2['active'] = true;
input3['active'] = true;
input4['active'] = true;
input5['active'] = true; 

minX = -1;
maxX = 1;
minY = -1;
maxY = 1; */

minX = -3;
maxX = 4;
minY = -3;
maxY = 4;

let input = [];

input.push(getPoint(-2, 4, 0, 0, world));
input.push(getPoint(0, 4, 0, 0, world));
input.push(getPoint(2, 4, 0, 0, world));

input.push(getPoint(-1, 3, 0, 0, world));
input.push(getPoint(4, 3, 0, 0, world));

input.push(getPoint(-3, 2, 0, 0, world));
input.push(getPoint(-2, 2, 0, 0, world));
input.push(getPoint(-1, 2, 0, 0, world));
input.push(getPoint(0, 2, 0, 0, world));
input.push(getPoint(1, 2, 0, 0, world));
input.push(getPoint(4, 2, 0, 0, world));

input.push(getPoint(-3, 1, 0, 0, world));
input.push(getPoint(-2, 1, 0, 0, world));
input.push(getPoint(-1, 1, 0, 0,world));
input.push(getPoint(0, 1, 0, 0, world));
input.push(getPoint(1, 1, 0, 0, world));
input.push(getPoint(4, 1, 0, 0, world));

input.push(getPoint(-3, 0, 0, 0, world));
input.push(getPoint(-2, 0, 0, 0, world));
input.push(getPoint(-1, 0, 0, 0, world));
input.push(getPoint(0, 0, 0, 0, world));
input.push(getPoint(1, 0, 0, 0, world));
input.push(getPoint(4, 0, 0, 0, world));

input.push(getPoint(-3, -1, 0, 0, world));
input.push(getPoint(-2, -1, 0, 0, world));
input.push(getPoint(-1, -1, 0, 0, world));
input.push(getPoint(2, -1, 0, 0, world));
input.push(getPoint(4, -1, 0, 0, world));

input.push(getPoint(-3, -2, 0, 0, world));
input.push(getPoint(0, -2, 0, 0, world));
input.push(getPoint(1, -2, 0, 0, world));
input.push(getPoint(3, -2, 0, 0, world));
input.push(getPoint(4, -2, 0, 0, world));

input.push(getPoint(-3, -3, 0, 0, world));
input.push(getPoint(-1, -3, 0, 0, world));
input.push(getPoint( 1, -3, 0, 0, world));
input.push(getPoint( 2, -3, 0, 0, world));
input.push(getPoint( 3, -3, 0, 0, world));
input.push(getPoint( 4, -3, 0, 0, world));


for(let i in input) {
    input[i]['active'] = true;
}

world = turn(world, 1);
world = turn(world, 2);
world = turn(world, 3);
world = turn(world, 4);
world = turn(world, 5);
world = turn(world, 6);

console.log(calculateActive(world));