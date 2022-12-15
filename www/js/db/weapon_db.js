// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";

// 武器情報(剣)取得
function getItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Danjyon = ncmb.DataStore(this.WEAPON_DB);
    Danjyon.equalTo("weapon_type", "soad")
        .fetchAll()
        .then(function (results) {
            console.log(results);
            setSoadImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setSoadImage(results) {
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="changeSoad()"><img class="list_material" id="weapon" src="../image/soad/soad-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level +'</p></div>';
            // 作成した要素を追加
            window.onload = function () {
                document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml)
            }
        }
    }
}

// 武器情報(盾)取得
function getItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Danjyon = ncmb.DataStore(this.WEAPON_DB);
    Danjyon.equalTo("weapon_type", "shield")
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
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="changeSoad()"><img class="list_material" id="weapon" src="../image/soad/soad-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level +'</p></div>';
            // 作成した要素を追加
            window.onload = function () {
                document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml)
            }
        }
    }
}

// 武器情報(装飾品)取得
function getItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Danjyon = ncmb.DataStore(this.WEAPON_DB);
    Danjyon.equalTo("weapon_type", "decoration")
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
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="changeSoad()"><img class="list_material" id="weapon" src="../image/soad/soad-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level +'</p></div>';
            // 作成した要素を追加
            window.onload = function () {
                document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml)
            }
        }
    }
}