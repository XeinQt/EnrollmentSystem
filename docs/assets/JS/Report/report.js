const courses = JSON.parse(localStorage.getItem('courses')) || [];
const students = JSON.parse(localStorage.getItem('students'));

if (students.length > 0 && students[0].studentID === "12345") {
  students.splice(0, 1);
  localStorage.setItem('students', JSON.stringify(students));
}

function populateCourseDropdown() {
  const dropdown = document.getElementById('course-dropdown');
  dropdown.innerHTML = '<option value="">Select Course</option>';
  courses.forEach((course, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${course.code} - ${course.description} (${course.year}, ${course.section})`;
    dropdown.appendChild(option);
  });
}

function showEnrolledStudents() {
  const dropdown = document.getElementById('course-dropdown');
  const studentListDiv = document.getElementById('enrolled-students');
  const selectedIndex = dropdown.value;

  const studentsTable = document.getElementById('students-table');
  const noStudentsMessage = document.getElementById('no-students-message');
  const tableBody = studentsTable?.querySelector('tbody');

  if (!studentsTable || !noStudentsMessage || !tableBody) {
    console.error('Could not find table elements.');
    return;
  }

  tableBody.innerHTML = '';

  if (!selectedIndex || selectedIndex === "") {
    displayStudents(students);
    studentsTable.classList.remove('hidden');
    noStudentsMessage.classList.add('hidden');
    return;
  }

  const selectedCourse = courses[selectedIndex];

  if (!selectedCourse || !Array.isArray(selectedCourse.subjects)) {
    console.error('Selected course or its subjects are not properly defined.');
    return;
  }

  const selectedSubjects = selectedCourse.subjects.map(subject => subject.code);

  const matchingStudents = students.filter(student => {
    if (!student.enrolledSubjects) return false;
    const studentSubjects = student.enrolledSubjects.map(subject => subject.code);
    return studentSubjects.some(subjectCode => selectedSubjects.includes(subjectCode));
  });

  if (matchingStudents.length > 0) {
    displayStudents(matchingStudents);
  } else {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4">No students are enrolled in the selected course's subjects.</td>`;
    tableBody.appendChild(row);
    studentsTable.classList.remove('hidden');
    noStudentsMessage.classList.add('hidden');
  }
}

const filteredStudents = students.filter(student => {
  return student.email && student.password && student.email.trim() !== "" && student.password.trim() !== "";
});

function displayStudents(filteredStudents) {
  const tableBody = document.getElementById('students-table').querySelector('tbody');
  tableBody.innerHTML = '';

  if (filteredStudents.length === 0) {
    document.getElementById('no-students-message').classList.remove('hidden');
    document.getElementById('students-table').classList.add('hidden');
    return;
  }

  filteredStudents.forEach(student => {
    student.splice(0, 1);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.studentID}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td><button class="view-details-btn" onclick="showStudentDetails('${student.studentID}')">View Details</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById('students-table').classList.remove('hidden');
  document.getElementById('no-students-message').classList.add('hidden');
}

displayStudents(filteredStudents);

document.addEventListener('DOMContentLoaded', function () {
  populateCourseDropdown();

  const courseDropdown = document.getElementById('course-dropdown');
  courseDropdown.addEventListener('change', function() {
    showEnrolledStudents();
  });
});

window.onload = function() {
  populateCourseDropdown();
  const courseDropdown = document.getElementById('course-dropdown');
  courseDropdown.addEventListener('change', function() {
    showEnrolledStudents();
  });
};

const studentss = JSON.parse(localStorage.getItem('students')) || [];

function showStudentDetails(studentID) {
  const student = students.find(s => s.studentID === studentID);

  if (student) {
    document.getElementById('student-id').textContent = student.studentID;
    document.getElementById('student-firstname').textContent = student.firstName;
    document.getElementById('student-lastname').textContent = student.lastName;
    document.getElementById('student-middlename').textContent = student.middleName;
    document.getElementById('student-age').textContent = student.age;
    document.getElementById('student-address').textContent = student.address;
    document.getElementById('student-contact').textContent = student.contactNumber;
    document.getElementById('student-email').textContent = student.email;

    const subjectsTable = document.getElementById('student-subjects-table');
    const subjectsTableBody = subjectsTable.querySelector('tbody');
    subjectsTableBody.innerHTML = '';

    if (student.enrolledSubjects && student.enrolledSubjects.length > 0) {
      student.enrolledSubjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${subject.code}</td>
          <td>${subject.description}</td>
          <td>${subject.units}</td>
          <td>${subject.instructor}</td>
        `;
        subjectsTableBody.appendChild(row);
      });
      subjectsTable.classList.remove('hidden');
    } else {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="4">No subjects enrolled</td>`;
      subjectsTableBody.appendChild(row);
      subjectsTable.classList.remove('hidden');
    }

    const modal = document.getElementById('student-modal');
    modal.style.display = 'block';
  }
}

document.getElementById('close-modal').onclick = function() {
  document.getElementById('student-modal').style.display = 'none';
};

window.onclick = function(event) {
  const modal = document.getElementById('student-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

function displayStudents(filteredStudents) {
  const tableBody = document.getElementById('students-table').querySelector('tbody');
  tableBody.innerHTML = '';

  filteredStudents.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.studentID}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td><button class="view-details-btn" onclick="showStudentDetails('${student.studentID}')">View Details</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById('students-table').classList.remove('hidden');
  document.getElementById('no-students-message').classList.add('hidden');
}

displayStudents(students);

const coursesss = JSON.parse(localStorage.getItem('courses')) || [];
const studentsss = JSON.parse(localStorage.getItem('students')) || [];

function searchStudent() {
  const searchQuery = document.getElementById('search-student').value.toLowerCase();

  const filteredStudents = studentsss.filter(student => {
    return (
      String(student.studentID).toLowerCase().includes(searchQuery) ||
      String(student.firstName).toLowerCase().includes(searchQuery) ||
      String(student.lastName).toLowerCase().includes(searchQuery) ||
      String(student.middleName).toLowerCase().includes(searchQuery)
    );
  });

  if(document.getElementById('search-student').value = ""){
    document.getElementById('filtered-students-table').innerHTML = "";
  }

  displayFilteredStudents(filteredStudents);
  console.log(filteredStudents);
}

function displayFilteredStudents(filteredStudents) {
  const tableBody = document.getElementById('filtered-students-table').querySelector('tbody');
  tableBody.innerHTML = '';

  const noResultsMessage = document.getElementById('no-results-message');
  if (noResultsMessage) {
    noResultsMessage.remove();
  }

  if (filteredStudents.length > 0) {
    filteredStudents.forEach(student => {
      const relevantCourses = coursesss.filter(course => {
        return course.subjects && student.enrolledSubjects && student.enrolledSubjects.some(subject =>
          course.subjects.some(courseSubject => courseSubject.code === subject.code)
        );
      });

      if (relevantCourses.length > 0) {
        relevantCourses.forEach(course => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${student.studentID}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.middleName}</td>
            <td>${course.code}</td>
            <td>${course.year}</td>
            <td>${course.section}</td>
            <td><button class="view" onclick="viewStudentDetails('${student.studentID}')">View Details</button></td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        alert("Student not found or Enrolled");
        const tableBody = document.getElementById('filtered-students-table').querySelector('tbody');
        tableBody.innerHTML = '';
      }
    });

    document.getElementById('filtered-students-table').classList.remove('hidden');
  } else {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.id = 'no-results-message';
    noResultsMessage.textContent = 'No students found!';
    document.getElementById('filtered-students-table').parentElement.appendChild(noResultsMessage);
    document.getElementById('filtered-students-table').classList.add('hidden');
  }
}

function viewStudentDetails(studentID) {
  const student = studentsss.find(student => student.studentID === studentID);

  if (student) {
    document.getElementById('student-id').textContent = student.studentID;
    document.getElementById('student-firstname').textContent = student.firstName;
    document.getElementById('student-lastname').textContent = student.lastName;
    document.getElementById('student-middlename').textContent = student.middleName;
    document.getElementById('student-age').textContent = student.age;
    document.getElementById('student-address').textContent = student.address;
    document.getElementById('student-contact').textContent = student.contactNumber;
    document.getElementById('student-email').textContent = student.email;

    if (student.enrolledSubjects && student.enrolledSubjects.length > 0) {
      let subjectsHTML = '';
      student.enrolledSubjects.forEach(subject => {
        subjectsHTML += `
          <tr>
            <td>${subject.code}</td>
            <td>${subject.description}</td>
            <td>${subject.units}</td>
            <td>${subject.instructor}</td>
          </tr>
        `;
      });
      document.getElementById('student-subjects-table').querySelector('tbody').innerHTML = subjectsHTML;
      document.getElementById('student-subjects-table').classList.remove('hidden');
    } else {
      document.getElementById('student-subjects-table').classList.add('hidden');
    }

    document.getElementById('student-modal').style.display = 'block';
  }
}

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('student-modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === document.getElementById('student-modal')) {
    document.getElementById('student-modal').style.display = 'none';
  }
});
