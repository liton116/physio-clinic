// ==============================
// Pain Management Physiotherapy Center
// prescription.js
// ==============================

// Auto Date
window.onload = function () {

    let today = new Date();

    let dd = String(today.getDate()).padStart(2,'0');
    let mm = String(today.getMonth()+1).padStart(2,'0');
    let yyyy = today.getFullYear();

    let date = dd + "/" + mm + "/" + yyyy;

    let dateField = document.querySelectorAll("[contenteditable='true']");

    // Patient ID Auto
    let id = "PM-" + yyyy +
             String(today.getMonth()+1).padStart(2,'0') +
             dd +
             Math.floor(Math.random()*900+100);

    // Patient ID
    if(document.querySelector(".patient-table tr:nth-child(1) td:nth-child(1) span")){
        document.querySelector(".patient-table tr:nth-child(1) td:nth-child(1) span").innerHTML=id;
    }

    // Date
    if(document.querySelector(".patient-table tr:nth-child(1) td:nth-child(2) span")){
        document.querySelector(".patient-table tr:nth-child(1) td:nth-child(2) span").innerHTML=date;
    }

};


// Pain Score

document.addEventListener("DOMContentLoaded",function(){

let radios=document.querySelectorAll("input[name='pain']");

radios.forEach(function(r){

r.addEventListener("change",function(){

document.getElementById("painScore").innerHTML=this.value;

});

});

});


// Print

function printPrescription(){

window.print();

}


// Clear Prescription

function clearPrescription(){

if(confirm("সব তথ্য মুছে ফেলতে চান?")){

location.reload();

}

}