function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "admin" && password == "admin123") {

        localStorage.setItem("login", "yes");

        window.location.href = "index.html";

    } else {

        document.getElementById("message").innerHTML =
        "Invalid username or password";
    }
}


function logout() {

    localStorage.removeItem("login");

    window.location.href = "login.html";
}


function addStudent() {

    let name = document.getElementById("studentName").value;
    let roll = document.getElementById("rollNumber").value;
    let className = document.getElementById("studentClass").value;
    let division = document.getElementById("division").value;

    if (name == "" || roll == "") {
        alert("Please enter student details");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push({
        name: name,
        roll: roll,
        className: className,
        division: division
    });

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("studentName").value = "";
    document.getElementById("rollNumber").value = "";

    showStudents();
}


function showStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let table = document.getElementById("studentTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    students.forEach(function(student, index) {

        table.innerHTML += `
        <tr>
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.className}</td>
            <td>${student.division}</td>
            <td>
                <button class="delete" onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}


function deleteStudent(index) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    showStudents();
}


function addTeacher() {

    let name = document.getElementById("teacherName").value;
    let subject = document.getElementById("subject").value;
    let phone = document.getElementById("phone").value;

    if (name == "") {
        alert("Please enter teacher name");
        return;
    }

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.push({
        name: name,
        subject: subject,
        phone: phone
    });

    localStorage.setItem("teachers", JSON.stringify(teachers));

    document.getElementById("teacherName").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("phone").value = "";

    showTeachers();
}


function showTeachers() {

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    let table = document.getElementById("teacherTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    teachers.forEach(function(teacher, index) {

        table.innerHTML += `
        <tr>
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.phone}</td>
            <td>
                <button class="delete" onclick="deleteTeacher(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}


function deleteTeacher(index) {

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.splice(index, 1);

    localStorage.setItem("teachers", JSON.stringify(teachers));

    showTeachers();
}


function calculateFees() {

    let total = Number(document.getElementById("totalFees").value);
    let paid = Number(document.getElementById("paidFees").value);

    let pending = total - paid;

    document.getElementById("pendingFees").value = pending;
}


function calculateResult() {

    let mark1 = Number(document.getElementById("mark1").value);
    let mark2 = Number(document.getElementById("mark2").value);
    let mark3 = Number(document.getElementById("mark3").value);
    let mark4 = Number(document.getElementById("mark4").value);
    let mark5 = Number(document.getElementById("mark5").value);

    let total = mark1 + mark2 + mark3 + mark4 + mark5;

    let percentage = total / 5;

    document.getElementById("totalMarks").innerHTML =
    "Total Marks: " + total + " / 500";

    document.getElementById("percentage").innerHTML =
    "Percentage: " + percentage + "%";
}


function searchStudent() {

    let search = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(function(row) {

        let text = row.innerText.toLowerCase();

        if (text.includes(search)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}


window.onload = function() {

    showStudents();

    showTeachers();

};