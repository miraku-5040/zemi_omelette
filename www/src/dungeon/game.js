
window.addEventListener("load", () => {
    // まずステージを整える
    initialize();
});

function initialize() {
    // 画像を準備する
    Image.initialize();
    // ステージを準備する
    Stage.initialize();
    //コントローラを準備する
    Controle.initialize();

    mode = 'stert';
}

function loop() {
    switch(mode) {
        case 'start':
            // 開始
            mode = 'player';
            break;
        case 'player':
            // プレイヤーのターン
            
            mode = 'checkFall';
            break;
        case 'player':
            // プレイヤーのターン
            mode = 'checkFall';
            break;
    }
    frame++;
    requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
}
