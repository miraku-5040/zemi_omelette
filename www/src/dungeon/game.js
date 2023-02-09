    window.addEventListener("load", () => {
        initialize()
        loop()
    });

    let gameEndFlg
    let mode
    let turn

    function initialize() {
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
        turn = 1;
        //
        mode = 'start';
        //ゲームの終了フラグ
        gameEndFlg = false
    }

    async function loop() {
        switch(mode) {
            case 'start':
                // 開始
                mode = 'player';
                break;
            case 'player':
                // プレイヤーのターン
                //ボタンを出す
                //ボタン入力待ち
                //player,stay,move,attack,skillReady,itemSelect,menu
                playerInput();
                mode = 'controlWait'
            case 'controlWait':
                //入力待ち
                break;
            case 'stay':
                //ターンを消費しない行動をする
                Player.guide();
                mode = 'player'
                break;
            case 'move':
                // 移動に関するとこ
                //動ける床の判定含む
                mode = Player.moving();
                break;
            case 'attack':
                // 攻撃に関するとこ
                Player.attack();
                break;
            case 'skillReady':
                // スキルの前準備に関するとこ
                //skillGo or player or skillReady
                mode = Skill.skillReady();
                break;
            case 'skillGo':
                // スキルの使用
                Skill.skillGo();
                mode = 'enemy';
                break;
            case 'itemSelect':
                //アイテムリストからの選択
                //'itemUse or player or itemSelect
                mode = Item.itemSelect();
                break;
            case 'itemChoice':
                //選択したアイテムに対する動作の選択
                mode = Item.itemChoiceAction()
                break;
            case 'itemUse':
                // アイテムの使用
                mode = Item.itemUse();
                break;
            case 'menu':
                // メニュー
                mode = 'player';
                break;
            case 'trap':
                mode = Trap.activateTrap()
                break;
            case 'itemPick':
                Item.itemPick();
                mode = 'enemy';
                break;
            case 'enemy':
                if(gameEndFlg){
                    mode = 'alive';
                    break
                }
                await Tool.sleep(0.3)
                // 敵のターン
                Enemy.action();
                await Tool.sleep(0.3)
                if(gameEndFlg){
                    mode = 'die';
                }else{
                    mode = 'end';
                }
                break;
            case 'end':
                Player.spDecrease(turn);
                Player.setStatusTest();
                turn++
                mode = 'player';
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
                mode = 'player'
                break;
            case 'die':

                return
            case 'alive':

                return
        }
        requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
    }

    async function playerInput(){
        mode = await Player.playing();
    }


