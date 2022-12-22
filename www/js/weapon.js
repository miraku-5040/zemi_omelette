//カウントダウンjs
function countDown1() {
    let element = document.getElementById('counter1');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
        element = document.getElementById('power_ber');
        let expNumber = Number(element.value);
        element.value = expNumber - 50;
        // 経験値が0以下ならレベルを下げる
        if (element.value <= 0) {
            element.value = Number(expNumber - 50) + Number(element.max)
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countDownMore1() {
    let element = document.getElementById('counter1');
    let ber = document.getElementById('power_ber');
    ber.value = ber.value - (element.value * 50);
    element.value = 0;
    document.getElementById("exp_text").innerHTML = ber.value + "/1000";
}

// カウントアップjs
function countUp1() {
    let element = document.getElementById('counter1');
    let countNumber = Number(element.value);
    if (countNumber < element.max) {
        element.value = countNumber + 1;
        element = document.getElementById('power_ber');
        let expNumber = Number(element.value);
        let beforeNuber = Number(element.value);
        element.value = expNumber + 50;
        if (Number(element.value) >= Number(element.max)) {
            element.value = (beforeNuber + 50) - Number(element.max);
            console.log(element.value);
            // ↓ここが取れていない
            var str = document.getElementById('weaponLevel');
            console.log(str);
            var result = String(str).slice(4, 6);
            result = Number(result) + 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            document.getElementById("exp_text").innerHTML = element.value + "/1000";
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countUpMore1() {
    let element1 = document.getElementById('counter1');
    element1.value = element1.max;
    let element2 = document.getElementById('power_ber');
    let expNumber = Number(element2.value);
    element2.value = expNumber + (element1.max * 50);
    document.getElementById("exp_text").innerHTML = element2.value + "/1000";
}

//カウントダウンjs
function countDown2() {
    let element = document.getElementById('counter2');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
        element = document.getElementById('power_ber');
        let expNumber = Number(element.value);
        element.value = expNumber - 100;
        // 経験値が0以下ならレベルを下げる
        if (element.value <= 0) {
            element.value = Number(expNumber - 100) + Number(element.max)
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countDownMore2() {
    let element = document.getElementById('counter2');
    let ber = document.getElementById('power_ber');
    ber.value = ber.value - (element.value * 100);
    element.value = 0;
    document.getElementById("exp_text").innerHTML = ber.value + "/1000";
}

// カウントアップjs
function countUp2() {
    let element = document.getElementById('counter2');
    let countNumber = Number(element.value);
    if (countNumber < element.max) {
        element.value = countNumber + 1;
        element = document.getElementById('power_ber');
        let expNumber = Number(element.value);
        let beforeNuber = Number(element.value);
        element.value = expNumber + 100;
        if (Number(element.value) >= Number(element.max)) {
            element.value = (beforeNuber + 100) - Number(element.max);
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countUpMore2() {
    let element1 = document.getElementById('counter1');
    element1.value = element1.max;
    let element2 = document.getElementById('power_ber');
    let expNumber = Number(element2.value);
    element2.value = expNumber + (element1.max * 100);
    document.getElementById("exp_text").innerHTML = element2.value + "/1000";
}
//カウントダウンjs
function countDown3() {
    let element = document.getElementById('counter3');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
        element = document.getElementById('power_ber');
        let expNumber = Number(element.value);
        element.value = expNumber - 500;
        // 経験値が0以下ならレベルを下げる
        if (element.value <= 0) {
            element.value = Number(expNumber - 500) + Number(element.max)
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countDownMore3() {
    let element = document.getElementById('counter3');
    let ber = document.getElementById('power_ber');
    element.value = 0;
    // falseなのに処理が動かない
    if (Number(ber.value - (element.value * 500)) <= 0) {
        ber.value = Number(ber.value) % 1000 + 1000;
    } else {
        ber.value = ber.value - (element.value * 500);
    }
    document.getElementById("exp_text").innerHTML = ber.value + "/1000";
}

// カウントアップjs
function countUp3() {
    let element = document.getElementById('counter3');
    let countNumber = Number(element.value);
    if (countNumber < element.max) {
        element.value = countNumber + 1;
        element = document.getElementById('power_ber');
        let expNumber = Number(element.value);
        let beforeNuber = Number(element.value);
        element.value = expNumber + 500;
        if (Number(element.value) >= Number(element.max)) {
            element.value = (beforeNuber + 500) - Number(element.max);
            console.log(element.value);
            // ↓ここが取れていない
            var str = document.getElementById('weaponLevel');
            console.log(str);
            var result = String(str).slice(4, 6);
            result = Number(result) + 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            document.getElementById("exp_text").innerHTML = element.value + "/1000";
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countUpMore3() {
    let element1 = document.getElementById('counter1');
    element1.value = element1.max;
    let element2 = document.getElementById('power_ber');
    let expNumber = Number(element2.value);
    element2.value = expNumber + (element1.max * 500);
    document.getElementById("exp_text").innerHTML = element2.value + "/1000";
}

// 武器選択js
function selected(element) {
    // 枠の色を変更する
    const weaponFrame = document.getElementById(element.id);
    if (weaponFrame.style.border == '2px solid gold') {
        audio = new Audio("../sound/select_cansel.m4a");
        audio.play();
        weaponFrame.style.border = '2px solid black';
        document.getElementById("power_ber").value = document.getElementById("power_ber").value - 1;
        document.getElementById("overlap_text").innerHTML = document.getElementById("power_ber").value + "/5";
    } else if (document.getElementById("power_ber").value <= document.getElementById("power_ber").max) {
        audio = new Audio("../sound/item_select.m4a");
        audio.play();
        weaponFrame.style.border = '2px solid gold';
        document.getElementById("power_ber").value = document.getElementById("power_ber").value + 1;
        document.getElementById("overlap_text").innerHTML = document.getElementById("power_ber").value + "/5";
    }
}

// 武器入れ替えjs
function changeSoad() {
    audio = new Audio("../sound/change.m4a");
    audio.play();
    // 装備を入れ替える
    var soad = document.getElementById('soad').src;
    var element = document.getElementById('weapon').value;
    // ↓ここが取れていない
    console.log(element);
    document.getElementById('soad').src = element;
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
    // 画面を再起動
    setTimeout('window.location.href = "powerEvolution.html"', 600);
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
    // 画面を再起動
    setTimeout('window.location.href = "powerStrengthen.html"', 600);
}