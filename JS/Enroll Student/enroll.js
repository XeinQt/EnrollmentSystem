const studentId = document.getElementById('student-id');
const studentFirstName = document.getElementById('first-name');
const studentMiddleName = document.getElementById('middle-name');
const studentLastName = document.getElementById('last-name');

studentId.addEventListener("input", () => {
    const studentIdValue = studentId.value.trim();
    if (!studentIdValue) {
        alert("Student ID must not be empty");
        return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];

    const existingStudent = students.find(student => 
        String(student.studentID).toLowerCase() === studentIdValue.toLowerCase()
    );

    if (existingStudent) {
        studentFirstName.value = existingStudent.firstName || '';
        studentMiddleName.value = existingStudent.middleName || '';
        studentLastName.value = existingStudent.lastName || '';

        studentFirstName.style.borderColor = "green";
        studentMiddleName.style.borderColor = "green";
        studentLastName.style.borderColor = "green";
        console.log("Student found:", existingStudent);
    } else {
        studentFirstName.value = '';
        studentMiddleName.value = '';
        studentLastName.value = '';

        studentFirstName.style.borderColor = "red";
        studentMiddleName.style.borderColor = "red";
        studentLastName.style.borderColor = "red";
        console.log("No matching student found.");
    }
});

function populateCourses(coursesList, courseSelect) {
    courseSelect.innerHTML = '<option value="">Select Course</option>';
    coursesList.forEach(course => {
        const optionValue = `${course.code}-${course.description}-${course.year}-${course.section}`;
        const optionText = `${course.code} ${course.description} (${course.year} ${course.section})`;

        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionText;
        courseSelect.appendChild(option);
    });
}

function loadCourses(courseSelect) {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    populateCourses(courses, courseSelect);
}

const courseSelect = document.getElementById("course-select");
courseSelect.addEventListener("change", () => {
    const courseVal = courseSelect.value;
    const table = document.getElementById("subject-list");
    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    table.innerHTML = '';

    const selectedCourse = courses.find(course => {
        const optionValue = `${course.code}-${course.description}-${course.year}-${course.section}`;
        return optionValue === courseVal;
    });

    if (selectedCourse) {
        const subjects = selectedCourse.subjects;
        let tableContent = `<h3>${selectedCourse.code} - ${selectedCourse.description} (${selectedCourse.year} ${selectedCourse.section})</h3>
                            <table class="subject-table">
                            <thead>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Subject Description</th>
                                    <th>Unit</th>
                                    <th>Instructor</th>
                                    <th>Time In</th>
                                    <th>Time Out</th>
                                    <th>Room</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>`;

        subjects.forEach(subject => {
            tableContent += `<tr>
                                <td>${subject.code}</td>
                                <td>${subject.description}</td>
                                <td>${subject.units}</td>
                                <td>${subject.instructor}</td>
                                <td>${subject.timeStart}</td>
                                <td>${subject.timeEnd}</td>
                                <td>${subject.room}</td>
                                <td>
                                    <button class="action-btn delete-btn">Delete</button>
                                </td>
                            </tr>`;
        });

        tableContent += `</tbody></table>`;
        table.innerHTML = tableContent + `<button style="margin-top: 30PX; margin-bottom: 30PX;" class="add-subject-btn">Add Subject</button>`;
    } else {
        table.innerHTML = '<p>No subjects available for the selected course.</p>';
    }
});

document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("delete-btn")) {
        const row = event.target.closest("tr");
        if (row) {
            row.style.display = "none";
        }
    }
});

loadCourses(courseSelect);

const modal = document.getElementById("modal");
const closeModalBtn = document.querySelector(".close-btn");
const modalCourseSelect = document.getElementById("modal-course-select");
const modalSubjectList = document.getElementById("modal-subject-list");

document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("add-subject-btn")) {
        modal.style.display = "block";
        populateCourses(JSON.parse(localStorage.getItem("courses")) || [], modalCourseSelect);
    }
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

modalCourseSelect.addEventListener("change", () => {
    const selectedValue = modalCourseSelect.value;
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    modalSubjectList.innerHTML = '';

    const selectedCourse = courses.find(course => {
        const optionValue = `${course.code}-${course.description}-${course.year}-${course.section}`;
        return optionValue === selectedValue;
    });

    if (selectedCourse) {
        const subjects = selectedCourse.subjects;
        let tableContent = `<table class="subject-table">
                            <thead>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Subject Description</th>
                                    <th>Unit</th>
                                    <th>Instructor</th>
                                    <th>Time In</th>
                                    <th>Time Out</th>
                                    <th>Room</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>`;

        subjects.forEach(subject => {
            tableContent += `<tr>
                                <td>${subject.code}</td>
                                <td>${subject.description}</td>
                                <td>${subject.units}</td>
                                <td>${subject.instructor}</td>
                                <td>${subject.timeStart}</td>
                                <td>${subject.timeEnd}</td>
                                <td>${subject.room}</td>
                                <td>
                                    <button class="action-btn add-btn" data-code="${subject.code}">Add</button>
                                </td>
                            </tr>`;
        });

        tableContent += `</tbody></table>`;
        modalSubjectList.innerHTML = tableContent;
    } else {
        modalSubjectList.innerHTML = '<p>No subjects available for the selected course.</p>';
    }
});

