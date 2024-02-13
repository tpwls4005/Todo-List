//유저가 text 입력
// + 버튼을 클릭하면, 할 일이 추가된다. -> click event를 떠올릴 줄 알아야함
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 그어진다.
// 탭을 누르면 언더바 이동
// Done 탭은 Done 탭만 none Done은 none Done의 아이템만 보여준다.
// ALL을 누르면 다시 전체 item을 보여준다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList=[];
addButton.addEventListener("click" ,addTask) //이벤트, 기능

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML="";
    for(let i=0; i<taskList.length;i++){
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
             <button>Check</button>
             <button>Delete</button>
        </div>

    </div>`;
    }

    document.getElementById("task-board").innerHTML= resultHTML;
}