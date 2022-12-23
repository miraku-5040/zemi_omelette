class Message{

    //aはbに攻撃した
    //aはbにsをした
    //aはsした
    //aはiした

    
    /* 以下アイテム */

    static itemUseMessage(itemName,isSuccess){
        if(isSuccess){
            this.updateMessage(itemName+"を使った")
        }else{
            this.updateMessage(itemName+"が壊れた")
        }
    }

    static itemEquipMessage(itemName){
            document.getElementById("message1").innerHTML =  itemName+"を装備した";
    }

    static itemPutMessage(itemName){
            document.getElementById("message1").innerHTML =  itemName+"を捨てた";
    }

    static itemPickMessage(itemName,isSuccess){
        if(isSuccess){
            this.updateMessage(itemName+"を拾った")
        }else{
            this.updateMessage(itemName+"を拾えなかった")
        }
    }

    /* playerのhp減少(ダメージ) */
    static playerHpDecreaseMessage(playerName, decrease){
        document.getElementById("message1").innerHTML =  playerName+"に"+decrease+"のダメージ";
    }

    /* enemyのhp減少(ダメージ) */
    static enemyHpDecreaseMessage(enemyName, decrease){
        document.getElementById("message1").innerHTML =  enemyName+"に"+decrease+"のダメージ";
    }

    static updateMessage(message){
        if(document.getElementById('message1').innerHTML == '' && document.getElementById('message2').innerHTML == ''){
            document.getElementById('message1').innerHTML = message
            return
        }else if(document.getElementById('message2').innerHTML != ''){
            document.getElementById('message1').innerHTML = document.getElementById('message2').innerHTML
            document.getElementById('message2').innerHTML = ''
        }
        if(document.getElementById('message2').innerHTML == ''){
            document.getElementById('message2').innerHTML = message
        }
    }

}

