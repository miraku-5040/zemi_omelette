// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";
var EQUIP_DB = "equipment";
var LOAD_WEAPON = "loadWeapon";
var MAX_EXP = "max_exp";

const wait = (sec) => { // タイマ
    return new Promise((resolve, reject) => {
        setTimeout(resolve, sec * 1000);
        //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
};

// 1件分の武器情報取得のためのid保存(強化)
async function setSoloPowerWeaponId(element) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    LoadWeapon.equalTo("loadweapon_id", 1)
        .fetch()
        .then(function (results) {
            results.set("weapon_id", element)
                .update();
            toPowerStrengthen();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// 1件分の武器情報取得のためのid保存(進化)
async function setSoloEvoWeaponId(element) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    LoadWeapon.equalTo("loadweapon_id", 1)
        .fetch()
        .then(function (results) {
            results.set("weapon_id", element)
                .update();
            toPowerEvolution()
        })
        .catch(function (err) {
            console.log(err);
        });
}

// 1件分の武器情報取得(強化)
function getSoloPowerWeaponData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    LoadWeapon.equalTo("loadweapon_id", 1)
        .fetchAll()
        .then(function (results) {
            Weapon.equalTo("weapon_id", results.weapon_id)
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
        document.getElementById("powerUpWeapon").src = weapon.weapon_image;
        document.getElementById("weaponName").innerHTML = "&lt;" + weapon.weapon_name + "&gt;";
        document.getElementById("weaponLevel").innerHTML = "レベル：" + weapon.weapon_level + "/100";
        document.getElementById("weaponAttack").innerHTML = "総合力：" + weapon.weapon_attack;
        document.getElementById("power_ber").value = weapon.weapon_exp;
        document.getElementById("power_ber").low = weapon.weapon_exp;
        document.getElementById("exp_text").innerHTML = weapon.weapon_exp + "/1000";
    }
}

// 1件分の武器情報取得(進化)
function getSoloEvoWeaponData() {
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
        document.getElementById("powerUpWeapon").src = weapon.weapon_image;
        document.getElementById("weaponName").innerHTML = "&lt;" + weapon.weapon_name + "&gt;";
        document.getElementById("weaponLevel").innerHTML = "レベル：" + weapon.weapon_level + "/100";
        document.getElementById("weaponAttack").innerHTML = "総合力：" + weapon.weapon_attack;
        document.getElementById("power_ber").value = weapon.overlap;
        document.getElementById("power_ber").low = weapon.overlap;
        document.getElementById("power_ber").max = 5;
        document.getElementById("overlap_text").innerHTML = weapon.overlap + "/5";
    }
}

// 非進化武器の検査(weapon_idを１に固定)
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
            var weaponHtml = '<div class="item_border" id="' + weapon.weapon_id + '" onclick="selected(this)"><p class="overlap_color">' + weapon.overlap + '</p><img class="power_for_item_image" src="' + weapon.weapon_image + '"><p class="level_text">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("item_frame").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

//武器強化
function updateWeaponPowerUp() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    var getExp = 0;
    //強化素材の使用個数を取得
    var ritem = document.getElementById("counter1").value
    var sritem = document.getElementById("counter2").value
    var ssritem = document.getElementById("counter3").value
    //取得経験値を計算
    getExp = getExp + (Number(ritem) * 50);
    getExp = getExp + (Number(sritem) * 100);
    getExp = getExp + (Number(ssritem) * 500);
    // 武器の経験値をプラスする
    getExp = getExp + Number(document.getElementById("power_ber").low);
    var weapon_level = Math.floor(getExp / 1000);
    var weapon_exp = getExp % 1000;

    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    LoadWeapon.equalTo("objectId", "ReG7XyQhFYZnW7BM")
        .fetch()
        .then(function (results) {
            // 獲得経験値に応じて、レベルと経験値を上昇
            Weapon.equalTo("weapon_id", results.weapon_id)
                .fetch()
                .then(function (results) {
                    results.set("weapon_level", Number(results.weapon_level) + weapon_level)
                        .set("weapon_exp", weapon_exp);
                    results.update();
                    updateItemSum();
                })
                .catch(function () {
                    console.log("nng");
                });
        })
        .catch(function () {
            console.log("loadWeapon:ng");
        });
}

// 武器進化
function updateWeaponEvolution() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.WEAPON_DB);
    var LoadWeapon = ncmb.DataStore(this.LOAD_WEAPON);
    // 進化のアイテム数取得
    var usedWeapon = Number(document.getElementById("power_ber").value) - Number(document.getElementById("power_ber").low);
    // 進化対象の武器を取得
    LoadWeapon.equalTo("objectId", "ReG7XyQhFYZnW7BM")
        .fetch()
        .then(function (results) {
            // 武器の重ね合わせ数変更(武器idを1に固定)
            Weapon.equalTo("weapon_id", Number(1))
                .fetch()
                .then(function (results) {
                    // ↓取れない
                    console.log(weapon.overlap);
                    console.log(Number(weapon.overlap) + Number(usedWeapon));
                    results.set("overlap", Number(results.overlap) + Number(usedWeapon));
                    results.update();
                    console.log("sinka:ok");
                    EvolutionSuccsess();
                })
                .catch(function (err) {
                    console.log("sinka:ng");
                });

            // 使用した武器を削除(冬休み後作成)
            // Weapon.equalTo("weapon_name", weapon.weapon_name)
            //     .limit(usedWeapon)
            //     .order("weapon_id", true)
            //     .fetchAll()
            //     .then(function (results) {
            //         results.delete();
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
        })
        .catch(function (err) {
            console.log(err);
        });
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
            var weaponHtml = '<div class="item_border" onclick="setSoloPowerWeaponId(' + weapon.weapon_id + ')" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
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
            var weaponHtml = '<div class="item_border" onclick="setSoloPowerWeaponId(' + weapon.weapon_id + ')" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
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
            var weaponHtml = '<div class="item_border" onclick="setSoloPowerWeaponId(' + weapon.weapon_id + ')" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material"  src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
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
            var weaponHtml = '<div class="item_border" onclick="setSoloEvoWeaponId(' + weapon.weapon_id + ')" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
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
            var weaponHtml = '<div class="item_border" onclick="setSoloEvoWeaponId(' + weapon.weapon_id + ')" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material" src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
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
            var weaponHtml = '<div class="item_border" onclick="setSoloEvoWeaponId(' + weapon.weapon_id + ')" id="' + weapon.weapon_id + '"><p class="overlap_color">' + weapon.overlap + '</p><img class="list_material"  src="' + weapon.weapon_image + '"><p class="item_text_position">Lv' + weapon.weapon_level + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}