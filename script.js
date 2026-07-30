function savePatient(){

let patient={

id:"PT"+Date.now(),

date:new Date().toLocaleDateString(),

name:document.getElementById("name").value,

age:document.getElementById("age").value,

gender:document.getElementById("gender").value,

mobile:document.getElementById("mobile").value,

address:document.getElementById("address").value,

disease:document.getElementById("disease").value,

regfee:document.getElementById("regfee").value,

sessionfee:document.getElementById("sessionfee").value

};

let patients=JSON.parse(localStorage.getItem("patients")) || [];

patients.push(patient);

localStorage.setItem("patients",JSON.stringify(patients));

alert("রোগীর তথ্য সফলভাবে সংরক্ষণ হয়েছে");

document.getElementById("name").value="";
document.getElementById("age").value="";
document.getElementById("mobile").value="";
document.getElementById("address").value="";
document.getElementById("disease").value="";

}// রোগীর তালিকা দেখানো
function loadPatients(){

let patients = JSON.parse(localStorage.getItem("patients")) || [];

let table = document.getElementById("patientTable");

if(!table) return;

table.innerHTML = "";

patients.forEach((p,index)=>{

table.innerHTML += `
<tr>
<td>${p.id}</td>
<td>${p.name}</td>
<td>${p.mobile}</td>
<td>${p.age}</td>
<td>
<button onclick="viewPrescription(${index})">📄</button>
<button onclick="deletePatient(${index})">🗑️</button>
</td>
</tr>
`;

});

}

// রোগী ডিলিট
function deletePatient(index){

let patients = JSON.parse(localStorage.getItem("patients")) || [];

patients.splice(index,1);

localStorage.setItem("patients",JSON.stringify(patients));

loadPatients();

}

// প্রেসক্রিপশন পেজে যাওয়া
function viewPrescription(index){

localStorage.setItem("selectedPatient",index);

window.location.href="prescription.html";

}

// সার্চ
function searchPatient(){

let input = document.getElementById("search");

if(!input) return;

let filter = input.value.toLowerCase();

let rows = document.querySelectorAll("#patientTable tr");

rows.forEach(row=>{

let text = row.innerText.toLowerCase();

row.style.display = text.includes(filter) ? "" : "none";

});

}

// পেজ চালু হলে তালিকা দেখাও
loadPatients();