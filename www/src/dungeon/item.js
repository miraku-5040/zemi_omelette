// アイテム優先
class Item{

    

    static initialize() {
        /* itemArrayの準備 */
        this.noDataItem = 0;
        const col = new Array(Config.stageCols); //横の配列
        col.fill(this.noDataItem); //横の配列を0で埋める
        const row = new Array(Config.stageRows); //縦の配列
        for(let y = 0; y < row.length; y++){
            row[y]=col.concat();
        }
        this.itemArray = JSON.parse(JSON.stringify(row));

        this.itemIdArray = [];
        this.startFloor();
    }

    static startFloor(){
        const generateItemArray = Stage.popItem()
        generateItemArray.forEach((item) => {
            this.itemArray[item.position.y][item.position.x]  = Database.getItem(item.id)
            this.itemIdArray.push(item.id);
        });

        Image.createItemImages(this.itemIdArray);
        this.screenRenderingAll();
    }

    static screenRenderingAll() {
        this.itemArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem){
                    return;
                }
                this.screenRenderingOne(indexX, indexY);
            });
        });
    }

    static screenRenderingOne(indexX, indexY) {
        const itemLayerElement = document.getElementById("item_layer");
        const imgElement = Image.getDropItemImage(0);
        imgElement.id = 'item_'+indexX+"_"+indexY;
        imgElement.style.top = indexY * Config.stageImgHeight + "px";
        imgElement.style.left = indexX * Config.stageImgWidth + "px";
        itemLayerElement.appendChild(imgElement);
    }

    /* moveのアイテムが足元にあるか判定 */
    static checkItem(x,y){
        if(this.itemArray[y][x] === this.noDataItem){
            return false
        }
        return true
    }

    /* アイテムリストの選択まち */
    static itemSelect(){
        this.itemSelectIndex = Control.getItemListIndex()
        switch(true){
            case 40 > Number(this.itemSelectIndex) && 0 <= Number(this.itemSelectIndex):
                Control.choiceDisplay(Player.getPlayerItems()[this.itemSelectIndex].itemId);
                return 'itemChoice'
            case 'cancel' == this.itemSelectIndex:
                //メッセージ キャンセルした
                return 'player'
            default:
                return  'itemSelect'
        }
    }

    /* 選択したアイテムに対して行う動作まち */
    static itemChoiceAction(){
        switch(Control.getItemAction()){
            case 'use':
                Control.deleteChoice()
                return 'itemUse'
            case 'put':
                this.itemPut(this.itemSelectIndex)
                Control.deleteChoice()
                return 'player'
            case 'cancel':
                Control.elementNone()
                Control.deleteChoice()
                return 'player'
            case 'equip':
                this.itemEquip(this.itemSelectIndex)
                Control.deleteChoice()
                return 'player'
            default:
                return  'itemChoice'
        }
    }

    /* アイテムを使う */
    static itemUse(){
        const useItem = Player.getPlayerItems()[this.itemSelectIndex]
        Skill.itemUseSkill(useItem.skillId, this.itemUserData)
        Message.itemUseMessage(useItem.itemName, true)
        
        switch(useItem.usageLimit){
            case null:
                break
            default :
                useItem.usageLimit -= 1
                if(useItem.usageLimit == 0){
                    Control.deleteAllIitemElement(Player.getPlayerItems())
                    Player.splicePlayerItem(this.itemSelectIndex)
                    Control.elementNone()
                }
        }
        /*選択したアイテムの初期化*/
       
        Control.elementNone()
        return 'enemy'

    }

    /* 装備 */
    static itemEquip(index){
        const equipItem = Player.getPlayerItems()[index]
        Control.deleteAllIitemElement(Player.getPlayerItems())
        Player.splicePlayerItem(index)
        Message.itemEquipMessage(equipItem.itemName)
        Control.elementNone()
    }

    /*アイテムを置くまたは交換する*/
    static itemPut(index){
        let position = Player.getPlayerNowPosition()
        this.itemArray[position.y][position.x] = Player.getPlayerItems()[index]
        this.screenRenderingOne(position.x, position.y)

        Message.itemPutMessage(Player.getPlayerItems()[index].itemName)
        Control.deleteAllIitemElement(Player.getPlayerItems())
        Player.splicePlayerItem(index)
        Control.elementNone()
    }


    /*アイテムを拾う*/
    static itemPick(){
        let position = Player.getPlayerNowPosition()
        let playerItems = Player.getPlayerItems()
        if(playerItems.length > Config.playerItemTotal){
                //メッセージ アイテムを拾えなかった
                Message.itemPickMessage(this.itemArray[position.y][position.x].itemName,false)
                return 'enemy'
            }
        //メッセージ アイテムを拾った
        Message.itemPickMessage(this.itemArray[position.y][position.x].itemName,true)
        //持てる
        Player.addPlayerItem(this.itemArray[position.y][position.x])
        this.itemArray[position.y][position.x] = this.noDataItem;
        this.itemImageRemove(position.x,position.y)
        return 'enemy'
    }

    /* アイテムの画像をフィールドから消す */
    static itemImageRemove(x,y){
        document.getElementById('item_'+x+"_"+y).remove();
    }


}


