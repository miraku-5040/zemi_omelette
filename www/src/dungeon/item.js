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
            skill:'SA001'
            }
        this.itemArray[3][6] = {
            itemId: 'IS000',//アイテムID
            itemName: '木の盾'
            }
        this.itemArray[10][10] = {
            itemId: 'IT000',//アイテムID
            itemName: '薬草'
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
        imgElement.style.top = indexY * Config.stageImgHeight + "px";
        imgElement.style.left = indexX * Config.stageImgWidth + "px";
        itemLayerElement.appendChild(imgElement);
    }

    /*moveのアイテムが足元にあるか判定*/
    static checkItem(x,y){
        if(this.itemArray[x][y] === this.noDataItem){
            return false
        }
        return true
    }

    /* gameで呼ばれる,コントローラ待ち*/
    static itemSelect(){
        /*switch(){
        default:
            return 'player';
        }*/
    }

    /*アイテムを拾う*/
    static itemPick(x,y){
        if(this.getPlayerItems().length > Config.playerItemTotal){
                //持てない
                return ''
            }
        //持てる
        Player.getPlayerItems.push(this.itemArray[x][y])
        this.itemArray[x][y] = this.noDataItem
    }

    /*アイテムを置くまたは交換する*/
    static itemPut(index){
        Player.getPlayerItems.splice(index);
    }

    /* アイテムを使う */
    static itemUse(index){
        //一回しか使えない場合
        Player.getPlayerItems.splice(index);
        //複数回使用
        //使用制限なし
        
    }

}

