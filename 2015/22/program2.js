var mn = 100000;

function runPlayer(bH, bD, pH, mana, manaUsed, shield, poison, recharge)
{
    pH--;
    if( pH <= 0 || mana < 0 || manaUsed > mn ) 
        return;
    if( poison > 0 )
        bH -= 3;
    if( recharge > 0 ) 
        mana += 101;
    
    shield = Math.max(0, shield - 1);
    poison = Math.max(0, poison - 1);
    recharge = Math.max(0, recharge - 1);

    var newBH = 0;
    var newBD = 0;
    var newMana = 0;
    var newManaUsed = 0;
    var newPH = 0;
    var newShield = 0;
    var newPoison = 0;
    var newRecharge = 0;
    
    if( mana >= 53 )
        runBoss(bH - 4, bD, pH, mana - 53, manaUsed + 53, shield, poison, recharge);
    
    if( mana >= 73 )
        runBoss(bH - 2, bD, pH + 2, mana - 73, manaUsed + 73, shield, poison, recharge);
        
    if( shield == 0 && mana >= 113 )
        runBoss(bH, bD, pH, mana - 113, manaUsed + 113, 6, poison, recharge);

    if( poison == 0 && mana >= 173 )
        runBoss(bH, bD, pH, mana - 173, manaUsed + 173, shield, 6, recharge);

    if( recharge == 0 && mana >= 229 )
        runBoss(bH, bD, pH, mana - 229, manaUsed + 229, shield, poison, 5);
}

function runBoss(bH, bD, pH, mana, manaUsed, shield, poison, recharge)
{
    if( mana < 0 || manaUsed > mn ) 
        return;

    var pS = 0;
    if( shield > 0 )
        pS = 7;

    if( poison > 0 ) 
        bH -= 3;

    if( recharge > 0 ) 
        mana += 101;
    
    shield = Math.max(0, shield - 1);
    poison = Math.max(0, poison - 1);
    recharge = Math.max(0, recharge - 1);

    if( bH <= 0 ) 
    {
        if( manaUsed < mn ) 
            mn = manaUsed;
        return;
    }
    pH -= Math.max(2, bD - pS);
    runPlayer(bH, bD, pH, mana, manaUsed, shield, poison, recharge);
}

var bH = 51;
var bD = 9;
var pH = 50;
var mana = 500;
var manaUsed = 0;
var shield = 0;
var poison = 0;
var recharge = 0;

runPlayer(bH, bD, pH, mana, manaUsed, shield, poison, recharge);
console.log(mn);