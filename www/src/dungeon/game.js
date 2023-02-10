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
            case 'itemPick':
                Item.itemPick();
                this.mode = 'enemy';
                break;
            case 'menu':
                // メニュー
                this.mode = 'player';
                break;
            case 'trap':
                //トラップの発動処理（階段含む）
                this.mode = Trap.activateTrap()
                break;
            case 'enemy':
                //ボスと倒したかの判定（べつのcaseに変えるべき）
                if(this.gameEndFlg){
                    this.mode = 'alive';
                    break
                }

                // 敵のターン
                Enemy.action();

                //HPが０になったかの判定
                if(this.gameEndFlg){
                    this.mode = 'die';
                }else{
                    this.mode = 'end';
                }
                break;
            case 'end':
                Player.spDecrease(this.turn);//満腹度の減少
                Player.setStatusTest();//テスト用のステータス表示
                this.turn++
                this.mode = 'player';
                break;
            case 'nextfloor':
                Stage.setFloor()//
                Control.startLoading()//画面の暗転
                Stage.createFloor()//次のステージの作成
                await Tool.sleep(3)//ステージの切り替わりなので3秒間止める
                Control.endLoading()//画面の明転
                this.mode = 'player'
                break;
            case 'die':
                //気絶
                Control.endGame()
                return亡
            case 'alive':
                //生還時
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

