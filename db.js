// ================================
// Pain Management Physiotherapy Center
// Offline Database (IndexedDB)
// Part-1
// ================================

const DB_NAME = "PMPC_DB";
const DB_VERSION = 1;
const PATIENT_TABLE = "patients";

let db = null;

// Database Open
function openDatabase() {

return new Promise((resolve, reject) => {

const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onerror = function () {
reject("Database খুলতে সমস্যা হয়েছে");
};

request.onsuccess = function () {
db = request.result;
resolve(db);
};

request.onupgradeneeded = function (event) {

db = event.target.result;

if (!db.objectStoreNames.contains(PATIENT_TABLE)) {

let store = db.createObjectStore(PATIENT_TABLE, {
keyPath: "patientId"
});

store.createIndex("patientName", "patientName", {
unique: false
});

store.createIndex("mobile", "mobile", {
unique: false
});

store.createIndex("date", "date", {
unique: false
});

}

};

});

}

// Database Initialize
window.addEventListener("load", async () => {

try{

await openDatabase();

console.log("Database Ready");

}catch(e){

console.log(e);

}

});// ================================
// Part-2
// রোগীর তথ্য Save / Get / Delete
// ================================

// নতুন রোগী সংরক্ষণ
function savePatient(patient) {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(PATIENT_TABLE, "readwrite");

        const store = transaction.objectStore(PATIENT_TABLE);

        const request = store.put(patient);

        request.onsuccess = function () {
            resolve(true);
        };

        request.onerror = function () {
            reject("রোগীর তথ্য সংরক্ষণ করা যায়নি");
        };

    });

}

// সব রোগীর তথ্য
function getAllPatients() {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(PATIENT_TABLE, "readonly");

        const store = transaction.objectStore(PATIENT_TABLE);

        const request = store.getAll();

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function () {
            reject([]);
        };

    });

}

// Patient ID দিয়ে তথ্য বের করা
function getPatient(patientId) {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(PATIENT_TABLE, "readonly");

        const store = transaction.objectStore(PATIENT_TABLE);

        const request = store.get(patientId);

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function () {
            reject(null);
        };

    });

}

// রোগীর তথ্য মুছে ফেলা
function deletePatient(patientId) {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(PATIENT_TABLE, "readwrite");

        const store = transaction.objectStore(PATIENT_TABLE);

        const request = store.delete(patientId);

        request.onsuccess = function () {
            resolve(true);
        };

        request.onerror = function () {
            reject(false);
        };

    });

}// ================================
// Part-3
// Search / Update / Backup / Restore
// ================================

// রোগীর তথ্য আপডেট
async function updatePatient(patient) {
    return await savePatient(patient);
}

// রোগীর নাম বা মোবাইল দিয়ে সার্চ
async function searchPatients(keyword) {

    const patients = await getAllPatients();

    if (!keyword || keyword.trim() === "") {
        return patients;
    }

    keyword = keyword.toLowerCase();

    return patients.filter(patient => {

        const name = (patient.patientName || "").toLowerCase();
        const mobile = (patient.mobile || "").toLowerCase();
        const patientId = (patient.patientId || "").toLowerCase();

        return (
            name.includes(keyword) ||
            mobile.includes(keyword) ||
            patientId.includes(keyword)
        );

    });

}

// Backup (JSON)
async function exportBackup() {

    const patients = await getAllPatients();

    const data = JSON.stringify(patients, null, 2);

    const blob = new Blob([data], {
        type: "application/json"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "PMPC_Backup.json";

    link.click();

}

// Restore Backup
async function importBackup(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = async function(e) {

            try {

                const patients = JSON.parse(e.target.result);

                for (let patient of patients) {
                    await savePatient(patient);
                }

                resolve(true);

            } catch {

                reject("Backup Restore Failed");

            }

        };

        reader.readAsText(file);

    });

}

console.log("PMPC Offline Database Ready");