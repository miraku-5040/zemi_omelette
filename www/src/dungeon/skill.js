/* スキルの処理を行う */
class Skill{

    //playerから呼び出し
    //スキル確認
    //スキル実行

    static skillDataMap; //スキル内容を保存するMap (skilld : {内容})
    // スキル内容の形式 {scope:「範囲のデータ」, effect:「効果のデータ」}

    /* 初期化 */
    static initialize(){
        this.skillDataMap = new Map();

    }

    /* playerから通常攻撃を呼び出し */
    static playerUseNormalAttack() {
        // TODO
    }

    /* playerからスキル呼び出し */
    static playerUseSkill(){
        // TODO
    }

    /* gameからスキル情報確認とcontrolの操作を取得 */
    static skillOperation(){
        // TODO
    }

    /* スキル使用 */
    static skillExe(){
        // TODO
    }

// private
    /* スキル使用(player) */
    static playerUseSkill(skillId, playerId, nowX, nowY, direction){
        const skillUserData = {};
        skillUserData.type = "player";
        skillUserData.skillId = skillId;
        skillUserData.playerId = playerId;
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.direction = direction;
        skillUserData.level = Player.getPlayerLevel(playerId);
        const playerAttackStatus = Player.getPlayerAttackStatus;
        for(let key in playerAttackStatus){
            skillUserData[key] = playerAttackStatus[key];
        }
        this.useSkill(skillUserData); //共通のスキル処理
    }
    /* スキル使用(enemy) */
    static enemyUseSkill(skillId, nowX, nowY, direction){
        const skillUserData = {};
        skillUserData.type = "enemy";
        skillUserData.skillId = skillId;
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.direction = direction;
        skillUserData.level = Enemy.getEnemyLevel(nowX, nowY);
        const enemyAttackStatus = Enemy.getEnemyAttackStatus(nowX, nowY);
        for(let key in enemyAttackStatus){
            skillUserData[key] = playerAttackStatus[key];
        }
        this.useSkill(skillUserData); //共通のスキル処理
    }
    /* スキル使用(trap) */
    static trapUseSkill(skillId, nowX, nowY){
        // TODO
    }

    /* スキル使用(共通) */
    static useSkill(skillUserData){
        /* スキルデータ取得 */
        const skillId = Number(skillUserData.skillId);
        // Map存在チェック
        if(!this.skillDataMap.has(skillId)){
            // 指定したスキルidのデータがMapにない
            this.addSkillDataMap([skillId]);
            skillData = this.skillDataMap.get(skillId);
        }
        const skillData = this.skillDataMap.get(skillId);

        /* 効果先を設定 */
        switch(skillEffectData.target){
            case "hostility": //スキル使用者から見た敵
                switch(skillUserData.type){
                    case "player":
                        skillEffectData.target = "enemy";
                        break;
                    case "enemy":
                        skillEffectData.target = "player";
                        break;
                }
                break;
            case "ally": //スキル使用者から見た味方
                switch(skillUserData.type){
                    case "player":
                        skillEffectData.target = "Player";
                        break;
                    case "enemy":
                        skillEffectData.target = "enemy";
                        break;
                }
                break;
            default:
                // "all", "player", "enemy"は加工しない
                break;
        }

        /* スキル処理 */
        const scopeArray = this.scopeTypeBranch(skillData.scope); //対象座標の配列を作成
        scopeArray.forEach((attackCoordinate) => { //範囲内のマスに効果を実行
            const skillTakeDataArray = this.skillTakeCheckFindData(attackCoordinate, skillEffectData.target);
            skillTakeDataArray.forEach((skillTakeData) => {
                if(this.effectTypeBranch(skillData.effect ,skillUserData, skillTakeData)){
                // スキル処理を終了する
                return;
                }
            });
        });
    }

    /* 範囲type別に分岐 */
    static scopeTypeBranch(skillScopeData){
        const scopeArray = [];
        switch(skillScopeData.type){
            case "one":
                scopeArray = scopeArray.concat(this.scopeTypeOne(skillScopeData));
                break;
            // TODO 追加する
            default:
                break;
        }
        return scopeArray;
    }

     /* 範囲type別の処理メソッド (one) */
    static scopeTypeOne(skillScopeData){
        const absoluteCoordinate = this.convertRelativeToAbsolute(skillScopeData.x, skillScopeData.y); //攻撃先の絶対座標を取得
        const targetOfAttackX = absoluteCoordinate.x;
        const targetOfAttackY = absoluteCoordinate.y;
        return [{x:targetOfAttackX, y:targetOfAttackY}];
    }

    /* 効果type別に分岐 */
    static effectTypeBranch(skillEffectData, skillUserData, skillTakeData) {
        let isSkillStop = false;
        // 効果内容の分岐
        switch(skillEffectData.type){
            case "normal":
                isSkillStop = this.effectTypeNormal(skillEffectData, skillUserData, skillTakeData);
                break;
            // TODO 追加する
            default:
                break;
        }
        return isSkillStop;
    }

    /* 効果type別の処理 (normal)*/
    static effectTypeNormal(skillEffectData, skillUserData, skillTakeData){
        let isSkillStop = false
        console.log("effectTypeNormal"); //test
        // TODO スキルの処理
        return isSkillStop;
    }

    /* 対象の存在チェックとplayerの防御系ステータスを取得 */
    static skillTakeCheckFindData(attackCoordinate, target){
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

    /* スキル情報をDBから取得してskillDataMapにセットする */
    static addSkillDataMap(skillIdArray = []){
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

    /* 相対座標から絶対座標に変換 相対座標の原点と方向はthisのスキル使用者の値を使用する */
    static convertRelativeToAbsolute(relativeX, relativeY) {
        let absoluteDifferenceX = 0; //絶対座標の変化量x
        let absoluteDifferenceY = 0; //絶対座標の変化量y
        switch(this.skillUserDirection){
            case "up":
                absoluteDifferenceX = relativeX;
                absoluteDifferenceY = relativeY;
                break;
            case "down":
                absoluteDifferenceX = -relativeX;
                absoluteDifferenceY = -relativeY;
                break;
            case "left":
                absoluteDifferenceX = relativeY;
                absoluteDifferenceY = relativeX;
                break;
            case "right":
                absoluteDifferenceX = -relativeY;
                absoluteDifferenceY = -relativeX;
                break;
        }
        const absoluteX = this.skillUserNowX + absoluteDifferenceX;
        const absoluteY = this.skillUserNowY + absoluteDifferenceY;
        return {x:absoluteX, y:absoluteY}
    }

    /*  ダメージ計算 (normal)*/
    static normalDmaageCalc(){
        // TODO
    }
    /* ダメージ計算 (magic) */
    static magicDmaageCalc(){
        //TODO
    }

    /* ダメージ計算 (physics) */
    static physicsDmaageCalc(){
        //TODO
    }
}