document.addEventListener("DOMContentLoaded", () => {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const instructors = JSON.parse(localStorage.getItem("instructors")) || [];
  const courseSelect = document.getElementById("course-select");
  const instructorSelect = document.getElementById("instructor-select");
  const filterSearch = document.getElementById("filter-search");
  const subjectsContainer = document.getElementById("subjects-container");

  let currentEditingSubject = null;

  function populateCourses(coursesList) {
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

  function populateInstructors() {
    instructorSelect.innerHTML = '<option value="">Select Instructor</option>';

    instructors.forEach(instructor => {
      if (instructor.firstName && instructor.lastName) {
        const fullName = `${instructor.firstName} ${instructor.lastName}`;
        const option = document.createElement("option");
        option.value = fullName;
        option.textContent = fullName;
        instructorSelect.appendChild(option);
      }
    });
  }

  populateCourses(courses);
  populateInstructors();
  displaySubjects();

  window.addEventListener('beforeunload', () => localStorage.setItem("courses", JSON.stringify(courses)));

  function displaySubjects() {
    subjectsContainer.innerHTML = '';

    courses.forEach(course => {
      const courseSection = document.createElement("section");
      courseSection.classList.add("course-section");

      const courseTitle = document.createElement("h3");
      courseTitle.textContent = `${course.code} - ${course.description} (${course.year} ${course.section})`;
      courseSection.appendChild(courseTitle);

      if (course.subjects) {
        const table = document.createElement("table");
        const tableHeader = document.createElement("thead");
        tableHeader.innerHTML = 
          `<tr>
            <th>Subject Code</th>
            <th>Description</th>
            <th>Units</th>
            <th>Instructor</th>
            <th>Time</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>`;
        table.appendChild(tableHeader);
        const tableBody = document.createElement("tbody");

        course.subjects.forEach((subject, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${subject.code}</td>
            <td>${subject.description}</td>
            <td>${subject.units}</td>
            <td>${subject.instructor}</td>
            <td>${subject.timeStart} - ${subject.timeEnd}</td>
            <td>${subject.room}</td>
            <td>
              <button class="edit-btn" data-course-code="${course.code}-${course.description}-${course.year}-${course.section}" data-index="${index}">Edit</button>
              <button class="delete-btn" data-course-code="${course.code}-${course.description}-${course.year}-${course.section}" data-index="${index}">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        courseSection.appendChild(table);
      } else {
        const noSubjectsMessage = document.createElement("p");
        noSubjectsMessage.textContent = "No subjects available for this course.";
        courseSection.appendChild(noSubjectsMessage);
      }

      subjectsContainer.appendChild(courseSection);
    });

    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", editSubject);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", deleteSubject);
    });
  }

  document.getElementById("addSubjectForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedCourse = courseSelect.value;
    const [courseCode, courseDescription, courseYear, courseSection] = selectedCourse.split('-');

    const subjectCode = document.getElementById("subject-code").value;
    const subjectDescription = document.getElementById("subject-description").value;
    const units = document.getElementById("units-select").value;
    const instructor = instructorSelect.value;
    const timeStart = document.getElementById("time-start").value;
    const timeEnd = document.getElementById("time-end").value;
    const room = document.getElementById("room").value;

    if (!courseCode || !subjectCode || !subjectDescription || !units || !instructor || !timeStart || !timeEnd || !room) {
      alert("Please fill in all fields.");
      return;
    }

    const course = courses.find(c =>
      c.code === courseCode &&
      c.description === courseDescription &&
      c.year === courseYear &&
      c.section === courseSection
    );

    if (course && course.subjects) {
      const isTimeConflicting = course.subjects.some(subject => {
        return (subject.timeStart === timeStart && subject.timeEnd === timeEnd);
      });

      if (isTimeConflicting) {
        alert("Time conflict! The subject's time overlaps with another subject.");
        return;
      }
    }

    const subject = {
      code: subjectCode,
      description: subjectDescription,
      units,
      instructor,
      timeStart,
      timeEnd,
      room
    };

    if (course) {
      if (!course.subjects) {
        course.subjects = [];
      }
      course.subjects.push(subject);
      localStorage.setItem("courses", JSON.stringify(courses));
      
      document.getElementById("addSubjectForm").reset();
      currentEditingSubject = null;
      displaySubjects();
    } else {
      alert("Selected course not found.");
    }
  });

  function editSubject(event) {
    const courseCode = event.target.getAttribute("data-course-code");
    const subjectIndex = event.target.getAttribute("data-index");

    const [code, description, year, section] = courseCode.split('-');

    const course = courses.find(c => 
      c.code === code && 
      c.description === description && 
      c.year === year && 
      c.section === section
    );

    if (course && course.subjects) {
      const subject = course.subjects[subjectIndex];
      currentEditingSubject = { courseCode, subjectIndex };

      const subjectRow = event.target.closest("tr");

      subjectRow.innerHTML = `
        <td><input type="text" value="${subject.code}" class="edit-input" data-field="code"></td>
        <td><input type="text" value="${subject.description}" class="edit-input" data-field="description"></td>
        <td><input type="number" value="${subject.units}" class="edit-input" data-field="units"></td>
        <td>
          <select class="edit-input" data-field="instructor">
            ${instructors.map(instructor => 
              `<option value="${instructor.firstName} ${instructor.lastName}" 
                ${instructor.firstName} ${instructor.lastName === subject.instructor ? 'selected' : ''}>
                ${instructor.firstName} ${instructor.lastName}
              </option>`).join('')}
          </select>
        </td>
        <td>
          <input type="time" value="${subject.timeStart}" class="edit-input" data-field="timeStart"> 
          to
          <input type="time" value="${subject.timeEnd}" class="edit-input" data-field="timeEnd">
        </td>
        <td><input type="text" value="${subject.room}" class="edit-input" data-field="room"></td>
        <td><button class="save-btn">Save</button></td>
      `;

      subjectRow.querySelector(".save-btn").addEventListener("click", saveSubjectEdit);
    }
  }

  function saveSubjectEdit(event) {
    const subjectRow = event.target.closest("tr");
    const subjectIndex = currentEditingSubject.subjectIndex;
    const courseCode = currentEditingSubject.courseCode;
    const [code, description, year, section] = courseCode.split('-');

    const course = courses.find(c => 
      c.code === code && 
      c.description === description && 
      c.year === year && 
      c.section === section
    );

    if (course && course.subjects) {
      const subject = course.subjects[subjectIndex];

      const updatedCode = subjectRow.querySelector("[data-field='code']").value;
      const updatedDescription = subjectRow.querySelector("[data-field='description']").value;
      const updatedUnits = subjectRow.querySelector("[data-field='units']").value;
      const updatedInstructor = subjectRow.querySelector("[data-field='instructor']").value;
      const updatedTimeStart = subjectRow.querySelector("[data-field='timeStart']").value;
      const updatedTimeEnd = subjectRow.querySelector("[data-field='timeEnd']").value;
      const updatedRoom = subjectRow.querySelector("[data-field='room']").value;

      subject.code = updatedCode;
      subject.description = updatedDescription;
      subject.units = updatedUnits;
      subject.instructor = updatedInstructor;
      subject.timeStart = updatedTimeStart;
      subject.timeEnd = updatedTimeEnd;
      subject.room = updatedRoom;

      alert("Subject updated successfully!");

      renderSubjectRow(subject, subjectRow, subjectIndex);
    }
  }

  function renderSubjectRow(subject, subjectRow, subjectIndex) {
    subjectRow.innerHTML = `
      <td>${subject.code}</td>
      <td>${subject.description}</td>
      <td>${subject.units}</td>
      <td>${subject.instructor}</td>
      <td>${subject.timeStart} to ${subject.timeEnd}</td>
      <td>${subject.room}</td>
      <td>
        <button class="edit-btn" data-course-code="${subject.courseCode}" data-index="${subjectIndex}">Edit</button>
        <button class="delete-btn" data-course-code="${subject.courseCode}" data-index="${subjectIndex}">Delete</button>
      </td>
    `;

    subjectRow.querySelector(".edit-btn").addEventListener("click", editSubject);
    subjectRow.querySelector(".delete-btn").addEventListener("click", deleteSubject);
  }

  function deleteSubject(event) {
    const courseCode = event.target.getAttribute("data-course-code");
    const subjectIndex = event.target.getAttribute("data-index");

    const [code, description, year, section] = courseCode.split('-');

    const course = courses.find(c => 
      c.code === code && 
      c.description === description && 
      c.year === year && 
      c.section === section
    );
    
    if (course && course.subjects) {
      course.subjects.splice(subjectIndex, 1);

      localStorage.setItem("courses", JSON.stringify(courses));

      displaySubjects();
    } else {
      console.error("Course not found or no subjects to delete.");
    }
  }
});
