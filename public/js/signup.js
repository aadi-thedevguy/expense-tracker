const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPass = document.querySelector("#confirmPass");
const msg = document.querySelector(".msg");
const list = document.querySelector("#list");

const url = "http://localhost:3000/users/";

myForm.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  if (passwordInput.value !== confirmPass.value) {
    msg.classList.add("alert");
    msg.innerHTML = "Password Don't Match";

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    let details = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    try {
      const response = await axios.post(url + "signup", details);
      // console.log(response.data);
      window.location.href = "/";
    } catch (err) {
      msg.classList.add("alert");
      msg.innerHTML = err;
      // Remove error after 3 seconds
      setTimeout(() => msg.remove(), 3000);
    }
    // nameInput.value = "";
    // emailInput.value = "";
    // passwordInput.value = "";
  }
}
