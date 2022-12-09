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

function toWeapon() {
    // 音声再生
    go_sound();
    // 強化武器選択画面へ遷移
    setTimeout('window.location.href = "weaponSelect.html"', 600);
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

//カウントダウンjs
function countDown() {
    let element = document.getElementById('counter');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
    }
}

function countDownMore() {
    let element = document.getElementById('counter');
    element.value = 0;
}

// カウントアップjs
function countUp() {
    let element = document.getElementById('counter');
    let countNumber = Number(element.value);
    element.value = countNumber + 1;
}

function countUpMore() {
    let element = document.getElementById('counter');
    element.value = 100;
}

// 武器選択js
function selected() {
    // モーダルウィンドウを閉じる
    const weaponFrame = document.getElementById('weapon');
    weaponFrame.style.border = 'solid gold';
}

// 武器選択中js
function selectNow() {
    // モーダルウィンドウを閉じる
    const weaponFrame = document.getElementById('weapon');
    weaponFrame.style.border = 'solid gold';
}

// 音声再生用のjs
// 画面遷移用の音声再生
function go_sound() {
    audio = new Audio("../sound/select.m4a");
    audio.play();
}