/* スキルの処理を行う */
class Skill{

    //playerから呼び出し
    //スキル確認
    //スキル実行

    static skillDataMap; //スキル内容を保存するMap (skilld : {内容})
    // スキル内容の形式 {scope:「範囲のデータ」, effect:「効果のデータ」}
    static skillUserData; //スキル使用者のデータ
    static skillData; //Mapから取得したスキルデータ
    static scopeArray;
    static scopeLayerElement;

// public
    /**
     * 初期化
     */
    static initialize(){
        this.skillDataMap = new Map();
        this.skillUserData = {};
        this.skillData = {};
        this.scopeArray = [];
        this.scopeLayerElement = document.getElementById("scope_layer");
        const scopeElement = document.createElement("div");
        scopeElement.style.position = "absolute";
        scopeElement.style.display = "block";
        scopeElement.style.margin = 0;
        scopeElement.style.height = Config.stageImgWidth;
        scopeElement.style.width = Config.stageImgWidth; 
        scopeElement.style.backgroundColor = "red";
        scopeElement.style.opacity = 0.5;
        this. scopeElement = scopeElement;
        this.normalAttackId = "SA0000"; //通常攻撃のスキルid
    }

    /**
     * playerから通常攻撃を呼び出し
     */
    static playerUseNormalAttack(playerId) {
        this.playerUseSkill(this.normalAttackId, playerId);
    }

    /**
     * playerからスキル呼び出し
     * TODO playerにgetterを作成する
     */
    static playerUseSkill(skillId,playerId){
        const skillUserData = {};
        skillUserData.type = "player";
        skillUserData.skillId = skillId;
        skillUserData.playerId = playerId;
        //skillUserData.nowX = nowX; // TODO get
        //skillUserData.nowY = nowY; // TODO get
        //skillUserData.direction = direction; // TODO get
        skillUserData.level = Player.getPlayerLevel(playerId);
        const playerAttackStatus = Player.getPlayerAttackStatus;
        for(let key in playerAttackStatus){
            skillUserData[key] = playerAttackStatus[key];
        }
        this.skillUserData = skillUserData;
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
        skillUserData.skillId = skillId;
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        //skillUserData.direction = direction; // TODO get
        skillUserData.level = Enemy.getEnemyLevel(nowX, nowY);
        const enemyAttackStatus = Enemy.getEnemyAttackStatus(nowX, nowY);
        for(let key in enemyAttackStatus){
            skillUserData[key] = playerAttackStatus[key];
        }
        this.skillUserData = skillUserData;
    }

    /**
     * trapからスキル呼び出し
     * TODO 引数を考える
     */
    static trapUseSkill(skillId){
        // TODO
    }

    /**
     * itemからスキル呼び出し
     * TODO 引数を考える
     */
    static itemUseSkill(skillId){
        // TODO
    }

