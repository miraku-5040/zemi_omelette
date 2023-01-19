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

        //ステージの情報をDBから取得する
        this.stageStatus = {
            stageName: '始まりの遺跡',
            bottomFloor: 4,
            enemyArray: ['E0001'],
            maxEnemy: 5,
            itemArray: ['IW000','IS000','IT000'],
            maxItem: 3,
            trapArray: ['T0001'],
            maxTrap:5
        };
        //ステージに出現する全オブジェクトを格納する領域を生成する
        this.popEnemy = []
        this.popItem = []
        this.popTrap = []
        //ステージを作成する
        this.createStage()
        

    }

    static createStage(){
        const possiblePositions = [];
        //ランダム生成
        this.board = CreateStage.randomStageSelect()
        this.board.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                this.setStageImage(indexX, indexY, element);
                    if(element != 1){
                        return
                    }
                    if(this.board[indexY+1][indexX] == 5 && this.board[indexY-1][indexX] == 3){
                        return
                    }
                    if(this.board[indexY][indexX+1] == 6 && this.board[indexY][indexX-1] == 4){
                        return
                    }
                    
                    possiblePositions.push({y:indexY,
                    x:indexX})
            });
        });
        const selectIndex = Tool.getRandomInt(possiblePositions.length)
        //配置可能座標にキャラクターを配置
        const selectPosition =possiblePositions[selectIndex]
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


        //敵を最大ポップ数生成
        for(let i; i < this.stageStatus.maxEnemy; i++){
            //配置可能座標からランダムに座標を取得
            selectIndex = Tool.getRandomInt(this.possiblePositions.length)
            selectPosition = this.possiblePositions[selectIndex]
            this.possiblePositions.splice(selectIndex, 1)
            //ランダムにenemiyIDを取得
            const enemyId = this.stageStatus.enemyArray[Tool.getRandomInt(this.stageStatus.enemyArray.length)]
            const enemyInfo ={enemyId: enemyId, position:selectPosition}
            this.popEnemy.push(enemyInfo)
        }
        //アイテム生成
        //トラップ生成
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
    }

    static popEnemy(){
        return Tool.deepCopy(this.popEnemy)
    }

    static popItem(){
        return Tool.deepCopy(this.popItem)
    }

    static popTrap(){
        return Tool.deepCopy(this.popTrap)
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
        if(this.board[y][x].stageImageNumber != 1){
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