let students = JSON.parse(localStorage.getItem('students')) || [];
const instructors = JSON.parse(localStorage.getItem('instructors')) || [];
const courses = JSON.parse(localStorage.getItem('courses')) || [];

const totalStudents = students.length;
const totalInstructors = instructors.length;
const totalCourses = courses.length;
const activeStudents = students.filter(student => student.enrolledSubjects && student.enrolledSubjects.length > 0).length;



students = students.filter(student => student.studentID !== "12345");
localStorage.setItem('students', JSON.stringify(students));


console.log(students);





document.querySelector('.totalStudent').textContent = totalStudents; 
document.querySelector('.totalInstructor').textContent = totalInstructors;
document.querySelector('.totalCourses').textContent = totalCourses;
document.querySelector('.stat').textContent = activeStudents;
