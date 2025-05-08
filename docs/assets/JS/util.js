export let totalStudent = 0;
export let totalInstructor = 0;
export let totalCourses = 0;
export let totalActiveStudent = 0;

export function updateTotals() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  const instructors = JSON.parse(localStorage.getItem('instructors')) || [];
  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  
  totalStudent = students.length;
  totalInstructor = instructors.length;
  totalCourses = courses.length;
  totalActiveStudent = students.filter(student => student.isActive).length;
}

export function getTotals() {
  return {
    totalStudent,
    totalInstructor,
    totalCourses,
    totalActiveStudent,
  };
}
