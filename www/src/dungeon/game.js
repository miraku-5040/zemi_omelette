class Game{

    static load(){
        Game.loop()
    }

    static initialize() {
        //DBを準備する
        Database.initialize();
        // 画像を準備する
        Image.initialize();
        //プレイヤーの準備
        Player.initialize();
        // ステージを準備する
        Stage.initialize();
        //エネミーの準備
        Enemy.initialize();
        //アイテムの準備
        Item.initialize();
        //トラップの準備
        Trap.initialize();
        //スキルの準備
        Skill.initialize();
        //エフェクトの準備
        Effect.initialize();
        //コントローラを準備する
        Control.initialize();
        //ターンの経過
        this.turn = 1;
        //フェーズ
        this.mode = 'start';
        //ゲームの終了フラグ
        this.gameEndFlg = false
    }

    static async loop() {
        switch(this.mode) {
            case 'start':
                // 開始
                this.mode = 'player';
                break;
            case 'player':
                // プレイヤーのターン
                //ボタンを出す
                //ボタン入力待ち
                //player,stay,move,attack,skillReady,itemSelect,menu
                Game.playerInput();
                this.mode = 'controlWait'
            case 'controlWait':
                //入力待ち
                break;
            case 'stay':
                //ターンを消費しない行動をする
                Player.guide();
                this.mode = 'player'
                break;
            case 'move':
                // 移動に関するとこ
                //動ける床の判定含む
                this.mode = Player.moving();
                break;
            case 'attack':
                // 攻撃に関するとこ
                Player.attack();
                break;
            case 'skillReady':
                // スキルの前準備に関するとこ
                //skillGo or player or skillReady
                this.mode = Skill.skillReady();
                break;
            case 'skillGo':
                // スキルの使用
                Skill.skillGo();
                this.mode = 'enemy';
                break;
            case 'itemSelect':
                //アイテムリストからの選択
                //'itemUse or player or itemSelect
                this.mode = Item.itemSelect();
                break;
            case 'itemChoice':
                //選択したアイテムに対する動作の選択
                this.mode = Item.itemChoiceAction()
                break;
            case 'itemUse':
                // アイテムの使用
                this.mode = Item.itemUse();
                break;
            case 'menu':
                // メニュー
                this.mode = 'player';
                break;
            case 'trap':
                this.mode = Trap.activateTrap()
                break;
            case 'itemPick':
                Item.itemPick();
                this.mode = 'enemy';
                break;
            case 'enemy':
                if(this.gameEndFlg){
                    this.mode = 'alive';
                    break
                }
                await Tool.sleep(0.5)
                // 敵のターン
                Enemy.action();
                await Tool.sleep(0.5)
                if(this.gameEndFlg){
                    this.mode = 'die';
                }else{
                    this.mode = 'end';
                }
                break;
            case 'end':
                Player.spDecrease(this.turn);
                Player.setStatusTest();
                this.turn++
                this.mode = 'player';
                break;
            case 'nextfloor':
                Stage.setFloor()
                Control.startLoading()
                Stage.createStage()
                //アイテム生成
                Item.initialize()
                //トラップ生成
                Trap.initialize()
                //敵の生成
                Enemy.initialize()
                await Tool.sleep(3)
                Control.endLoading()
                this.mode = 'player'
                break;
            case 'die':
                Control.endGame()
                return
            case 'alive':

                return
        }
        requestAnimationFrame(this.load); // 1/60秒後にもう一度呼び出す
    }

    static async playerInput(){
        this.mode = await Player.playing();
    }
}

window.addEventListener("load", () => {
        Game.initialize()
        Game.loop()
    });

