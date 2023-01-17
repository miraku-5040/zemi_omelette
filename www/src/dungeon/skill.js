/* スキルの処理を行う */
class Skill{

    //playerから呼び出し
    //スキル確認
    //スキル実行

// public
    /**
     * 初期化
     */
    static initialize(){
        this.skillDataMap = new Map();
        this.#skillEndInitialize(); //初期化
        this.scopeLayerElement = document.getElementById("scope_layer");
        const scopeElement = document.createElement("div");
        scopeElement.style.position = "absolute";
        scopeElement.style.display = "block";
        scopeElement.style.margin = 0;
        scopeElement.style.height = Config.stageImgHeight;
        scopeElement.style.width = Config.stageImgWidth; 
        scopeElement.style.backgroundColor = "red";
        scopeElement.style.opacity = 0.5;
        this. scopeElement = scopeElement;
        this.normalAttackId = "SA0000"; //通常攻撃のスキルid
        this.defaultDirection = "up"; //方向の初期値
        this.defaultScopeLength = 20; //スキル範囲作成時の標準最大長
        /* 開発用スキルid */
        this.testSkillId1 = "SA001";
        this.testSkillId2 = "SA002";
    }

    /**
     * playerから通常攻撃を呼び出し
     */
    static playerUseNormalAttack(playerId) {
        this.playerUseSkill(this.normalAttackId, playerId);
    }

    /**
     * playerからスキル呼び出し
     */
    static playerUseSkill(skillId,playerId){
        //skillUserDataをセット
        const skillUserData = {};
        skillUserData.type = "player";
        skillUserData.playerId = playerId;
        const playerNowPosition = Player.getPlayerNowPosition(playerId);
        skillUserData.nowX = playerNowPosition.x;
        skillUserData.nowY = playerNowPosition.y;
        skillUserData.direction = Player.getPlayerDirection(playerId);
        skillUserData.level = Player.getPlayerLevel(playerId);
        const playerAttackStatus = Player.getPlayerAttackStatus(playerId);
        skillUserData.attackStatus = playerAttackStatus;
        this.skillUserData = skillUserData;
        // skillDataをセット
        const skillData = this.#setSkillData(skillId);
        this.skillData = skillData;
    }

    /**
     * enemyから通常攻撃呼び出し
     */
    static enemyUseNormalAttack(nowX, nowY){
        this.enemyUseSkill(this.normalAttackId, nowX, nowY);
    }

    /**
     * enemyからスキル呼び出し
     */
    static enemyUseSkill(skillId, nowX, nowY){
        //skillUserDataをセット
        const skillUserData = {};
        skillUserData.type = "enemy";
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.direction = Enemy.getDirection(nowX, nowY);
        skillUserData.level = Enemy.getEnemyLevel(nowX, nowY);
        const enemyAttackStatus = Enemy.getEnemyAttackStatus(nowX, nowY);
        skillUserData.attackStatus = enemyAttackStatus;
        this.skillUserData = skillUserData;
        // skillDataをセット
        const skillData = this.#setSkillData(skillId);
        this.skillData = skillData;
    }

    /**
     * trapからスキル呼び出し
     * スキル使用者のデータをセットする
     */
    static trapUseSkill(skillId, nowX, nowY){
        //skillUserDataをセット
        const skillUserData =  {};
        skillUserData.type = "trap";
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.direction = Trap.getDirection(nowX, nowY);
        skillUserData.level = Trap.getLevel(nowX, nowY);
        this.skillUserData = skillUserData;
        // skillDataをセット
        const skillData = this.#setSkillData(skillId);
        this.skillData = skillData;
    }

    /**
     * itemからスキル呼び出し
     * アイテムを使用するplayerIdで設定する
     */
    static itemUseSkill(skillId,playerId){
        //skillUserDataをセット
        const skillUserData = {};
        skillUserData.type = "item";
        skillUserData.playerId = playerId;
        const playerNowPosition = Player.getPlayerNowPosition(playerId);
        skillUserData.nowX = playerNowPosition.x;
        skillUserData.nowY = playerNowPosition.y;
        skillUserData.direction = Player.getPlayerDirection(playerId);
        skillUserData.level = Player.getPlayerLevel(playerId);
        const playerAttackStatus = Player.getPlayerAttackStatus;
        skillUserData.attackStatus = playerAttackStatus;
        this.skillUserData = skillUserData;
        // skillDataをセット
        const skillData = this.#setSkillData(skillId);
        this.skillData = skillData; //skillGoで使用
    }

