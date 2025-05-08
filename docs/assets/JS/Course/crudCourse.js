const courseForm = document.querySelector('.form-container form');
const courseTableBody = document.querySelector('.table-container tbody');
const submitBtn = courseForm.querySelector('button[type="submit"]');

let courses;

function loadCourses() {
    courses = JSON.parse(localStorage.getItem('courses')) || [];
    courseTableBody.innerHTML = ''; 

    courses.forEach((course, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.description}</td>
            <td>${course.year}</td>
            <td>${course.section}</td>
            <td>
                <button class="action-btn edit" onclick="editCourse(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;
        courseTableBody.appendChild(row);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const courseCode = courseForm.querySelector('input[placeholder="Course Code"]').value.trim();
    const courseDescription = courseForm.querySelector('input[placeholder="Course Description"]').value.trim();
    const courseYear = courseForm.querySelector('select').value;
    const courseSection = courseForm.querySelector('input[placeholder="Enter Section (A, B, C, D)"]').value.trim();

    if (!courseCode || !courseDescription || !courseYear || !courseSection) {
        alert('Please fill out all fields.');
        return;
    }

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    const editingIndex = courseForm.getAttribute('data-editing-index');

    if (editingIndex !== null) {
        courses[editingIndex] = { code: courseCode, description: courseDescription, year: courseYear, section: courseSection };
        courseForm.removeAttribute('data-editing-index');
        submitBtn.textContent = 'Add Course';
        alert('Course updated successfully!');
    } else {
        const duplicate = courses.some(course =>
            course.code === courseCode &&
            course.description === courseDescription &&
            course.year === courseYear &&
            course.section === courseSection
        );

        if (duplicate) {
            alert('This course already exists!');
            return;
        }

        courses.push({ code: courseCode, description: courseDescription, year: courseYear, section: courseSection });
        alert('Course added successfully!');
    }

    localStorage.setItem('courses', JSON.stringify(courses));
    courseForm.reset();
    loadCourses();
}

function editCourse(index) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses[index];

    courseForm.querySelector('input[placeholder="Course Code"]').value = course.code;
    courseForm.querySelector('input[placeholder="Course Description"]').value = course.description;
    courseForm.querySelector('select').value = course.year;
    courseForm.querySelector('input[placeholder="Enter Section (A, B, C, D)"]').value = course.section;

    courseForm.setAttribute('data-editing-index', index);

    submitBtn.textContent = 'Update Course';
}

function deleteCourse(index) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    if (confirm('Are you sure you want to delete this course?')) {
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        loadCourses();
        alert('Course deleted successfully!');
    }
}

courseForm.addEventListener('submit', handleFormSubmit);

loadCourses();

document.getElementById('search').addEventListener("input", (e) => {
    const searchInput = e.target.value.trim();
  
    if (!searchInput) {
        loadCourses();
    } else {
        searchCourses(searchInput);
    }
});

function searchCourses(searchInput) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    const filteredCourses = courses.filter(course => 
        course.code.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.year.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.section.toLowerCase().includes(searchInput.toLowerCase())
    );

    courseTableBody.innerHTML = '';

    filteredCourses.forEach((course, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.description}</td>
            <td>${course.year}</td>
            <td>${course.section}</td>
            <td>
                <button class="action-btn edit" onclick="editCourse(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;
        courseTableBody.appendChild(row);
    });

    if (filteredCourses.length === 0) {
        courseTableBody.innerHTML = `<tr><td colspan="5">No matching courses found.</td></tr>`;
    }
}
