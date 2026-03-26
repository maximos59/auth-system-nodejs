const API = "https://authmaximos.up.railway.app";

// REGISTER
async function register() {
  const body = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    age: document.getElementById("age").value,
    country: document.getElementById("country").value,
    nickname: document.getElementById("nickname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const res = await fetch(API + "/api/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });

  alert("Account created");
}

// LOGIN
async function login() {
  const res = await fetch(API + "/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    document.getElementById("auth").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  }
}

// PROFILE
async function loadProfile() {
  const res = await fetch(API + "/api/profile", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await res.json();
  document.getElementById("profile").innerText =
    JSON.stringify(data, null, 2);
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  location.reload();
}