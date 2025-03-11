import '../css/style.css';

document.getElementById("showLogin").addEventListener("click", function () {
    document.querySelector(".loginForm").classList.remove("hidden");
    document.querySelector(".registerForm").classList.add("hidden");
  });
  
document.getElementById("showRegister").addEventListener("click", function () {
    document.querySelector(".registerForm").classList.remove("hidden");
    document.querySelector(".loginForm").classList.add("hidden");
  });
