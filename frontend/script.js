const API = "https://authmaximos.up.railway.app";

// 🔺 Cursor
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// REGISTER
async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(API + "/api/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("status").innerText = data.message;
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html"; // 🔥 REDIRECT
  } else {
    document.getElementById("status").innerText = "Login failed";
  }
}

// PROFILE
async function getProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(API + "/api/profile", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  document.getElementById("profile").innerText =
    JSON.stringify(data, null, 2);
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}