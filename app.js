
function registerUser(event){
  event.preventDefault();  // Prevent form from refreshing
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const mobile = document.getElementById('mobile').value;
  const dob = document.getElementById('dob').value;

  // Validate password and confirm password match
  if (password !== confirmPassword) {
    document.getElementById('message').innerText = "Passwords do not match!";
    return;
  }

  // Fetch the current user data
  fetch("http://localhost:3000/users", {
    method: "GET"
  })
  .then(response => response.json())
  .then(users => {
    // Check if email already exists
    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert("User with this email already exists!");
      document.getElementById('message').innerText = "User with this email already exists!";
      return null;
    } else {
      // Add user to users.json
      let newUser = {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        dob: dob
      };

      return fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  })
  .then(response => {
    if (response && response.status === 201) {
      alert("User registered successfully!");
      // go to login page after successful registration
      window.history.replaceState(null, null, "./login.html");


    }
  })
  .catch(error => {
    alert("Error: " + error);
  });
}

function loginUser(event){
   event.preventDefault(); // Prevent form from refreshing

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Fetch the current user data
  fetch("http://localhost:3000/users", {
    method: "GET"
  })
  .then(response => response.json())
  .then(users => {
    // Check if email and password match
    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
      alert("Login successful!");
      window.location.replace("home.html");
    } else {
      alert("Invalid email or password!");
    }
  })
  .catch(error => {
    alert("Error: " + error);
  });
}