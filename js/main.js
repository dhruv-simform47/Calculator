import { toggleFunc,toggleTrigno }  from "./ui.js";


document.addEventListener("DOMContentLoaded",initSetUp);

function initSetUp()
{
    const trigno=document.getElementById("trignoFun");
    const func=document.getElementById("fun-options");
    document.getElementById("toggleTrigno").addEventListener("click",toggleTrigno);
    document.getElementById("toggleFunc").addEventListener("click",toggleFunc);

    trigno.style.display="none";
    func.style.display="none";
}
