/* スキルの処理を行う */
/* test */
class Skill{

    //playerから呼び出し
    //スキル確認
    //スキル実行

    static skillDataMap; //スキル内容を保存するMap (skilld : {内容})
    // スキル内容の形式 {scope:「範囲のデータ」, effect:「効果のデータ」}
    static skillUserData; //スキル使用者のデータ
    static skillData; //Mapから取得したスキルデータ
    static targetCoordinateArray; //スキル効果先座標のリスト
    static scopeLayerElement;

// public
    /**
     * 初期化
     */
    static initialize(){
        this.skillDataMap = new Map();
        this.useFunctionMap = new Map();
        this.skillUserData = {};
        this.skillData = {};
        this.targetCoordinateArray = [];
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
        this.skillData = {}; //new
        // scope.typeで分岐する関数を設定
        const scopeTypeUseFunctionMap = this.#scopeTypeBranch(skillData.scope.type);
        const createTargetCoordinateArray = scopeTypeUseFunctionMap.get("createTargetCoordinateArray");
        this.scopeExtensionFunction = scopeTypeUseFunctionMap.get("scopeExtension");
        // targetCoordinateArray作成
        const targetCoordinateArray = createTargetCoordinateArray(skillData.scope);
        // スキル座標を設定する
        if(this.skillData.skillId === this.normalAttackId){ //通常攻撃の場合は準備をスキップする
            // skillGoに渡すデータをクラス変数に設定する
            this.targetCoordinateArray = targetCoordinateArray;
            this.skillData = skillData;
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
    }

    /**
     * スキル使用
     */
    static skillGo(){
        /* useSkill, skillReadyからのデータ取得と初期化 */
        const skillData = this.skillData;
        const targetCoordinateArray = this.targetCoordinateArray;
        const scopeExtensionFunction = this.scopeExtensionFunction;
        this.skillData = {}; //new
        this.targetCoordinateArray = []; //new
        this.scopeExtensionFunction = () => {}; //new
        /* effect.type, effect.targetで分岐する関数の設定 */
        const statusFluctuationCalcFunctionArray = [];
        const getPlayerDefenseStatusFunctionArray = [];
        const getEnemyDefenseStatusFunctionArray = [];
        const playerStatusFluctuationExecuteFunctionArray = [];
        const enemyStatusFluctuationExecuteFunctionArray = [];
        const checkEffectTargetCharacterFunctionArray = [];
        skillData.effect.forEach((effectData) => {
            const effectTypeUseFunctionMap = this.#effectTypeBranch(effectData.type);
            statusFluctuationCalcFunctionArray.push(effectTypeUseFunctionMap.get("statusFluctuationCalc")); //計算関数
            getPlayerDefenseStatusFunctionArray.push(effectTypeUseFunctionMap.get("getPlayerDefenseStatus")); //プレイヤー防御ステータス取得関数
            getEnemyDefenseStatusFunctionArray.push(effectTypeUseFunctionMap.get("getEnemyDefenseStatus")); //エネミー防御ステータス取得関数
            playerStatusFluctuationExecuteFunctionArray.push(effectTypeUseFunctionMap.get("playerStatusFluctuationExecute"));//プレイヤーステータス変動関数
            enemyStatusFluctuationExecuteFunctionArray.push(effectTypeUseFunctionMap.get("enemyStatusFluctuationExecute"));//エネミーステータス変動関数
            const effectTargetUseFunctionMap = this.#effectTargetBranch(effectData.target);
            checkEffectTargetCharacterFunctionArray.push(effectTargetUseFunctionMap.get("checkEffectTargetCharacter")); //効果対象のターゲットの存在チェック関数
            
        });

        /* スキル効果実行 */
        let isSkillEnd = false;
        for(const relativeTargetCoordinate of targetCoordinateArray){ //対象座標1マスずつ実行する
            const targetCoordinate = this.#convertRelativeToAbsolute(relativeTargetCoordinate.x, relativeTargetCoordinate.y);
            const x = targetCoordinate.x;
            const y = targetCoordinate.y;
            if(!this.#isInCoordinateRange(x, y)){
                //座標がステージの範囲外の場合はスキップ
                continue;
            }
            /* targetの存在チェック */
            let existenceChecked;
            if(Player.isPlayerExistence(x. y)){
                //プレイヤーが存在する
                existenceChecked = "player";
            }else if(Enemy.checkEnemy(x, y)){
                //エネミーが存在する
                existenceChecked = "enemy";
            }else{
                //targetが存在しない
                continue;
            }
            /* 効果の処理 */
            let hitsSkipCount = 0;
            skillData.effect.forEach((effectData, index) => {
                if(effectData.hits <= 0){ //ヒット数チェック
                    // 残りヒット数が0以下はスキップ
                    hitsSkipCount += 1;
                    return;
                }
                const targetMode = checkEffectTargetCharacterFunctionArray[index](existenceChecked);
                switch(targetMode){
                    case "no": //存在なし
                        // スキップ
                        return;
                    case "player": //プレイヤー
                        const playerDefenseStatus = getPlayerDefenseStatusFunctionArray[index](x, y);
                        const playerStatusFluctuation = statusFluctuationCalcFunctionArray[index](playerDefenseStatus);
                        playerStatusFluctuationExecuteFunctionArray[index](playerStatusFluctuation);
                        break;
                    case "enemy": //エネミー
                        const enemyDefenceStatus = getEnemyDefenseStatusFunctionArray[index](x, y);
                        const enemyStatusFluctuation = statusFluctuationCalcFunctionArray[index](enemyDefenceStatus);
                        enemyStatusFluctuationExecuteFunctionArray[index](x, y, enemyStatusFluctuation);
                        break;
                    default: //エラー
                        return;
                }
                effectData.hits = effectData.hits -1;

            });

            if(hitsSkipCount === skillData.effect.length){
                //スキル終了
                isSkillEnd = true;
                break;
            }
        }

        // TODO スキル範囲拡張処理
        if(!isSkillEnd){
            //スキル継続
        }
        // TODO リンクスキル処理
        skillData.link.forEach((skillId) => {
            this.#linkExecute(skillId);
        });
        
        /* スキル終了処理 */
        this.#skillEndInitialize();
    }

// private
    /* スキル終了の初期化 */
    static #skillEndInitialize(){
        this.useFunctionMap = new Map();
        this.skillUserData = {};
        this.skillData = {};
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
        skillData.effect.forEach((effectData) => {
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
        return skillData;
    }

    /* スキル対象相対座標のリストを作成する */
    static #createTargetCoordinateArray(skillData){
        /* リスト作成 */
        const targetCoordinateArray = this.#scopeTypeBranch(skillData.scope);
        /* 回転 */
        const rotatedTargetCoordinateArray = this.#rotatetargetCoordinateArray(targetCoordinateArray, this.defaultDirection, this.skillUserData.direction);
        return rotatedTargetCoordinateArray;
    }

    /* スキル範囲を描画 */
    static #screenRenderingScope(scopeArray){
        scopeArray.forEach((relativeCoordinate, index) => {
            let scopeElement = document.getElementById("scope_" + index);
            if(scopeElement === null){
                // 指定idの要素が存在しない
                scopeElement = this.scopeElement.cloneNode();
                scopeElement.id = "scope_" + index;
            }
            const attackCoordinate = this.#convertRelativeToAbsolute(relativeCoordinate.x, relativeCoordinate.y);
            scopeElement.style.top = Config.stageImgHeight * attackCoordinate.x;
            scopeElement.style.left = Config.stageImgWidth * attackCoordinate.y;
            this.scopeLayerElement.appendChild(scopeElement);
        });
    }

