/* ================= STEP CONTROL ================= */
let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
    document.querySelectorAll(".step").forEach(s => s.style.display = "none");
    document.getElementById("step-" + step).style.display = "block";

    document.getElementById("prevBtn").style.display =
        step === 1 ? "none" : "inline-block";

    document.getElementById("nextBtn").style.display =
        step === totalSteps ? "none" : "inline-block";

    document.getElementById("submitBtn").style.display =
        step === totalSteps ? "inline-block" : "none";
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

/* ================= AGE CALCULATION ================= */
function calculateAge() {
    const dob = document.getElementById("dob").value;
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    document.getElementById("age").value = age;
}

/* ================= ADD SIBLING ================= */
document.getElementById("addRelation").addEventListener("click", function (e) {
    e.preventDefault();

    const div = document.createElement("div");
    div.className = "relation-field";

    div.innerHTML = `
        <input type="text" name="siblingName[]" placeholder="Sibling Name">
        <input type="text" name="siblingRelation[]" placeholder="Relation">
    `;

    document.getElementById("relations").appendChild(div);
});

/* ================= SUBMIT ================= */
document.getElementById("familyForm").addEventListener("submit", function (e) {
    e.preventDefault();

    /* HIDE FORM + BUTTONS */
    document.querySelectorAll(".step").forEach(s => s.style.display = "none");
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";

    /* OCCUPATION */
    const occupation = document.querySelector('input[name="occupation"]:checked');
    const occText = occupation ? occupation.nextElementSibling.innerText : "";

    /* SIBLINGS */
    const siblingNames = [...document.getElementsByName("siblingName[]")].map(i => i.value);
    const siblingRelations = [...document.getElementsByName("siblingRelation[]")].map(i => i.value);

    /* RESULT TABLE */
    let table = `
        <h2>Submitted Details</h2>
        <table>
            <tr><th>Field</th><th>Value</th></tr>

            <tr><td>First Name</td><td>${firstname.value}</td></tr>
            <tr><td>Last Name</td><td>${lastname.value}</td></tr>
            <tr><td>DOB</td><td>${dob.value}</td></tr>
            <tr><td>Age</td><td>${age.value}</td></tr>

            <tr><td>Father Name</td><td>${fathername.value}</td></tr>
            <tr><td>Mother Name</td><td>${mothername.value}</td></tr>
            <tr><td>Occupation</td><td>${occText}</td></tr>
    `;

    siblingNames.forEach((name, i) => {
        table += `
            <tr>
                <td>Sibling ${i + 1}</td>
                <td>${name} (${siblingRelations[i] || ""})</td>
            </tr>
        `;
    });

    table += `
        <tr><td>House</td><td>${house.value}</td></tr>
        <tr><td>Street</td><td>${street.value}</td></tr>
        <tr><td>Apartment</td><td>${aprtment.value}</td></tr>
        <tr><td>City</td><td>${city.value}</td></tr>
        <tr><td>State</td><td>${State.value}</td></tr>
        <tr><td>ZIP</td><td>${zip.value}</td></tr>
        <tr><td>Country</td><td>${country.value}</td></tr>
        </table>
    `;

    document.getElementById("result").innerHTML = table;
});

/* ================= INITIAL LOAD ================= */
showStep(currentStep);



