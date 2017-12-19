var fs = require('fs');

var input = fs.readFileSync('Day15.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var x = '';
    var capacity = '';
    var durability = '';
    var flavor = '';
    var texture = '';
    var calorie = '';

    while(str[idx] != ':')
    {
        x += str[idx];
        idx++;
    }
    x = x.trim();
    idx +=11;

    while(str[idx] != ',')
    {
        capacity += str[idx];
        idx++;
    }
    capacity = capacity.trim();
    capacity = parseInt(capacity, 10);

    idx+=12;
    while(str[idx] != ',')
    {
        durability += str[idx];
        idx++;
    }
    durability = durability.trim();
    durability = parseInt(durability, 10);

    idx+=8;
    while(str[idx] != ',')
    {
        flavor += str[idx];
        idx++;
    }
    flavor = flavor.trim();
    flavor = parseInt(flavor, 10);

    idx+=9;
    while(str[idx] != ',')
    {
        texture += str[idx];
        idx++;
    }
    texture = texture.trim();
    texture = parseInt(texture, 10);

    idx+=10;
    while(idx < str.length)
    {
        calorie += str[idx];
        idx++;
    }
    calorie = calorie.trim();
    calorie = parseInt(calorie, 10);
    
    var ret = { 
                "x" : x, 
                "capacity" : capacity, 
                "durability" : durability, 
                "flavor" : flavor,
                "texture" : texture,
                "calorie" : calorie

            };
    return ret;
}

var ingr = [];

for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    ingr.push(obj);
}

var dists = [];
var d = [];
for(var i = 0; i <= 100; i++)
{
    for(var j = 0; j <= 100; j++)
    {
        for(var k = 0; k <= 100; k++)
        {
            var m = 100 - i - j - k;
            d.push(i);
            d.push(j);
            d.push(k);
            d.push(m);
            dists.push(d);
            d = [];
        }
    }
}

function calcMix(ingr, dist)
{
    var capacities = [];
    var durabilities = [];
    var flavors = [];
    var textures = [];
    var calories = [];
    
    for(var i = 0; i < ingr.length; i++)
    {
        var ing = ingr[i];
        capacities.push(ing.capacity);
        durabilities.push(ing.durability);
        flavors.push(ing.flavor);
        textures.push(ing.texture);
        calories.push(ing.calorie);
    }

    var capacity = 0;
    var durability = 0;
    var flavor = 0;
    var texture = 0;
    var calorie = 0;

    for(var i = 0; i < dist.length; i++)
    {
        var d = dist[i];
        capacity += d * capacities[i];
        durability += d * durabilities[i];
        flavor += d * flavors[i];
        texture += d * textures[i];
        calorie += d * calories[i];
    }

    if(calorie != 500)
        return false;
    if(capacity < 0)
        return 0;
    if(durability < 0)
        return 0;
    if(flavor < 0)
        return 0;
    if(texture < 0)
        return 0;

    var ret = capacity * durability * flavor * texture;
    return ret;
}

function validDist(dist)
{
    var sum = 0;
    for(var i = 0; i < dist.length; i++)
        sum += dist[i];
    if(sum == 100)
        return true;
    return false;
}

var mxMix = 0;
for(var x in dists)
{
    var d = dists[x];
    if(validDist(d))
    {
        var mix = calcMix(ingr, d);
        if(mxMix < mix)
            mxMix = mix;
    }
}

console.log(mxMix);