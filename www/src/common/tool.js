class Tool{
    /**
     * ディープコピーを行う
     */
    static deepCopy(object){
        const copyObject = JSON.parse(JSON.stringify(object));
        return copyObject;
    }
}