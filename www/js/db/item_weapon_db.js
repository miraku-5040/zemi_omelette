// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";
var EQUIP_DB = "equipment";
var LOAD_WEAPON = "loadWeapon";

// 1件分の武器情報取得(説明表示用)
function getSoloWeaponData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    LoadWeapon.equalTo("objectId", "ReG7XyQhFYZnW7BM")
        .fetchAll()
        .then(function (results) {
            weaponId = results[0];
            Weapon.equalTo("weapon_id", weaponId.weapon_id)
                .fetchAll()
                .then(function (results) {
                    setDecorationImage(results);
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setDecorationImage(results) {
        var weapon = results[0];
        document.getElementById("weaponName").innerHTML = "&lt;" + weapon.weapon_name + "&gt;";
        document.getElementById("weaponLevel").innerHTML = "レベル：" + weapon.weapon_level + "/100";
        document.getElementById("weaponAttack").innerHTML = "総合力：" + weapon.weapon_attack;
    }
}

// 持ち物画面情報取得用
// 武器情報(剣)取得
function getItemSoadData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    Weapon.equalTo("weapon_type", "soad")
        .fetchAll()
        .then(function (results) {
            setSoadImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });
}
// 武器の画像(仮)とレベルをHTMLに埋め込む
function setSoadImage(results) {
    // 初期化
    document.getElementById("items").innerHTML = '';
    // 情報取得
    for (var i = 0; i <= results.length - 1; i++) {
        var weapon = results[i];
        // 新しいHTML要素を作成
        var weaponHtml = '<div class="item_border" onclick="" id="weapon" value="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap +'</p><img class="list_material2" src="../image/soad/soad-provisional.png"><p class="item_text_position2">Lv' + weapon.weapon_level + '</p></div>';
        // 作成した要素を追加
        document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
    }
}


// 武器情報(盾)取得
function getItemShieldData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    Weapon.equalTo("weapon_type", "shield")
        .fetchAll()
        .then(function (results) {
            setShieldImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });
}
// 武器の画像(仮)とレベルをHTMLに埋め込む
function setShieldImage(results) {
    // 初期化
    document.getElementById("items").innerHTML = '';
    // 情報取得
    for (var i = 0; i <= results.length - 1; i++) {
        var weapon = results[i];
        // 新しいHTML要素を作成
        var weaponHtml = '<div class="item_border" onclick="" id="weapon" value="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap +'</p><img class="list_material2" src="../image/shield/shield-provisional.png"><p class="item_text_position2">Lv' + weapon.weapon_level + '</p></div>';
        // 作成した要素を追加
        document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
    }
}


// 武器情報(装飾品)取得
function getItemDecoraionData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    Weapon.equalTo("weapon_type", "decoration")
        .fetchAll()
        .then(function (results) {
            setDecorationImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });
}
// 武器の画像(仮)とレベルをHTMLに埋め込む
function setDecorationImage(results) {
    // 初期化
    document.getElementById("items").innerHTML = '';
    // 情報取得
    for (var i = 0; i <= results.length - 1; i++) {
        var weapon = results[i];
        // 新しいHTML要素を作成
        var weaponHtml = '<div class="item_border" id="weapon" onclick="" value="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap +'</p><img class="list_material2"  src="../image/decoration/juel-provisional.png"><p class="item_text_position2">Lv' + weapon.weapon_level + '</p></div>';
        // 作成した要素を追加
        document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
    }
}