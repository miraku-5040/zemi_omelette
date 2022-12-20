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

        this.startFloor();
    }

    static startFloor(){
        this.itemArray[5][4] = {
            itemId: 'IW000',//アイテムID
            itemName: 'ひのきのぼう',
            skill:'SA001',
            usageLimit: 0
            }
        this.itemArray[3][6] = {
            itemId: 'IS000',//アイテムID
            itemName: '木の盾',
            usageLimit: 0
            }
        this.itemArray[10][10] = {
            itemId: 'IT000',//アイテムID
            itemName: '薬草',
            usageLimit: 1
            }
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
        const imgElement = Image.getItemImage(0);
        imgElement.id = indexX+"_"+indexY;
        imgElement.style.top = indexY * Config.stageImgHeight + "px";
        imgElement.style.left = indexX * Config.stageImgWidth + "px";
        itemLayerElement.appendChild(imgElement);
    }

    static itemDisplay(){
        const elem = document.getElementById('itemList');
        elem.style.display = "inline";
        Player.getPlayerItems().forEach((item,i) => {
            const itemImage = Image.createItemElement(item.itemId, i);
            itemImage.style.position = 'absolute';
            itemImage.style.left = Config.itemListImageWidth * i + "px";
            itemImage.width = Config.itemListImageWidth;
            itemImage.height = Config.itemListImageHeight;
            itemImage.setAttribute('onclick', `Control.itemSelect(${i})`);
            elem.appendChild(itemImage);
        });
        
    }

    /*moveのアイテムが足元にあるか判定*/
    static checkItem(x,y){
        if(this.itemArray[y][x] === this.noDataItem){
            return false
        }
        return true
    }

    /* gameで呼ばれる,コントローラ待ち*/
    static itemSelect(){
        this.itemSelectIndex = Control.getItemListIndex()
        switch(true){
            case 40 > Number(this.itemSelectIndex) && 0 <= Number(this.itemSelectIndex):
                //メッセージ 選択した
                return 'itemUse'
            case 'cansel' == this.itemSelectIndex:
                //メッセージ キャンセルした
                return 'player'
            default:
                return  'itemSelect'
        }
    }

        /* アイテムを使う */
    static itemUse(){
        const useItem = Player.getPlayerItems()[this.itemSelectIndex]
        //useItem.skill
        Message.itemUseMessage(useItem.itemName, true)
        
        /*switch(Player.getPlayerItems[this.itemSelectIndex].usageLimit){
             //一回しか使えない場合
            //複数回使用
            //使用制限なし
            case 0:
            default :
                Player.getPlayerItems[this.itemSelectIndex].usageLimit -= 1
        }*/
        const elem = document.getElementById('itemList');
        elem.style.display = "none";

    }

    /*アイテムを置くまたは交換する*/
    static itemPut(index){
        Player.getPlayerItems.splice(index);
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
        Player.addPlayerItems(this.itemArray[position.y][position.x])
        this.itemArray[position.y][position.x] = this.noDataItem;
        this.itemImageRemove(position.x,position.y)
        return 'enemy'
    }

    static itemImageRemove(x,y){
        console.log(x+"_"+y)
        document.getElementById(x+"_"+y).remove();
    }


}


