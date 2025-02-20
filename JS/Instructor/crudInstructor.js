const instructorForm = document.querySelector('.form-container form');
const instructorTableBody = document.querySelector('.table-container tbody');
const submitButton = instructorForm.querySelector('button[type="submit"]');  

let instructors;

function loadInstructors() {
  instructors = JSON.parse(localStorage.getItem('instructors')) || [];
  instructorTableBody.innerHTML = '';

  instructors.forEach((instructor, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${instructor.firstName}</td>
      <td>${instructor.lastName}</td>
      <td>${instructor.middleName}</td>
      <td>${instructor.age}</td>
      <td>${instructor.sex}</td>
      <td>${instructor.address}</td>
      <td>${instructor.contactNumber}</td>
      <td>${instructor.email}</td>
      <td>
        <button class="action-btn edit" onclick="editInstructor(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteInstructor(${index})">Delete</button>
      </td>
    `;
    instructorTableBody.appendChild(row);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const firstName = instructorForm.querySelector('input[placeholder="First Name"]').value.trim();
  const lastName = instructorForm.querySelector('input[placeholder="Last Name"]').value.trim();
  const middleName = instructorForm.querySelector('input[placeholder="Middle Name"]').value.trim();
  const age = instructorForm.querySelector('input[placeholder="Age"]').value.trim();
  const sex = instructorForm.querySelector('select').value;
  const address = instructorForm.querySelector('textarea[placeholder="Address"]').value.trim();
  const contactNumber = instructorForm.querySelector('input[placeholder="Contact Number"]').value.trim(); 
  const email = instructorForm.querySelector('input[placeholder="Email"]').value.trim(); 

  if (!firstName || !lastName || !middleName || !age || !sex || !address || !contactNumber || !email) {
    alert('Please fill out all fields.');
    return;
  }

  instructorForm.querySelector('input[placeholder="Contact Number"]').style.borderColor = '';
  instructorForm.querySelector('input[placeholder="Email"]').style.borderColor = '';

  if (!/^09\d{9}$/.test(contactNumber)) {
    instructorForm.querySelector('input[placeholder="Contact Number"]').style.borderColor = 'red';
    return;
  }

  if (!/@gmail\.com$/.test(email)) {
    instructorForm.querySelector('input[placeholder="Email"]').style.borderColor = 'red';
    return;
  }

  if (/^09\d{9}$/.test(contactNumber) && /@gmail\.com$/.test(email)) {
    let instructors = JSON.parse(localStorage.getItem('instructors')) || [];

    const duplicateInstructor = instructors.find(instructor => 
      instructor.firstName === firstName &&
      instructor.lastName === lastName &&
      instructor.middleName === middleName &&
      instructor.age === age &&
      instructor.sex === sex
    );
    if (duplicateInstructor) {
      alert('Instructor already exists.');

      document.querySelector('input[placeholder="First Name"]').value = "";
      document.querySelector('input[placeholder="Last Name"]').value = "";
      document.querySelector('input[placeholder="Middle Name"]').value = "";
      document.querySelector('input[placeholder="Age"]').value = "";
      document.querySelector('select').value  = "";
      document.querySelector('textarea[placeholder="Address"]').value = "";
      document.querySelector('input[placeholder="Contact Number"]').value = ""; 
      document('input[placeholder="Email"]').value = ""; 
      return;
    }

    const editingIndex = instructorForm.getAttribute('data-editing-index');

    if (editingIndex !== null && editingIndex !== "") {
      instructors[editingIndex] = { firstName, lastName, middleName, age, sex, address, contactNumber, email };
      instructorForm.removeAttribute('data-editing-index');
      alert('Instructor updated successfully!');
    } else {
      instructors.push({ firstName, lastName, middleName, age, sex, address, contactNumber, email });
      alert('Instructor added successfully!');
    }

    localStorage.setItem('instructors', JSON.stringify(instructors));
    instructorForm.reset();
    changeButtonToAdd(); 
    loadInstructors();
  }
}

function editInstructor(index) {
  const instructors = JSON.parse(localStorage.getItem('instructors')) || [];
  const instructor = instructors[index];

  instructorForm.querySelector('input[placeholder="First Name"]').value = instructor.firstName;
  instructorForm.querySelector('input[placeholder="Last Name"]').value = instructor.lastName;
  instructorForm.querySelector('input[placeholder="Middle Name"]').value = instructor.middleName;
  instructorForm.querySelector('input[placeholder="Age"]').value = instructor.age;
  instructorForm.querySelector('select').value = instructor.sex;
  instructorForm.querySelector('textarea[placeholder="Address"]').value = instructor.address;
  instructorForm.querySelector('input[placeholder="Contact Number"]').value = instructor.contactNumber;
  instructorForm.querySelector('input[placeholder="Email"]').value = instructor.email;

  instructorForm.setAttribute('data-editing-index', index);

  document.querySelector('.search').value = "";
  submitButton.textContent = 'Update';  
}

function deleteInstructor(index) {
  const instructors = JSON.parse(localStorage.getItem('instructors')) || [];
  if (confirm('Are you sure you want to delete this instructor?')) {
    instructors.splice(index, 1);
    localStorage.setItem('instructors', JSON.stringify(instructors));
    loadInstructors();
    alert('Instructor deleted successfully!');
  }
}

function changeButtonToAdd() {
  submitButton.textContent = 'Add'; 
}

instructorForm.addEventListener('submit', handleFormSubmit);

loadInstructors();

document.getElementById('search').addEventListener('input', (e) => {
  const searchInput = e.target.value.trim();

  if (!searchInput) {
    loadInstructors(); 
  } else {
    searchInstructor(searchInput); 
  }
});

function searchInstructor(searchInput) {
  const instructors = JSON.parse(localStorage.getItem('instructors')) || [];

  const filteredInstructors = instructors.filter(instructor => {
    return (
      instructor.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      instructor.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
      instructor.middleName.toLowerCase().includes(searchInput.toLowerCase()) ||
      instructor.age.toLowerCase().includes(searchInput.toLowerCase()) ||
      instructor.sex.toLowerCase().includes(searchInput.toLowerCase()) ||
      instructor.address.toLowerCase().includes(searchInput.toLowerCase()) ||
      instructor.contactNumber.toLowerCase().includes(searchInput.toLowerCase() ||
      instructor.email.toLowerCase().includes(searchInput.toLowerCase()))
    );
  });

  instructorTableBody.innerHTML = ''; 

  filteredInstructors.forEach((instructor, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${instructor.firstName}</td>
      <td>${instructor.lastName}</td>
      <td>${instructor.middleName}</td>
      <td>${instructor.age}</td>
      <td>${instructor.sex}</td>
      <td>${instructor.address}</td>
      <td>${instructor.contactNumber}</td>
       <td>${instructor.email}</td>
      <td>
        <button class="action-btn edit" onclick="editInstructor(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteInstructor(${index})">Delete</button>
      </td>
    `;
    instructorTableBody.appendChild(row);
  });

  if (filteredInstructors.length === 0) {
    instructorTableBody.innerHTML = `<tr><td colspan="8">No matching instructors found.</td></tr>`;
  }
}
