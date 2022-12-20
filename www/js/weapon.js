//カウントダウンjs
function countDown1() {
    let element = document.getElementById('counter1');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
    }
}

function countDownMore1() {
    let element = document.getElementById('counter1');
    element.value = 0;
}

// カウントアップjs
function countUp1() {
    let element = document.getElementById('counter1');
    let countNumber = Number(element.value);
    element.value = countNumber + 1;
}

function countUpMore1() {
    let element = document.getElementById('counter1');
    element.value = element.max;
}

//カウントダウンjs
function countDown2() {
    let element = document.getElementById('counter2');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
    }
}

function countDownMore2() {
    let element = document.getElementById('counter2');
    element.value = 0;
}

// カウントアップjs
function countUp2() {
    let element = document.getElementById('counter2');
    let countNumber = Number(element.value);
    element.value = countNumber + 1;
}

function countUpMore2() {
    let element = document.getElementById('counter2');
    element.value = element.max;
}
//カウントダウンjs
function countDown3() {
    let element = document.getElementById('counter3');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
    }
}

function countDownMore3() {
    let element = document.getElementById('counter3');
    element.value = 0;
}

// カウントアップjs
function countUp3() {
    let element = document.getElementById('counter3');
    let countNumber = Number(element.value);
    element.value = countNumber + 1;
}

function countUpMore3() {
    let element = document.getElementById('counter3');
    element.value = element.max;
}

// 武器選択js
function selected(element) {
    // 枠の色を変更する
    const weaponFrame = document.getElementById(element.id);
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
    console.log(document.getElementById('weapon'));
    console.log(selectWeapon);
    document.getElementById('soad').src = selectWeapon;
    document.getElementById('weapon').src = soad;
}

function changeShield() {
    audio = new Audio("../sound/change.m4a");
    audio.play();
    // 装備を入れ替える
    const shield = document.getElementById('shield').src;
    const selectWeapon = document.getElementById('weapon').src;
    document.getElementById('shield').src = selectWeapon;
    document.getElementById('weapon').src = shield;
}

function changeDecoration() {
    audio = new Audio("../sound/change.m4a");
    audio.play();
    // 装備を入れ替える
    const decoration = document.getElementById('decoration').src;
    const selectWeapon = document.getElementById('weapon').src;
    document.getElementById('decoration').src = selectWeapon;
    document.getElementById('weapon').src = decoration;
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



// 武器詳細モーダルウィンドウ用js
//モーダルウィンドウを開く
function item_detail() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('itemDetailModal');
    modal.style.display = 'block';
}

// キャンセル
function detail_Close() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('itemDetailModal');
    modal.style.display = 'none';
}

// アイテム使用
function use_item() {
    // 音声再生
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('itemDetailModal');
    modal.style.display = 'none';
}


// 進化モーダルウィンドウ用js
//モーダルウィンドウを開く
function confirmationOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';
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

// 武器進化成功
function EvolutionSuccsess() {
    // 音声再生
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}



// 強化モーダルウィンドウ用js
//モーダルウィンドウを開く
function PowerUpOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('powerUpModal');
    modal.style.display = 'block';
}

// 強化キャンセル
function PowerUpClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('powerUpModal');
    modal.style.display = 'none';
}

// 武器強化成功
function PowerUpSuccsess() {
    // 音声再生
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('powerUpModal');
    modal.style.display = 'none';
}