class App{
    constructor(){
        this.height;
        this.whidt;
        this.field;
        this.cont;
        this.startApp=this.startApp.bind(this);
        this.setSize=this.setSize.bind(this);
        this.setCont=this.setCont.bind(this);
        this.arrSum=this.arrSum.bind(this);
        this.lifeStatus=this.lifeStatus.bind(this);
        this.changeLifeStatus=this.changeLifeStatus.bind(this);
        this.createField=this.createField.bind(this);
        this.showField=this.showField.bind(this);
        this.changeField=this.changeField.bind(this);
    }
    setCont(a){
        this.cont = document.querySelector(`#${a}`);
    }
    setSize(a, b){
        this.height = a;
        this.whidt = b;
    }
    copyField(){
        let newField = [];
        for (let i=0;i<this.field.length; i++){
            newField[i] = this.field[i].slice();
        }
        return newField;
    }
    arrSum(arr){
        let sum=0;
        arr.forEach(e => {
           sum+=e; 
        });
        return sum;
    }
    lifeStatus(){
        return Math.round(Math.random());
    }
    changeLifeStatus(i,j,tmp,arr){
        if(this.field[i][j]==0&&this.arrSum(arr)==3){
            tmp[i][j]=1;
        }if(this.field[i][j]==1&&this.arrSum(arr)<2||this.field[i][j]==1&&this.arrSum(arr)>3){
            tmp[i][j]=0;
        } 
    }
    createField(){
        let tmpField = [];
        for(let i=0;i<this.height;i++){
            tmpField[i] = [];
            for(let j=0;j<this.whidt;j++){
                tmpField[i].push(this.lifeStatus());
            }
        }
        this.field = tmpField;
    }
    showField(){
        let table = document.createElement('table');
        for(let i=0;i<this.height;i++){
            let row = document.createElement('tr');
            for(let j=0;j<this.whidt;j++){
                let col = document.createElement('td');
                col.innerHTML=this.field[i][j];
                row.append(col);
            }
            table.append(row);
        }
        this.cont.innerHTML="";
        this.cont.append(table);
    }
    changeField(){
        let tmp = this.copyField();
        for(let i=0;i<this.height;i++){
            for(let j=0;j<this.whidt;j++){
                let tmpArr=[];
                if(tmp[i-1]==undefined){
                        tmpArr.push(
                            tmp[i][j-1],                tmp[i][j+1],
                            tmp[i+1][j-1],tmp[i+1][j],tmp[i+1][j+1]
                            )
                        for(let i=0;i<tmpArr.length;i++){
                            if(tmpArr[i]==undefined){
                                tmpArr[i]=0;
                            }
                        }
                }if(tmp[i+1]==undefined){
                        tmpArr.push(
                            tmp[i-1][j-1],tmp[i-1][j],tmp[i-1][j+1],
                            tmp[i][j-1],                tmp[i][j+1],
                            )
                        for(let i=0;i<tmpArr.length;i++){
                            if(tmpArr[i]==undefined){
                                tmpArr[i]=0;
                            }
                        }
                }if(tmp[i+1]!=undefined&&tmp[i-1]!=undefined){
                        tmpArr.push(
                            tmp[i-1][j-1],tmp[i-1][j],tmp[i-1][j+1],
                            tmp[i][j-1],                tmp[i][j+1],
                            tmp[i+1][j-1],tmp[i+1][j],tmp[i+1][j+1]
                            )
                        for(let i=0;i<tmpArr.length;i++){
                            if(tmpArr[i]==undefined){
                                tmpArr[i]=0;
                            }
                        }
                }
                this.changeLifeStatus(i,j,tmp,tmpArr);             
            }
        }
        this.field = tmp;
        this.showField();
    }
    showLog(){
        let tmp=[];
        for(let i=0;i<this.field.length;i++){
            tmp.push(this.field[i].join(" "));
        }
        let outPutField = tmp.join("\n");
        console.log(outPutField);
    }
    startApp(){
        this.setSize(20, 40);
        this.setCont("test");
        this.createField();
        this.showField();
        setInterval(this.changeField, 1000);
    }
}
let test = new App;
window.addEventListener("load", test.startApp);


