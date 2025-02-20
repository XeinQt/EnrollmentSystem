
function logout() {
    sessionStorage.removeItem("loggedInAs");
    window.location.href = "login.html";
}
