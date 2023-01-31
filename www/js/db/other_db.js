// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var CHARACTER_DB = "character";
var NOTICE_DB = "notice";
var PRESENT_DB = "present";
var ITEM_DB = "item";
var SKILL_DB = "skill";
var DAIRY_DB = "dairy";
var CHAT_DB = "chat";
var ENEMY_DB = "enemy";
var DAIRY_AHIEVE_DB = "dairy_achieve";
var ACHIEVE_DB = "achieve";
var GUILD_ACHIEVE_DB = "guild_achieve";
var EVENT_ACHIEVE_DB = "event_achieve";

// プレゼントデータ取得
function getPresentData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Present = ncmb.DataStore(this.PRESENT_DB);
    Present.fetchAll()
        .then(function (results) {
            setPresentData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setPresentData(results) {
        // 初期化
        document.getElementById("modal-body").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var present = results[i];
            // 新しいHTML要素を作成
            var presentHtml = '<div class="present_box"><h4 class="present_title">' + present.present_title + '</h4><p class="present_text">' + present.present_content + '</p><button class="present_button" id="present_button" value="' + present.objectId + '" onclick="getSoloPresentData(this)">受け取る</button></div>';
            // 作成した要素を追加
            document.getElementById("modal-body").insertAdjacentHTML('beforeend', presentHtml);
        }
    }
}

// プレゼントデータ1件取得→アイテムに追加
function getSoloPresentData(element) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Present = ncmb.DataStore(this.PRESENT_DB);
    var item_count = "";
    var objectId = String(document.getElementById("present_button").value);
    // アイテムidからプレゼント個数を割り出す
    Present.equalTo("objectId", objectId)
        .fetchAll()
        .then(function (results) {
            var present = results[0];
            item_count = present.present_count;
            // アイテム移動
            Item.equalTo("item_id", present.present_item)
                .fetchAll()
                .then(function (results) {
                    var item = results[0];
                    results[0].set("sum", Number(item.sum) + Number(item_count));
                    return results[0].update();
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
    presentReceive();
}

// キャラクター情報取得
function getCharacterData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // キャラクター情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        // ランク入れ替え
        document.getElementById("rank_text").innerHTML = 'ランク' + character.character_rank;
        // プレイヤー名入れ替え
        document.getElementById("player_name").innerHTML = character.character_name;
        // Exp入れ替え
        document.getElementById("exp_text").innerHTML = character.character_exp + '/1000';
        document.getElementById("exp_ber").value = character.character_exp;
        // コイン入れ替え
        document.getElementById("money").innerHTML = character.money;
        // 水晶入れ替え
        document.getElementById("crystal").innerHTML = character.crystal;
        // 攻撃力入れ替え
        document.getElementById("attack").innerHTML = '攻撃力：' + character.character_attack;
        // 回避率入れ替え
        document.getElementById("avoid").innerHTML = '回避率：' + character.character_avoid;
        // 会心率入れ替え
        document.getElementById("avd").innerHTML = '会心率：' + character.character_avd;
        // 命中率入れ替え
        document.getElementById("hit").innerHTML = '命中率：' + character.character_hit;
        // 職業入れ替え
        document.getElementById("job").innerHTML = '職業：' + character.character_job;
    }
}

// キャラクター情報取得(短縮版)
function getShorteCharacterData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // キャラクター情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        // ランク入れ替え
        document.getElementById("rank_text").innerHTML = 'ランク' + character.character_rank;
        // プレイヤー名入れ替え
        document.getElementById("player_name").innerHTML = character.character_name;
        // Exp入れ替え
        document.getElementById("exp_text").innerHTML = character.character_exp + '/1000';
        document.getElementById("exp_ber").value = character.character_exp;
    }
}

// キャラクター情報取得(プレイヤー情報版)
function getPlayerCharacterData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // キャラクター情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        // プレイヤー名入れ替え
        document.getElementById("player_name").innerHTML = character.character_name;
        // ランク入れ替え
        document.getElementById("rank_text").innerHTML = 'ランク：' + character.character_rank;
    }
}

// コイン所持数表示
function getMoneyCount() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // コイン情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        document.getElementById("money").innerHTML = character.money;
    }
}

// 水晶所持数表示
function getCrystalCount() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 水晶情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        document.getElementById("crystal").innerHTML = character.crystal;
    }
}

