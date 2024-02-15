//유저가 text 입력
// + 버튼을 클릭하면, 할 일이 추가된다. -> click event를 떠올릴 줄 알아야함
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 그어진다.
 // -1 check 버튼을 클릭하는 순간 true false;
 // -2 true 이면 끝난 걸로 간주 후, 밑줄 보여주기
 // -3 false 이면 안 끝난 것으로 간주하고 그대로.
// 탭을 누르면 언더바 이동
// Done 탭은 Done 탭만 none Done은 none Done의 아이템만 보여준다.
// ALL을 누르면 다시 전체 item을 보여준다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList=[];
let mode='all'; //글로벌, 전역변수
let filterList = [];
addButton.addEventListener("click" ,addTask) //이벤트, 기능

for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)})
}
console.log(tabs);

function addTask() {
    let task = {
        id : randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    } // 객체
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    // 1. 내가 선택한 탭에 따라서 
    //all taskList
    // ongoing, done filterList
    // 2. 리스트를 달리 보여준다.
    let list=[];
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList; 
    }

    
    
   
    let resultHTML="";
    for(let i=0; i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
             <button onclick="toggleComplete('${list[i].id}')">Check</button>
             <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>

    </div>`;
        }else{
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
             <button onclick="toggleComplete('${list[i].id}')">Check</button>
             <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;

        }
    }

    document.getElementById("task-board").innerHTML= resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
         break;
        }
    } // id를 찾아 배열에서, 그리고 찾으면 렌더를 불러, 렌더를 부르면 이제 렌더의 기능으로 가는거야, false, ture
    render();
    console.log(taskList);

}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }   
    render();
}
function filter(event){
    mode = event.target.id;
    filterList =[];
    if(mode === "all"){
        //전체리스트를 보여줌
        render();
    }else if(mode === "ongoing"){
        //진행중인 아이템을 보여줌
        //task.isComplete=false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            } //값을 변화시키면 ui도 변화 시켜줘야한다.
        }
        render();
        console.log("not done", filterList);
    }else if(mode === "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            } 
        }
        render();
        //끝나는 케이스
        //task.isComplete=true
    }
}

function randomIDGenerate(){
    return '_'+ Math.random().toString(36).substr(2, 9); //randomID값 받기 = 데이터 값에 ID값 받기
}
// 정보들에는 아이디 값이 필요하다는 것을 알아야함!