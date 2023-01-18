class Tool{
    /**
     * ディープコピーを行う
     */
    static deepCopy(object){
        const copyObject = JSON.parse(JSON.stringify(object));
        return copyObject;
    }
    
    /**
     * ランダムな整数を返す
     */
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}