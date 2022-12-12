
this.expTotal=9

function expTable(lebel=1,exp=9){
    console.log(lebel+":"+this.expTotal+"-----"+exp)
    if(lebel <10){
        exp*=1.75
        this.expTotal+=exp
        lebel++
    }else if(lebel < 30){
        exp*=1.1
        this.expTotal+=exp
        lebel++
    }else{
        exp*=1.05
        this.expTotal+=exp
        lebel++
    }
    if(lebel < 100){
        expTable(lebel,exp)
    }
}

