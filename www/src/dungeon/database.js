/* データベースアクセスを行うjs */
/* 作成中は固定値を記載して、後からDBに変更する */
class Database{

    static applicationKey = '143f42bd82f20826946c4c8cc877ce1bd500d3097a29a5c8a5abf86d903af183';
    static clientKey = '62e4efddf1009cd6b7558b2d720d395f4cd43c73cdfa89a289112ee54ed165ac';
    static ncmb;

    /* 初期化 */
    static initialize(){
        this.enemyCount = 0
        //this.ncmb = new NCMB(this.applicationKey, this.clientKey);
    }

    /* DB接続テストのメソッド */
    static test(){
        const id = 'test';
        const TestDataStore = this.ncmb.DataStore(id);
        const testDataStore = new TestDataStore();

        testDataStore.set('col', 'test1').set('col2', 'test2').set('col3', 'test3').save().then(function(testDataStore){
            //登録成功
            console.log('testDB:OK'); //test
        }).catch(function(err){
            //登録失敗
            console.log('testDB:NG'); //test
        });
    }

    /* プレイヤー情報取得 */
    static getPlayer(id = NaN){
        let playerData = {};
        return playerData;
    }

    static getEnemy(id = NaN){
        this.enemyCount += 1
        const enemyData = {
            type:"main",//データの種類
            enemyId:'E0001', //モンスターID
            enemyName:"スライム",//名前
            level: 1, //レベル
            distinction: this.enemyCount,//同モンスターの重複番号
            direction:"down",
            hp:{current:10, max:999, min:0}, 
            atk: {current: 2,max: 200 , min: 0},//攻撃力
            def: {current: 1,max: 2 , min: 0},//防御力
            cri: {current: 0.05,max: 0.25 , min: 0},//会心率
            avd: {current: 0.01,max: 0.05 , min: 0},//回避率
            dex: {current: 1,max: 100 , min: 0.5},//命中率 
            exp: 2,//基礎経験値
            size:1//モンスターの使用ます
            };
        
        return enemyData
    }

    static getItem(id = NaN){
        const itemArray = [{
            itemId: 'IW000',//アイテムID
            itemName: 'ひのきのぼう',
            skill:'SA001',
            usageLimit: null
            }
        ,{
            itemId: 'IS000',//アイテムID
            itemName: '木の盾',
            usageLimit: null
            }
        ,{
            itemId: 'IT000',//アイテムID
            itemName: '薬草',
            skillId:0,
            usageLimit: 1
            }]
        for(let element of itemArray){
            if(element.itemId == id){
                return element

            }
        }
    }

    static getTrap(id = NaN){
        const trapArray = [{
            trapId: 'T0000',//アイテムID
            trapName: '階段',
            hideFlg: false
            },{
            trapId: 'T0001',//アイテムID
            trapName: '地雷',
            hideFlg: true
            }]
        for(let element of trapArray){
            if(element.trapId == id){
                return element

            }
        }
    }
}