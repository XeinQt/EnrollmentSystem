let enrollmentCtx = document.getElementById('enrollmentChart').getContext('2d');
let enrollmentChart = new Chart(enrollmentCtx, {
  type: 'line',
  data: {
    labels: ['Last Last Year', 'Last Year', 'This Year'],
    datasets: [{
      label: 'Enrollments',
      data: [800, 1000, 1200],
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      borderColor: '#3498db',
      borderWidth: 2,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Enrollments'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  }
});
