const form = document.getElementById("registrationForm");
const userDataTable = document.getElementById("userDataTable").getElementsByTagName('tbody')[0];


const dobInput = document.getElementById("dob");
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0"); 
const dd = String(today.getDate()).padStart(2, "0");
const maxDate = `${yyyy}-${mm}-${dd}`; 
dobInput.setAttribute("max", maxDate); 


const minAge = 18;
const maxAge = 55;


const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
const maxDateForDob = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const termsAccepted = document.getElementById("terms").checked;

  
  const userDob = new Date(dob);
  if (userDob > maxDateForDob || userDob < minDate) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  
  if (!name || !email || password.length < 6 || !dob || !termsAccepted) {
    alert("Please complete all fields correctly and accept the Terms and Conditions.");
    return;
  }

  
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const userData = {
    name,
    email,
    password,
    dob,
    acceptedTerms: termsAccepted
  };

  
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

 
  users.push(userData);

  
  localStorage.setItem("registeredUsers", JSON.stringify(users));

  
  displayStoredData();

 
  form.reset();
  alert("Registration successful!");
});

function displayStoredData() {
  const data = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const tbody = userDataTable;

  
  tbody.innerHTML = '';

  if (data.length > 0) {
   
    data.forEach(user => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = user.name;
      row.insertCell(1).textContent = user.email;
      row.insertCell(2).textContent = user.password;
      row.insertCell(3).textContent = user.dob;
      row.insertCell(4).textContent = user.acceptedTerms ? 'True' : 'False';
    });
  } else {
   
    const row = tbody.insertRow();
    row.insertCell(0).colSpan = 5;
    row.insertCell(0).textContent = "No data stored.";
  }
}


displayStoredData();


  
 