    /* スキル範囲の描画を削除 */
    static #deleteScreenRenderingScope(){
        while(true){
            const scopeElement = this.scopeLayerElement.firstChild;
            if(scopeElement === null){
                //子要素が存在しない場合削除処理を終了する
                break;
            }
            scopeElement.remove()
        }
    }

    /* スキル情報をDBから取得してskillDataMapにセットする (DB接続の修正を行う) */
    static #addSkillDataMap(skillIdArray = []){
        /* 開発用にデータをセット 指定したスキルidに一つ上のマスの敵に攻撃するスキルを設定*/
        skillIdArray.forEach((skillId) => {
            let skillData;
            switch(skillId){
                case this.testSkillId1:
                    //テストスキル1
                    skillData = {scope:{type:"one", x:0, y:-1}, effect:[{type:"normal", target:"hostility", hits:1}, {type:"normal", target:"hostility", hits:"all"}], link:[this.testSkillId2]};
                    break;
                case this.testSkillId2:
                    //テストスキル2
                    skillData = {scope:{type:"one", x:0, y:-1}, effect:[{type:"normal", target:"hostility", hits:1}, {type:"normal", target:"hostility", hits:"all"}], link:[this.defaultSkillId]};
                    break;
                default:
                    //テスト用の通常攻撃
                    skillData = {scope:{type:"one", x:0, y:-1}, effect:[{type:"normal", target:"hostility", hits:1}, {type:"normal", target:"hostility", hits:"all"}], link:[]};
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

    /* リンクスキルを実行する */
    static #linkExecute(skillId){
        //skillData取得
        const skillData = this.#setSkillData(skillId);
        //linkを削除
        skillData.link = [];
        this.skillData = skillData;
        this.skillReady();
        this.skillGo();
    }

    /* scopeType別に、スキル範囲相対座標のリストを作成する */
    // return Map(["createTargetCoordinateArray":Function, "scopeExtension":Function]);
    static #scopeTypeBranch(scopeType){
        const useFunctionMap = new Map();
        switch(scopeType){
            case "one":
                //スキル範囲座標の配列を作成する関数
                const createTargetCoordinateOne = (scopeData) => {
                    const targetCoordinateArray = [];
                    const targetCoordinateArrayItem = {};
                    targetCoordinateArrayItem.x = scopeData.x;
                    targetCoordinateArrayItem.y = scopeData.y;
                    targetCoordinateArray.push(targetCoordinateArrayItem);
                    return targetCoordinateArray;
                }
                useFunctionMap.set("createTargetCoordinateArray", createTargetCoordinateOne);
                //スキル範囲拡張用の関数を設定する (拡張なし)
                useFunctionMap.set("scopeExtension", () => {return{};});
                break;
            // TODO 範囲タイプを追加する
            default:
                break;
        }
        return useFunctionMap;
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

    /* 効果タイプで分岐する関数を設定する */
    //return Map(["statusFluctuationCalc":Function, "getPlayerDefenseStatus":Function, "getEnemyDefenseStatus":Function, "playerStatusFluctuationExecute":Function, "enemyStatusFluctuationExecute":Function]);
    static #effectTypeBranch(effectType){
        const useFunctionMap = new Map();
        switch(effectType){
            case "normal": //通常攻撃
                //ステータス変化計算関数
                const normalCalc = (defenseStatus) => {
                    const attackStatus = {};
                    Object.assign(attackStatus, this.skillUserData.attackStatus);
                    const statusFluctuation = {};
                    const damage = this.#normalDmaageCalc(attackStatus, defenseStatus);
                    statusFluctuation.hp = -damage;
                    return statusFluctuation;
                }
                useFunctionMap.set("statusFluctuationCalc", normalCalc);

                //プレイヤーの防御系ステータス取得関数
                //取得失敗の場合はnullを返す
                const getNormalPlayerDefenseStatus = (x, y) => {
                    const playerId = Player.getPlayerId(x, y);
                    const defenseStatus = Player.getPlayerDefenseStatus(playerId); 
                    defenseStatus.playerId = playerId;
                    return defenseStatus;
                };
                useFunctionMap.set("getPlayerDefenseStatus", getNormalPlayerDefenseStatus);

                //エネミーの防御系ステータス取得関数
                //取得失敗の場合はnullを返す
                const getNormalEnemyDefenceStatus = (x, y) => {
                    const defenseStatus = Enemy.getEnemyDefenceStatus(x, y);
                     return defenseStatus;
                };
                useFunctionMap.set("getEnemyDefenseStatus", getNormalEnemyDefenceStatus);

                //プレイヤーのステータス更新関数
                const playerNormalStatusFluctuationExecute = (playerId, statusFluctuation) => {
                    Player.playerHpFluctuation(playerId, statusFluctuation.hp);
                }
                useFunctionMap.set("playerStatusFluctuationExecute", playerNormalStatusFluctuationExecute);

                //エネミーのステータス更新関数
                const enemyNormalStatusFluctuationExecute = (x, y, statusFluctuation) => {
                    Enemy.enemyHpFluctuation(x, y, statusFluctuation.hp);
                }
                useFunctionMap.set("enemyStatusFluctuationExecute", enemyNormalStatusFluctuationExecute);

                break;
            case "attack": //物理攻撃
                //ステータス変化計算
                const attackCalc = (defenseStatus) => {
                    const attackStatus = {};
                    Object.assign(attackStatus, this.skillUserData.status);
                    const statusFluctuation = {};
                    // TODO
                    return statusFluctuation;
                }
                useFunctionMap.set("statusFluctuationCalc", attackCalc);

                //プレイヤーの防御系ステータス取得関数
                const getAttackPlayerDefenseStatus = (x, y) => {
                    const defenseStatus = {};
                    // TODO
                    return defenseStatus;
                };
                useFunctionMap.set("getPlayerDefenseStatus", getAttackPlayerDefenseStatus);

                //エネミーの防御系ステータス取得関数
                const getAttackEnemyDefenceStatus = (x, y) => {
                    const defenseStatus = {};
                    // TODO
                     return defenseStatus;
                };
                useFunctionMap.set("getEnemyDefenseStatus", getAttackEnemyDefenceStatus);

                //プレイヤーのステータス更新関数
                const playerAttackStatusFluctuationExecute = (playerId, statusFluctuation) => {
                    // TODO
                    Player.playerHpFluctuation(playerId, statusFluctuation.hp);
                }
                useFunctionMap.set("playerStatusFluctuationExecute", playerAttackStatusFluctuationExecute);

                //エネミーのステータス更新関数
                const enemyAttackStatusFluctuationExecute = (x, y, statusFluctuation) => {
                    // TODO
                    Enemy.enemyHpFluctuation(x, y, statusFluctuation.hp);
                }
                useFunctionMap.set("enemyStatusFluctuationExecute", enemyAttackStatusFluctuationExecute);

                break;
            case "magic": //魔法攻撃
                //ステータス変化計算
                const magicCalc = (defenseStatus) =>{
                    const attackStatus = {};
                    Object.assign(attackStatus, this.skillUserData.status);
                    const statusFluctuation = {};
                    // TODO
                    return statusFluctuation;
                }
                useFunctionMap.set("statusFluctuationCalc", magicCalc);

                //プレイヤーの防御系ステータス取得関数
                const getMagicPlayerDefenseStatus = (x, y) => {
                    const defenseStatus = {};
                    // TODO
                    return defenseStatus;
                };
                useFunctionMap.set("getPlayerDefenseStatus", getMagicPlayerDefenseStatus);

                //エネミーの防御系ステータス取得関数
                const getMagicEnemyDefenceStatus = (x, y) => {
                    const defenseStatus = {};
                    // TODO
                     return defenseStatus;
                };
                useFunctionMap.set("getEnemyDefenseStatus", getMagicEnemyDefenceStatus);

                //プレイヤーのステータス更新関数
                const playerMagicStatusFluctuationExecute = (playerId, statusFluctuation) => {
                    // TODO
                    Player.playerHpFluctuation(playerId, statusFluctuation.hp);
                }
                useFunctionMap.set("playerStatusFluctuationExecute", playerMagicStatusFluctuationExecute);

                //エネミーのステータス更新関数
                const enemyMagicStatusFluctuationExecute = (x, y, statusFluctuation) => {
                    // TODO
                    Enemy.enemyHpFluctuation(x, y, statusFluctuation.hp);
                }
                useFunctionMap.set("enemyStatusFluctuationExecute", enemyMagicStatusFluctuationExecute);
                
                break;
            // TODO 種類を追加する
            default: //エラー
                return null;
        }
        return useFunctionMap;
    }

    /* 効果対象で分岐する関数を設定する */
    //return Map(["statusFluctuationExecute":Function, "checkEffectTargetCharacter":Function]);
     static #effectTargetBranch(effectTarget){
         const useFunctionMap = new Map();
         switch(effectTarget){
             case "player": //プレイヤー
                //効果対象チェック関数
                const checkEffectTargetPlayer = (existenceChecked) => {
                    if(existenceChecked === "player"){
                        //プレイヤーが存在する
                        return "Player";
                    }
                    return "no"
                }
                useFunctionMap.set("checkEffectTargetCharacter", checkEffectTargetPlayer);

                //ステータス変動実行関数
                const playerStatusFluctuationExecute = (targetDataMap, statusFluctuationCalcFunction, skillHitRemainingNumber) => {
                    let isSkillEnd = false;
                    // TODO
                    return isSkillEnd;
                }
                useFunctionMap.set("statusFluctuationExecute", playerStatusFluctuationExecute);
                break;
            case "enemy": //エネミー
                //効果対象チェック関数
                const checkEffectTargetEnemy = (existenceChecked) => {
                    if(existenceChecked === "enemy"){
                        //エネミーが存在する
                        return "enemy";
                    }
                    return "no"
                }
                useFunctionMap.set("checkEffectTargetCharacter", checkEffectTargetEnemy);

                // ステータス変動実行関数
                const enemyStatusFluctuationExecute = (targetDataMap, statusFluctuationCalcFunction, skillHitRemainingNumber) => {
                    const enemyTargetData = targetDataMap.get("enemy");
                    if(enemyTargetData === null){
                        // ターゲットなし
                        return skillHitRemainingNumber;
                    }else{
                        //ターゲットあり
                        skillHitRemainingNumber -= 1;
                    }
                    const damage = statusFluctuationCalcFunction(this.skillUserData.attackStatus, enemyTargetData.status);
                    Enemy.enemyHpFluctuation(enemyTargetData.x, enemyTargetData.y, -damage);
                    return skillHitRemainingNumber;
                }
                useFunctionMap.set("statusFluctuationExecute", enemyStatusFluctuationExecute);
                break;
            case "all": //プレイヤーとエネミー
                //効果対象チェック関数
                const checkEffectTargetAll = (existenceChecked) => {
                    if(existenceChecked === "enemy"){
                        //エネミーが存在する
                        return "enemy";
                    }else if(existenceChecked === "player"){
                        //プレイヤーが存在する
                        return "player";
                    }
                    return "no"
                }
                useFunctionMap.set("checkEffectTargetCharacter", checkEffectTargetAll);

                // ステータス変動実行
                const allStatusFluctuationExecute = (targetDataMap, statusFluctuationCalcFunction, skillHitRemainingNumber) => {
                    let isSkillEnd = false;
                    // TODO
                    return isSkillEnd;
                }
                useFunctionMap.set("statusFluctuationExecute", allStatusFluctuationExecute);
                break;
            default: //エラー
                return null;
         }
         return useFunctionMap;
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