    /**
     * スキル準備
     */
    static skillReady(){
        //useSkillからデータ受け取りと初期化
        const skillData = this.skillData;
        if(skillData.length <= 0){
            //データエラー
            return;
        }
        const nowSkillData = skillData[this.skillDataIndex]; //メインのスキルデータを取得する
        // TODO scopeで分岐する関数を設定
        const scopeUseFunctionMap = this.#scopeBranch(nowSkillData.scope);
        const createTargetCoordinateArrayFunction = scopeUseFunctionMap.get("createTargetCoordinateArray");
        // targetCoordinateArray作成
        const targetCoordinateArray = createTargetCoordinateArrayFunction(nowSkillData.scope, this.skillUserData.direction);
        // スキル座標を設定する
        if(skillData.skillId === this.normalAttackId){ //通常攻撃の場合は準備をスキップする
            // skillGoに渡すデータをクラス変数に設定する
            this.targetCoordinateArray = targetCoordinateArray;
            this.skillData = skillData;
            this.nowSkillData = nowSkillData;
            return;
        }
        /* 範囲を表示 */
        // TODO
        //this.#screenRenderingScope(this.targetCoordinateArray); //スキル範囲表示
        
        /* controlから操作を取得 */
        // TODO 操作別の分岐を取得

        /* 準備終了処理 */
        //this.#deleteScreenRenderingScope(); //範囲表示の描画を削除

        /* skillGoに渡すデータをクラス変数に設定する */
        this.targetCoordinateArray = targetCoordinateArray;
        this.skillData = skillData;
        this.nowSkillData = nowSkillData;
    }

