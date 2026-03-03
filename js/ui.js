


export function toggleTrigno()
{
    const toggle=document.getElementById("trignoFun");
    if(toggle.style.display =="block")
    {
        toggle.style.display="none";
    }
    else{
        toggle.style.display="block";
        toggle.style.margin="5px";
        
    }
}
export function toggleFunc()
{
    const toggle=document.getElementById("fun-options");
    if(toggle.style.display =="block")
    {
        toggle.style.display="none";
    }
    else{
        toggle.style.display="block";
        toggle.style.margin="5px";
        
    }
}

export function renderhistory(history)
{
    const historyBody=document.getElementById("history-body");
    let historyList=history.get();
    

    historyBody.innerHTML="";
    historyList.forEach(element => {
        const historyRow=document.createElement("tr");
        historyRow.innerHTML=`<td>${element} </td>`
         historyBody.appendChild(historyRow);

         
    });
   

  
    
 
 
}