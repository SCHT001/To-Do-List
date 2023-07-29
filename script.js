var addBtn=document.getElementById('addBtn');
var taskList=document.getElementById('taskLists');
var inputContainer=document.getElementById("inputContainer");
addBtn.addEventListener('click',()=>{
    inputContainer.style.display="block";
    inputContainer.style.top="0vh";
});
document.getElementById('cancelBtn').addEventListener('click',()=>{
    inputContainer.style.top='-100vh';
    clearInput();
})
document.getElementById('createBtn').addEventListener('click',addTask);
function clearInput(){
    var title=document.getElementById('titleText');
    var des=document.getElementById('desText');
    title.value='';
    des.value='';
} 
const weekDay=[ 'Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
var taskArr=[];
function addTask(){
    var currdate=new Date;
    var mins=currdate.getMinutes();
    var hrs=currdate.getHours();
    var week=currdate.getDay();
    console.log(weekDay[week]);
    var title=document.getElementById('titleText').value;
    var des=document.getElementById('desText').value;
    if(title==''||des==''){
        alert("Please fill in the boxes");
    }
    else
    {
    var task=document.createElement('div');
    task.innerHTML= `<div class="listItem">
    <div class='sideDate'> 
    <span class='weekDay'>${weekDay[week]}</span>
    <span class='time'>${hrs}:${mins}</span> 
    </div>
    <div class='mainSide'>
    <span class='titleSpan'>${title}</span>
    <span class='desSpan'>${des}</span>
    </div>
    <div class="sideBtn">
    <button class='btn btn-primary completedBtn'>Completed</button>
    <button class='btn btn-danger deleteBtn' >Delete</button>
    </div>
    </div>`
    
    var obj=
        [{
            hours:hrs,
            minutes:mins,
            title:title,
            description:des,
            week:week,
            status:0
        }]
    taskArr.push(obj);
    localStorage.setItem("tasks",JSON.stringify(taskArr));
    taskList.appendChild(task);
    inputContainer.style.top='-100vh';
    clearInput();
    }
    var deleteBtn=document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn)=>{
    btn.addEventListener('click',deleteItem);

    var completedBtn=document.querySelectorAll('.completedBtn');
    completedBtn.forEach((btn)=>{
    btn.addEventListener('click',completedTask);
    });
})
}

function deleteItem(e){
    const listItem=e.target.closest('.listItem');
    listItem.remove();

    const title=listItem.querySelector('.titleSpan').innerText;
    const des=listItem.querySelector('.desSpan').innerText;
    var taskFromStorage=JSON.parse(localStorage.getItem('tasks'));
    var index= taskFromStorage.findIndex((item)=>{
        return item[0].title===title && item[0].description===des;    
    })
    taskFromStorage.splice(index,1);
    localStorage.setItem('tasks',JSON.stringify(taskFromStorage)); 
}
function completedTask(e){
    const listItem=e.target.closest('.listItem');
    listItem.style.backgroundColor='rgba(56, 245, 70, 0.3)';


    const title=listItem.querySelector('.titleSpan').innerText;
    const des=listItem.querySelector('.desSpan').innerText;
    var taskFromStorage=JSON.parse(localStorage.getItem('tasks'));
    var index= taskFromStorage.findIndex((item)=>{
        return item[0].title===title && item[0].description===des;    
    })
    
    taskFromStorage[index][0].status=1;
    localStorage.setItem('tasks',JSON.stringify(taskFromStorage));
}
function getFromLocalStorage(){
    var taskItems=JSON.parse(localStorage.getItem("tasks"));
    taskItems.forEach((t)=>{
    var task=document.createElement('div');
    task.innerHTML= `<div class="listItem">
    <div class='sideDate'>
    <span class='weekDay'>${weekDay[t[0].week]}</span>
    <span class='time'>${t[0].hours}:${t[0].minutes}</span> </div>
    <div class='mainSide'>
    <span class='titleSpan'>${t[0].title}</span>
    <span class='desSpan'>${t[0].description}</span>
    </div>
    <div class="sideBtn">
    <button class='btn btn-primary completedBtn'>Completed</button>
    <button class='btn btn-danger deleteBtn' >Delete</button>
    </div>
    </div>`
    taskList.appendChild(task);
    })
    var deleteBtn=document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn)=>{
    btn.addEventListener('click',deleteItem);
    });
    var completedBtn=document.querySelectorAll('.completedBtn');
    completedBtn.forEach((btn)=>{
    btn.addEventListener('click',completedTask);
    });

}
getFromLocalStorage();