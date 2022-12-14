/* スキルの処理を行う */
class Skill{

// test
    static skillDataMap; //スキル内容を保存するMap (skilld : {内容})
    // スキル使用キャラの座標

    /* 初期化 */
    static initialize(){
        this.skillDataMap = new Map();
    }

    /* スキル使用 */
    static action(skillId){
        const skillData = this.skillDataMap.get(Number(skillId));
        if(skillData === undefined){
            // 指定したスキルidのデータがMapにない
            this.setSkillDataMap([skillId]);
            skillData = this.skillDataMap.get(Number(skillId));
        }
        this.skillExe(skillData);
    }

    /* 効果範囲内に効果を実行 */
    static skillExe(skillData){
        switch(skillData.type){
            case "one":
                this.typeOne(skillData);
                break;
            default:
                break;
        }
    }

    /* スキル情報を取得してskillDataMapにセットする */
    static setSkillDataMap(skillIdArray = []){
        /* 開発用にデータをセット skillId = 1に一つ上のマスの敵に攻撃するスキルを設定*/
        skillId = 1;
        skillData = {type:"one", x:0, y:-1, target:"enemy"};
        this.skillDataMap.set(skillId, skillData);
        /* end */
        // skillIdArray.forEach((skillId) => {
        //     // TODO データベースから取得するようにする
        //     this.skillDataMap.set(skillId, skillData);
        // });
    }

    /* type別の処理メソッド */
    static typeOne(skillData){
    }
}