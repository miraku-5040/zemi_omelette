class Message{

    //aはbに攻撃した
    //aはbにsをした
    //aはsした
    //aはiした

    
    /* 以下アイテム */

    static itemUseMessage(itemName,isSuccess){
        if(isSuccess){
            document.getElementById("message").innerHTML =  itemName+"を使った";
        }else{
            document.getElementById("message").innerHTML =  itemName+"が壊れた";
        }
    }

    static itemEquipMessage(itemName){
            document.getElementById("message").innerHTML =  itemName+"を装備した";
    }

    static itemPutMessage(itemName){
            document.getElementById("message").innerHTML =  itemName+"を捨てた";
    }

    static itemPickMessage(itemName,isSuccess){
        if(isSuccess){
            document.getElementById("message").innerHTML =  itemName+"を拾った";
        }else{
            document.getElementById("message").innerHTML =  itemName+"を拾えなかった";
        }
    }

    /* playerのhp減少(ダメージ) */
    static playerHpDecreaseMessage(playerName, decrease){
        document.getElementById("message").innerHTML =  playerName+"に"+decrease+"のダメージ";
    }

    /* enemyのhp減少(ダメージ) */
    static enemyHpDecreaseMessage(enemyName, decrease){
        document.getElementById("message").innerHTML =  enemyName+"に"+decrease+"のダメージ";
    }

}

