class Trap{

    static initialize() {
        /* trapArrayの準備 */
        this.noDataItem = 0;
        const col = new Array(Config.stageCols); //横の配列
        col.fill(this.noDataItem); //横の配列を0で埋める
        const row = new Array(Config.stageRows); //縦の配列
        for(let y = 0; y < row.length; y++){
            row[y]=col.concat();
        }
        this.trapArray = JSON.parse(JSON.stringify(row));

        this.trapIdArray = [];
        this.startFloor();
    }

    static startFloor(){
        this.trapArray[10][14] = {
            trapId: 'T0000',//アイテムID
            trapName: '階段',
            stepFlg: true
            }
        this.trapArray[6][10] = {
            trapId: 'T0001',//アイテムID
            trapName: '地雷',
            stepFlg: false
            }
        this.itemIdArray.push();
        Image.createTrapImages(this.trapIdArray);
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
        const itemLayerElement = document.getElementById("trap_layer");
        const imgElement = Image.getTrapImage(this.trapArray[indexY][indexX].trapId)
        imgElement.id = indexX+"_"+indexY;
        imgElement.display = 'none'
        imgElement.style.top = indexY * Config.stageImgHeight + "px";
        imgElement.style.left = indexX * Config.stageImgWidth + "px";
        itemLayerElement.appendChild(imgElement);
    }

} 

