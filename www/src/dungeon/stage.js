class Stage {

    static movingLayersElement;
    static stageLayerElement;
    /* 初期化 */
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
            maxTrap:5,
            bossEnemyId:'E0001'
        };
        this.nowFloor = 0;
        //ステージを作成する
        this.setFloor()
        this.createStage()
        

    }

    /* ステージの作成 */
    static createStage(){
        this.stageElementInitialize()
        const possiblePositions = [];
        //ランダム生成
        this.board = CreateStage.randomStageCreate()
        this.board.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                this.setStageImage(indexX, indexY, element);
                if(this.board[indexY][indexX] != Config.regularField){
                    return
                }
                let wallCount = 0;
                for(let i = -1; i <= 1; i++){
                    for(let j = -1; j <= 1; j++){
                        if(this.board[indexY + i][indexX + j] == Config.wallField){
                            wallCount++
                        }
                    }
                }
                if(wallCount > 1){
                    return
                }
                possiblePositions.push({y:indexY,x:indexX})  
            });
        });
        
        Stage.createPlayer(possiblePositions)
        Stage.createEnemys(possiblePositions)
        Stage.createItems(possiblePositions)
        Stage.createTraps(possiblePositions)
    }
    /* ボスステージの作成 */
    static createBossStage(){
        this.stageElementInitialize()
        this.board =CreateStage.bossStageCreate()
        this.board.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                this.setStageImage(indexX, indexY, element);
            })
        })
        //キャラクターの座標に応じたレイヤーの座標を決定
        const movingLayersElement = document.getElementById(`moving_layers`);
        movingLayersElement.style.top = -16 * Config.stageImgHeight + "px"; 
        movingLayersElement.style.left = -26 * Config.stageImgWidth + "px"; 
        movingLayersElement.style.position = 'absolute';
        this.movingLayersElement = movingLayersElement;
        //プレイヤーの現在座標をセットする
        Player.resetCharacterPosition(26,20)

        const enemyId = this.stageStatus.bossEnemyId
        const enemyInfo ={id: enemyId, position:{x: 26,y:12}}
        this.popEnemyArray.push(enemyInfo)
    }
    /* 前フロアの情報の初期化 */
    static stageElementInitialize(){
        this.stageLayerElement.innerHTML = ""
        this.minmap.innerHTML = ""
        document.getElementById("enemy_layer").innerHTML = ""
        document.getElementById("item_layer").innerHTML = ""
        document.getElementById("trap_layer").innerHTML = ""
        //ステージに出現する全オブジェクトを格納する領域を生成する
        this.popEnemyArray = []
        this.popItemArray = []
        this.popTrapArray = []
    }
    /* ステージ上のプレーヤーの座標の設定 */
    static createPlayer(possiblePositions){
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
    }

    /*出現するエネミーの選定*/
    static createEnemys(possiblePositions){
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
    /*出現するアイテムの選定*/
    static createItems(possiblePositions){
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
    /*出現するトラップの選定*/
    static createTraps(possiblePositions){
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

    /* ステージ画像や画像番号をステージの2次元配列に格納する */
    static setStageImage(x, y, stageImageNumber) {
        // 画像を作成し配置する
        const stageImage = Image.getStageImage(stageImageNumber);
        stageImage.style.left = x * Config.stageImgWidth + "px";
        stageImage.style.top = y * Config.stageImgHeight + "px";
        this.stageLayerElement.appendChild(stageImage);
        const min = Image.getMinmapImage(stageImageNumber);
        min.style.left = x * 3 + "px";
        min.style.top = y * 3 + "px";
        this.minmap.appendChild(min);
    }

    /* 各リストの参照用メソッド */
    static popEnemy(){
        return Tool.deepCopy(this.popEnemyArray)
    }
    static popItem(){
        return Tool.deepCopy(this.popItemArray)
    }
    static popTrap(){
        return Tool.deepCopy(this.popTrapArray)
    }

    /* キャラクターの移動の際キャラクターの座標に応じてムービングレイヤーを動かす */
    static moveStage(x, y){
        this.movingLayersElement.style.top = -y * Config.stageImgHeight + "px";
        this.movingLayersElement.style.left = -x * Config.stageImgWidth + "px";
    }

    /* 引数からそのマスが移動可能か判断する */
    static checkStage(x,y){
        //移動できる床か判定
        if(this.board[y][x] != Config.regularField){
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
        if(this.board[y][x] === 1){
            // 床の場合
            return true;
        }
        return false;
    }
    /* ステージ移動の際,角抜けできないようにする（適用してない） */
    static checkStageCorner(direction, x, y){
        switch(direction){
        case 'leftup':
            if(this.board[y][x - 1] == 3 || this.board[y - 1][x] == 3){
                return false
            }
            return true;
        case 'rightup':
            if(this.board[y][x + 1] == 3 || this.board[y - 1][x] == 3){
                return false
            }
            return true;
        case 'rightdown':
            if(this.board[y][x + 1] == 3 || this.board[y + 1][x] == 3){
                return false
            }
            return true;
        case 'leftdown':
            if(this.board[y][x - 1] == 3 || this.board[y + 1][x] == 3){
                return false
            }
            return true;
        }
    }
    /* ボス部屋または部屋の作成 */
    static createFloor(){
        if(this.checkFloor()){
            this.createBossStage()
        }else{
            //通常
            this.createStage()
        }
        //アイテム生成
        Item.initialize()
        //トラップ生成
        Trap.initialize()
        //敵の生成
        Enemy.initialize()
    }
    static checkFloor(){
        if(this.nowFloor >= this.stageStatus.bottomFloor){
            return true
        }
        return false
    }

    /* ステージ情報の取得 */
    static getStageBoard(){
        return this.board
    }

    /*階層更新*/
    static setFloor(){
        this.nowFloor++
        document.getElementById("floor").innerHTML = "B"+ this.nowFloor +"階"
    }

    


}