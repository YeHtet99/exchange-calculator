let input=document.getElementById("input");
let from=document.getElementById("from");
let to=document.getElementById("to");
let result=document.getElementById("result");
let histoyrList=document.getElementById("historyList");

function createOption(x,y,z){
    let o=document.createElement("option");
    let t=document.createTextNode(y);
    o.setAttribute("value",toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}

function toNum(x){
    return Number(x.replace(",",""));
}

for(x in data.rates){
    createOption(from,x,data.rates[x])
    createOption(to,x,data.rates[x])
    // console.log(x,data.rates[x]);
}
function createtr(x){
    let rowspacer=document.getElementById("rowspacer");
    if(rowspacer){
        rowspacer.remove();
    }
    let tr=document.createElement("tr");
   

    x.map(function(el){
        let td=document.createElement("td");
        let text=document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })
   histoyrList.appendChild(tr);
}
//just record in local storage
function store(){
    localStorage.setItem("record",histoyrList.innerHTML);
}

document.getElementById("calc").addEventListener("submit",function(e){
    e.preventDefault();
    //get state
    let x=input.value;
    let y=from.value;
    let z=to.value;
    // console.log(x,y,z);

    //process
    let fromtext=x+" "+from.options[from.selectedIndex].innerHTML;
    let totext=to.options[to.selectedIndex].innerHTML;
    
    let first=x*y;
    let second=first/z;
    let resultNum=second.toFixed(2);
    let date=new Date().toLocaleString();
    //set state
    result.innerHTML=resultNum;
    let arr=[date,fromtext,totext,resultNum];
    input.value="";
    input.focus();
    from.value="";
    to.value=1;
    createtr(arr);
    store();
});

(function(){
    if(localStorage.getItem("record")){
        histoyrList.innerHTML=localStorage.getItem("record");
    }else{
        histoyrList.innerHTML=`<tr id="rowspacer"><td colspan="4">There is no record</td></tr>`;
    }
})();

function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("mode-icon").classList.toggle("fa-sun");
}




