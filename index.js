const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#userDataTable tbody");

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function displayStoredData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  tableBody.innerHTML = "";

  users.forEach(user => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = user.name;
    row.insertCell(1).textContent = user.email;
    row.insertCell(2).textContent = user.password;
    row.insertCell(3).textContent = user.dob;
    row.insertCell(4).textContent = user.termsAccepted ? "True" : "False";
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const termsAccepted = document.getElementById("terms").checked;

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email address.");
    return;
  }

  const user = { name, email, password, dob, termsAccepted };
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  displayStoredData();
  form.reset();
});

displayStoredData();
