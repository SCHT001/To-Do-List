let inputBox=document.getElementById('input');
let buttonAdder=document.getElementById('btn');
let contain=document.getElementById('cnt');
buttonAdder.addEventListener('click', elementAdder);
function elementAdder()
{
    let para=document.createElement('p');
    para.innerText=inputBox.value;
    contain.appendChild(para);
    inputBox.value="";
    para.addEventListener('click',function()
    {
        para.style.textDecoration= "line-through";
        
    })
    para.addEventListener('dblclick',function()
    {
        contain.removeChild(para);
        
    })
}
