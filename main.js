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
let underLine = document.getElementById("under-line");

addButton.addEventListener("click" , function() {
    addTask();
    taskInput.value = ''; // 입력란을 완전히 비웁니다.
});

taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // 기본 동작(폼 제출)을 방지합니다.
        addTask(event);
        taskInput.value = ''; // 입력란을 완전히 비웁니다.
    }
});;//enter키
// taskInput.addEventListener("focus",function(){taskInput.value=""})

taskInput.addEventListener("focus", function () {
    taskInput.value = "";
}); // 포커스 될 때

for(let i=0; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        // 언더바 이동
        moveUnderLine(event.target);
        filter(event);
    });
}

// 언더바 이동 함수
function moveUnderLine(targetTab) {
    // 현재 선택된 탭의 위치 및 너비 계산
    let targetWidth = targetTab.offsetWidth;
    let targetOffsetLeft = targetTab.offsetLeft;

    // 언더바 이동
    underLine.style.width = targetWidth + "px";
    underLine.style.transform = `translateX(${targetOffsetLeft}px)`;
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
    let list = [];

    if (mode === "all") {
      list = taskList;
    } else if (mode === "ongoing" || mode === "done") {
      list = filterList;
    }
    
    // 중복된 할 일을 제거하기 위해 Set을 사용합니다.
    let uniqueTasks = new Set(list.map(task => task.taskContent));
    // Set을 다시 배열로 변환합니다.
    let uniqueTaskArray = Array.from(uniqueTasks);
    
    let resultHTML="";
    for(let i=0; i<uniqueTaskArray.length; i++){
        // 할 일 번호는 인덱스에 1을 더한 값입니다.
        let taskNumber = i + 1; 
        // 각 할 일의 내용을 가져옵니다.
        let taskContent = uniqueTaskArray[i];
        // 할 일이 완료된 경우와 아닌 경우에 다르게 처리합니다.
        let isComplete = list.find(task => task.taskContent === taskContent && task.isComplete === true);
        if (isComplete) {
            resultHTML += `<div class="task completed">
                <div class="task-done" style="text-decoration: line-through;">${taskNumber}. ${taskContent}</div>
                <div>
                    <button class="completed-button" onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button class="regular-button" onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div>${taskNumber}. ${taskContent}</div>
                <div>
                    <button class="completed-button" onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button class="regular-button" onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        }
        
    }

    document.getElementById("task-board").innerHTML = resultHTML;

    let taskElements = document.querySelectorAll('.task');
    taskElements.forEach(task => {
        setTimeout(() => {
            task.classList.add('active');
        }, 100); // 순차적인 효과를 주기 위해 setTimeout 사용
    });
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

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }

    // 삭제된 항목이 filterList 배열에도 존재하는지 확인하고 제거합니다.
    filterList = filterList.filter(task => task.id !== id);

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

document.addEventListener('DOMContentLoaded', function() {
    const commentInput = document.getElementById('commentInput');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');
    const commentDisplay = document.getElementById('commentDisplay');

    saveButton.addEventListener('click', saveComment);
    commentInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveComment();
        }
    });

    clearButton.addEventListener('click', function() {
        // 저장된 코멘트를 모두 삭제
        localStorage.removeItem('dailyComments');

        // 저장된 코멘트를 표시하는 함수 호출
        displayComments();
    });

    // 페이지 로드 시 저장된 코멘트를 표시하는 함수 호출
    displayComments();

    function saveComment() {
        const currentDate = new Date(); // 현재 날짜와 시간을 가져옴
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
        const commentContent = commentInput.value.trim(); // 입력된 내용을 가져옴 (양쪽 공백 제거)

        if (commentContent !== '') { // 입력된 내용이 비어 있지 않은 경우에만 실행
            const comment = `${formattedDate}: ${commentContent}\n`; // 현재 날짜와 입력된 내용을 포맷에 맞춰서 저장

            // 기존에 저장된 코멘트가 있는지 확인하고, 있으면 가져옴. 없으면 빈 문자열로 초기화
            const storedComments = localStorage.getItem('dailyComments') || '';

            // 새로운 코멘트를 이전 코멘트와 합쳐서 저장
            localStorage.setItem('dailyComments', storedComments + comment);

            // 입력란을 비움
            commentInput.value = '';

            // 저장된 코멘트를 표시하는 함수 호출
            displayComments();
        }
    }

    function displayComments() {
        // 저장된 코멘트를 가져와서 표시
        let storedComments = localStorage.getItem('dailyComments') || ''; // 저장된 코멘트가 없으면 빈 문자열 반환
        storedComments = storedComments.split('\n').filter(comment => comment.trim() !== ''); // 개행 문자로 분리하고 빈 문자열 제거

        // 날짜별로 정렬하여 표시
        storedComments.sort((a, b) => {
            const dateA = new Date(a.split(': ')[0]);
            const dateB = new Date(b.split(': ')[0]);
            return dateB - dateA; // 내림차순으로 정렬
        });

        // 정렬된 코멘트를 화면에 표시
        commentDisplay.innerHTML = ''; // 기존 내용을 초기화
        storedComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.textContent = comment;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'mx-2');
            deleteButton.addEventListener('click', function() {
                // 삭제 버튼 클릭 시 해당 코멘트를 배열에서 제거하고, 다시 로컬 스토리지에 저장하여 업데이트
                storedComments.splice(storedComments.indexOf(comment), 1);
                localStorage.setItem('dailyComments', storedComments.join('\n')); // 개행 문자로 연결하여 저장
                // 코멘트를 다시 표시
                displayComments();
            });

            commentElement.appendChild(deleteButton);

            commentDisplay.appendChild(commentElement);
        });
    }
});


clearButton.addEventListener('click', function() {
    // 삭제할 코멘트 수가 0보다 큰 경우에만 경고창을 표시합니다.
    if (localStorage.getItem('dailyComments')) {
        const confirmDelete = confirm('정말로 모든 코멘트를 삭제하시겠습니까?');
        if (confirmDelete) {
            // 사용자가 확인을 클릭한 경우에만 모든 코멘트를 삭제합니다.
            localStorage.removeItem('dailyComments');
            // 저장된 코멘트를 표시하는 함수 호출
            displayComments();
        }
    } else {
        // 저장된 코멘트가 없는 경우에는 경고창을 표시하지 않습니다.
        alert('저장된 코멘트가 없습니다.');
    }
});

