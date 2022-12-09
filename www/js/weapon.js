// モーダルウィンドウ用js
//モーダルウィンドウを開く
function confirmationOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';
}

// 武器進化成功
function powerUpSuccsess() {
    // 音声再生
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

// 進化キャンセル
function confirmationClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('confirmationModal');
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
    // 枠の色を変更する
    const weaponFrame = document.getElementById('weapon');
    if (weaponFrame.style.border == 'solid gold') {
        audio = new Audio("../sound/select_cansel.m4a");
        audio.play();
        weaponFrame.style.border = 'solid black';
    } else {
        audio = new Audio("../sound/item_select.m4a");
        audio.play();
        weaponFrame.style.border = 'solid gold';
    }
}

// 武器入れ替えjs
function changeSoad() {
    audio = new Audio("../sound/change.m4a");
    audio.play();
    // 装備を入れ替える
    const soad = document.getElementById('soad').src;
    const selectWeapon = document.getElementById('weapon').src;
    document.getElementById('soad').src = selectWeapon;
    document.getElementById('weapon').src = soad;
}

// 武器強化成功音
function powerUpSuccsess() {
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
}

// 装備js
function equip() {
    audio = new Audio("../sound/equip.m4a");
    audio.play();
}

// 音声再生用のjs
// 画面遷移用の音声再生
function go_sound() {
    audio = new Audio("../sound/select.m4a");
    audio.play();
}