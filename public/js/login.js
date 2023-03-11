const myForm = document.querySelector("#my-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const msg = document.querySelector(".msg");
const list = document.querySelector("#list");

const url = "http://localhost:3000/users/";


myForm.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  if (
    emailInput.value === "" ||
    passwordInput.value === ""
  ) {
    msg.classList.add("alert");
    msg.innerHTML = "Please enter all fields";

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    let details = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    try {
      const response = await axios.post(url + "login", details);
      console.log(response.data);
    } catch (err) {
      msg.classList.add("alert");
      msg.innerHTML = err;
      // Remove error after 3 seconds
      setTimeout(() => msg.remove(), 3000);
    }
    emailInput.value = "";
    passwordInput.value = "";
  }
}
