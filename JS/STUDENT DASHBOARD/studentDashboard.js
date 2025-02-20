document.addEventListener("DOMContentLoaded", function () {
  const settingsBtn = document.getElementById("settings-btn");
  const settingsModal = document.getElementById("settings-modal");
  const closeModalBtn = document.querySelector(".close-btn");

  settingsBtn.addEventListener("click", function () {
    settingsModal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
    settingsModal.style.display = "none";
  });

  const studentEmail = sessionStorage.getItem("studentEmail");
  if (!studentEmail) {
    alert("Student email not found. Redirecting to login page.");
    window.location.href = "index.html";
    return;
  }

  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find(stud => stud.email === studentEmail);

  if (!student) {
    alert("Student not found. Redirecting to login page.");
    window.location.href = "index.html";
    return;
  }

  const studentDetails = document.getElementById("student-details");
  studentDetails.innerHTML = `
    <div><strong>ID Number:</strong> ${student.studentID || "N/A"}</div>
    <div><strong>First Name:</strong> ${student.firstName || "N/A"}</div>
    <div><strong>Last Name:</strong> ${student.lastName || "N/A"}</div>
    <div><strong>Middle Name:</strong> ${student.middleName || "N/A"}</div>
    <div><strong>Age:</strong> ${student.age || "N/A"}</div>
    <div><strong>Sex:</strong> ${student.sex || "N/A"}</div>
    <div><strong>Address:</strong> ${student.address || "N/A"}</div>
    <div><strong>Contact Number:</strong> ${student.contactNumber || "N/A"}</div>
    <div><strong>Email:</strong> ${student.email}</div>
  `;

  const welcomeText = document.getElementById("welcome-text");
  welcomeText.textContent = `Welcome, ${student.firstName || "Student"}`;

  const subjectsList = document.getElementById("subjects-list");
  if (student.enrolledSubjects && student.enrolledSubjects.length > 0) {
    subjectsList.innerHTML = student.enrolledSubjects.map(subject => `
      <tr>
        <td>${subject.code}</td>
        <td>${subject.description}</td>
        <td>${subject.units}</td>
        <td>${subject.timeStart}</td>
        <td>${subject.timeEnd}</td>
        <td>${subject.room || "N/A"}</td>
        <td>${subject.instructor}</td>
      </tr>
    `).join("");
  } else {
    subjectsList.innerHTML = `<tr><td colspan="7">No subjects enrolled.</td></tr>`;
  }

  const settingsForm = document.getElementById("settings-form");
  settingsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const oldPassword = document.getElementById("old-password");
    const newEmail = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    oldPassword.style.borderColor = "";

    if (oldPassword.value !== student.password) {
      oldPassword.style.borderColor = "red";
      alert("Old password is incorrect.");
      return;
    }

    if (newEmail !== confirmEmail) {
      alert("New email and confirm email do not match.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    student.email = newEmail;
    student.password = newPassword;
    localStorage.setItem("students", JSON.stringify(students));

    alert("Changes saved successfully.");
    settingsModal.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const settingsBtn = document.getElementById("settings-btn");
  const settingsModal = document.getElementById("settings-modal");
  const closeModalBtn = document.querySelector(".close-btn");

  settingsBtn.addEventListener("click", function () {
    settingsModal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
    settingsModal.style.display = "none";
  });

  const studentEmail = sessionStorage.getItem("studentEmail");
  if (!studentEmail) {
    alert("Student email not found. Redirecting to login page.");
    window.location.href = "index.html";
    return;
  }

  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find(stud => stud.email === studentEmail);

  if (!student) {
    alert("Student not found. Redirecting to login page.");
    window.location.href = "index.html";
    return;
  }

  const studentDetails = document.getElementById("student-details");
  studentDetails.innerHTML = `
    <div><strong>ID Number:</strong> ${student.studentID || "N/A"}</div>
    <div><strong>First Name:</strong> ${student.firstName || "N/A"}</div>
    <div><strong>Last Name:</strong> ${student.lastName || "N/A"}</div>
    <div><strong>Middle Name:</strong> ${student.middleName || "N/A"}</div>
    <div><strong>Age:</strong> ${student.age || "N/A"}</div>
    <div><strong>Sex:</strong> ${student.sex || "N/A"}</div>
    <div><strong>Address:</strong> ${student.address || "N/A"}</div>
    <div><strong>Contact Number:</strong> ${student.contactNumber || "N/A"}</div>
    <div><strong>Email:</strong> ${student.email}</div>
  `;

  const welcomeText = document.getElementById("welcome-text");
  welcomeText.textContent = `Welcome, ${student.firstName || "Student"}`;

  const subjectsList = document.getElementById("subjects-list");
  if (student.enrolledSubjects && student.enrolledSubjects.length > 0) {
    subjectsList.innerHTML = student.enrolledSubjects.map(subject => `
      <tr>
        <td>${subject.code}</td>
        <td>${subject.description}</td>
        <td>${subject.units}</td>
        <td>${subject.timeStart}</td>
        <td>${subject.timeEnd}</td>
        <td>${subject.room || "N/A"}</td>
        <td>${subject.instructor}</td>
      </tr>
    `).join("");
  } else {
    subjectsList.innerHTML = `<tr><td colspan="7">No subjects enrolled.</td></tr>`;
  }

  const settingsForm = document.getElementById("settings-form");
  settingsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const oldPassword = document.getElementById("old-password");
    const newEmail = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    oldPassword.style.borderColor = "";

    if (oldPassword.value !== student.password) {
      oldPassword.style.borderColor = "red";
      alert("Old password is incorrect.");
      return;
    }

    if (newEmail !== confirmEmail) {
      alert("New email and confirm email do not match.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    student.email = newEmail;
    student.password = newPassword;
    localStorage.setItem("students", JSON.stringify(students));

    alert("Changes saved successfully.");
    settingsModal.style.display = "none";
  });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("logoutButton").addEventListener("click", function() {
        sessionStorage.removeItem("loggedInAs");
        sessionStorage.removeItem("studentEmail");
        
        window.location.href = "login.html";
    });
});