    /**
     * スキル準備
     */
    static skillReady(){
        /* スキルデータ取得 */
        const skillId = skillUserData.skillId;
        // Map存在チェック
        if(!this.skillDataMap.has(skillId)){
            // 指定したスキルidのデータがMapにない
            this.#addSkillDataMap([skillId]);
            skillData = this.skillDataMap.get(skillId);
        }
        const skillData = Object.assign({}, this.skillDataMap.get(skillId)); //連想配列をディープコピー
        const skillUserData = this.skillUserData;

        /* 効果先を設定 */
        switch(skillData.effect.target){
            case "hostility": //スキル使用者から見た敵
                switch(skillUserData.type){
                    case "player":
                        skillData.effect.target = "enemy";
                        break;
                    case "enemy":
                        skillData.effect.target = "player";
                        break;
                }
                break;
            case "ally": //スキル使用者から見た味方
                switch(skillUserData.type){
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

        /* 範囲作成 */
        const scopeArray = this.#scopeTypeBranch(skillData.scope); //対象座標の配列を作成
        if(skillId === this.normalAttackId){ //通常攻撃の場合は準備を終了
            this.skillData = skillData;
            this.scopeArray = scopeArray;
            return;
        }

        /* 範囲描画 */
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

        /* controlから操作を取得 */
        // TODO

        /* 範囲描画削除 */
        while(true){
            const scopeElement = this.scopeLayerElement.firstChild();
            if(scopeElement === null){
                //子要素が存在しない場合削除処理を終了する
                break;
            }
            scopeElement.remove()
        }

        this.skillData = skillData;
        this.scopeArray = scopeArray;
        return;
    }

    /**
     * スキル使用
     */
    static skillGo(){
        const skillData = this.skillData;
        const scopeArray = this.scopeArray;
        /* スキル効果実行 */
        for(let scopeIndex in scopeArray){
            let isSkillEnd = false;
            const attackCoordinate = scopeArray[scopeIndex];
            const skillTakeDataArray = this.#skillTakeCheckFindData(attackCoordinate, skillData.effect.target);
            for(let takeDataIndex in skillTakeDataArray){ 
                const skillTakeData = skillTakeDataArray[takeDataIndex];
                isSkillEnd = this.#effectTypeBranch(skillData.effect, skillTakeData);
                if(isSkillEnd){
                    break;
                }
            }
            if(isSkillEnd){
                break;
            }
        }

        /* スキル終了処理 */
        // TODO
    }

// private
    /* スキル情報をDBから取得してskillDataMapにセットする (DB接続の修正を行う) */
    static #addSkillDataMap(skillIdArray = []){
        /* 開発用にデータをセット 指定したスキルidに一つ上のマスの敵に攻撃するスキルを設定*/
        skillIdArray.forEach((element) => {
        skillData = {scope:{type:"one", x:0, y:-1}, effect:{type:"normal", target:"hostility"}};
        this.skillDataMap.set(Number(element), skillData);
        });
        /* end */
        // skillIdArray.forEach((skillId) => {
        //     // TODO データベースから取得するようにする
        //     this.skillDataMap.set(skillId, skillData);
        // });
    }

    /* スキル使用者を原点とする相対座標からステージの絶対座標に変換する */
    static #convertRelativeToAbsolute(relativeX, relativeY) {
        const absoluteX = this.skillUserNowX + absoluteDifferenceX;
        const absoluteY = this.skillUserNowY + absoluteDifferenceY;
        return {x:absoluteX, y:absoluteY}
    }

    /* scopeType別に、スキル範囲座標のリストを作成する */
    static #scopeTypeBranch(skillScopeData){
        const scopeArray = [];
        switch(skillScopeData.type){
            case "one":
                scopeArray = scopeArray.concat(this.#scopeTypeOne(skillScopeData));
                break;
            // TODO 範囲タイプを追加する
            default:
                break;
        }
        return scopeArray;
    }

