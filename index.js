const baseUrl="https://latest.currency-api.pages.dev/v1/currencies";
let dropdowns= document.querySelectorAll("select");
let btn= document.querySelector("form button");
let fromCurr= document.querySelector(".from select");
let toCurr= document.querySelector(".to select");
let updateMsg= document.querySelector(".msg p");
import {countryList} from "./code.js";


let updateFlag= (element)=>{
       let code= element.value;
     let countryCode= countryList[code];
     let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src= newSrc;
 }


for(let select of dropdowns){
    for(let code in countryList){
        //to populate 'to' and 'from' options
        let newOptions= document.createElement("option");
        newOptions.innerText= code;
        newOptions.value= code;
        // newOptions.style.backgroundColor = none;
        
        //to show USD and INR as selected
        if(select.name=="from" && code == "USD"){
           newOptions.selected="selected";
        }
        else if(select.name=="to" && code == "INR"){
            newOptions.selected="selected";
         }

        select.append(newOptions);
   }

        //to sync flag with selected countryCode
        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        })
}

btn.addEventListener("click", async (evt)=>{
    //after clicking on button, form will not set back to dafault 
    evt.preventDefault();    
    let amount=document.querySelector(".amt input");
    let amtVal =amount.value ;
    console.log(amtVal); 
    if(amtVal= "" || amtVal<1) {
      amtVal = 1;
      amount.value ="1";
    } else{
        amtVal= amount.value;
    }
    console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
    const URL= `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate = data[fromCurr.value.toLowerCase()];
    let finalRate = rate[toCurr.value.toLowerCase()];
    let result= amtVal* finalRate;
    updateMsg.innerText = `${amtVal} ${fromCurr.value} = ${result} ${toCurr.value}`;
})


