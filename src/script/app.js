class App{
    constructor(){
        this.startApp=this.startApp.bind(this);
        this.setSize=this.setSize.bind(this);
        this.setCont=this.setCont.bind(this);
        this.arrSum=this.arrSum.bind(this);
        this.lifeStatus=this.lifeStatus.bind(this);
        this.changeLifeStatus=this.changeLifeStatus.bind(this);
        this.createField=this.createField.bind(this);
        this.showField=this.showField.bind(this);
        this.changeField=this.changeField.bind(this);
        this.getRandom=this.getRandom.bind(this);
        this.stopChange=this.stopChange.bind(this);
        this.dropChange=this.dropChange.bind(this);
    }
    setCont(a){
        this.cont = document.querySelector(`#${a}`);
    }
    getRandom(min, max){
        return Math.floor(Math.random()*(max-min+1))+min;
    }
    setSize(a = this.getRandom(50, 100), b = this.getRandom(50, 100)){
        // Создание размеров поля
        this.height = a;
        this.width = b;
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
        // Рандомное состояние элементов поля
        return Math.round(Math.random());
    }
    changeLifeStatus(i,j,tmp,arr){
        // Метод изменяющий состояние поля програмно
        if(this.field[i][j]==0&&this.arrSum(arr)==3){
            tmp[i][j]=1;
        }if(this.field[i][j]==1&&this.arrSum(arr)<2||this.field[i][j]==1&&this.arrSum(arr)>3){
            tmp[i][j]=0;
        } 
    }
    createField(e){
        if(this.action){
            return
        }
        let controller = document.querySelector(".app-field-controller");
        controller.style.display="block";
        let tmpField = [];
        // Создание массива данных для поля
        if(e.target.id=="rand"){
            this.setSize();
            for(let i=0;i<this.height;i++){
                tmpField[i] = [];
                for(let j=0;j<this.width;j++){
                    tmpField[i].push(this.lifeStatus());
                }
            }
        }
        if(e.target.id=="set"){
            let a=document.querySelector("#height").value;
            let b=document.querySelector("#width").value;
            this.setSize(a,b);
            for(let i=0;i<this.height;i++){
                tmpField[i] = [];
                for(let j=0;j<this.width;j++){
                    tmpField[i].push(0);
                }
            }
        }
        this.field = tmpField;
        // Сам массив
        this.showField();
    }
    showField(){
        let table = document.createElement('table');
        table.className="table-field";
        // Отрисовка поля из массива данных
        for(let i=0;i<this.height;i++){
            let row = document.createElement('tr');
            for(let j=0;j<this.width;j++){
                let col = document.createElement('td');
                if(this.field[i][j]==1){
                    col.className="alive";
                }else{
                    col.className="dead";
                };
                if(!this.action){
                    // Ручное изменение состояний элементов поля
                    col.addEventListener("click", (e)=>{
                        console.log(e.target.className)
                        if(e.target.className=="dead"){
                            e.target.className="alive";
                            this.field[i][j]=1;
                        }else{
                            e.target.className="dead";
                            this.field[i][j]=0;
                        }
                    });
                }
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
            for(let j=0;j<this.width;j++){
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
        // Создание таймера
        this.action = setTimeout(this.changeField, 1000);
    }
    stopChange(){
        clearTimeout(this.action);
        this.action=1;
    }
    dropChange(){
        if(this.action){
            this.stopChange();
            this.action=false;
        }
        this.height=undefined;
        this.width=undefined;
        this.field=undefined;
        let table=document.querySelector(".table-field");
        table.remove();
    }
    startApp(){
        document.querySelector("#rand").addEventListener("click", this.createField);
        document.querySelector("#set").addEventListener("click", this.createField);
        document.querySelector("#start").addEventListener("click", this.changeField);
        document.querySelector("#stop").addEventListener("click", this.stopChange);
        document.querySelector("#drop").addEventListener("click", this.dropChange);
        this.setCont("app-field-container");
    }
}
let test = new App;
window.addEventListener("load", test.startApp);




