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
            element.value = Number(expNumber - 50) + Number(element.max);
            // レベルを更新
            var str = document.getElementById('weaponLevel');
            var result = String(str.textContent).slice(4, 6);
            result = Number(result) - 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            // 攻撃力を更新
            str = document.getElementById('weaponAttack');
            result = String(str.textContent).slice(4);
            result = Number(result) - 10;
            document.getElementById("weaponAttack").innerHTML = "攻撃力：" + result;
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countDownMore1() {
    // 数値取得
    let element = document.getElementById('counter1');
    let ber = document.getElementById('power_ber');
    let number = ber.value;
    // 値減少
    number = number - (element.value * 50);
    number = Math.abs(number + (Math.ceil(Number(Math.abs(number) / 1000)) * 1000));
    // レベルを減らす
    var str = document.getElementById('weaponLevel');
    var result = String(str.textContent).slice(4, 6);
    result = Math.ceil(Number(result) - Number(number / 1000));
    document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
    // 強化素材数を0にする
    element.value = 0;
    // 経験値のテキスト変更
    document.getElementById("exp_text").innerHTML = Number(number % 1000) + "/1000";
    ber.value = Number(number % 1000);
    // 攻撃力を更新
    str = document.getElementById('weaponAttack');
    var attack = String(str.textContent).slice(4);
    attack = Number(attack) - (10 * result);
    document.getElementById("weaponAttack").innerHTML = "攻撃力：" + result;
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
            // 経験値を0にする
            element.value = (beforeNuber + 50) - Number(element.max);
            // レベルを更新
            var str = document.getElementById('weaponLevel');
            var result = String(str.textContent).slice(4, 6);
            result = Number(result) + 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            // 攻撃力を更新
            str = document.getElementById('weaponAttack');
            result = String(str.textContent).slice(4);
            result = Number(result) + 10;
            document.getElementById("weaponAttack").innerHTML = "攻撃力：" + result;
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countUpMore1() {
    // 数値取得
    let element = document.getElementById('counter1');
    element.value = element.max;
    let ber = document.getElementById('power_ber');
    let number = ber.value;
    // 値増加
    number = number + (element.value * 50);
    // レベルを増やす
    var str = document.getElementById('weaponLevel');
    var result = String(str.textContent).slice(4, 6);
    result = Math.ceil(Number(result) + Number(Math.abs(number) / 1000));
    document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
    // 経験値のテキスト変更
    document.getElementById("exp_text").innerHTML = Number(Math.abs(number) % 1000) + "/1000";
    ber.value = Number(Math.abs(number) % 1000);
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
            element.value = Number(expNumber - 100) + Number(element.max);
            // レベルを更新
            var str = document.getElementById('weaponLevel');
            var result = String(str.textContent).slice(4, 6);
            result = Number(result) - 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            // 攻撃力を更新
            str = document.getElementById('weaponAttack');
            result = String(str.textContent).slice(4);
            result = Number(result) - 10;
            document.getElementById("weaponAttack").innerHTML = "攻撃力：" + result;
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countDownMore2() {
    let element = document.getElementById('counter2');
    let ber = document.getElementById('power_ber');
    let number = ber.value;
    // 値減少
    number = number - (element.value * 100);
    number = Math.abs(number + (Math.ceil(Number(Math.abs(number) / 1000)) * 1000));
    // レベルを減らす
    var str = document.getElementById('weaponLevel');
    var result = String(str.textContent).slice(4, 6);
    result = Math.ceil(Number(result) - Number(number / 1000));
    document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
    // 強化素材数を0にする
    element.value = 0;
    // 経験値のテキスト変更
    document.getElementById("exp_text").innerHTML = Number(number % 1000) + "/1000";
    ber.value = Number(number % 1000);
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
            // 経験値を0にする
            element.value = (beforeNuber + 100) - Number(element.max);
            // レベルを更新
            var str = document.getElementById('weaponLevel');
            var result = String(str.textContent).slice(4, 6);
            result = Number(result) + 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            // 攻撃力を更新
            str = document.getElementById('weaponAttack');
            result = String(str.textContent).slice(4);
            result = Number(result) + 10;
            document.getElementById("weaponAttack").innerHTML = "攻撃力：" + result;
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countUpMore2() {
    // 数値取得
    let element = document.getElementById('counter2');
    element.value = element.max;
    let ber = document.getElementById('power_ber');
    let number = ber.value;
    // 値増加
    number = number + (element.value * 100);
    // レベルを増やす
    var str = document.getElementById('weaponLevel');
    var result = String(str.textContent).slice(4, 6);
    result = Math.ceil(Number(result) + Number(Math.abs(number) / 1000));
    document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
    // 経験値のテキスト変更
    document.getElementById("exp_text").innerHTML = Number(Math.abs(number) % 1000) + "/1000";
    ber.value = Number(Math.abs(number) % 1000);
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
            element.value = Number(expNumber - 500) + Number(element.max);
            // レベルを更新
            var str = document.getElementById('weaponLevel');
            var result = String(str.textContent).slice(4, 6);
            result = Number(result) - 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            // 攻撃力を更新
            str = document.getElementById('weaponAttack');
            result = String(str.textContent).slice(4);
            result = Number(result) - 10;
            document.getElementById("weaponAttack").innerHTML = "攻撃力：" + result;
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countDownMore3() {
    let element = document.getElementById('counter3');
    let ber = document.getElementById('power_ber');
    let number = ber.value;
    // 値減少
    number = number - (element.value * 500);
    number = Math.abs(number + (Math.ceil(Number(Math.abs(number) / 1000)) * 1000));
    // レベルを減らす
    var str = document.getElementById('weaponLevel');
    var result = String(str.textContent).slice(4, 6);
    result = Math.ceil(Number(result) - Number(number / 1000));
    document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
    // 強化素材数を0にする
    element.value = 0;
    // 経験値のテキスト変更
    document.getElementById("exp_text").innerHTML = Number(number % 1000) + "/1000";
    ber.value = Number(number % 1000);
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
            // 経験値を0にする
            element.value = (beforeNuber + 500) - Number(element.max);
            // レベルを更新
            var str = document.getElementById('weaponLevel');
            var result = String(str.textContent).slice(4, 6);
            result = Number(result) + 1;
            document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
            // 攻撃力を更新
            str = document.getElementById('weaponAttack');
            result = String(str.textContent).slice(4);
            result = Number(result) + 10;
            document.getElementById("weaponAttack").innerHTML = "攻撃力：" + result;
        }
        document.getElementById("exp_text").innerHTML = element.value + "/1000";
    }
}

function countUpMore3() {
    // 数値取得
    let element = document.getElementById('counter3');
    element.value = element.max;
    let ber = document.getElementById('power_ber');
    let number = ber.value;
    // 値増加
    number = number + (element.value * 500);
    // レベルを増やす
    var str = document.getElementById('weaponLevel');
    var result = String(str.textContent).slice(4, 6);
    result = Math.ceil(Number(result) + Number(Math.abs(number) / 1000));
    document.getElementById("weaponLevel").innerHTML = "レベル：" + result + "/100";
    // 経験値のテキスト変更
    document.getElementById("exp_text").innerHTML = Number(Math.abs(number) % 1000) + "/1000";
    ber.value = Number(Math.abs(number) % 1000);
}

// カウンター(進化)
// カウントアップ
function evoCountUp() {
    let element = document.getElementById('counterEvo');
    let countNumber = Number(element.value);
    if (countNumber < element.max) {
        element.value = countNumber + 1;
        // 重ね合わせ数増加
        element = document.getElementById('power_ber');
        element.value = Number(element.value) + 1;
        document.getElementById("overlap_text").innerHTML = element.value + "/5";
    }
}

// カウントダウン
function evoCountDown() {
    let element = document.getElementById('counterEvo');
    let countNumber = Number(element.value);
    if (countNumber > 0) {
        element.value = countNumber - 1;
        // 重ね合わせ数減少
        element = document.getElementById('power_ber');
        element.value = Number(element.value) - 1;
        document.getElementById("overlap_text").innerHTML = element.value + "/5";
    }
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