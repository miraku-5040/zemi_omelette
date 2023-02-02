// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";
var EQUIP_DB = "equipment";
var LOAD_WEAPON = "loadWeapon";

var getSoad;
var getShield;
var getDecoration;

var setSoad;
var setShield;
var setDecoration;


// 装備品変更
function updateEquipWeaponData() {
    // ここが出ていない→このメソッドは動いていない、けどエラーは出ていないので発見されてはいる
    console.log("go");
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Equip = ncmb.DataStore(this.EQUIP_DB);
    // var soad = localStorage.getItem("addSoad");
    // console.log(document.getElementById("soad"));
    // var shield = localStorage.getItem("addShield");
    // var decoration = localStorage.getItem("addDecoration");
    if(this.setSoad == localStorage.getItem('soad')){
        this.getSoad = this.setSoad;
    }else{
        this.getSoad = localStorage.getItem('soad');
    }
    if(this.setShield == localStorage.getItem('shield')){
        this.getShield = this.setShield;
    }else{
        this.getShield = localStorage.getItem('shield');
    }
    if(this.setDecoration == localStorage.getItem('decoration')){
        this.getDecoration = this.setDecoration;
    }else{
        this.getDecoration = localStorage.getItem('decoration');
    }
    Equip.equalTo("equipment_id", "1")
        .fetchAll()
        .then(function (results) {
            console.log(results[0]);
            results[0].set("soad", this.getSoad);
            results[0].set("shield", this.getShield);
            results[0].set("decoration", this.getDecoration);
            return results[0].update();
        })
        .catch(function (err) {
            console.log("outsideng");
        });
    getEquipWeaponData();
    equip();
}

// 装備品取得
function getEquipWeaponData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Equip = ncmb.DataStore(this.EQUIP_DB);
    Equip.fetchAll()
        .then(function (results) {
            setEquipWeapoImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });
}
// 武器の画像をHTMLに埋め込む
function setEquipWeapoImage(results) {
    // 情報取得
    var equip = results[0];
    // 新しいHTML要素を作成
    var EquipHtml = '<img class="material" id="soad" src="' + equip.soad + '"><img class="material" id="shield" src="' + equip.shield + '"><img class="material" id="decoration" src="' + equip.decoration + '">';
    this.setSoad = equip.soad;
    this.setShield = equip.shield;
    this.setDecoration = equip.decoration;
    // 作成した要素を追加
    document.getElementById("equipment").innerHTML = EquipHtml;
}

// 装備画面情報取得用
// 武器情報(剣)取得
function getEquipSoadData() {
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

    // 武器の画像とレベルと進化数をHTMLに埋め込む
    function setSoadImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" id="' + weapon.weapon_image + '" onclick="changeSoad(this)"><p class="overlap_color">' + weapon.overlap + '</p><img id="' + weapon.weapon_id + '" class="list_material" src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            this.setSoad = weapon.weapon_image;
            console.log(weapon.weapon_image);
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}


// 武器情報(盾)取得
function getEquipShieldData() {
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

    // 武器の画像とレベルと進化数をHTMLに埋め込む
    function setShieldImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" id="' + weapon.weapon_image + '" onclick="changeShield(this)" ><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            this.setShield = weapon.weapon_image;
            console.log(weapon.weapon_image);
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}


// 武器情報(装飾品)取得
function getEquipDecoraionData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    Weapon.equalTo("weapon_type", "decoration")
        .fetchAll()
        .then(function (results) {
            console.log(results[0]);
            setDecorationImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像とレベルと進化数をHTMLに埋め込む
    function setDecorationImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" id="' + weapon.weapon_image + '" onclick="changeDecoration(this)" ><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material"  src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            this.setDecoration = weapon.weapon_image;
            console.log(weapon.weapon_image);
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}