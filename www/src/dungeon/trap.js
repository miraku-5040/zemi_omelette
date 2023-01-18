class Trap{

    static initialize() {
        /* trapArrayの準備 */
        this.underTrap = null
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
            hideFlg: false
            }
        this.trapArray[6][10] = {
            trapId: 'T0001',//アイテムID
            trapName: '地雷',
            hideFlg: true
            }
        this.trapIdArray.push('T0000');
        this.trapIdArray.push('T0001');
        Image.createTrapImages(this.trapIdArray);
        this.screenRenderingAll();
    }

    static screenRenderingAll() {
        this.trapArray.forEach((col, indexY) => {
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
        imgElement.id = 'trap_'+indexX+"_"+indexY;
        if(this.trapArray[indexY][indexX].hideFlg){
            imgElement.style.display = 'none';
        }
        imgElement.style.top = indexY * Config.stageImgHeight + "px";
        imgElement.style.left = indexX * Config.stageImgWidth + "px";
        itemLayerElement.appendChild(imgElement);
    }

    static checkTrap(x,y){
        if(this.trapArray[y][x] === this.noDataItem){
            return false
        }
        this.trapArray[y][x].hideFlg = false
        document.getElementById('trap_'+x+"_"+y).style.display = 'inline';
        this.underTrap = this.trapArray[y][x]
        return true
    }

    static activateTrap(){
        if(this.underTrap.trapId == 'T0000'){
            return 'nextfloor'
        }
        //その他トラップ発動
        //TODO
        return 'enemy'
    }

} 

