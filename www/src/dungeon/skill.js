/* スキルの処理を行う */
class Skill {

    //playerから呼び出し
    //スキル確認
    //スキル実行

    // public
    /**
     * 初期化
     */
    static initialize() {
        this.skillDataMap = new Map();
        this.#skillEndInitialize(); //初期化
        this.skillUseMessegeFunction = () => { };
        this.scopeLayerElement = document.getElementById("scope_layer");
        const scopeElement = document.createElement("div");
        scopeElement.style.position = "absolute";
        scopeElement.style.display = "block";
        scopeElement.style.margin = 0;
        scopeElement.style.height = Config.stageImgHeight;
        scopeElement.style.width = Config.stageImgWidth;
        scopeElement.style.backgroundColor = "red";
        scopeElement.style.opacity = 0.5;
        this.scopeElement = scopeElement;
        this.normalAttackId = "SA0000"; //通常攻撃のスキルid
        this.defaultDirection = "up"; //標準の方向
        this.defaultScopeLength = 20; //スキル範囲作成時の標準最大長
        /* テスト用 */
        this.testSkillId1 = "SA001"; // one attack
        this.testSkillId2 = "SA002"; //line magic
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
    static playerUseSkill(skillId, playerId) {
        //skillUserDataをセット
        const skillUserData = {};
        skillUserData.type = "player";
        skillUserData.playerId = playerId;
        skillUserData.name = Player.getPlayerName(playerId);
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
        // メッセージ表示用関数設定
        this.skillUseMessegeFunction = () => {
            const skillUserName = this.skillUserData.name;
            const skillName = this.skillData[this.skillDataIndex].name;
            Message.useSkillMessage(skillUserName, skillName);
        };
    }

    /**
     * enemyから通常攻撃呼び出し
     */
    static enemyUseNormalAttack(nowX, nowY) {
        this.enemyUseSkill(this.normalAttackId, nowX, nowY);
    }

    /**
     * enemyからスキル呼び出し
     */
    static enemyUseSkill(skillId, nowX, nowY) {
        //skillUserDataをセット
        const skillUserData = {};
        skillUserData.type = "enemy";
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.name = Enemy.getEnemyName(nowX, nowY);
        skillUserData.direction = Enemy.getDirection(nowX, nowY);
        skillUserData.level = Enemy.getEnemyLevel(nowX, nowY);
        const enemyAttackStatus = Enemy.getEnemyAttackStatus(nowX, nowY);
        skillUserData.attackStatus = enemyAttackStatus;
        this.skillUserData = skillUserData;
        // skillDataをセット
        const skillData = this.#setSkillData(skillId);
        this.skillData = skillData;
        // メッセージ表示用関数設定
        this.skillUseMessegeFunction = () => {
            const skillUserName = this.skillUserData.name;
            const skillName = this.skillData[this.skillDataIndex].name;
            Message.useSkillMessage(skillUserName, skillName);
        };
    }

    /**
     * trapからスキル呼び出し
     * スキル使用者のデータをセットする
     */
    static trapUseSkill(skillId, nowX, nowY) {
        //skillUserDataをセット
        const skillUserData = {};
        skillUserData.type = "trap";
        skillUserData.nowX = nowX;
        skillUserData.nowY = nowY;
        skillUserData.direction = Trap.getDirection(nowX, nowY);
        skillUserData.level = Trap.getLevel(nowX, nowY);
        this.skillUserData = skillUserData;
        // skillDataをセット
        const skillData = this.#setSkillData(skillId);
        this.skillData = skillData;
        // メッセージ表示用関数設定(表示しない)
        this.skillUseMessegeFunction = () => { };
    }

    /**
     * itemからスキル呼び出し
     * アイテムを使用するplayerIdで設定する
     */
    static itemUseSkill(skillId, playerId) {
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
        this.skillData = skillData;
        // メッセージ表示用関数設定(表示しない)
        this.skillUseMessegeFunction = () => { };
    }

    /**
     * スキル準備
     */
    static skillReady() {
        //useSkillからデータ受け取りと初期化
        const skillData = this.skillData;
        if (skillData.length <= 0) {
            //データエラー
            return 'player';
        }
        const nowSkillData = skillData[this.skillDataIndex]; //メインのスキルデータを取得する
        // scopeで分岐する関数を設定
        const scopeUseFunctionMap = this.#scopeBranch(nowSkillData.scope);
        const createTargetCoordinateArrayFunction = scopeUseFunctionMap.get("createTargetCoordinateArray");
        // targetCoordinateArrayとeffectDisplayArray作成
        const resultArray = createTargetCoordinateArrayFunction(nowSkillData.scope);
        const targetCoordinateArray = resultArray.shift(); // 配列の先頭の要素を取得と削除
        const scopeEffectDisplayArray = resultArray.shift();
        // スキル座標を設定する
        if (skillData.skillId === this.normalAttackId) { //通常攻撃の場合は準備をスキップする
            // skillGoに渡すデータをクラス変数に設定する
            this.targetCoordinateArray = targetCoordinateArray;
            this.scopeEffectDisplayArray = scopeEffectDisplayArray;
            this.skillData = skillData;
            this.nowSkillData = nowSkillData;
            return 'skillGo';
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
        this.scopeEffectDisplayArray = scopeEffectDisplayArray;
        this.skillData = skillData;
        this.nowSkillData = nowSkillData;
        return 'skillGo';
    }

    /**
     * スキル使用
     */
    static skillGo() {
        /* useSkill, skillReadyからのデータ取得と初期化 */
        const nowSkillData = this.nowSkillData;
        const targetCoordinateArray = this.targetCoordinateArray;
        const scopeEffectDisplayArray = this.scopeEffectDisplayArray;
        this.nowSkillData = []; //new
        this.targetCoordinateArray = []; //new
        this.scopeEffectDisplayArray = []; //new
        /* スキル使用メッセージ表示 */
        this.skillUseMessegeFunction();
        this.skillUseMessegeFunction = () => { }; //2回目以降は表示しない
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
        const targetedEnemyNameSet = new Set(); //スキル効果が同じenemyに複数回当たらないようにするために使用する
        let continueCount = nowSkillData.effect.length;
        // 範囲エフェクト表示
        const scopeEffectId = nowSkillData.scope.scopeEffectId;
        if (scopeEffectId !== undefined) {
            // scopeEffectの設定がある場合は表示する
            Effect.scopeEffectDisplay(scopeEffectId, scopeEffectDisplayArray);
        }
        // ターゲットエフェクト準備
        const effectReadyKeyArray = [];
        nowSkillData.effect.forEach((effectData) => {
            const targetEffectId = effectData.targetEffectId;
            if (targetEffectId !== undefined) {
                //targetEffectの設定がある場合は準備する
                const readyKey = Effect.targetEffectReady(targetEffectId);
                effectReadyKeyArray.push(readyKey);
            } else {
                //設定がない場合はkeyにnullを設定する
                effectReadyKeyArray.push(null);
            }
        });
        // 効果実行
        for (const coordinate of targetCoordinateArray) {
            if (continueCount <= 0) {
                // 継続数が0以下の場合は終了する
                break;
            }
            const isTargetEnemy = checkEnemyFunction(coordinate);
            const isTargetPlayer = checkPlayerFunction(coordinate);
            if (!isTargetEnemy && !isTargetPlayer) {
                // 該当座標にターゲットが存在しない場合はスキップする
                continue;
            }
            let enemyDefenceStatus = {};
            let playerDefenceStatus = {};
            let playerId = "";
            if (isTargetEnemy) {
                //enemyの重複チェック
                const enemyName = Enemy.getEnemyName(coordinate.x, coordinate.y);
                if(targetedEnemyNameSet.has(enemyName)){
                    // 存在する場合はスキル効果発動済みなのでスキップする
                    continue;
                }else{
                    // 存在しない場合はsetに追加する
                    targetedEnemyNameSet.add(enemyName);
                }
                enemyDefenceStatus = getEnemyDefenceStatusFunction(coordinate);
            } else if (isTargetPlayer) {
                playerId = Player.getPlayerId(coordinate.x, coordinate.y);
                playerDefenceStatus = getPlayerDefenceStatusFunction(playerId);
            }
            nowSkillData.effect.forEach((effectData, index) => {
                // 効果を順に実行する
                if (isSkillEnd[index]) {
                    // スキップ
                    return;
                }
                // ターゲットエフェクトを表示する
                const effectReadyKey = effectReadyKeyArray[index];
                if (effectReadyKey !== null) {
                    // 設定がある場合は表示する
                    const effectCoordinate = this.#convertAbsoluteToRelative(coordinate.x, coordinate.y);
                    effectCoordinate.direction = this.skillUserData.direction;
                    // TODO enemyからサイズを取得してする
                    Effect.targetEffectDisplay(effectReadyKey, [effectCoordinate]);
                }
                // 計算とスキル効果反映
                switch (true) {
                    case (isTargetEnemy):
                        // enemyがターゲットの処理
                        const enemyStatusFluctuation = calcFunctionFunctionArray[index](effectData, enemyDefenceStatus);
                        enemyStatusFluctuationFunctionArray[index](coordinate, enemyStatusFluctuation);
                        break;
                    case (isTargetPlayer):
                        // playerがターゲットの処理
                        const playerStatusFluctuation = calcFunctionFunctionArray[index](effectData, playerDefenceStatus);
                        playerStatusFluctuationFunctionArray[index](playerId, playerStatusFluctuation);
                        break;
                    default:
                        // エラー
                        return;
                }
                effectData.hits = effectData.hits - 1;
                if (effectData.hits <= 0) {
                    isSkillEnd[index] = true;
                    continueCount = continueCount - 1;
                }
            });
        }
        // ターゲットエフェクトの終了処理
        effectReadyKeyArray.forEach((readyKey) => {
            if (readyKey !== null) {
                //エフェクト準備情報を削除する
                Effect.endEffectDisplay(readyKey);
            }
        });

        // サブスキル処理
        this.#nextSkillExecute();

        /* スキル終了処理 */
        this.#skillEndInitialize();
    }

    // private
    /* スキル終了時の初期化 */
    static #skillEndInitialize() {
        this.skillUserData = {};
        this.skillData = {};
        this.skillDataIndex = 0;
        this.scopeArray = [];
    }

    /* スキルデータをセットする */
    static #setSkillData(skillId) {
        //Mapからスキルデータを取得する
        if (!this.skillDataMap.has(skillId)) {
            // 指定したスキルidのデータがMapにない場合は取得して設定する
            this.#addSkillDataMap([skillId]);
        }
        const skillData = Tool.deepCopy(this.skillDataMap.get(skillId));
        skillData.skillId = skillId;
        //スキルデータを加工する
        skillData.forEach((nowSkillData) => {
            nowSkillData.effect.forEach((effectData) => {
                //skillData.effectのtargetを絶対targetにする
                switch (effectData.target) {
                    case "hostility": //スキル使用者から見た敵
                        switch (this.skillUserData.type) {
                            case "player":
                                effectData.target = "enemy";
                                break;
                            case "enemy":
                                effectData.target = "player";
                                break;
                            case "trap":
                                effectData.target = "player";
                                break;
                            case "item":
                                effectData.target = "enemy";
                                break;
                        }
                        break;
                    case "ally": //スキル使用者から見た味方
                        switch (this.skillUserData.type) {
                            case "player":
                                effectData.target = "Player";
                                break;
                            case "enemy":
                                effectData.target = "enemy";
                                break;
                            case "trap":
                                effectData.target = "enemy";
                                break;
                            case "item":
                                effectData.target = "player";
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
    static #addSkillDataMap(skillIdArray = []) {
        /* 開発用にデータをセット 指定したスキルidに一つ上のマスの敵に攻撃するスキルを設定*/
        skillIdArray.forEach((skillId) => {
            let skillData;
            switch (skillId) {
                case this.normalAttackId: //normal
                    //通常攻撃
                    skillData = [{ name: "通常攻撃", scope: { type: "one", x: 0, y: -1, direction: "up", rotation: true }, effect: [{ type: "normal", target: "hostility", hits: "all", targetEffectId: "TE000" }] }];
                    break;
                case this.testSkillId1: //one
                    //テストスキル1
                    skillData = [{ name: "スキル1", scope: { type: "one", x: 0, y: -1, direction: "up", rotation: true, scopeEffectId: "SE001" }, effect: [{ type: "attack", target: "hostility", hits: "all", magnification: 2, targetEffectId: "TE001" }] }];
                    break;
                case this.testSkillId2: //line
                    //テストスキル2
                    skillData = [{ name: "スキル2", scope: { type: "line", x: 0, y: -1, direction: "up", rotation: true, padding: 1, length: 10, scopeEffectId: "SE002" }, effect: [{ type: "magic", target: "hostility", hits: "all", constantValue: 2, targetEffectId: "TE002" }] }];
                    break;
                default:
                    //テスト用の通常攻撃
                    skillData = [{ name: "デフォルト", scope: { type: "one", x: 0, y: -1, direction: "up", rotation: true, scopeEffectId: "SE000" }, effect: [{ type: "normal", target: "hostility", hits: 1, targetEffectId: "TE000" }] }];
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
    static #scopeBranch(scope) {
        const functionMap = new Map();
        switch (scope.type) {
            case "one":
                // TODO ターゲット座標配列作成
                const typeOne = (scopeData) => {
                    // 基準点設定
                    const afterDirection = this.skillUserData.direction;
                    const baseCoordinate = {};
                    baseCoordinate.x = scopeData.x;
                    baseCoordinate.y = scopeData.y;
                    if (scopeData.rotation) {
                        // 座標回転
                        const rotatedTargetCoordinateArray = this.#rotatetargetCoordinateArray([baseCoordinate], scopeData.direction, afterDirection);
                        const absoluteCoordinate = this.#convertRelativeToAbsolute(rotatedTargetCoordinateArray[0].x, rotatedTargetCoordinateArray[0].y);
                        baseCoordinate.x = absoluteCoordinate.x;
                        baseCoordinate.y = absoluteCoordinate.y;
                    }
                    // 効果先座標の配列とエフェクト表示の配列を作成
                    const targetCoordinateArray = [];
                    const effectDisplayArray = [];
                    if (!this.#isInCoordinateRange(baseCoordinate.x, baseCoordinate.y)) {
                        // 座標がステージ範囲外の場合は除外する
                        return [targetCoordinateArray, effectDisplayArray];
                    }
                    if (!Stage.isFloor(baseCoordinate.x, baseCoordinate.y)) {
                        // 座標が床ではない場合は除外する
                        return [targetCoordinateArray, effectDisplayArray];
                    }
                    targetCoordinateArray.push(baseCoordinate);
                    const effectDisplayArrayItem = this.#convertAbsoluteToRelative(baseCoordinate.x, baseCoordinate.y);
                    effectDisplayArrayItem.direction = afterDirection;
                    effectDisplayArrayItem.length = 0;
                    effectDisplayArray.push(effectDisplayArrayItem);
                    return [targetCoordinateArray, effectDisplayArray];
                }
                functionMap.set("createTargetCoordinateArray", typeOne);
                break;
            case "line":
                const typeLine = (scopeData) => {
                    // 基準点を設定する
                    const afterDirection = this.skillUserData.direction;
                    const baseCoordinate = {};
                    baseCoordinate.x = scopeData.x;
                    baseCoordinate.y = scopeData.y;
                    if (scopeData.direction !== this.defaultDirection) {
                        // 基準をデフォルトの方向に回転する
                        const rotatedTargetCoordinateArray = this.#rotatetargetCoordinateArray([baseCoordinate], scopeData.direction, this.defaultDirection); // TODO チェックする
                        const relativeCoordinate = this.#convertRelativeToAbsolute(rotatedTargetCoordinateArray[0].x, rotatedTargetCoordinateArray[0].y);
                        baseCoordinate.x = relativeCoordinate.x;
                        baseCoordinate.y = relativeCoordinate.y;
                        scopeData.direction = this.defaultDirection;
                    }
                    // 各列の基準点を設定する
                    const lineWidth = scopeData.padding * 2 + 1
                    const baseCoordinateArray = [];
                    for (let index = 0; index < lineWidth; index++) {
                        const coordinate = {};
                        if (index % 2 === 0) {
                            //indexが偶数
                            coordinate.x = baseCoordinate.x - Math.floor(index / 2);
                            coordinate.y = baseCoordinate.y;
                            baseCoordinateArray.push(coordinate);
                        } else {
                            //indexが奇数
                            coordinate.x = baseCoordinate.x + Math.ceil(index / 2);
                            coordinate.y = baseCoordinate.y;
                            baseCoordinateArray.push(coordinate);
                        }
                    }
                    // 基準点をplayerの向きに回転する
                    const coordinateArray = new Array(lineWidth); // [0[], +1[], -1[], +2[], -2[], ...]
                    if (afterDirection !== scopeData.direction) {
                        const rotatedBaseCoordinateArray = this.#rotatetargetCoordinateArray(baseCoordinateArray, scopeData.direction, afterDirection);
                        rotatedBaseCoordinateArray.forEach((coordinate, index) => {
                            coordinateArray[index] = [coordinate];
                        });
                        scopeData.direction = afterDirection;
                    } else {
                        baseCoordinateArray.forEach((coordinate, index) => {
                            coordinateArray[index] = [coordinate];
                        });
                    }
                    // 関数準備
                    let increaseFunction = () => { };
                    switch (afterDirection) {
                        case "up":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x;
                                nextCoordinate.y = coordinate.y - 1;
                                return nextCoordinate;
                            };
                            break;
                        case "down":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x;
                                nextCoordinate.y = coordinate.y + 1;
                                return nextCoordinate;
                            };
                            break;
                        case "right":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x + 1;
                                nextCoordinate.y = coordinate.y;
                                return nextCoordinate;
                            };
                            break;
                        case "left":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x - 1;
                                nextCoordinate.y = coordinate.y;
                                return nextCoordinate;
                            };
                            break;
                        case "leftup":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x - 1;
                                nextCoordinate.y = coordinate.y - 1;
                                return nextCoordinate;
                            };
                            break;
                        case "rightup":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x + 1;
                                nextCoordinate.y = coordinate.y - 1;
                                return nextCoordinate;
                            };
                            break;
                        case "rightdown":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x + 1;
                                nextCoordinate.y = coordinate.y + 1;
                                return nextCoordinate;
                            };
                            break;
                        case "leftdown":
                            increaseFunction = (coordinate) => {
                                const nextCoordinate = {};
                                nextCoordinate.x = coordinate.x - 1;
                                nextCoordinate.y = coordinate.y + 1;
                                return nextCoordinate;
                            };
                            break;
                        default:
                            // エラー
                            return [];
                    }
                    // 効果先座標の配列とエフェクト表示の配列を作成する
                    const targetCoordinateArray = [];
                    const effectDisplayArray = [];
                    coordinateArray.forEach((oneLineArray) => {
                        //配列の最後の座標を評価
                        const absoluteCoordinate = this.#convertRelativeToAbsolute(oneLineArray[0].x, oneLineArray[0].y);
                        if (!this.#isInCoordinateRange(absoluteCoordinate.x, absoluteCoordinate.y)) {
                            //範囲外
                            oneLineArray = [targetCoordinateArray, effectDisplayArray];
                            return;
                        }
                        if (!Stage.isFloor(absoluteCoordinate.x, absoluteCoordinate.y)) {
                            //床でない
                            oneLineArray = [targetCoordinateArray, effectDisplayArray];
                            return;
                        }
                        oneLineArray[0] = absoluteCoordinate;
                        targetCoordinateArray.push(absoluteCoordinate);
                        const effectDisplayArrayItem = this.#convertAbsoluteToRelative(absoluteCoordinate.x, absoluteCoordinate.y);
                        effectDisplayArrayItem.direction = afterDirection;
                        let effectLengthCount = 0;
                        for (let i = 0; i < scopeData.length; i++) {
                            // 列の座標を作成
                            const lastCoordinate = oneLineArray[i];
                            const nextCoordinate = increaseFunction(lastCoordinate);
                            if (!this.#isInCoordinateRange(nextCoordinate.x, nextCoordinate.y)) {
                                // 座標範囲外
                                break;
                            }
                            if (!Stage.isFloor(nextCoordinate.x, nextCoordinate.y)) {
                                // 床ではない
                                break;
                            }
                            oneLineArray.push(nextCoordinate);
                            effectLengthCount++;
                        }
                        effectDisplayArrayItem.length = effectLengthCount;
                        effectDisplayArray.push(effectDisplayArrayItem);
                        effectLengthCount = 0;
                    });
                    // 座標の配列を作成
                    let indexCount = 0;
                    let continueCount = lineWidth;
                    while (continueCount > 0) {
                        continueCount = lineWidth;
                        indexCount++;
                        for (let i = 0; i < lineWidth; i++) {
                            if (!coordinateArray[i][indexCount]) {
                                //配列の要素が存在しない
                                continueCount = continueCount - 1;
                                continue;
                            }
                            targetCoordinateArray.push(coordinateArray[i][indexCount]);
                        }
                    }
                    return [targetCoordinateArray, effectDisplayArray];
                };
                functionMap.set("createTargetCoordinateArray", typeLine);
                break;
            // TODO タイプを追加する
            default:
                //エラー
                functionMap.set("createTargetCoordinateArray", () => { });
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
    static #effectBranch(effect) {
        const functionMap = new Map();
        // 防御ステータスをすべて取得するように関数を設定する
        const getPlayerDefenseStatus = (playerId) => {
            const defenseStatus = Player.getPlayerDefenseStatus(playerId);
            return defenseStatus;
        };
        functionMap.set("getPlayerDefenseStatus", getPlayerDefenseStatus);

        const getEnemyDefenceStatus = (coordinate) => {
            const defenseStatus = Enemy.getEnemyDefenceStatus(coordinate.x, coordinate.y);
            return defenseStatus;
        };
        functionMap.set("getEnemyDefenceStatus", getEnemyDefenceStatus);

        let isTargetPlayer = false;
        let isTargetEnemy = false;
        const calcFunctionArray = [];
        const playerStatusFluctuationFunctionArray = [];
        const enemyStatusFluctuationFunctionArray = [];
        effect.forEach((effectElement) => {
            switch (effectElement.type) {
                case "normal": // 通常攻撃
                    // 計算関数設定
                    const normalCalc = (effectData, defenseStatus) => {
                        const atk = this.skillUserData.attackStatus.atk;
                        const def = defenseStatus.def;
                        const damage = this.#normalDamageCalc(atk, def);
                        return { hp: -damage };
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
                case "attack": // 物理攻撃
                    // TODO 計算関数設定
                    const attackCalc = (effectData, defenseStatus) => {
                        const level = this.skillUserData.level;
                        const magnification = effectData.magnification;
                        const damage = this.#attackDamageCalc(level, magnification);
                        return { hp: -damage };
                    };
                    calcFunctionArray.push(attackCalc);
                    // ステータス更新関数設定
                    const attackPlayerStatusFluctuation = (playerId, statusFluctuation) => {
                        Player.playerHpFluctuation(playerId, statusFluctuation.hp);
                    };
                    playerStatusFluctuationFunctionArray.push(attackPlayerStatusFluctuation);
                    const attackEnemyStatusFluctuation = (coordinate, statusFluctuation) => {
                        Enemy.enemyHpFluctuation(coordinate.x, coordinate.y, statusFluctuation.hp);
                    };
                    enemyStatusFluctuationFunctionArray.push(attackEnemyStatusFluctuation);
                    break;
                case "magic": // 魔法攻撃
                    // 計算関数設定
                    const magicCalc = (effectData, defenseStatus) => {
                        const atk = this.skillUserData.attackStatus.atk;
                        const def = defenseStatus.def;
                        const normalDamage = this.#normalDamageCalc(atk, def);
                        const constantValue = effectData.constantValue;
                        const damage = this.#magicDamageCalc(normalDamage, constantValue);
                        return { hp: -damage };
                    };
                    calcFunctionArray.push(magicCalc);
                    // ステータス更新関数設定
                    const magicPlayerStatusFluctuation = (playerId, statusFluctuation) => {
                        Player.playerHpFluctuation(playerId, statusFluctuation.hp);
                    };
                    playerStatusFluctuationFunctionArray.push(magicPlayerStatusFluctuation);
                    const magicEnemyStatusFluctuation = (coordinate, statusFluctuation) => {
                        Enemy.enemyHpFluctuation(coordinate.x, coordinate.y, statusFluctuation.hp);
                    };
                    enemyStatusFluctuationFunctionArray.push(magicEnemyStatusFluctuation);
                    break;
                // TODO 種類を追加する
                default:
                    //エラー
                    calcFunctionArray.push(() => { });
                    playerStatusFluctuationFunctionArray.push(() => { });
                    enemyStatusFluctuationFunctionArray.push(() => { });
                    break;

            }

            switch (effectElement.target) {
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
        if (isTargetPlayer) {
            // playerがターゲットの場合
            const checkPlayer = (coordinate) => {
                const isPlayer = Player.isPlayerExistence(coordinate.x.coordinate.y)
                return isPlayer;
            };
            functionMap.set("checkPlayer", checkPlayer);
        } else {
            // playerがターゲットでない場合
            const noCheckPlayer = () => {
                return false;
            };
            functionMap.set("checkPlayer", noCheckPlayer);
        }
        if (isTargetEnemy) {
            // enemyがターゲットの場合
            const checkEnemy = (coordinate) => {
                const isEnemy = Enemy.checkEnemy(coordinate.x, coordinate.y)
                return isEnemy;
            };
            functionMap.set("checkEnemy", checkEnemy);
        } else {
            // enemyがターゲットでない場合
            const noCheckEnemy = () => {
                return false;
            };
            functionMap.set("checkEnemy", noCheckEnemy);
        }
        return functionMap;
    }

    /* スキルの次の効果を実行する */
    static #nextSkillExecute() {
        this.skillDataIndex = this.skillDataIndex + 1;
        if (this.skillDataIndex >= this.skillData.length) {
            // データがない場合は終了
            return;
        }
        this.skillReady();
        this.skillGo();
    }

    /* スキル対象相対座標のリストを方向に回転する */
    static #rotatetargetCoordinateArray(targetCoordinateArray, nowDirection, nextDirection) {
        // 方向を数字(0~360)に変換する
        let nowAngle = 0;
        switch (nowDirection) {
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
        switch (nextDirection) {
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
        while (rotateAngle > 0) {
            if (rotateAngle >= 180) {
                rotatedTargetCoordinateArray = this.#rotateOneHalf(rotatedTargetCoordinateArray);// 180°回転
                rotateAngle -= 180;
            } else if (rotateAngle >= 90) {
                rotatedTargetCoordinateArray = this.#rotateOneQuarter(rotatedTargetCoordinateArray);// 90°回転
                rotateAngle -= 90;
            } else {
                rotatedTargetCoordinateArray = this.#rotateOneEighth(rotatedTargetCoordinateArray);// 45°回転
                rotateAngle -= 45;
            }
        }
        return rotatedTargetCoordinateArray;
    }

    /* スキル範囲を右に45°回転する */
    static #rotateOneEighth(targetCoordinateArray) {
        const rotatedTargetCoordinateArray = [];
        targetCoordinateArray.forEach((relativeCoordinate) => {
            let nowX = relativeCoordinate.x;
            let nowY = relativeCoordinate.y;
            const range = Math.max(Math.abs(nowX), Math.abs(nowY));
            for (let i = 0; i < range; i++) {
                switch (true) {
                    case (-range <= nowX && nowX < range && nowY === -range):
                        // x+方向に移動
                        nowX += 1;
                        break;
                    case (nowX === range && -range <= nowY && nowY < range):
                        // y+方向に移動
                        nowY += 1;
                        break;
                    case (range >= nowX && nowX > -range && nowY === range):
                        // x-方向に移動
                        nowX -= 1;
                        break;
                    case (nowX === -range && range >= nowY && nowY > -range):
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
    static #rotateOneQuarter(targetCoordinateArray) {
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
    static #rotateOneHalf(targetCoordinateArray) {
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
        return { x: absoluteX, y: absoluteY }
    }

    /* ステージの絶対座標からスキル使用者を原点とする相対座標に変換する */
    static #convertAbsoluteToRelative(absoluteX, absoluteY) {
        const relativeX = absoluteX - this.skillUserData.nowX;
        const relativeY = absoluteY - this.skillUserData.nowY;
        return { x: relativeX, y: relativeY }
    }

    /* 座標の範囲をチェックする */
    static #isInCoordinateRange(x, y) {
        if (x === null || y === null) {
            //nullの場合
            return false;
        }
        if (0 < x < Config.stageRows && 0 < y < Config.stageCols) {
            //範囲内の場合
            return true;
        }
        return false;
    }

    /*  ダメージ計算 (normal)*/
    static #normalDamageCalc(atk, def) {
        //攻撃力(*補助系)/２ー守備力(*補助系)/４
        const damage = atk / 2 - def / 4;
        const integerDamage = Math.round(damage); //四捨五入で整数にする
        return integerDamage;
    }

    /* ダメージ計算 (magic) */
    static #magicDamageCalc(level, constantValue) {
        // レベル * 固定値
        const damage = level * constantValue;
        const integerDamage = Math.round(damage); //四捨五入で整数にする
        return integerDamage;
    }

    /* ダメージ計算 (attack) */
    static #attackDamageCalc(normalDamage, magnification) {
        // 通常攻撃 * スキル倍率
        const damage = normalDamage * magnification;
        const integerDamage = Math.round(damage); //四捨五入で整数にする
        return integerDamage;
    }
}