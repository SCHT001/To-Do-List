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
    var title=document.getElementById('titleText').value;
    var des=document.getElementById('desText').value;
    if(title==''||des==''){
        alert("Please fill in the boxes");
    }
    else
    {
    var task=document.createElement('div');
    task.innerHTML= `<div class="listItem">
    <div class='sideDate'>${hrs} : ${mins}</div>
    <div class='mainSide'>
    <span class='titleSpan'>${title}</span>
    <span class='desSpan'>${des}</span>
    </div>
    </div>`;
    taskList.appendChild(task);
    inputContainer.style.top='-100vh';
    clearInput();
    }
}
