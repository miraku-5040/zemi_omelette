
window.addEventListener("load", () => {
    // まずステージを整える
    initialize();
    loop();
});

let mode; // ゲームの現在の状況
let frame; // ゲームの現在フレーム（1/60秒ごとに1追加される）
let turn; // ゲームの現在ターン数

function initialize() {
    // 画像を準備する
    Image.initialize();
    // ステージを準備する
    Stage.initialize();
    //プレイヤーの準備
    Player.initialize();
    //エネミーの準備
    Enemy.initialize();
    //アイテムの準備
    Item.initialize();
    //コントローラを準備する
    Control.initialize();
    // 開始フラグ
    mode = 'start';
    // フレームを初期化する
    frame = 0;
    turn = 1;
    
}

function loop() {
    switch(mode) {
        case 'start':
            // 開始
            Stage.createStage();
            mode = 'player';
            break;
        case 'player':
            // プレイヤーのターン
            //ボタン入力待ち
            //player,stay,move,attack,skillReady,itemSelect,menu
            mode = Player.playing()
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
            mode = 'enemy';
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
            //アイテム選択
            //'itemUse or player or itemSelect
            mode = Item.itemSelect();
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
            mode = 'enemy';
            break;
        case 'itemPick':
            Item.itemPick();
            mode = 'enemy';
            break;
        case 'enemy':
            // 敵のターン
            Enemy.action();
            mode = 'end';
            break;
        case 'end':
            Player.spDecrease(turn);
            
            turn++
            mode = 'player';
            break;
        case 'nextfloor':
            //次のフロアの準備及び次々のフロアの作成
            break;
    }
    frame++;
    requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
}
