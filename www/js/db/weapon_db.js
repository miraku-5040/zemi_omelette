// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";
var EQUIP_DB = "equipment";
var LOAD_WEAPON = "loadWeapon";
var MAX_EXP = "max_exp";

// 1件分の武器情報取得のためのid保存
function getSoloWeaponId(element) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    console.log(element.id);
    LoadWeapon.equalTo("objectId", "ReG7XyQhFYZnW7BM")
        .fetchAll()
        .then(function (results) {
            console.log(results);
            results.set("weapon_id", element.id);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// 1件分の武器情報取得
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

// 非進化武器の検査
function getEvolutionWeaponData() {
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
                    weaponId = results[0];
                    Weapon.equalTo("weapon_name", weaponId.weapon_name)
                        .fetchAll()
                        .then(function (results) {
                            setWeaponImage(results);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setWeaponImage(results) {
        // 初期化
        document.getElementById("item_frame").innerHTML = '';
        for (var i = 1; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" id="weapon1" onclick="toWeaponEvo(this)"><img class="power_for_item_image" src="../image/item/item-provisional.png"><p class="level_text">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("item_frame").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

//武器強化
function updateWeaponPowerUp() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    var getExp = 0;
    //強化素材の使用個数を取得
    var usedItem = [10, 5, 1];
    //アイテムidを検索して取得経験値を計算
    for (var i = 1; i <= 3; i++) {
        Item.equalTo("item_id", i)
            .fetchAll()
            .then(function (results) {
                console.log(results);
                console.log(usedItem[Number(i - 1)]);
                getExp = getExp + results[0].plus_exp * usedItem[i - 1];
                console.log(getExp);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    Weapon.equalTo("weapon_id", 1)
        .fetchAll()
        .then(function (results) {
            getExp = getExp + results[0].weapon_exp;
        })
        .catch(function (err) {
            console.log(err);
        });

    //結果に応じて、レベルと経験値を上昇
    Weapon.equalTo("weapon_id", 1)
        .fetchAll()
        .then(function (results) {
            results.set("weapon_level", getExp / 500);
            results.set("weapon_exp", getExp % 500);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });

    // アイテム残数変更
    updateItemSum();

    // 画面を再起動
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    console.log(element.id);
    LoadWeapon.equalTo("objectId", "ReG7XyQhFYZnW7BM")
        .fetchAll()
        .then(function (results) {
            console.log(results);
            results.set("weapon_id", element.id);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });

    window.location.href = "powerStrengthen.html";
}

// 武器進化
function updateWeaponEvolution() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    // 進化のアイテム数取得
    var usedWeapon = 2;
    // 武器の重ね合わせ数変更
    Weapon.equalTo("weapon_id", 1)
        .fetchAll()
        .then(function (results) {
            results.set("overlap", usedWeapon);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });

    // 画面を再起動
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    console.log(element.id);
    LoadWeapon.equalTo("objectId", "ReG7XyQhFYZnW7BM")
        .fetchAll()
        .then(function (results) {
            console.log(results);
            results.set("weapon_id", element.id);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });

    window.location.href = "powerEvolution.html";
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
}
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

// 強化武器情報取得用
// 武器情報(剣)取得
function getPowerSoadData() {
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
            var weaponHtml = '<div class="item_border" onclick="getSoloWeaponId(this);toPowerStrengthen()" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="../image/soad/soad-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// 武器情報(盾)取得
function getPowerShieldData() {
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

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setShieldImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="getSoloWeaponId(this);toPowerStrengthen()" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="../image/shield/shield-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}


// 武器情報(装飾品)取得
function getPowerDecoraionData() {
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

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setDecorationImage(results) {
        // 初期化 
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="getSoloWeaponId(this);toPowerStrengthen()" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material"  src="../image/decoration/juel-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// 進化武器情報取得用
// 武器情報(剣)取得
function getEvoSoadData() {
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
            var weaponHtml = '<div class="item_border" onclick="getSoloWeaponId(this);toPowerEvolution()" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="../image/soad/soad-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}


// 武器情報(盾)取得
function getEvoShieldData() {
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

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setShieldImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="getSoloWeaponId(this);toPowerEvolution()" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="../image/shield/shield-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}


// 武器情報(装飾品)取得
function getEvoDecoraionData() {
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

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setDecorationImage(results) {
        // 初期化
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="item_border" onclick="getSoloWeaponId(this);toPowerEvolution()" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material"  src="../image/decoration/juel-provisional.png"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}