    /**
     * スキル使用
     */
    static skillGo(){
        /* useSkill, skillReadyからのデータ取得と初期化 */
        const nowSkillData = this.nowSkillData;
        const targetCoordinateArray = this.targetCoordinateArray;
        this.nowSkillData = []; //new
        this.targetCoordinateArray = []; //new
        /* effectで分岐する関数の設定 */
        const effectUseFunction = this.#effectBranch(nowSkillData.effect);
        const getPlayerDefenceStatusFunction = effectUseFunction.get("getPlayerDefenseStatus");
        const getEnemyDefenceStatusFunction = effectUseFunction.get("getEnemyDefenceStatus");
        const calcFunctionFunctionArray = effectUseFunction.get("calcFunctionArray");
        const playerStatusFluctuationFunctionArray = effectUseFunction.get("playerStatusFluctuationArray");
        const enemyStatusFluctuationFunctionArray = effectUseFunction.get("enemyStatusFluctuationArray");
        const checkPlayerFunction = effectUseFunction.get("checkPlayer");
        const checkEnemyFunction = effectUseFunction.get("checkEnemy");
        let isSkillEnd = new Array(nowSkillData.effect.length); //ターゲット数の上限でスキップするフラグ
        isSkillEnd.fill(false);
        let continueCount = nowSkillData.effect.length;
        for(const coordinate of targetCoordinateArray){
            if(continueCount <= 0){
                // 継続数が0以下の場合は終了する
                break;
            }
            const isTargetEnemy = checkEnemyFunction(coordinate);
            const isTargetPlayer = checkPlayerFunction(coordinate);
            if(!isTargetEnemy && !isTargetPlayer){
                // 該当座標にターゲットが存在しない場合はスキップする
                continue;
            }
            let enemyDefenceStatus = {};
            let playerDefenceStatus = {};
            let playerId = "";
            if(isTargetEnemy){
                enemyDefenceStatus = getEnemyDefenceStatusFunction(coordinate);
            }else if(isTargetPlayer){
                playerId = Player.getPlayerId(coordinate.x, coordinate.y);
                playerDefenceStatus = getPlayerDefenceStatusFunction(playerId);
            }
            nowSkillData.effect.forEach((effectData, index) => {
                // 効果を順に実行する
                if(isSkillEnd[index]){
                    // スキップ
                    return;
                }
                switch(true){
                    case (isTargetEnemy):
                        // enemyがターゲットの処理
                        const enemyStatusFluctuation = calcFunctionFunctionArray[index](this.skillUserData.attackStatus, enemyDefenceStatus);
                        enemyStatusFluctuationFunctionArray[index](coordinate, enemyStatusFluctuation);
                        break;
                    case (isTargetPlayer):
                        // playerがターゲットの処理
                        const playerStatusFluctuation = calcFunctionFunctionArray[index](this.skillUserData.attackStatus, playerDefenceStatus);
                        playerStatusFluctuationFunctionArray[index](playerId, playerStatusFluctuation);
                        break;
                    default:
                        // エラー
                        return;
                }
                effectData.hits = effectData.hits - 1;
                if(effectData.hits <= 0){
                    isSkillEnd[index] = true;
                    continueCount = continueCount - 1;
                }
            });
        }
        // サブスキル処理
        this.#nextSkillExecute();
        
        /* スキル終了処理 */
        this.#skillEndInitialize();
    }

// private
    /* スキル終了時の初期化 */
    static #skillEndInitialize(){
        this.skillUserData = {};
        this.skillData = {};
        this.skillDataIndex = 0;
        this.scopeArray = [];
    }

   /* スキルデータをセットする */
    static #setSkillData(skillId){
        //Mapからスキルデータを取得する
        if(!this.skillDataMap.has(skillId)){
            // 指定したスキルidのデータがMapにない場合は取得して設定する
            this.#addSkillDataMap([skillId]);
        }
        const skillData = Tool.deepCopy(this.skillDataMap.get(skillId));
        skillData.skillId = skillId;
        //スキルデータを加工する
        skillData.forEach((nowSkillData) => {
            nowSkillData.effect.forEach((effectData) => {
            //skillData.effectのtargetを絶対targetにする
            switch(effectData.target){
            case "hostility": //スキル使用者から見た敵
                switch(this.skillUserData.type){
                    case "player":
                        effectData.target = "enemy";
                        break;
                    case "enemy":
                        effectData.target = "player";
                        break;
                }
                break;
            case "ally": //スキル使用者から見た味方
                switch(this.skillUserData.type){
                    case "player":
                        effectData.target = "Player";
                        break;
                    case "enemy":
                        effectData.target = "enemy";
                        break;
                }
                break;
            default:
                // "all", "player", "enemy"は加工しない
                break;
            }
            //skillData.effectのhitsを数字に直す
            effectData.hits = Number(effectData.hits);
            });
        });
        return skillData;
    }

    /* スキル情報をDBから取得してskillDataMapにセットする (DB接続の修正を行う) */
    static #addSkillDataMap(skillIdArray = []){
        /* 開発用にデータをセット 指定したスキルidに一つ上のマスの敵に攻撃するスキルを設定*/
        skillIdArray.forEach((skillId) => {
            let skillData;
            switch(skillId){
                case this.testSkillId1:
                    //テストスキル1
                    skillData = [{skillName:"スキル1", scope:{type:"one", x:0, y:-1, rotation:true}, effect:[{type:"normal", target:"hostility", hits:1}, {type:"normal", target:"hostility", hits:"all"}]}];
                    break;
                case this.testSkillId2:
                    //テストスキル2
                    skillData = [{skillName:"スキル2", scope:{type:"one", x:0, y:-1, rotation:true}, effect:[{type:"normal", target:"hostility", hits:1}, {type:"normal", target:"hostility", hits:"all"}]}];
                    break;
                default:
                    //テスト用の通常攻撃
                    skillData = [{skillName:"通常攻撃", scope:{type:"one", x:0, y:-1, rotation:true}, effect:[{type:"normal", target:"hostility", hits:1}, {type:"normal", target:"hostility", hits:"all"}]}];
                    break;
            }
            this.skillDataMap.set(skillId, skillData);
        });
        /* end */
        // skillIdArray.forEach((skillId) => {
        //     // TODO データベースから取得するようにする
        //     this.skillDataMap.set(skillId, skillData);
        // });
    }

    /* スキル範囲分岐 */
    // "createTargetCoordinateArray" 範囲座標配列作成
    static #scopeBranch(scope){
        const functionMap = new Map();
        switch(scope.type){
            case "one":
                const typeOne = (scopeData, direction) => {
                    // 基準点設定
                    const baseCoordinate = {};
                    baseCoordinate.x = scopeData.x;
                    baseCoordinate.y = scopeData.y;
                    if(scopeData.rotation){
                        // 座標回転
                        const rotatedTargetCoordinateArray = this.#rotatetargetCoordinateArray([baseCoordinate], direction, this.skillUserData.direction);
                        const relativeCoordinate = this.#convertRelativeToAbsolute(rotatedTargetCoordinateArray[0].x, rotatedTargetCoordinateArray[0].y);
                        baseCoordinate.x = relativeCoordinate.x;
                        baseCoordinate.y = relativeCoordinate.y;
                    }
                    // 効果先座標作成
                    const targetCoordinateArray = [];
                    if(!this.#isInCoordinateRange(baseCoordinate.x, baseCoordinate.y)){
                        // 座標がステージ範囲外の場合は除外する
                        return [];
                    }
                    if(!Stage.isFloor(baseCoordinate.x, baseCoordinate.y)){
                        // 座標が床ではない場合は除外する
                        return [];
                    }
                    targetCoordinateArray.push(baseCoordinate);
                    return targetCoordinateArray;
                }
                functionMap.set("createTargetCoordinateArray", typeOne);
                break;
            case "line":
                // TODO
                break;
            // TODO タイプを追加する
            default:
                //エラー
                functionMap.set("createTargetCoordinateArray", () => {});
                break;
        }
        return functionMap;
    }

    /* スキル効果分岐 */
    // "getPlayerDefenseStatus" プレイヤー防御ステータス取得
    // "getEnemyDefenceStatus" エネミー防御ステータス取得
    // "calcFunctionArray" ステータス変動計算
    // "playerStatusFluctuationArray" プレイヤーステータス変動
    // "enemyStatusFluctuationArray" エネミーステータス変動
    // "checkPlayer" プレイヤーの対象チェック
    // "checkEnemy" エネミーの対象チェック
    static #effectBranch(effect){
        const functionMap = new Map();
        // 防御ステータスをすべて取得するように関数を設定する
        const getPlayerDefenseStatus = (playerId) => {
            const defenseStatus = Player.getPlayerDefenseStatus(playerId);
            return defenseStatus;
        };
        functionMap.set("getPlayerDefenseStatus", getPlayerDefenseStatus);

        const getEnemyDefenceStatus = (coordinate) => {
            const defenseStatus = Enemy.getEnemyDefenceStatus(coordinate.x,coordinate.y);
            return defenseStatus;
        };
        functionMap.set("getEnemyDefenceStatus", getEnemyDefenceStatus);

        let isTargetPlayer = false;
        let isTargetEnemy = false;
        const calcFunctionArray = [];
        const playerStatusFluctuationFunctionArray = [];
        const enemyStatusFluctuationFunctionArray = [];
        effect.forEach((effectElement) => {
            switch(effectElement.type){
                case "normal":
                    // 計算関数設定
                    const normalCalc = (attackStatus, defenseStatus) => {
                        const damage = this.#normalDmaageCalc(attackStatus, defenseStatus);
                        return {hp:-damage};
                    };
                    calcFunctionArray.push(normalCalc);

                    // ステータス更新関数設定
                    const normalPlayerStatusFluctuation = (playerId, statusFluctuation) => {
                        Player.playerHpFluctuation(playerId, statusFluctuation.hp);
                    };
                    playerStatusFluctuationFunctionArray.push(normalPlayerStatusFluctuation);
                    const normalEnemyStatusFluctuation = (coordinate, statusFluctuation) => {
                        Enemy.enemyHpFluctuation(coordinate.x, coordinate.y, statusFluctuation.hp);
                    };
                    enemyStatusFluctuationFunctionArray.push(normalEnemyStatusFluctuation);
                    break;
                 case "attack":
                    // TODO
                    break;
                default:
                    //エラー
                    calcFunctionArray.push(() => {});
                    playerStatusFluctuationFunctionArray.push(() => {});
                    enemyStatusFluctuationFunctionArray.push(() => {});
                    break;
                
            }
            
            switch(effectElement.target){
                case "enemy":
                    isTargetEnemy = true;
                    break;
                case "player":
                    isTargetPlayer = true;
                    break;
                case "all":
                    isTargetPlayer = true;
                    isTargetEnemy = true;
                    break;
            }
        });
        functionMap.set("calcFunctionArray", calcFunctionArray);
        functionMap.set("playerStatusFluctuationArray", playerStatusFluctuationFunctionArray);
        functionMap.set("enemyStatusFluctuationArray", enemyStatusFluctuationFunctionArray);

        // 効果対象チェック関数設定
        if(isTargetPlayer){
            // playerがターゲットの場合
            const checkPlayer = (coordinate) => {
                const isPlayer = Player.isPlayerExistence(coordinate.x. coordinate.y)
                return isPlayer;
            };
            functionMap.set("checkPlayer", checkPlayer);
        }else{
            // playerがターゲットでない場合
            const noCheckPlayer = () => {
                return false;
            };
            functionMap.set("checkPlayer", noCheckPlayer);
        }
        if(isTargetEnemy){
            // enemyがターゲットの場合
            const checkEnemy = (coordinate) => {
                const isEnemy = Enemy.checkEnemy(coordinate.x, coordinate.y)
                return isEnemy;
            };
            functionMap.set("checkEnemy", checkEnemy);
        }else{
            // enemyがターゲットでない場合
            const noCheckEnemy = () => {
                return false;
            };
            functionMap.set("checkEnemy", noCheckEnemy);
        }
        return functionMap;
    }

    /* スキルの次の効果を実行する */
    static #nextSkillExecute(){
        this.skillDataIndex = this.skillDataIndex + 1;
        if(this.skillDataIndex >= this.skillData.length){
            // データがない場合は終了
            return;
        }
        this.skillReady();
        this.skillGo();
    }

    /* スキル対象相対座標のリストを方向に回転する */
    static #rotatetargetCoordinateArray(targetCoordinateArray, nowDirection, nextDirection){
        // 方向を数字(0~360)に変換する
        let nowAngle = 0;
        switch(nowDirection){
            case "up":
                nowAngle = 0;
                break;
            case "rightup":
                nowAngle = 45;
                break;
            case "right":
                nowAngle = 90;
                break;
            case "rightdown":
                nowAngle = 135;
                break;
            case "down":
                nowAngle = 180;
                break;
            case "leftdown":
                nowAngle = 225;
                break;
            case "left":
                nowAngle = 270;
                break;
            case "leftup":
                nowAngle = 315;
                break;
            default:
                break;

        }
        // 変換先の方向を角度(0~360)に変換する
        let nextAngle = 0;
        switch(nextDirection){
            case "up":
                nextAngle = 0;
                break;
            case "rightup":
                nextAngle = 45;
                break;
            case "right":
                nextAngle = 90;
                break;
            case "rightdown":
                nextAngle = 135;
                break;
            case "down":
                nextAngle = 180;
                break;
            case "leftdown":
                nextAngle = 225;
                break;
            case "left":
                nextAngle = 270;
                break;
            case "leftup":
                nextAngle = 315;
                break;
            default:
                break;
        }
        // (45°, 90°, 180°)回転メソッドを呼び出して回転する
        let rotatedTargetCoordinateArray = JSON.parse(JSON.stringify(targetCoordinateArray)); //ディープコピー
        let rotateAngle = Math.abs(nextAngle - nowAngle);
        while(rotateAngle > 0){
            if(rotateAngle >= 180){
                 rotatedTargetCoordinateArray = this.#rotateOneHalf(rotatedTargetCoordinateArray);// 180°回転
                rotateAngle -=180;
            }else if(rotateAngle >= 90){
                rotatedTargetCoordinateArray = this.#rotateOneQuarter(rotatedTargetCoordinateArray);// 90°回転
                rotateAngle -= 90;
            }else{
                rotatedTargetCoordinateArray = this.#rotateOneEighth(rotatedTargetCoordinateArray);// 45°回転
                rotateAngle -= 45;
            }
        }
        return rotatedTargetCoordinateArray;
    }

    /* スキル範囲を右に45°回転する */
    static #rotateOneEighth(targetCoordinateArray){
        const rotatedTargetCoordinateArray = [];
        targetCoordinateArray.forEach((relativeCoordinate) => {
            let nowX = relativeCoordinate.x;
            let nowY = relativeCoordinate.y;
            const range = Math.max(Math.abs(nowX), Math.abs(nowY));
            for(let i = 0; i < range; i++){
                switch(true){
                    case (-range <= nowX < range && nowY === -range):
                        // x+方向に移動
                        nowX += 1;
                        break;
                    case (nowX === range && -range <= nowY < range):
                        // y+方向に移動
                        nowY += 1;
                        break;
                    case (range >= nowX >-range && nowY === range):
                        // x-方向に移動
                        nowX -= 1;
                        break;
                    case (nowX === -range && range >= nowY > -range):
                        // y-方向に移動
                        nowY -= 1;
                        break;
                    default:
                        break;
                }
            }
            const targetCoordinateArrayItem = {};
            targetCoordinateArrayItem.x = nowX;
            targetCoordinateArrayItem.y = nowY;
            rotatedTargetCoordinateArray.push(targetCoordinateArrayItem);
        });
        return rotatedTargetCoordinateArray;
    }

    /* スキル範囲を右に90°回転する */
    static #rotateOneQuarter(targetCoordinateArray){
        const rotatedTargetCoordinateArray = [];
        targetCoordinateArray.forEach((relativeCoordinate) => {
            const rotatedTargetCoordinateArrayItem = {};
            rotatedTargetCoordinateArrayItem.x = -relativeCoordinate.y;
            rotatedTargetCoordinateArrayItem.y = relativeCoordinate.x;
            rotatedTargetCoordinateArray.push(rotatedTargetCoordinateArrayItem);
        });
        return rotatedTargetCoordinateArray;
    }

    /* スキル範囲を右に180°回転する */
    static #rotateOneHalf(targetCoordinateArray){
        const rotatedTargetCoordinateArray = [];
        targetCoordinateArray.forEach((relativeCoordinate) => {
            const rotatedTargetCoordinateArrayItem = {};
            rotatedTargetCoordinateArrayItem.x = -relativeCoordinate.x;
            rotatedTargetCoordinateArrayItem.y = -relativeCoordinate.y;
            rotatedTargetCoordinateArray.push(rotatedTargetCoordinateArrayItem);
        });
        return rotatedTargetCoordinateArray;
    }

    /* スキル使用者を原点とする相対座標からステージの絶対座標に変換する */
    static #convertRelativeToAbsolute(relativeX, relativeY) {
        const absoluteX = this.skillUserData.nowX + relativeX;
        const absoluteY = this.skillUserData.nowY + relativeY;
        return {x:absoluteX, y:absoluteY}
    }

    /* 座標の範囲をチェックする */
    static #isInCoordinateRange(x, y){
        if(x === null || y ===null){
            //nullの場合
            return false;
        }
        if(0 < x < Config.stageRows && 0 < y < Config.stageCols){
            //範囲内の場合
            return true;
        }
        return false;
    }

    /*  ダメージ計算 (normal)*/
    static #normalDmaageCalc(attackStatus, defenseStatus){
        //攻撃力(*補助系)/２ー守備力(*補助系)/４
        const damage = attackStatus.atk / 2 - defenseStatus.def / 4;
        const integerDamage = Math.round(damage); //四捨五入で整数にする
        // TODO 修正する
        return integerDamage;
    }
    /* ダメージ計算 (magic) */
    static #magicDmaageCalc(){
        //TODO
    }

    /* ダメージ計算 (physics) */
    static #attackDmaageCalc(){
        //TODO
    }
}