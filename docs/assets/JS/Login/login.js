document.addEventListener('DOMContentLoaded', function () {
    function defaultData() {
        if (!localStorage.getItem("admin")) {
            const defaultAdmin = { email: "admin@gmail.com", password: "admin" };
            localStorage.setItem("admin", JSON.stringify(defaultAdmin));
            console.log("Default admin data added to localStorage.");
        }

        if (!localStorage.getItem("students")) {
            const defaultStudents = [
                {  
                    studentID: "12345",
                    firstName: "John",
                    lastName: "Doe",
                    middleName: "M",
                    age: 20,
                    sex: "Male",
                    address: "1234 Street, City",
                    contactNumber: "123-456-7890",
                    email: "student@gmail.com",
                    password: "student123"
                }
            ];
            localStorage.setItem("students", JSON.stringify(defaultStudents));
            console.log("Default student data added to localStorage.");
        }
    }

    defaultData();

    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const admin = JSON.parse(localStorage.getItem("admin")) || null;
        const students = JSON.parse(localStorage.getItem("students")) || null;

        if (!admin || !students) {
            document.querySelector(".error-message").textContent = "Admin or Student data is missing in localStorage.";
            return;
        }

        if (username === admin.email && password === admin.password) {
            sessionStorage.setItem("loggedInAs", "admin");
            window.location.href = "admin.html";
        } else {
            const studentFound = students.find(student => student.email === username && student.password === password);

            if (studentFound) {
                sessionStorage.setItem("loggedInAs", "student");
                sessionStorage.setItem("studentEmail", username);
                window.location.href = "studentDashboard.html";
            } else {
                document.querySelector(".error-message").textContent = "Incorrect username or password.";
            }
        }
    });
});

window.onload = function() {
    const loggedInAs = sessionStorage.getItem("loggedInAs");

    if (loggedInAs === "student" && window.location.pathname !== "/studentDashboard.html") {
        window.location.href = "studentDashboard.html";
    } else if (loggedInAs === "admin" && window.location.pathname !== "/admin.html") {
        window.location.href = "admin.html";
    }

    if (loggedInAs) {
        history.pushState(null, null, window.location.href);
        window.onpopstate = function() {
            history.pushState(null, null, window.location.href);
        };
    }
};
