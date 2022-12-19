/* スキルの処理を行う */
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
        this.defaultDirection = "up";
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
        //スキル使用者のデータをセット
        const skillUserData = {};
        skillUserData.type = "player";
        skillUserData.playerId = playerId;
        const playerNowPosition = Player.getPlayerNowPosition(playerId);
        skillUserData.nowX = playerNowPosition.x;
        skillUserData.nowY = playerNowPosition.y;
        skillUserData.direction = Player.getPlayerDirection(playerId);
        skillUserData.level = Player.getPlayerLevel(playerId);
        const playerAttackStatus = Player.getPlayerAttackStatus;
        skillUserData.attackStatus = playerAttackStatus;
        this.skillUserData = skillUserData;
        //スキルデータをセットする
        this.skillData = this.#setSkillData(skillId);
        //スキル対象相対座標のリストをセットする
        this.targetCoordinateArray = this.#createTargetCoordinateArray(this.skillData);
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
        const skillUserData = {};
        skillUserData.type = "enemy";
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.direction = Enemy.getDirection(nowX, nowY);
        skillUserData.level = Enemy.getEnemyLevel(nowX, nowY);
        const enemyAttackStatus = Enemy.getEnemyAttackStatus(nowX, nowY);
        skillUserData.attackStatus = enemyAttackStatus;
        this.skillUserData = skillUserData;
        //スキルデータをセットする
        this.skillData = this.#setSkillData(skillId);
        //スキル対象相対座標のリストをセットする
        this.targetCoordinateArray = this.#createTargetCoordinateArray(this.skillData);
    }

    /**
     * trapからスキル呼び出し
     * スキル使用者のデータをセットする
     */
    static trapUseSkill(skillId, nowX, nowY){
        const skillUserData =  {};
        skillUserData.type = "trap";
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.direction = Trap.getDirection(nowX, nowY); //処理用に設定
        skillUserData.level = Trap.getLevel(nowX, nowY); //Trapから取得するように変更する
        //attackStatus
        this.skillUserData = skillUserData;
        //スキルデータをセットする
        this.skillData = this.#setSkillData(skillId);
        //スキル対象相対座標のリストをセットする
        this.targetCoordinateArray = this.#createTargetCoordinateArray(this.skillData);
    }

    /**
     * itemからスキル呼び出し
     * アイテムを使用するplayerIdで設定する
     */
    static itemUseSkill(skillId,playerId){
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
        //スキルデータをセットする
        this.skillData = this.#setSkillData(skillId);
        //スキル対象相対座標のリストをセットする
        this.targetCoordinateArray = this.#createTargetCoordinateArray(this.skillData);
        // TODO
    }

    /**
     * スキル準備
     */
    static skillReady(){
        if(this.skillData.skillId === this.normalAttackId){ //通常攻撃の場合は準備をスキップする
            return;
        }
        /* 範囲を表示 */
        // TODO
        //this.#screenRenderingScope(this.targetCoordinateArray); //スキル範囲表示
        
        /* controlから操作を取得 */
        // TODO 操作別の分岐を取得

        /* 準備終了処理 */
        //this.#deleteScreenRenderingScope(); //範囲表示の描画を削除
    }

    /**
     * スキル使用
     */
    static skillGo(){
        const skillData = this.skillData;
        const targetCoordinateArray = this.targetCoordinateArray;
        /* スキル効果実行 */
        this.#effectTypeBranch(skillData, targetCoordinateArray)

        /* スキル終了処理 */
        this.#skillEndInitialize();
    }

