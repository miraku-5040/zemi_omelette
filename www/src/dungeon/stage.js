class Stage {

    static movingLayersElement;
    static stageLayerElement;
    /*
    
    
    */
    static initialize() {
        //ステージの基準座標を決める。（キャラクターの位置と同じ
        const startingPointElement = document.getElementById(`starting_point`);
        startingPointElement.style.top = Config.playerReferencePointTop * Config.stageImgHeight + "px";
        startingPointElement.style.left = Config.playerReferencePointLeft * Config.stageImgWidth + "px";
        startingPointElement.style.position = 'absolute';

        //ステージ全体の大きさを作成する
        const stageLayerElement = document.getElementById("stage_layer");
        stageLayerElement.style.width = Config.stageImgWidth * Config.stageCols + 'px';
        stageLayerElement.style.height = Config.stageImgHeight * Config.stageRows + 'px';
        this.stageLayerElement = stageLayerElement; //new

        //ミニマップのフィールドを取得
        this.minmap = document.getElementById("min_map")

        //ステージの情報をDBから取得する
        this.stageStatus = {
            stageName: '始まりの遺跡',
            bottomFloor: 4,
            enemyArray: ['E0001'],
            maxEnemy: 5,
            itemArray: ['IW000','IS000','IT000'],
            maxItem: 3,
            trapArray: ['T0000','T0001'],
            maxTrap:5
        };
        //ステージを作成する
        this.createStage()
        

    }

    static createStage(){
        this.stageLayerElement.innerHTML = ""
        this.minmap.innerHTML = ""
        //ステージに出現する全オブジェクトを格納する領域を生成する
        this.popEnemyArray = []
        this.popItemArray = []
        this.popTrapArray = []
        const possiblePositions = [];
        //ランダム生成
        this.board = CreateStage.randomStageCreate()
        this.board.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                this.setStageImage(indexX, indexY, element);
                if(this.board[indexY][indexX].stageImageNumber != Config.regularField){
                    return
                }
                for(let i = -1; i <= 1; i++){
                    for(let j = -1; j <= 1; j++){
                        if(this.board[indexY + i][indexX + j].stageImageNumber == Config.wallField){
                            return
                        }
                    }
                }
                possiblePositions.push({y:indexY,x:indexX})  
            });
        });
        let selectIndex = Tool.getRandomInt(possiblePositions.length)
        //配置可能座標にキャラクターを配置
        let selectPosition =possiblePositions[selectIndex]
        //座標が重複しないように候補から削除
        possiblePositions.splice(selectIndex, 1)
        //キャラクターの座標に応じたレイヤーの座標を決定
        const movingLayersElement = document.getElementById(`moving_layers`);
        movingLayersElement.style.top = -selectPosition.y * Config.stageImgHeight + "px"; 
        movingLayersElement.style.left = -selectPosition.x * Config.stageImgWidth + "px"; 
        movingLayersElement.style.position = 'absolute';
        this.movingLayersElement = movingLayersElement;
        //プレイヤーの現在座標をセットする
        Player.resetCharacterPosition(selectPosition.x,selectPosition.y)

        Stage.createEnemys(possiblePositions)
        Stage.createItems(possiblePositions)
        Stage.createTraps(possiblePositions)
    }

    static createEnemys(possiblePositions){
        document.getElementById("enemy_layer").innerHTML = ""
        //敵を最大ポップ数生成
        for(let i = 0; i < this.stageStatus.maxEnemy; i++){
            //配置可能座標からランダムに座標を取得
            const selectIndex = Tool.getRandomInt(possiblePositions.length)
            const selectPosition = possiblePositions[selectIndex]
            possiblePositions.splice(selectIndex, 1)
            //ランダムにenemyIDを取得
            const enemyId = this.stageStatus.enemyArray[Tool.getRandomInt(this.stageStatus.enemyArray.length)]
            const enemyInfo ={id: enemyId, position:selectPosition}
            this.popEnemyArray.push(enemyInfo)
        }
    }

    static createItems(possiblePositions){
        document.getElementById("item_layer").innerHTML = ""
        for(let i = 0; i < this.stageStatus.maxItem; i++){
            //配置可能座標からランダムに座標を取得
            const selectIndex = Tool.getRandomInt(possiblePositions.length)
            const selectPosition = possiblePositions[selectIndex]
            possiblePositions.splice(selectIndex, 1)
            //ランダムにitemIDを取得
            const itemId = this.stageStatus.itemArray[Tool.getRandomInt(this.stageStatus.itemArray.length)]
            const itemInfo ={id: itemId, position:selectPosition}
            this.popItemArray.push(itemInfo)
        }
    }

    static createTraps(possiblePositions){
        document.getElementById("trap_layer").innerHTML = ""
        for(let i = 0; i < this.stageStatus.maxTrap; i++){
            //配置可能座標からランダムに座標を取得
            const selectIndex = Tool.getRandomInt(possiblePositions.length)
            const selectPosition = possiblePositions[selectIndex]
            possiblePositions.splice(selectIndex, 1)
            //ランダムにtrapIDを取得
            const trapId = this.stageStatus.trapArray[Tool.getRandomInt(this.stageStatus.trapArray.length, 1)]
            const trapInfo ={id: trapId, position:selectPosition}
            this.popTrapArray.push(trapInfo)
        }
        //階段
        const selectIndex = Tool.getRandomInt(possiblePositions.length)
        const selectPosition = possiblePositions[selectIndex]
        possiblePositions.splice(selectIndex, 1)
        const trapId = this.stageStatus.trapArray[0]
        const trapInfo ={id: trapId, position:selectPosition}
        this.popTrapArray.push(trapInfo)
    }

    /**
     * ステージ画像や画像番号をステージの2次元配列に格納する
    **/
    static setStageImage(x, y, stageImageNumber) {
        // 画像を作成し配置する
        const stageImage = Image.getStageImage(stageImageNumber);
        stageImage.style.left = x * Config.stageImgWidth + "px";
        stageImage.style.top = y * Config.stageImgHeight + "px";
        this.stageLayerElement.appendChild(stageImage);
        // メモリにセットする
        this.board[y][x] = {
            stageImageNumber: stageImageNumber,
            element: stageImage
        }

        const min = Image.getMinmapImage(stageImageNumber);
        min.style.left = x * 3 + "px";
        min.style.top = y * 3 + "px";
        this.minmap.appendChild(min);
    }

    static popEnemy(){
        return Tool.deepCopy(this.popEnemyArray)
    }

    static popItem(){
        return Tool.deepCopy(this.popItemArray)
    }

    static popTrap(){
        return Tool.deepCopy(this.popTrapArray)
    }

    /**
     * キャラクターの移動の際キャラクターの座標に応じてムービングレイヤーを動かす
     * **/
    static moveStage(x, y){
        this.movingLayersElement.style.top = -y * Config.stageImgHeight + "px";
        this.movingLayersElement.style.left = -x * Config.stageImgWidth + "px";

    }

    /**
     * 引数からそのマスが移動可能か判断する
     * **/
    static checkStage(x,y){
        //移動できる床か判定
        if(this.board[y][x].stageImageNumber != Config.regularField){
            return true;
        }
        if(Enemy.checkEnemy(x,y)){
            return true;
        }
        return false;   
    }

    /**
     * 引数の座標が床かを判定する
     * 床の場合はtrueを返す
     */
    static isFloor(x, y){
        if(this.board[y][x].stageImageNumber === 1){
            // 床の場合
            return true;
        }
        return false;
    }

    static checkStageCorner(direction, x, y){
        switch(direction){
        case 'leftup':
            if(this.board[y][x - 1] == 12 || this.board[y - 1][x] == 14){
                return false
            }
            return true;
        case 'rightup':
            if(this.board[y][x + 1] == 11 || this.board[y - 1][x] == 13){
                return false
            }
            return true;
        case 'rightdown':
            if(this.board[y][x + 1] == 14 || this.board[y + 1][x] == 12){
                return false
            }
            return true;
        case 'leftdown':
            if(this.board[y][x - 1] == 13 || this.board[y + 1][x] == 11){
                return false
            }
            return true;
        }
    }

    static getStageBoard(){
        return this.board
    }


}