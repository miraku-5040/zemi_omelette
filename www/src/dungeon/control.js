class Control{

    static pressedKeyStatus; //キーボード入力のフラグ
    static longPressKeyStatus; //キーボード入力長押しのフラグ
    //同時押しはキャンセルする
    static initialize () {
        this.itemListIndex = 99;
        this.arrow();
        /* 共通データ */
        //new 入力状態更新関数動作フラグ
        this.isUpdateRun = false;
        //new 入力を更新・確認する間隔時間(ms)
        this.checkInterval = 100;
        //new 入力中フラグ
        this.inputReadFlag = false;
        //new 入力開始フラグ
        this.inputStartFlag = false;
        //new 入力終了フラグ
        this.inputEndFlag = false;
        // new 長押し判定の入力時間(ms)
        this.longPressCount = 300;
        //new 長押しで入力を返却する時間(ms)
        this.longPressReturnTime = 500;
        //delete 入力中のkeyNameを持つset
        this.pressedKeySet = new Set();
        //new timeoutIdのマップ [keyName:timeoutId]
        this.timeoutIdMap = new Map();
        /* キーボード入力データ */
        //new キーボードの入力数を保持するmap [keyName:count]       
        this.pressedKeyCountMap = new Map();
        /* マウス入力データ */
        //new マウスクリックのデータ
        this.clickMouse = {};
        this.clickMouse.isClick = false;
        this.clickMouse.targetId = "";
        this.clickMouse.count = 0;
        this.clickMouse.timeoutId = "";
        /* ゲーム入力用データ */
        //new ゲームキーマップ TODO 追加 [keyName:gameKeyName]
        this.gameKeyMap = this.#createGameKeyMap();
        //new 長押しゲームキーマップ TODO 追加 [keyName:longGameKeyName]
        this.longPressGameKeyMap = this.#createLongPressGameKeyMap();
        //new ゲーム入力 {gameKeyName:isPress}
        this.pressedGameKeyStatus = {};
        //new ゲーム入力同時押しキーマップ [afterKeyName:[keyName1, keyName2...]]
        this.pressSimultaneouslyKeyMap = this.#createPressSimultaneouslyKeyMap(); //実装時に修正する
        /* イベントリスナー */
        // ブラウザのキーボードの入力を取得するイベントリスナを登録する
        document.addEventListener('keydown', (e) => {
            // キーボードが押された場合
            e.preventDefault();
            const keyName = e.key;
            if(!this.pressedKeyCountMap.has(keyName)){
                this.pressedKeyCountMap.set(keyName, 0);
                if(!this.isUpdateRun){
                    // 入力取得を動かす
                    this.#updatepressedKey();
                }
            }
        });
        document.addEventListener('keyup', (e) => {
            // キーボードが離された場合
            const keyName = e.key;
            this.pressedKeyCountMap.delete(keyName);
            if(this.timeoutIdMap.has(keyName)){
                clearTimeout(this.timeoutIdMap.get(keyName));
                this.timeoutIdMap.delete(keyName);
            }
            if(this.inputReadFlag && this.timeoutIdMap.size <= 0){
                // 押しているキーがない場合は入力を終了する
                this.inputEndFlag = true;
            }
        });
        // マウスの入力を取得するイベントリスナーを登録する
        document.addEventListener('mousedown', (e) => {
            // マウスが押された場合
            const elementId = e.target.id;
            if(elementId === ""){
                // クリック先がボタンではない場合
                return;
            }
            this.clickMouse.count = 0;
            this.clickMouse.isClick = true;
            this.clickMouse.targetId = elementId;
            this.#updateClickMouse();
        });
        document.addEventListener('mouseup', (e) => {
            // マウスが離された場合
            this.clickMouse.isClick = false;
            if(this.clickMouse.timeoutId !== ""){
                clearTimeout(this.clickMouse.timeoutId);
                this.clickMouse.timeoutId = "";
            }
            this.inputEndFlag = true;
        });
        //タッチの入力を取得するイベントリスナー
        document.addEventListener('touchstart', (e) => {
            // TODO タッチ操作
            e.preventDefault();
            const elementId = e.target.id;
            if(elementId === ""){
                // クリック先がボタンではない場合
                return;
            }
            this.clickMouse.count = 0;
            this.clickMouse.isClick = true;
            this.clickMouse.targetId = elementId;
            this.#updateClickMouse();
        });
    }

     /**
     * プレイヤー入力の操作を取得する
     */
    static async getPlayingKeyStatus(){
        const inputArray = await this.#getGameKeyStatus();
        let inputKey = "";
        if(inputArray.length > 0){
            inputKey = inputArray[0]; //TODO キーの優先度制御を追加する
        }
        // TODO 入力用に加工する
        return inputKey;
    }

    /* ゲームキーマップ作成 */
    static #createGameKeyMap(){
        const gameKeyMap = new Map();
        /* key */
        gameKeyMap.set("1", "leftdown");
        gameKeyMap.set("2", "down");
        gameKeyMap.set("3", "rightdown");
        gameKeyMap.set("4", "left");
        gameKeyMap.set("5", "num5");
        gameKeyMap.set("6", "right");
        gameKeyMap.set("7", "leftup");
        gameKeyMap.set("8", "up");
        gameKeyMap.set("9", "rightup");
        gameKeyMap.set("q", "attack");
        gameKeyMap.set("w", "defence");
        gameKeyMap.set("e", "skill");
        gameKeyMap.set("r", "item");
        /* display */
        gameKeyMap.set("arrow1", "leftdown");
        gameKeyMap.set("arrow2", "down");
        gameKeyMap.set("arrow3", "rightdown");
        gameKeyMap.set("arrow4", "left");
        gameKeyMap.set("arrow6", "right");
        gameKeyMap.set("arrow7", "leftup");
        gameKeyMap.set("arrow8", "up");
        gameKeyMap.set("arrow9", "rightup");
        gameKeyMap.set("attack", "attack");
        gameKeyMap.set("skill", "skill");
        gameKeyMap.set("item", "item");
        gameKeyMap.set("defence", "defence");
        // TODO 追加する
        return gameKeyMap;
    }

    /* ゲームキーマップ追加 */
    static #addGameKeyMap(key, gameKey){
        this.gameKeyMap.set(key, gameKey);
    }

    /* 長押しゲームキーマップ作成 */
    static #createLongPressGameKeyMap(){
        const longPressGameKeyMap = new Map();
        longPressGameKeyMap.set("1", "longleftdown");
        longPressGameKeyMap.set("2", "longdown");
        longPressGameKeyMap.set("3", "longrightdown");
        longPressGameKeyMap.set("4", "longleft");
        longPressGameKeyMap.set("5", "longnum5");
        longPressGameKeyMap.set("6", "longright");
        longPressGameKeyMap.set("7", "longleftup");
        longPressGameKeyMap.set("8", "longup");
        longPressGameKeyMap.set("9", "longrightup");
        longPressGameKeyMap.set("arrow1", "longleftdown");
        longPressGameKeyMap.set("arrow2", "longdown");
        longPressGameKeyMap.set("arrow3", "longrightdown");
        longPressGameKeyMap.set("arrow4", "longleft");
        longPressGameKeyMap.set("arrow6", "longright");
        longPressGameKeyMap.set("arrow7", "longleftup");
        longPressGameKeyMap.set("arrow8", "longup");
        longPressGameKeyMap.set("arrow9", "longrightup");
        // TODO 追加する
        return longPressGameKeyMap;
    }

    /* 長押しゲームキーマップ追加 */
    static #addLongPressGameKeyMap(key, gameKey){
        this.longPressGameKeyMap.set(key, gameKey);
    }

    /* TODO 未実装 同時押しゲームキーマップ作成 */
    static #createPressSimultaneouslyKeyMap() {
        const pressSimultaneouslyKeyMap = new Map();
        pressSimultaneouslyKeyMap.set("leftdown", ["left", "down"]);
        pressSimultaneouslyKeyMap.set("rightdown", ["right", "down"]);
        pressSimultaneouslyKeyMap.set("leftup", ["left", "up"]);
        pressSimultaneouslyKeyMap.set("rightup", ["right", "up"]);
        pressSimultaneouslyKeyMap.set("longleftdown", ["longleft", "longdown"]);
        pressSimultaneouslyKeyMap.set("longrightdown", ["longright", "longdown"]);
        pressSimultaneouslyKeyMap.set("longleftup", ["longleft", "longup"]);
        pressSimultaneouslyKeyMap.set("longrightup", ["longright", "longup"]);
    }

    /* キー入力カウント・ゲーム入力更新 this.checkIntervalごとに呼び出す */
    static #updatepressedKey(){
        if(this.pressedKeyCountMap.size <= 0){
            // キー入力がない場合は更新終了
            this.isUpdateRun = false;
            return;
        }
        this.pressedKeyCountMap.forEach((count, keyName) => {
            count++;
            this.pressedKeyCountMap.set(keyName, count);
            if(!this.inputReadFlag){
            //読み取り中ではない場合は処理スキップ
            return;
            }
            this.inputStartFlag = true;
            if(!this.inputEndFlag && !this.timeoutIdMap.has(keyName)){
                const timeoutId = setTimeout((keyName) => {
                    this.timeoutIdMap.delete(keyName);
                    this.inputEndFlag = true;
                }, this.longPressReturnTime, keyName);
                this.timeoutIdMap.set(keyName, timeoutId);
            }
            let gameKey = this.gameKeyMap.get(keyName);
            if(count >= Math.floor(this.longPressCount / this.checkInterval)){
            //長押しの場合
            const longGameKey = this.longPressGameKeyMap.get(keyName);
            if(longGameKey !== undefined){
                // 長押しのキーが設定されている場合は入力内容を更新する
                this.pressedGameKeyStatus[gameKey] = false;
                gameKey = longGameKey;
            }
        }
        this.pressedGameKeyStatus[gameKey] = true;
        });
        setTimeout(() => {this.#updatepressedKey()}, this.checkInterval);
    }

    /* クリック入力カウント・ゲーム入力更新 this.checkIntervalごとに呼び出す */
    static #updateClickMouse(){
        if(!this.clickMouse.isClick){
            //クリック中ではない場合は終了する
            return;
        }
        this.clickMouse.count++;
        if(this.inputReadFlag){
            //読み取り中ではない場合は処理スキップ
            this.inputStartFlag = true;
            const keyName = this.clickMouse.targetId;
            if(!this.inputEndFlag && this.clickMouse.timeoutId === ""){
                const timeoutId = setTimeout(() => {
                    this.clickMouse.timeoutId = "";
                    this.inputEndFlag = true;
                }, this.longPressReturnTime);
                this.clickMouse.timeoutId = timeoutId;
            }
            let gameKey = this.gameKeyMap.get(keyName);
            if(this.clickMouse.count >= Math.floor(this.longPressCount / this.checkInterval)){
                //長押しの場合
                const longGameKey = this.longPressGameKeyMap.get(keyName);
                if(longGameKey !== undefined){
                    // 長押しのキーが設定されている場合は入力内容を更新する
                    this.pressedGameKeyStatus[gameKey] = false;
                    gameKey = longGameKey;
                }
            }
            this.pressedGameKeyStatus[gameKey] = true;
        }
        setTimeout(() => {this.#updateClickMouse()}, this.checkInterval);
    }

    /**
     * キー取得
     */
    static async #getGameKeyStatus(){
        this.#resetPressedGameKeyStatus();
        await this.#inputEndCheck();
        const pressedKeyArray = this.#getPressedGameKeyStatus();
        return pressedKeyArray;
    }

    /* TODO ゲームキーステータスリセット */
    static #resetPressedGameKeyStatus(){
        this.pressedGameKeyStatus = {};
        this.inputEndFlag = false;
    }

    /* ok ゲームキーステータス取得 */
    static #getPressedGameKeyStatus(){
        const pressedKeyArray = [];
        if(undefined in this.pressedGameKeyStatus){
            //キーundefinedが存在する場合は削除する
            delete this.pressedGameKeyStatus.undefined;
        }
        for(const key in this.pressedGameKeyStatus){
            if(this.pressedGameKeyStatus[key]){
                //キーが押されている場合
                pressedKeyArray.push(key);
            }
        }
        // TODO 同時押しチェック
        return pressedKeyArray;
    }

    /* inputEndFlagチェック */
    static async #inputEndCheck(){
        this.inputReadFlag = true;
        while(!this.inputEndFlag){
            await new Promise(resolve => setTimeout(resolve, this.checkInterval)); // 設定時間待つ
        }
        this.inputReadFlag = false;
        return;
    }


    /**/
    static chengeStatusDisplay(){
        const min_map = document.getElementById("min_map")
        const status = document.getElementById("status")
        const statusChange = document.getElementById("statusChange")
        if(status.style.display == "none"){
                status.style.display = "inline"
                min_map.style.display = "none"
                statusChange.style.height = 100+"px"
                statusChange.style.width = 100+"px"
        }else{
                min_map.style.display = "inline"
                status.style.display = "none"
                statusChange.style.height = 93+"px"
                statusChange.style.width = 162+"px"
        }
    }

    /**
     * 移動用の矢印のトグル
     */
    static deleteArrow(){
        const elem = document.getElementById("directionKey")
        const array = Array.from(elem.children);
        if(array[0].style.display == "none"){
            array.forEach((child) => {
                child.style.display = "inline"
            });
        }else{
            array.forEach((child) => {
                child.style.display = "none"
            });
        }
    }

    /* 矢印画像を配置する */
    static arrow(){
        const elem = document.getElementById("directionKey")
        for(let i = 1; i < 10; i++){
            if(i == 5){
                continue
            }
            const imgElement = Image.getArrowImages(i)
            imgElement.classList.add("arrow")
            imgElement.style.display = "none"
            imgElement.style.top = this.arrowPosition(i,false)+ "px";
            imgElement.style.left = this.arrowPosition(i,true)+ "px";
            imgElement.id = "arrow" + i;
            elem.appendChild(imgElement);
        }
    }

    /* 矢印の位置を返す */
    static arrowPosition(index,a){
        const x = [0,0,53,106,0,53,106,0,53,106]
        const y = [0,106,106,106,53,53,53,0,0,0]
        if(a){
            return x[index]
        }else{
            return y[index]
        }
    }

    /* アイテムリストの表示 */
    static itemDisplay(playerId){
        const elem = document.getElementById('itemList');
        elem.style.display = "inline";
        //アイテムリストの表示
        Image.createItemList(playerId, elem)
    }

    static deleteAllIitemElement(itemArray){
        console.log(itemArray)
        itemArray.forEach((item,index) => {
            document.getElementById(`item_list_index_${index}`).remove();
        });
    }
    
    /* アイテムリストのタップ内容を取得 */
    static itemSelect(index){
        this.itemListIndex = index;
    }
    static getItemListIndex(){
        if(this.itemListIndex === undefined){
            return  null
        //}else if(this.pressedKeyStatus.item > Config.keyPressedCount){
            //this.pressedKeyStatus.item = 0
            const elem = document.getElementById('itemList');
            //elem.style.display = "none";
            //return  'cancel'
        }else{
            return this.itemListIndex
        }
    }

    static choiceDisplay(id){
        const elem = document.getElementById('choice');
        elem.style.display = "inline";
        id = id.slice(0,2)
                
        this.createChoiceElement('use', 0)
        this.createChoiceElement('equip', 1)
        this.createChoiceElement('put', 2)
        this.createChoiceElement('cancel', 3)
    }

    static deleteChoice(){
        const elem = document.getElementById('choice');
        var clone = elem.cloneNode( false );
        elem.parentNode.replaceChild( clone , elem);
    }

    static createChoiceElement(action,num){
        const choice = document.getElementById('choice');
        const choiceArray = {use: '使う',equip: '装備',put: '捨てる',cancel: '戻る'}
        var elem = document.createElement(`div`);
            elem.id = `choice_action_${action}`;
            elem.innerHTML = choiceArray[action];
            elem.style.position = 'absolute';
            elem.style.top = 25 * num + "px";
            elem.width = 50;
            elem.height = 25;
            elem.setAttribute('onclick', `Control.itemChoiceAction('${action}')`);
            choice.appendChild(elem);
    }

    /* アイテムの動作のタップ内容を取得 */
    static itemChoiceAction(action){
        this.itemAction = action;
    }

    static getItemAction(){
        if(this.itemAction === undefined){
            return  null
        }else{
            return this.itemAction
        }
    }

    static elementNone(){
        const elem1 = document.getElementById('itemList');
        elem1.style.display = "none";
        const elem2 = document.getElementById('choice');
        elem2.style.display = "none";

        Item.itemSelectIndex = 99;
        this.itemListIndex = 99;
        this.itemAction = null
    }
    static startLoading(){
        document.getElementById("loading_layer").style.display = "block"
    }
    static endLoading(){
        document.getElementById("loading_layer").style.display = "none"
    }

    static endGame(){
        const elem = document.getElementById("loading_layer")
        elem.innerHTML = "GAME OVER"
        elem.style.display = "block"
    }




}