const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  emailFields = document.querySelectorAll(".email"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link"),
  signUpBtn = document.getElementById("signUpBtn"),
  loginBtn = document.getElementById("loginBtn");

window.addEventListener('load', function () {

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("login btn clicked");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    data = { email: email, password: password };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data.message == false) {
          console.log('false:', data);
          alert("wrong email or password");
          return;
        }
        else {
          console.log('Success:', data);
          
          localStorage.setItem('id', data.id);
          localStorage.setItem('sessionId', data.sessionId);
          console.log("id: " + localStorage.getItem('id'));
          console.log("sessionId: " + localStorage.getItem('sessionId'));
          window.location.pathname = "/chatGpt.html"
          console.log("redirected");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log(password);
    console.log(email);
  })


  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("signUpname").value;
    const email = document.getElementById("signUpemail").value;
    const password = document.getElementById("signUppassword").value;
    const confpassword = document.getElementById("signUpconfpassword").value;
    if (password != confpassword) {
      alert("passwords don't match");
      return;
    } else {
      console.log(name);
      console.log(email);
      console.log(password);
      data = { name: name, email: email, password: password };
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if(data.message==false){
            alert("email already been used");

          }
          else{

          container.classList.remove("active");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    }
  })

})


//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach(pwField => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach(icon => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        })
      } else {
        pwField.type = "password";

        pwShowHide.forEach(icon => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        })
      }
    })
  })
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
  container.classList.add("active");
});
login.addEventListener("click", () => {
  container.classList.remove("active");
});