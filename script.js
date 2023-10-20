const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const rollNumberInput = document.getElementById("rollNumber");
const emailInput = document.getElementById("email");
const addButton = document.getElementById("addButton");
const studentList = document.getElementById("studentList");

let students = [];

addButton.addEventListener("click", addOrUpdateStudent);

function addOrUpdateStudent() {
    const name = nameInput.value;
    const rollNumber = rollNumberInput.value;
    const email = emailInput.value;

    if (name && rollNumber && email) {
        const existingStudent = students.find(student => student.rollNumber === rollNumber);

        if (existingStudent) {
            // Update existing student
            existingStudent.name = name;
            existingStudent.email = email;
        } else {
            // Add new student
            const student = { name, rollNumber, email };
            students.push(student);
        }

        displayStudents();
        clearInputs();
    }
}

function displayStudents() {
    studentList.innerHTML = "";

    students.forEach((student, index) => {
        const studentItem = document.createElement("div");
        studentItem.className = "student-item";
        studentItem.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <button class="edit-button" data-index="${index}">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        studentList.appendChild(studentItem);
    });

    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");

    editButtons.forEach(button => {
        button.addEventListener("click", editStudent);
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteStudent);
    });
}

function editStudent(event) {
    const index = event.target.getAttribute("data-index");
    const student = students[index];

    nameInput.value = student.name;
    rollNumberInput.value = student.rollNumber;
    emailInput.value = student.email;

    addButton.textContent = "Update";
    addButton.removeEventListener("click", addOrUpdateStudent);
    addButton.addEventListener("click", function() {
        updateStudent(index);
    });
}

function updateStudent(index) {
    const name = nameInput.value;
    const rollNumber = rollNumberInput.value;
    const email = emailInput.value;

    if (name && rollNumber && email) {
        students[index].name = name;
        students[index].email = email;

        displayStudents();
        clearInputs();
        
        addButton.textContent = "Add Student";
        addButton.removeEventListener("click", updateStudent);
        addButton.addEventListener("click", addOrUpdateStudent);
    }
}

function deleteStudent(event) {
    const index = event.target.getAttribute("data-index");
    students.splice(index, 1);
    displayStudents();
}

function clearInputs() {
    nameInput.value = "";
    rollNumberInput.value = "";
    emailInput.value = "";
}

displayStudents();