document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("add-btn")) {
        const subjectCode = event.target.getAttribute("data-code");
        alert(`Subject with code ${subjectCode} has been added.`);
    }
});

const table = document.getElementById("subject-list");

document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("add-btn")) {
        const subjectCode = event.target.getAttribute("data-code");
        const courseVal = modalCourseSelect.value;
        const courses = JSON.parse(localStorage.getItem("courses")) || [];

        const selectedCourse = courses.find(course => {
            const optionValue = `${course.code}-${course.description}-${course.year}-${course.section}`;
            return optionValue === courseVal;
        });

        if (selectedCourse) {
            const selectedSubject = selectedCourse.subjects.find(subject => subject.code === subjectCode);

            if (selectedSubject) {
                const existingRows = table.querySelectorAll("tbody tr");
                let subjectExists = false;

                existingRows.forEach(row => {
                    const codeCell = row.querySelector("td:nth-child(1)");
                    if (codeCell && codeCell.textContent === selectedSubject.code) {
                        subjectExists = true;
                    }
                });

                if (subjectExists) {
                    alert("This subject has already been added.");
                } else {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${selectedSubject.code}</td>
                        <td>${selectedSubject.description}</td>
                        <td>${selectedSubject.units}</td>
                        <td>${selectedSubject.instructor}</td>
                        <td>${selectedSubject.timeStart}</td>
                        <td>${selectedSubject.timeEnd}</td>
                        <td>${selectedSubject.room}</td>
                        <td>
                            <button class="action-btn delete-btn">Delete</button>
                        </td>
                    `;

                    table.querySelector("tbody").appendChild(row);
                    console.log("Subject added to the table:", selectedSubject);
                }
            }
        }
    }
});

document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("delete-btn")) {
        const row = event.target.closest("tr");
        if (row) {
            row.remove();
        }
    }
});

document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("enroll-btn")) {
        const studentId = document.getElementById('student-id').value.trim();

        if (!studentId) {
            alert("Please enter a student ID to enroll.");
            return;
        }

        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students.find(s => s.studentID === studentId);

        if (!student) {
            alert("Student not found.");
            return;
        }

        const subjects = [];
        const subjectRows = document.querySelectorAll("#subject-list tbody tr");

        subjectRows.forEach(row => {
            const subjectCode = row.querySelector("td:nth-child(1)").textContent;
            const subjectDescription = row.querySelector("td:nth-child(2)").textContent;
            const subjectUnits = row.querySelector("td:nth-child(3)").textContent;
            const subjectInstructor = row.querySelector("td:nth-child(4)").textContent;
            const subjectTimeStart = row.querySelector("td:nth-child(5)").textContent;
            const subjectTimeEnd = row.querySelector("td:nth-child(6)").textContent;
            const subjectRoom = row.querySelector("td:nth-child(7)").textContent;

            subjects.push({
                code: subjectCode,
                description: subjectDescription,
                units: subjectUnits,
                instructor: subjectInstructor,
                timeStart: subjectTimeStart,
                timeEnd: subjectTimeEnd,
                room: subjectRoom
            });
        });

        if (subjects.length === 0) {
            alert("Please add subjects before enrolling.");
            return;
        }

        const existingSubjects = student.enrolledSubjects || [];
        const newSubjects = [];

        subjects.forEach(subject => {
            const isSubjectAlreadyEnrolled = existingSubjects.some(existingSubject => existingSubject.code === subject.code);

            if (!isSubjectAlreadyEnrolled) {
                newSubjects.push(subject);
            }
        });

        if (newSubjects.length > 0) {
            student.enrolledSubjects = student.enrolledSubjects || [];
            student.enrolledSubjects.push(...newSubjects);

            localStorage.setItem('students', JSON.stringify(students));

            alert("Subjects successfully added to the student.");
            console.log("Updated student:", student);
        } else {
            alert("All selected subjects are already enrolled.");
        }

        document.getElementById('student-id').value = '';
        document.getElementById("subject-list").innerHTML = '';
        document.getElementById('first-name').value = '';
        document.getElementById('middle-name').value = '';
        document.getElementById('last-name').value = '';
        document.getElementById('course-select').value = '';
        
        studentFirstName.style.borderColor = "#ccc";
        studentMiddleName.style.borderColor = "#ccc";
        studentLastName.style.borderColor = "#ccc";
    }
});