    /* scopeType別の処理メソッド (one) */
    static #scopeTypeOne(skillScopeData){
        // 方向が上の状態のスキル範囲座標の配列を作成する
        const scopeArray = [];
        const nowDirection = "up";
        const scopeArrayItem = {};
        scopeArrayItem.x = this.skillUserData.x + skillScopeData.x;
        scopeArrayItem.y = this.skillUserData.y + skillScopeData.y;
        scopeArray.push(scopeArrayItem);
        // スキル範囲座標の配列をスキルユーザの方向に回転する
        const rotatedScopeArray = this.#rotateScopeArray(scopeArray, nowDirection, this.skillUserData.direction);
        return rotatedScopeArray;
    }

    /* 相対座標を回転する */
    static #rotateScopeArray(scopeArray, nowDirection, nextDirection){
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
        while(nowAngle === nextAngle){
            let rotateAngle = Math.abs(nextAngle - nowAngle);
            if(rotateAngle >= 180){
                scopeArray = this.#rotateOneHalf(scopeArray);// 180°回転
                nowAngle +=180;
            }else if(rotateAngle >= 90){
                scopeArray = this.#rotateOneQuarter(scopeArray);// 90°回転
                nowAngle += 90;
            }else{
                scopeArray = this.#rotateOneEighth(scopeArray);// 45°回転
                nowAngle += 45;
            }
            if(nowAngle >= 360){
                nowAngle -= 360;
            }
        }
        return scopeArray;
    }

    /* スキル範囲を右に45°回転する */
    static #rotateOneEighth(scopeArray){
        const rotatedScopeArray = [];
        scopeArray.forEach((relativeCoordinate) => {
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
            const scopeArrayItem = {};
            scopeArrayItem.x = nowX;
            scopeArrayItem.y = nowY;
            rotatedScopeArray.push(scopeArrayItem);
        });
        return rotatedScopeArray;
    }

    /* スキル範囲を右に90°回転する */
    static #rotateOneQuarter(scopeArray){
        scopeArray.forEach((relativeCoordinate) => {
            const nowX = relativeCoordinate.x;
            const nowY = relativeCoordinate.y;
            relativeCoordinate.x = -nowY;
            relativeCoordinate.y = nowX
        });
        return scopeArray;
    }

    /* スキル範囲を右に180°回転する */
    static #rotateOneHalf(scopeArray){
        scopeArray.forEach((relativeCoordinate) => {
            const nowX = relativeCoordinate.x;
            const nowY = relativeCoordinate.y;
            relativeCoordinate.x = -nowX;
            relativeCoordinate.y = -nowY;
        });
        return scopeArray;
    }

    /* 効果type別に分岐 */
    static #effectTypeBranch(skillEffectData, skillTakeData) {
        let isSkillStop = false;
        // 効果内容の分岐
        switch(skillEffectData.type){
            case "normal":
                isSkillStop = this.#effectTypeNormal(skillEffectData, skillTakeData);
                break;
            // TODO 追加する
            default:
                break;
        }
        return isSkillStop;
    }

    /* 効果type別の処理 (normal)*/
    static #effectTypeNormal(skillEffectData, skillTakeData){
        let isSkillStop = false
        console.log("effectTypeNormal"); //test
        // TODO スキルの処理
        return isSkillStop;
    }

    /* 対象の存在チェックとplayerの防御系ステータスを取得 */
    static #skillTakeCheckFindData(attackCoordinate, target){
        const skillTakeData = []; //スキルを受けるキャラクターのステータス 存在しない場合はからの配列を返す
        switch(target){
            case "all":
                const x = attackCoordinate.x;
                const y = attackCoordinate.y;
                if(Enemy.checkEnemy(x, y)){ //エネミーが存在する場合はステータス取得処理を行う
                    // TODO エネミーのステータスを取得
                }
                const playerId = Player.getPlayerId(x, y);
                if(playerId !== null){ //playerIdが存在する場合はステータス取得処理を行う
                    const playerDefenseStatus = Player.getPlayerDefenseStatus(playerId);
                    playerDefenseStatus.playerId = playerId;
                    playerDefenseStatus.x = x;
                    playerDefenseStatus.y = y;
                    skillTakeData.push(playerDefenseStatus);
                }
                // item {type ,x ,y ,def ...}
                break;
            case "player":
                const x = attackCoordinate.x;
                const y = attackCoordinate.y;
                const playerId = Player.getPlayerId(x, y);
                if(playerId !== null){ //playerIdが存在する場合はステータス取得処理を行う
                    const playerDefenseStatus = Player.getPlayerDefenseStatus(playerId);
                    playerDefenseStatus.playerId = playerId;
                    playerDefenseStatus.x = x;
                    playerDefenseStatus.y = y;
                    skillTakeData.push(playerDefenseStatus);
                }
                break;
            case "enemy":
                const x = attackCoordinate.x;
                const y = attackCoordinate.y;
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
    static #normalDmaageCalc(){
        // TODO
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