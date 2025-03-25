function toggleAuth() {
    document.getElementById("login-box").classList.toggle("hidden");
    document.getElementById("signup-box").classList.toggle("hidden");
}

function loginUser() {
    window.location.href = "home.html";
}

function sendOTP() {
    alert("OTP sent to registered phone number.");
}

function sendSignupOTP() {
    alert("OTP sent for verification.");
}

function registerUser() {
    alert("Account Created Successfully!");
    window.location.href = "index.html";
}
