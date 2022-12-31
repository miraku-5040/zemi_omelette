function toHome() {
    // 音声再生
    go_sound();
    // マイページ画面へ遷移
    setTimeout('window.location.href = "../home.html"', 600);
}

function toSelectDanjyon() {
    // 音声再生
    go_sound();
    // ダンジョン選択画面へ遷移
    setTimeout('window.location.href = "danjyonSelect.html"', 600);
}

function toGameImage() {
    // 音声再生
    audio = new Audio("../sound/start.m4a");
    audio.play();
    // スタート画面からのマイページ画面へ遷移
    setTimeout('window.location.href = "../home.html"', 600);
}

function toGatya() {
    // 音声再生
    go_sound();
    // ガチャ画面へ遷移
    setTimeout('window.location.href = "gatya.html"', 600);
}

function resultOne() {
    // 音声再生
    audio = new Audio("../sound/gatya.m4a");
    audio.play();
    // 1回ガチャ結果画面へ遷移
    setTimeout('window.location.href = "resultOne.html"', 1200);
}

function resultTen() {
    // 音声再生
    audio = new Audio("../sound/gatya.m4a");
    audio.play();
    // 10回ガチャ結果画面へ遷移
    setTimeout('window.location.href = "resultTen.html"', 1200);
}

function toItem() {
    // 音声再生
    go_sound();
    // 持ち物画面へ遷移
    setTimeout('window.location.href = "item.html"', 600);
}

function toEquip() {
    // 音声再生
    go_sound();
    // 装備画面へ遷移
    setTimeout('window.location.href = "equip.html"', 600);
}

function toPower() {
    // 音声再生
    go_sound();
    // 強化選択画面へ遷移
    setTimeout('window.location.href = "power.html"', 600);
}

function toPowerStrengthen() {
    // 音声再生
    go_sound();
    // 強化画面へ遷移
    setTimeout('window.location.href = "powerStrengthen.html"', 600);
}

function toPowerEvolution() {
    // 音声再生
    go_sound();
    // 進化画面へ遷移
    setTimeout('window.location.href = "powerEvolution.html"', 600);
}

function toSkill() {
    // 音声再生
    go_sound();
    // 進化画面へ遷移
    setTimeout('window.location.href = "skill.html"', 600);
}

function toWeaponPower() {
    // 音声再生
    go_sound();
    // 強化武器選択画面へ遷移
    setTimeout('window.location.href = "weaponSelectPower.html"', 600);
}

function toWeaponEvo() {
    // 音声再生
    go_sound();
    // 進化武器選択画面へ遷移
    setTimeout('window.location.href = "weaponSelectEvo.html"', 600);
}

function toDanjyon() {
    // 音声再生
    audio = new Audio("../sound/danjyon_start.m4a");
    audio.play();
}

function toSet() {
    // 音声再生
    go_sound();
    // 設定画面へ遷移
    setTimeout('window.location.href = "setting.html"', 600);
}

function toStart() {
    // 音声再生
    go_sound();
    // スタート画面へ遷移
    setTimeout('window.location.href = "start.html"', 600);
}

// 項目ボタンの切り替え
function weaponColumn(element) {
    // 音声再生
    go_sound();
    // 項目ボタンのCSS初期化
    ColumnButtonInitialization();
    // ボタンを金色にする
    const weaponColumn = document.getElementById(element.id);
    weaponColumn.style.background = 'black';
    weaponColumn.style.color = 'white';
}

// 項目ボタンの切り替え
function itemColumn(element) {
    // 音声再生
    go_sound();
    // 項目ボタンのCSS初期化
    ColumnButtonInitializationPlus();
    // ボタンを金色にする
    const itemColumn = document.getElementById(element.id);
    itemColumn.style.background = 'linear-gradient(45deg, #B67B03 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #B67B03 90% 100%)';
    itemColumn.style.borderTop = '4px solid rgb(252, 232, 121)';
    itemColumn.style.borderRight = '4px solid rgb(192, 163, 0)';
    itemColumn.style.borderBottom = '4px solid rgb(192, 163, 0)';
    itemColumn.style.borderLeft = '4px solid rgb(252, 232, 121)';
}

// モーダルウィンドウ用js
//モーダルウィンドウを開く
function modalOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'block';
}

function modalClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'none';
}

// ガチャ用モーダルウィンドウ用js
//モーダルウィンドウを開く
function modalOpen1() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('gatyaOneModal');
    modal.style.display = 'block';
}

function modalClose1() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('gatyaOneModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function modalOpen10() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('gatyaTenModal');
    modal.style.display = 'block';
}

function modalClose10() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('gatyaTenModal');
    modal.style.display = 'none';
}

// 音声再生用のjs
// 画面遷移用の音声再生
function go_sound() {
    audio = new Audio("../sound/select.m4a");
    audio.play();
}

// 項目ボタンのCSS初期化
function ColumnButtonInitialization() {
    document.getElementById('soadcolumn').style.background = 'white';
    document.getElementById('soadcolumn').style.color = 'black';

    document.getElementById('shieldcolumn').style.background = 'white';
    document.getElementById('shieldcolumn').style.color = 'black';

    document.getElementById('decorationcolumn').style.background = 'white';
    document.getElementById('decorationcolumn').style.color = 'black';
}

function ColumnButtonInitializationPlus() {
    document.getElementById('soadcolumn').style.background = 'linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%)';
    document.getElementById('soadcolumn').style.borderTop = '4px solid #e6e6e6';
    document.getElementById('soadcolumn').style.borderRight = '4px solid #adadad';
    document.getElementById('soadcolumn').style.borderBottom = '4px solid #999999';
    document.getElementById('soadcolumn').style.borderLeft = '4px solid #e6e6e6';

    document.getElementById('shieldcolumn').style.background = 'linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%)';
    document.getElementById('shieldcolumn').style.borderTop = '4px solid #e6e6e6';
    document.getElementById('shieldcolumn').style.borderRight = '4px solid #adadad';
    document.getElementById('shieldcolumn').style.borderBottom = '4px solid #999999';
    document.getElementById('shieldcolumn').style.borderLeft = '4px solid #e6e6e6';

    document.getElementById('decorationcolumn').style.background = 'linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%)';
    document.getElementById('decorationcolumn').style.borderTop = '4px solid #e6e6e6';
    document.getElementById('decorationcolumn').style.borderRight = '4px solid #adadad';
    document.getElementById('decorationcolumn').style.borderBottom = '4px solid #999999';
    document.getElementById('decorationcolumn').style.borderLeft = '4px solid #e6e6e6';

    document.getElementById('othercolumn').style.background = 'linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%)';
    document.getElementById('othercolumn').style.borderTop = '4px solid #e6e6e6';
    document.getElementById('othercolumn').style.borderRight = '4px solid #adadad';
    document.getElementById('othercolumn').style.borderBottom = '4px solid #999999';
    document.getElementById('othercolumn').style.borderLeft = '4px solid #e6e6e6';
}

function soundBGM() {
    // BGM再生
    audio = new Audio("../sound/BGM.m4a");
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}