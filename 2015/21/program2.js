function fight(player, boss)
{
    for(;;) 
    {
        boss[0] -= Math.max(1, player[1] - boss[2]);
        if( boss[0] <= 0 ) 
            return true;
        player[0] -= Math.max(1, boss[1] - player[2]);
        if( player[0] <= 0 ) 
            return false;
    }
}

var weapons = [
    [8,4,0],
    [10,5,0],
    [25,6,0],
    [40,7,0],
    [74,8,0]
];

var armor = [
    [0,0,0],
    [13,0,1],
    [31,0,2],
    [52,0,3],
    [75,0,4],
    [102,0,5]
];

var rings = [
    [0,0,0],
    [25,1,0],
    [50,2,0],
    [100,3,0],
    [20,0,1],
    [40,0,2],
    [80,0,3]
];

var mn = 1000;
var mx = 0;
for( var w in weapons) 
{
    for( var a in armor ) 
    {
        for(var r1 in rings ) 
        {
            for(var r2 in rings ) 
            {
                var vw = weapons[w];
                var va = armor[a];
                var vr1 = rings[r1];
                var vr2 = rings[r2];

                if( vr1[0] != 0 &&  vr1 == vr2 )  
                    continue;

                var boss = [104, 8, 1];
                var player = [100, vw[1] + va[1] + vr1[1] + vr2[1], vw[2] + va[2] + vr1[2] + vr2[2]];
                var cost = vw[0] + va[0] + vr1[0] + vr2[0];

                if( !fight( player, boss ) )  
                    mx = Math.max(cost, mx);
            }
        }
    }
}
console.log(mx);