// イベントポイント取得
function getEventPointCount() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // コイン情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        document.getElementById("point").innerHTML = character.event_point;
    }
}

// ギルドコイン取得
function getGuildCoinCount() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // コイン情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        document.getElementById("money").innerHTML = character.guild_coin;
    }
}

// 水晶減少
function updateCrystalCount(crystal) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("crystal", Number(item.crystal - Number(crystal)));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// イベントポイント減少
function updateEventPointCount(point) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("event_point", Number(item.event_point - Number(point)));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
    // イベントポイント数表示
    getEventPointCount();
}

// イベントポイント増加
function updateEventPointCountUp(point) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("event_point", Number(item.event_point + Number(point)));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
    // イベントポイント数表示
    getEventPointCount();
    setTimeout('window.location.href = "../html/event.html"', 1500);
}

// 通知情報取得
function getNoticeData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Notice = ncmb.DataStore(this.NOTICE_DB);
    Notice.fetchAll()
        .then(function (results) {
            setNoticeText(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 通知の題名と文章をHTMLに埋め込む
    function setNoticeText(results) {
        // 初期化
        document.getElementById("notice_body").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var notice = results[i];
            // 新しいHTML要素を作成
            var noticeHtml = '<button class="notice_button"><h2>' + notice.notice_title + '</h2><p>' + notice.notice_content + '</p></button>';
            // 作成した要素を追加
            document.getElementById("notice_body").insertAdjacentHTML('beforeend', noticeHtml);
        }
    }
}

// スキル機能
function getSkillData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Skill = ncmb.DataStore(this.SKILL_DB);
    Skill.order("skill_id", false)
        .fetchAll()
        .then(function (results) {
            setSkillData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setSkillData(results) {
        var skill = results[0];
        document.getElementById("fire_level").innerHTML = 'Lv.' + skill.skill_level;
        skill = results[1];
        document.getElementById("water_level").innerHTML = 'Lv.' + skill.skill_level;
        skill = results[2];
        document.getElementById("ice_level").innerHTML = 'Lv.' + skill.skill_level;
        skill = results[3];
        document.getElementById("wind_level").innerHTML = 'Lv.' + skill.skill_level;
        skill = results[4];
        document.getElementById("thunder_level").innerHTML = 'Lv.' + skill.skill_level;
        skill = results[5];
        document.getElementById("light_level").innerHTML = 'Lv.' + skill.skill_level;
        skill = results[6];
        document.getElementById("dark_level").innerHTML = 'Lv.' + skill.skill_level;
    }
}

// スキルレベル上昇
function updateSkillData(skill) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Skill = ncmb.DataStore(this.SKILL_DB);
    // スキルのレベルを上げる
    Skill.equalTo("skill_name", skill)
        .fetchAll()
        .then(function (results) {
            console.log("ck:" + results[0].skill_name);
            console.log("skill:" + results[0].skill_level);
            var skill_detail = results[0];
            results[0].set("skill_level", Number(skill_detail.skill_level) + 1);
            console.log("ok");
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            // 書物冊数を減らす
            Item.equalTo("item_id", 4)
                .fetchAll()
                .then(function (results) {
                    console.log("ckItem:" + results[0].item_id);
                    console.log("cksum:" + results[0].sum);
                    var item = results[0];
                    results[0].set("sum", Number(item.sum) - 1);
                    console.log("ok");
                    return results[0].update();
                })
                .catch(function (err) {
                    console.log(err);
                });
            // スキル強化素材の残数表示
            getskillItemData();
            // 画面更新
            setTimeout('window.location.href = "skill.html"', 1500);
        });
}

// スキル強化素材の残数表示
function getskillItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    Item.equalTo("item_id", 4)
        .fetchAll()
        .then(function (results) {
            setItemText(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // スキル強化素材残量を表示する
    function setItemText(results) {
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var item = results[i];
            // 作成した要素を追加
            document.getElementById("skill_item").innerHTML = item.sum;
        }
    }
}

// ショップ機能(武器屋)
function buy_weapon(item) {
    // 音声再生
    audio = new Audio("../sound/buy.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    // アイテム追加
    Item.equalTo("item_id", Number(item))
        .fetchAll()
        .then(function (results) {
            var item = results[0];
            console.log("ckItemSum:" + results[0].sum);
            results[0].set("sum", Number(item.sum) + 1);
            console.log("ok");
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        })
        // コイン減少
        .then(function () {
            Character.fetchAll()
                .then(function (results) {
                    var item = results[0];
                    console.log("ckbuki:" + item.money);
                    results[0].set("money", Number(item.money - 2000));
                    console.log("ok");
                    return results[0].update();
                })
                .catch(function (err) {
                    console.log(err);
                });

            setTimeout('window.location.href = "weaponShop.html"', 1500)
        });
}

// ショップ機能(食料品店)
function buy_item(item) {
    // 音声再生
    audio = new Audio("../sound/buy.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    // アイテム追加(動かない)
    Item.equalTo("item_id", Number(item))
        .fetchAll()
        .then(function (results) {
            var item = results[0];
            console.log("ckItem:" + results[0].sum);
            results[0].set("sum", Number(item.sum) + 1);
            console.log("ok");
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        })
        // コイン減少
        .then(function () {
            Character.fetchAll()
                .then(function (results) {
                    var item = results[0];
                    console.log("ckshokuryo:" + item.money);
                    results[0].set("money", Number(item.money - 2000));
                    console.log("ok");
                    return results[0].update();
                })
                .catch(function (err) {
                    console.log(err);
                });

            setTimeout('window.location.href = "itemShop.html"', 1500)
        });
}

// ショップ機能(書店)
function buy_book(item) {
    // 音声再生
    audio = new Audio("../sound/buy.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    // アイテム追加(動かない)
    Item.equalTo("item_id", Number(item))
        .fetchAll()
        .then(function (results) {
            var item = results[0];
            console.log("ckItem:" + results[0].sum);
            results[0].set("sum", Number(item.sum) + 1);
            console.log("ok");
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        })
        // コイン減少
        .then(function () {
            Character.fetchAll()
                .then(function (results) {
                    var item = results[0];
                    console.log("ckshoten:" + item.money);
                    results[0].set("money", Number(item.money - 2000));
                    console.log("ok");
                    return results[0].update();
                })
                .catch(function (err) {
                    console.log(err);
                });

            setTimeout('window.location.href = "skillShop.html"', 1500)
        });
}

// ショップ(ギルド)機能
function guildBuy(item) {
    // 音声再生
    audio = new Audio("../sound/buy.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    // アイテム追加
    Item.equalTo("item_id", Number(item))
        .fetch()
        .then(function (results) {
            var item = results[0];
            results[0].set("sum", Number(item.sum) + 1);
            console.log("ok");
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        })
        // ギルドコイン減少
        .then(function () {
            Character.fetchAll()
                .then(function (results) {
                    var item = results[0];
                    results[0].set("guild_coin", Number(item.guild_coin - 2000));
                    console.log("ok");
                    return results[0].update();
                })
                .catch(function (err) {
                    console.log(err);
                });

            setTimeout('window.location.href = "../html/guildShop.html"', 1500);
        });
}

// 毎日ログイン機能のアイテム表示(通常)
function getNomalLoginData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.DAIRY_DB);
    Dairy.equalTo("rare", "N")
        .equalTo("flag", 0)
        .order("id", false)
        .fetchAll()
        .then(function (results) {
            setLoginText(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setLoginText(results) {
        // 初期化
        document.getElementById("nomalLogin").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var login = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="login_dairy" onclick="updateLoginData(' + login.id + ',' + login.item_id + ',' + login.count + ')"><p class="login_dairy_title">' + login.id + '日目</p><img class="login_dairy_image" src="' + login.image + '"><p class="login_dairy_count">×' + login.count + '</p></div>';
            // 作成した要素を追加
            document.getElementById("nomalLogin").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// 毎日ログイン機能のアイテム表示(レア)
function getRareLoginData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.DAIRY_DB);
    Dairy.equalTo("rare", "R")
        .equalTo("flag", 0)
        .order("id", false)
        .fetchAll()
        .then(function (results) {
            setLoginText(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setLoginText(results) {
        // 初期化
        document.getElementById("rareLogin").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var login = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="login_dairy" onclick="updateLoginData(' + login.id + ')"><p class="login_dairy_title">' + login.day + '日目</p><img class="login_dairy_image" src="' + login.image + '"><p class="login_dairy_count">×' + login.count + '</p></div>';
            // 作成した要素を追加
            document.getElementById("rareLogin").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// 毎日ログイン機能(更新)
function updateLoginData(id, itemId, count) {
    // 音声再生
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.DAIRY_DB);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            results[0].set("flag", 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
    if (Number(itemId) == 10) {
        Character.fetchAll()
            .then(function (results) {
                var item = results[0];
                results[0].set("crystal", Number(item.crystal + Number(count)));
                return results[0].update();
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        // アイテム増加(item_db.js)
        updateSoloItemData(Number(itemId), count);
    }
    setTimeout('window.location.href = "../html/dayLogin.html"', 1500);
}

// コイン購入機能
function updateCoin() {
    // 音声再生
    audio = new Audio("sound/buy.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("money", Number(item.money + 1000));
            results[0].set("crystal", Number(item.crystal - 10));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
    // コイン残量表示
    getMoneyCount();
    // 水晶残量表示
    getCrystalCount();
    setTimeout('window.location.href = "home.html"', 1500);
}

// デイリー表示機能
function getDairyData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.DAIRY_AHIEVE_DB);

    Dairy.equalTo("flag", 0)
        .fetchAll()
        .then(function (results) {
            setDairy(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setDairy(results) {
        // 初期化
        document.getElementById("dairy_modal-body").innerHTML = '';
        for (var i = 0; i <= results.length - 1; i++) {
            // 情報取得
            var dairy = results[i];
            if (Number(dairy.count) >= Number(dairy.max)) {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="image/coins.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button1" onclick="updateDairyData(' + dairy.id + ');updateCoinUp(1000)">完了</button></div>';
                // 作成した要素を追加
                document.getElementById("dairy_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            } else {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="image/coins.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button2">未完了</button></div>';
                // 作成した要素を追加
                document.getElementById("dairy_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            }
        }
    }
}

function updateDairyData(id) {
    // 音声再生
    audio = new Audio("sound/succsess.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.DAIRY_AHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            results[0].set("flag", 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function updateDairyCountUp(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.DAIRY_AHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            dairy = results[0];
            results[0].set("count", Number(dairy.count) + 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getAchieveData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.ACHIEVE_DB);

    Dairy.equalTo("flag", 0)
        .fetchAll()
        .then(function (results) {
            setDairy(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setDairy(results) {
        // 初期化
        document.getElementById("achieve_modal-body").innerHTML = '';
        for (var i = 0; i <= results.length - 1; i++) {
            // 情報取得
            var dairy = results[i];
            if (Number(dairy.count) >= Number(dairy.max)) {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="image/diamond.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button1" onclick="updateAchieveData(' + dairy.id + ');updateDiaUp(10)">完了</button></div>';
                // 作成した要素を追加
                document.getElementById("achieve_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            } else {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="image/diamond.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button2">未完了</button></div>';
                // 作成した要素を追加
                document.getElementById("achieve_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            }
        }
    }
}

function updateAchieveData(id) {
    // 音声再生
    audio = new Audio("sound/succsess.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.ACHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            results[0].set("flag", 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function updateAchieveCountUp(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.ACHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            dairy = results[0];
            results[0].set("count", Number(dairy.count) + 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getGuildAchieveData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.GUILD_ACHIEVE_DB);

    Dairy.equalTo("flag", 0)
        .fetchAll()
        .then(function (results) {
            setDairy(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setDairy(results) {
        // 初期化
        document.getElementById("event_modal-body").innerHTML = '';
        for (var i = 0; i <= results.length - 1; i++) {
            // 情報取得
            var dairy = results[i];
            if (Number(dairy.count) >= Number(dairy.max)) {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="../image/guild_coins.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button1" onclick="updateGuildAchieveData(' + dairy.id + ');updateGuildCoinUp(1000)">完了</button></div>';
                // 作成した要素を追加
                document.getElementById("event_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            } else {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="../image/guild_coins.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button2">未完了</button></div>';
                // 作成した要素を追加
                document.getElementById("event_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            }
        }
    }
}

function updateGuildAchieveData(id) {
    // 音声再生
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.GUILD_ACHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            results[0].set("flag", 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function updateGuildAchieveCountUp(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.GUILD_ACHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            dairy = results[0];
            results[0].set("count", Number(dairy.count) + 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getEventAchieveData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.EVENT_ACHIEVE_DB);

    Dairy.equalTo("flag", 0)
        .fetchAll()
        .then(function (results) {
            setDairy(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setDairy(results) {
        // 初期化
        document.getElementById("event_modal-body").innerHTML = '';
        for (var i = 0; i <= results.length - 1; i++) {
            // 情報取得
            var dairy = results[i];
            if (Number(dairy.count) >= Number(dairy.max)) {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="../image/event_coins.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button1" onclick="updateEventAchieveData(' + dairy.id + ');updateEventCoinUp(1000)">完了</button></div>';
                // 作成した要素を追加
                document.getElementById("event_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            } else {
                // 新しいHTML要素を作成
                var itemHtml = '<div class="goal_box"><p class="goal_box_text">' + dairy.content + '</p><img class="goal_box_image" src="../image/event_coins.png"><p class="goal_box_count">×' + dairy.coin + '</p><button class="goal_box_button2">未完了</button></div>';
                // 作成した要素を追加
                document.getElementById("event_modal-body").insertAdjacentHTML('beforeend', itemHtml);
            }
        }
    }
}

function updateEventAchieveData(id) {
    // 音声再生
    audio = new Audio("../sound/succsess.m4a");
    audio.play();
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.EVENT_ACHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            results[0].set("flag", 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function updateEventAchieveCountUp(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.EVENT_ACHIEVE_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            dairy = results[0];
            results[0].set("count", Number(dairy.count) + 1);
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// チャット読み込み機能
function getAllChatData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Chat = ncmb.DataStore(this.CHAT_DB);
    Chat.equalTo("type", "all")
        .order("createDate", false)
        .fetchAll()
        .then(function (results) {
            setChat(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setChat(results) {
        document.getElementById("chat_type").innerHTML = '全体チャット';
        document.getElementById("new_chat_button").onclick = updateAllChatData();
        // 初期化
        document.getElementById("chats").innerHTML = '';
        for (var i = 0; i <= results.length - 1; i++) {
            // 情報取得
            var chat = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="solo_chat"><p class="chat_text">' + chat.name + '：' + chat.comment + '</p></div>';
            // 作成した要素を追加
            document.getElementById("chats").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// チャット読み込み機能
function getGuildChatData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Chat = ncmb.DataStore(this.CHAT_DB);
    Chat.equalTo("type", "guild")
        .order("createDate", false)
        .fetchAll()
        .then(function (results) {
            setChat(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setChat(results) {
        document.getElementById("chat_type").innerHTML = 'ギルドチャット';
        document.getElementById("new_chat_button").onclick = updateGuildChatData();
        // 初期化
        document.getElementById("chats").innerHTML = '';
        for (var i = 0; i <= results.length - 1; i++) {
            // 情報取得
            var chat = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="solo_chat"><p class="chat_text">' + chat.name + '：' + chat.comment + '</p></div>';
            // 作成した要素を追加
            document.getElementById("chats").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// チャット更新機能
function updateAllChatData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Chat = ncmb.DataStore(this.CHAT_DB);
    let comment = document.getElementById('new_chat_text');
    Chat.set("type", "all")
        .set("name", "player")
        .set("comment", comment)
        .save()
        .then(function (results) {
            getAllChatData()
        })
        .catch(function (err) {
            console.log(err);
        });
}

// チャット更新機能
function updateGuildChatData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Chat = ncmb.DataStore(this.CHAT_DB);
    let comment = document.getElementById('new_chat_text');
    Chat.set("type", "guild")
        .set("name", "player")
        .set("comment", comment)
        .save()
        .then(function (results) {
            getAllChatData()
        })
        .catch(function (err) {
            console.log(err);
        });
}

// コイン増加
function updateCoinUp(num) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("money", Number(item.money + Number(num)));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });

    setTimeout('window.location.href = "home.html"', 1500);
}

// 水晶増加
function updateDiaUp(num) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("crystal", Number(item.crystal + Number(num)));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });

    setTimeout('window.location.href = "home.html"', 1500);
}

// ギルドコイン増加
function updateGuildCoinUp(num) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("guild_coin", Number(item.guild_coin + Number(num)));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });

    setTimeout('window.location.href = "../html/guild.html"', 1500);
}

// イベントポイント増加
function updateEventCoinUp(num) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results[0].set("event_point", Number(item.event_point + Number(num)));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });

    setTimeout('window.location.href = "../html/event.html"', 1500);
}