// private
    /* スキル終了の初期化 */
    static #skillEndInitialize(){
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
        const skillData = JSON.parse(JSON.stringify(this.skillDataMap.get(skillId))); //ディープコピー
        skillData.skillId = skillId;
        //skillDataのtargetを絶対targetにする
        switch(skillData.effect.target){
            case "hostility": //スキル使用者から見た敵
                switch(this.skillUserData.type){
                    case "player":
                        skillData.effect.target = "enemy";
                        break;
                    case "enemy":
                        skillData.effect.target = "player";
                        break;
                }
                break;
            case "ally": //スキル使用者から見た味方
                switch(this.skillUserData.type){
                    case "player":
                        skillData.effect.target = "Player";
                        break;
                    case "enemy":
                        skillData.effect.target = "enemy";
                        break;
                }
                break;
            default:
                // "all", "player", "enemy"は加工しない
                break;
        }
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
        skillIdArray.forEach((element) => {
            const skillData = {scope:{type:"one", x:0, y:-1}, effect:{type:"normal", target:"hostility"}};
            this.skillDataMap.set(element, skillData);
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

    /* scopeType別に、スキル範囲相対座標のリストを作成する */
    static #scopeTypeBranch(skillScopeData){
        let targetCoordinateArray = [];
        switch(skillScopeData.type){
            case "one":
                targetCoordinateArray = this.#scopeTypeOne(skillScopeData);
                break;
            // TODO 範囲タイプを追加する
            default:
                break;
        }
        return targetCoordinateArray;
    }

    /* scopeType別の処理メソッド (one) */
    static #scopeTypeOne(skillScopeData){
        // 方向が上の状態のスキル範囲座標の配列を作成する
        const targetCoordinateArray = [];
        const targetCoordinateArrayItem = {};
        targetCoordinateArrayItem.x = skillScopeData.x;
        targetCoordinateArrayItem.y = skillScopeData.y;
        targetCoordinateArray.push(targetCoordinateArrayItem);
        return targetCoordinateArray;
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

    /* 効果type別に分岐 */
    static #effectTypeBranch(skillData, targetCoordinateArray) {
        // 効果内容の分岐
        switch(skillData.effect.type){
            case "normal":
                this.#effectTypeNormal(skillData, targetCoordinateArray);
                break;
            // TODO 追加する
            default:
                break;
        }
    }

    /* 効果type別の処理 (normal)*/
    static #effectTypeNormal(skillData, targetCoordinateArray){
        // 修正する
        for(let targetCoordinateArrayIndex in targetCoordinateArray){
            let isSkillEnd = false;
            const relativeTargetCoordinate = targetCoordinateArray[targetCoordinateArrayIndex];
            const targetCoordinate = this.#convertRelativeToAbsolute(relativeTargetCoordinate.x, relativeTargetCoordinate.y);
            const skillTakeDataArray = this.#skillTakeCheckFindData(targetCoordinate, skillData.effect.target);
            for(let takeDataIndex in skillTakeDataArray){ 
                const skillTakeData = skillTakeDataArray[takeDataIndex];
                let damage = this.#normalDmaageCalc(this.skillUserData.attackStatus, skillTakeData);
                const status = {};
                status.hp = -damage;
                if(skillTakeData.type === "player"){
                    // 対象がplayer
                    Player.playerStatusFluctuation(skillTakeData.playerId, status);
                }else if(skillTakeData.type === "enemy"){
                    //対象がenemy
                    // TODO
                }
                if(isSkillEnd){
                    break;
                }
            }
            if(isSkillEnd){
                break;
            }
        }
    }

    /* 対象の存在チェックとplayerの防御系ステータスを取得 */
    static #skillTakeCheckFindData(attackCoordinate, target){
        const skillTakeData = []; //スキルを受けるキャラクターのステータス 存在しない場合はからの配列を返す
        const x = attackCoordinate.x;
        const y = attackCoordinate.y;
        switch(target){
            case "all":
                if(Enemy.checkEnemy(x, y)){ //エネミーが存在する場合はステータス取得処理を行う
                    // TODO エネミーのステータスを取得
                }
                const allPlayerId = Player.getPlayerId(x, y);
                if(allPlayerId !== null){ //playerIdが存在する場合はステータス取得処理を行う
                    const playerDefenseStatus = Player.getPlayerDefenseStatus(allPlayerId);
                    playerDefenseStatus.type = "player";
                    playerDefenseStatus.playerId = allPlayerId;
                    playerDefenseStatus.x = x;
                    playerDefenseStatus.y = y;
                    skillTakeData.push(playerDefenseStatus);
                }
                break;
            case "player":
                const playerId = Player.getPlayerId(x, y);
                if(playerId !== null){ //playerIdが存在する場合はステータス取得処理を行う
                    const playerDefenseStatus = Player.getPlayerDefenseStatus(playerId);
                    playerDefenseStatus.type = "player";
                    playerDefenseStatus.playerId = playerId;
                    playerDefenseStatus.x = x;
                    playerDefenseStatus.y = y;
                    skillTakeData.push(playerDefenseStatus);
                }
                break;
            case "enemy":
                if(Enemy.checkEnemy(x, y)){ //エネミーが存在する場合はステータス取得処理を行う
                    // TODO エネミーのステータスを取得
                }
                break;
            default:
                break;
        }
        return skillTakeData;
    }

    /*  ダメージ計算 (normal)*/
    static #normalDmaageCalc(attackStatus, defenseStatus){
        //攻撃力(*補助系)/２ー守備力(*補助系)/４
        const damage = attackStatus.atk / 2 - defenseStatus.def / 4;
        // TODO 修正する
        return damage;
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