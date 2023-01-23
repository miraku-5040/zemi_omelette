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
                    console.log(Number(item.sum) + Number(item_count));
                    // ↓更新が出来ない
                    results.set("sum", Number(item.sum) + Number(item_count))
                        .update();
                    console.log("ok");
                    presentReceive();
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
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
function updateSkillData(skill) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Skill = ncmb.DataStore(this.SKILL_DB);
    // スキルのレベルを上げる
    Skill.equalTo("skill_name", skill)
        .fetch()
        .then(function (results) {
            console.log(results);
            var skill_level = results[0];
            results.set("sum", Number(skill_level.sum) + 1);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });
    // 書物冊数を減らす
    Item.equalTo("item_id", 9)
        .fetch()
        .then(function (results) {
            console.log(results);
            var item = results[0];
            results.set("sum", Number(item.sum) - 1);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });
    // 画面更新
    setTimeout('window.location.href = "skill.html"', 600);
}

function getskillItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    Item.equalTo("item_id", 9)
        .fetchAll()
        .then(function (results) {
            setItemText(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 通知の題名と文章をHTMLに埋め込む
    function setItemText(results) {
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var item = results[i];
            // 作成した要素を追加
            document.getElementById("skill_item").innerHTML = item.sum;
        }
    }
}

// ショップ(アイテム)機能
function buy(item) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    // アイテム追加
    Item.equalTo("item_id", Number(item))
        .fetch()
        .then(function (results) {
            var item = results[0];
            results.set("sum", Number(item.sum) + 1);
            results.update();
        })
        .catch(function (err) {
            console.log(err);
        });
    // コイン減少
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results.set("money", Number(item.money - 2000));
            results.update();
            getMoneyCount();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// 毎日ログイン機能
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
            var itemHtml = '<div class="login_dairy" onclick="updateLoginData(' + login.id + ')"><p class="login_dairy_title">' + login.id + '日目</p><img class="login_dairy_image" src="' + login.image + '"><p class="login_dairy_count">×' + login.count + '</p></div>';
            // 作成した要素を追加
            document.getElementById("nomalLogin").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

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
function updateLoginData(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Dairy = ncmb.DataStore(this.DAIRY_DB);
    Dairy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            results.set("flag", 1);
            results.update();
            getNomalLoginData();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// コイン購入機能
function updateCoin() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results.set("money", Number(item.money + 1000));
            results.update();
            getMoneyCount();
        })
        .catch(function (err) {
            console.log(err);
        });

    Character.fetchAll()
        .then(function (results) {
            var item = results[0];
            results.set("crystal", Number(item.money - 10));
            results.update();
            getCrystalCount();
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
        // 情報取得
        var chat = results[0];
        // 新しいHTML要素を作成
        var itemHtml = '<div class="solo_chat"><p class="chat_text">' + chat.name + '：' + chat.comment + '</p></div>';
        // 作成した要素を追加
        document.getElementById("chats").insertAdjacentHTML('beforeend', itemHtml);
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
        // 情報取得
        var chat = results[0];
        // 新しいHTML要素を作成
        var itemHtml = '<div class="solo_chat"><p class="chat_text">' + chat.name + '：' + chat.comment + '</p></div>';
        // 作成した要素を追加
        document.getElementById("chats").insertAdjacentHTML('beforeend', itemHtml);
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