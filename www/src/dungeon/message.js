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

    static itemPickMessage(itemName,isSuccess){
        if(isSuccess){
            document.getElementById("message").innerHTML =  itemName+"を拾った";
        }else{
            document.getElementById("message").innerHTML =  itemName+"を拾えなかった";
        }
    }

        
}

