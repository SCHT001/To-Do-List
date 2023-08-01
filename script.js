const state={
    tasks: [],
    weekDay: [ 'Sun','Mon','Tue','Wed','Thur','Fri','Sat']
}
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

function addTask(){
    var currdate=new Date;
    var mins=currdate.getMinutes();
    var hrs=currdate.getHours();
    var week=currdate.getDay();
    console.log(state.weekDay[week]);
    var title=document.getElementById('titleText').value;
    var des=document.getElementById('desText').value;
    if(title==''||des==''){
        alert("Please fill in the boxes");
    }
    else
    { 
    var obj=
        {
            id: Date.now(),
            hours:hrs,
            minutes:mins,
            title:title,
            description:des,
            week:week,
            status:0
        }
    
        state.tasks.push(obj);
        inputContainer.style.top='-100vh';
        localStorage.setItem('task',JSON.stringify(state.tasks));
        getFromLocalStorage();
        displayTask();
}
}

function deleteItem(id){
    const index=state.tasks.findIndex((item)=>{
        return item.id===id;
    });
    state.tasks.splice(index,1);
    localStorage.setItem('task',JSON.stringify(state.tasks));
    getFromLocalStorage();
    displayTask();
}
function completeTask(id){
    const index=state.tasks.findIndex((item)=>{
        return item.id===id;
    });
    state.tasks[index].status=1;
    localStorage.setItem('task',JSON.stringify(state.tasks));
    getFromLocalStorage();
}
function getFromLocalStorage(){
    const tasks=localStorage.getItem('task');
    state.tasks=tasks ? JSON.parse(tasks) : [];

}
function displayTask(){
    const container=document.getElementById('taskLists');
    container.innerHTML='';
    if(state.tasks.length>0){
        state.tasks.forEach((task)=>{
            const div=document.createElement('div');
            
            div.innerHTML=(`<div class="listItem">
            <div class='sideDate'>
            <span class='weekDay'>${state.weekDay[task.week]}</span>
            <span class='time'>${task.hours}:${task.minutes}</span> </div>
            <div class='mainSide'>
            <span class='titleSpan'>${task.title}</span>
            <span class='desSpan'>${task.description}</span>
            </div>
            <div class="sideBtn">
            <button class='btn btn-primary completedBtn' onclick="completeTask(${task.id})">Completed</button>
            <button class='btn btn-danger deleteBtn' onclick="deleteItem(${task.id})" >Delete</button>
            </div>
            </div>`)
            container.appendChild(div);
        })
    }
    else{
        container.innerHTML="No tasks..";
    }
}

//completed List display
document.getElementById('completedList').addEventListener('click',displayCompleted);
function displayCompleted(){
    taskList.innerHTML=``;
    getFromLocalStorage();
    const task=state.tasks;
    const completedTasks=task.filter((item)=>{
        return item.status==1;
    })
    if(completeTask){
        state.tasks=completedTasks;
    }
    else{
        state.tasks=[];
    }
    console.log(state.tasks);
    displayTask();
}

//All list display
document.getElementById('allList').addEventListener('click',()=>{
    getFromLocalStorage();
    displayTask();
})

//Pending Display
document.getElementById('pendingList').addEventListener('click',()=>{
    taskList.innerHTML=``;
    getFromLocalStorage();
    const task=state.tasks;
    const pendingTasks=task.filter((item)=>{
        return item.status==0;
    })
    if(completeTask){
        state.tasks=pendingTasks;
    }
    else{
        state.tasks=[];
    }
    console.log(state.tasks);
    displayTask();
})
getFromLocalStorage();
displayTask();


// getFromLocalStorage();
getFromLocalStorage();

function completedCheck(){
    var taskItems=JSON.parse(localStorage.getItem("tasks"));
    taskItems.find((e)=>{
        e[0].status===0;
    })
}
>>>>>>> origin/master
