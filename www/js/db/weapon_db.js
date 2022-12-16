// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";
var EQUIP_DB = "equipment";

// 武器情報(剣)取得
function getSoadData() {
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

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setSoadImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="changeSoad()"><img class="list_material" id="weapon" src="../image/soad/soad-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// 武器情報(盾)取得
function getShieldData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    Weapon.equalTo("weapon_type", "shield")
        .fetchAll()
        .then(function (results) {
            console.log(results);
            setShieldImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setShieldImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="changeSoad()"><img class="list_material" id="weapon" src="../image/shield/shield-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// 武器情報(装飾品)取得
function getDecoraionData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    Weapon.equalTo("weapon_type", "decoration")
        .fetchAll()
        .then(function (results) {
            console.log(results);
            setDecorationImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setDecorationImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="changeSoad()"><img class="list_material" id="weapon" src="../image/decoration/juel-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// 装備品変更
function updateWeaponData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.EQUIP_DB);
    Weapon.set("soad", 1337)
        .set("shield", false)
        .set("decoration", false)
        .update()
        .then(function (Weapon) {
            Weapon.fetchAll()
                .then(function (results) {
                    console.log(results);
                    setEquipmentImage(results);
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            // エラー処理
        });

    // 装備品の画像(仮)をHTMLに埋め込む
    function setEquipmentImage(results) {
        // 情報取得
        var weapon = results;
        // 新しいHTML要素を作成
        var weaponHtml = '<img class="material" id="soad" src="' + weapon.soad + '"><img class="material" id="shield" src="' + weapon.shield + '"><img class="material" id="decoration" src="' + weapon.decoration + '">';
        // 作成した要素を追加
        window.onload = function () {
            document.getElementById("equipment").innerHTML = weaponHtml;
        }
    }
}

// ガチャロジック
function gatyaPull(gatyaNum) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    // 武器の全データ取得
    Weapon.fetchAll()
        .then(function (results) {
            setTimeout(setGatyaResult(results, gatyaNum), 5000);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setGatyaResult(results, gatyaNum) {
        // 初期化
        document.getElementById("results").innerHTML = '';
        for (var i = 1; i <= gatyaNum; i++) {
            // 乱数発生(0から10)
            var random = Math.floor(Math.random() * 11);
            // 発生結果によって分岐してhtml追加
            if (random == 0) {
                raritySelect(results, "SSR", "gold");
            } else if (1 <= random && random <= 5) {
                raritySelect(results, "SR", "rgb(214, 0, 214)");
            } else {
                raritySelect(results, "R", "blue");
            }
        }
    }

    // レアリティ別に武器を選ぶ
    function raritySelect(results, rarity, color) {
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            if (weapon.weapon_rarity == rarity) {
                // 背景色変更
                var weaponHtml = '<img class="result_image" style="background-color: ' + color + '" src="../image/soad/soad-provisional.png">';
                // 作成した要素を追加
                document.getElementById("results").insertAdjacentHTML('beforeend', weaponHtml);
                break;
            }
        }
    }
}