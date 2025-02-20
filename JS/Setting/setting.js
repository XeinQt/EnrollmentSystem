document.addEventListener('DOMContentLoaded', function() {

    let admin = localStorage.getItem('admin');
    admin = admin ? JSON.parse(admin) : null;
  
    document.getElementById('change-email-form').addEventListener('submit', function (e) {
        e.preventDefault();
  
        const currentEmail = document.getElementById('current-email').value;
        const newEmail = document.getElementById('new-email').value;
        const confirmEmail = document.getElementById('confirm-email').value;
  
        if (admin && currentEmail === admin.email) {
            if (newEmail === confirmEmail) {
                admin.email = newEmail;
                localStorage.setItem('admin', JSON.stringify(admin));
                alert('Email updated successfully!');
  
                document.getElementById('current-email').value = '';
                document.getElementById('new-email').value = '';
                document.getElementById('confirm-email').value = '';
            } else {
                alert('New email and confirmation do not match!');
            }
        } else {
            alert('Current email is incorrect!');
        }
    });
  
    document.getElementById('change-password-form').addEventListener('submit', function (e) {
        e.preventDefault();
  
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
  
        if (admin && currentPassword === admin.password) {
            if (newPassword === confirmPassword) {
                admin.password = newPassword;
                localStorage.setItem('admin', JSON.stringify(admin));
                alert('Password updated successfully!');
  
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
            } else {
                alert('New password and confirmation do not match!');
            }
        } else {
            alert('Current password is incorrect!');
        }
    });
  
    console.log("Current Admin Data:", admin);
  });
  