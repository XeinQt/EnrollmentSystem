const studentTableBody = document.getElementById('studentTableBody');
const studentForm = document.getElementById('studentForm');
const submitBtn = document.getElementById('submitBtn');

function loadStudents() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  studentTableBody.innerHTML = ''; 

  students.forEach((student, index) => {
    if (
      student.studentID == 12345 ||
      student.firstName == null ||
      student.lastName == null ||
      student.middleName == null ||
      student.age == null ||
      student.sex == null ||
      student.contactNumber == null ||
      student.email == null ||
      student.password == null
    ) {
      return;
    }

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.studentID}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.middleName}</td>
      <td>${student.age}</td>
      <td>${student.sex}</td>
      <td>${student.contactNumber}</td>
      <td>${student.email}</td>
      <td>${student.password}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    studentTableBody.appendChild(row);
  });
}

function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1); 
    localStorage.setItem('students', JSON.stringify(students)); 
    loadStudents(); 
  }
}

function editStudent(index) {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  const student = students[index];

  document.getElementById('firstName').value = student.firstName;
  document.getElementById('lastName').value = student.lastName;
  document.getElementById('middleName').value = student.middleName;
  document.getElementById('age').value = student.age;
  document.getElementById('sex').value = student.sex;
  document.getElementById('address').value = student.address;
  document.getElementById('contactNumber').value = student.contactNumber;
  document.getElementById('email').value = student.email;

  submitBtn.textContent = 'Update Student';

  studentForm.onsubmit = function (e) {
    e.preventDefault();

    students[index] = {
      studentID: student.studentID,
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      middleName: document.getElementById('middleName').value.trim(),
      age: parseInt(document.getElementById('age').value.trim(), 10),
      sex: document.getElementById('sex').value,
      address: document.getElementById('address').value.trim(),
      contactNumber: document.getElementById('contactNumber').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: student.password
    };

    localStorage.setItem('students', JSON.stringify(students));
    alert("Student updated successfully!");
    document.getElementById('search').value = "";
    studentForm.reset();
    submitBtn.textContent = 'Add Student';
    studentForm.onsubmit = handleFormSubmit;

    loadStudents();
  };
}

function handleFormSubmit(e) {
  e.preventDefault();

  let students = JSON.parse(localStorage.getItem('students')) || [];

  const year = new Date().getFullYear();
  const studentID = `${year}-${String(students.length+ 1).padStart(4, '0')}`;

  const student = {
    studentID: studentID,
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    middleName: document.getElementById('middleName').value.trim(),
    age: parseInt(document.getElementById('age').value.trim(), 10),
    sex: document.getElementById('sex').value,
    address: document.getElementById('address').value.trim(),
    contactNumber: document.getElementById('contactNumber').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: "BEC2024",
  };

  if (!student.firstName || !student.lastName || !student.age || !student.sex || !student.address || !student.contactNumber) {
    alert('Please fill out all required fields.');
    return;
  }

  const contactNumberInput = document.getElementById('contactNumber');
  const emailInput = document.getElementById('email');

  contactNumberInput.style.borderColor = '';
  emailInput.style.borderColor = '';

  const contactNumber = contactNumberInput.value;
  if (!/^09\d{9}$/.test(contactNumber)) {
    contactNumberInput.style.borderColor = 'red';
    return;
  }

  const email = emailInput.value;
  if (!/@gmail\.com$/.test(email)) {
    emailInput.style.borderColor = 'red';
    return;
  }

  const studentExists = students.some(existingStudent => 
    existingStudent.firstName === student.firstName &&
    existingStudent.lastName === student.lastName &&
    existingStudent.middleName === student.middleName &&
    existingStudent.age === student.age &&
    existingStudent.sex === student.sex
  );

  if (studentExists) {
    alert('Student already exists.');
    document.getElementById('firstName').value  = "";
    document.getElementById('lastName').value = "";
    document.getElementById('middleName').value = "";
    document.getElementById('age').value = "";
    document.getElementById('sex').value = "";
    document.getElementById('address').value = "";
    document.getElementById('contactNumber').value = "";
    document.getElementById('email').value = "";
    return;
  }

  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));

  studentForm.reset();
  loadStudents();
}

document.getElementById('search').addEventListener("input", (e) => {
  const searchInput = e.target.value.trim();

  if (!searchInput) {
    loadStudents();
  } else {
    searchStudents();
  }
});

function searchStudents() {
  const searchInput = document.getElementById('search').value.trim().toLowerCase();
  const students = JSON.parse(localStorage.getItem('students')) || [];

  const filteredStudents = students.filter(student =>
    student.studentID.toLowerCase().includes(searchInput) ||
    student.firstName.toLowerCase().includes(searchInput) ||
    student.lastName.toLowerCase().includes(searchInput) ||
    student.middleName.toLowerCase().includes(searchInput) ||
    student.email.toLowerCase().includes(searchInput)
  );

  studentTableBody.innerHTML = '';
  const year = new Date().getFullYear();

  filteredStudents.forEach((student, index) => {
    const row = document.createElement('tr');
    const studentID = `${year}-${String(students.length + 1).padStart(4, '0')}`;

    row.innerHTML = `
      <td>${student.studentID}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.middleName}</td>
      <td>${student.age}</td>
      <td>${student.sex}</td>
      <td>${student.contactNumber}</td>
      <td>${student.email}</td>
      <td>${student.password}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    studentTableBody.appendChild(row);
  });

  if (filteredStudents.length === 0) {
    studentTableBody.innerHTML = `<tr><td colspan="10">No matching students found.</td></tr>`;
  }
}

studentForm.onsubmit = handleFormSubmit;
loadStudents();
