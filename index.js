let element = (id) => document.getElementById(id);

let user_entries = [];

function fillTable() {
  let obj = localStorage.getItem("user_entries");
  if (obj) {
    user_entries = JSON.parse(obj);
  } else {
    user_entries = [];
  }
  return user_entries;
}

let username = element("name"),
  email = element("email"),
  password = element("password"),
  tc = element("tc"),
  dob = element("dob");

let form = element("form");

function verify(elem, message, cnd) {
  if (cnd) {
    elem.style.border = "2px solid red";
    elem.setCustomValidity(message);
    elem.reportValidity();
  } else {
    elem.style.border = "2px solid green";
    elem.setCustomValidity('');
  }
}

function checkDOB() {
  let birthDate = new Date(dob.value);
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}

let message_name = "Username must be at least 3 characters long";
let message_email = "Email must be valid";
let message_agree = "You must agree to the terms and conditions";
let message_dob = "Your age must be between 18 and 55 to continue";

username.addEventListener("input", (e) => {
  e.preventDefault();
  verify(username, message_name, username.value.length < 3);
});

email.addEventListener("input", (e) => {
  e.preventDefault();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  verify(email, message_email, !emailPattern.test(email.value));
});

dob.addEventListener("input", (e) => {
  e.preventDefault();
  verify(dob, message_dob, !checkDOB());
});

tc.addEventListener("input", (e) => {
  e.preventDefault();
  verify(tc, message_agree, !tc.checked);
});

function makeObject() {
  return {
    name: username.value,
    email: email.value,
    password: password.value,
    dob: dob.value,
    checked: tc.checked
  };
}

function displayTable() {
  let table = element("user-table");
  let str = `<tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Dob</th>
                <th>Accepted terms?</th>
            </tr>\n`;
  for (let entry of user_entries) {
    str += `<tr>
              <td>${entry.name}</td>
              <td>${entry.email}</td>
              <td>${entry.password}</td>
              <td>${entry.dob}</td>
              <td>${entry.checked}</td>
            </tr>\n`;
  }
  table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  verify(username, message_name, username.value.length < 3);
  verify(email, message_email, !emailPattern.test(email.value));
  verify(dob, message_dob, !checkDOB());
  verify(tc, message_agree, !tc.checked);

  if (
    username.value.length >= 3 &&
    emailPattern.test(email.value) &&
    checkDOB() &&
    tc.checked
  ) {
    let obj = makeObject();
    user_entries.push(obj);
    localStorage.setItem("user_entries", JSON.stringify(user_entries));
    displayTable();
    form.reset(); // Clear form
  }
});

window.onload = () => {
  user_entries = fillTable();
  displayTable();
};
