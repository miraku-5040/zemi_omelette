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
    static getRandomInt(max, min = 0) {
        if(Array.isArray(max)){
            return max[this.getRandomInt(max.length)]
        }else{
            const int = max - min
            return Math.floor(Math.random() * int + min);
        }
    }

}