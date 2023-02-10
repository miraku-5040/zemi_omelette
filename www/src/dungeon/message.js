class Message{

    //aはbに攻撃した
    //aはbにsをした
    //aはsした
    //aはiした

    /*アイテムを使った*/
    static itemUseMessage(itemName,isSuccess){
        if(isSuccess){
            this.#updateMessage(itemName+"を使った")
        }else{
            this.#updateMessage(itemName+"が壊れた")
        }
    }
    /*アイテムを装備した*/
    static itemEquipMessage(itemName){
            document.getElementById("message1").innerHTML =  itemName+"を装備した";
    }

    /*アイテムを装備した*/
    static itemPutMessage(itemName){
            document.getElementById("message1").innerHTML =  itemName+"を捨てた";
    }

    /*アイテムを拾った*/
    static itemPickMessage(itemName,isSuccess){
        if(isSuccess){
            this.#updateMessage(itemName+"を拾った")
        }else{
            this.#updateMessage(itemName+"を拾えなかった")
        }
    }

    /* playerのhp減少(ダメージ) */
    static playerHpDecreaseMessage(playerName, decrease){
        this.#updateMessage(playerName + "に" + decrease + "のダメージ");
    }

    /* enemyのhp減少(ダメージ) */
    static enemyHpDecreaseMessage(enemyName, decrease){
        this.#updateMessage(enemyName + "に" + decrease + "のダメージ");
    }

    /* playerのhp増加(回復) */
    static playerHpIncreaseMessage(playerName, increase){
        this.#updateMessage(playerName + "のhpが" + increase + "回復");
    }

    /* enemyのhp増加(回復) */
    static enemyHpIncreaseMessage(enemyName, increase){
        this.#updateMessage(enemyName + "のhpが" + increase + "回復");
    }

    /* エネミーキル */
    static enemyKillMessage(enemyName){
        this.#updateMessage(enemyName + "は倒れた");
    }

    /* スキル使用 */
    static useSkillMessage(skillUserName, skillName){
        this.#updateMessage(skillUserName + "が" + skillName + "を発動した");
    }

    /* メッセージの表示処理 */
    static #updateMessage(message){
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

