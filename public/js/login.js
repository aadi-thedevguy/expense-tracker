const myForm = document.querySelector("#my-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const msg = document.querySelector("#msg");
const errorMsg = document.querySelector("#error");
const list = document.querySelector("#list");

const url = "http://localhost:3000/users/";

myForm.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  let details = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  try {
    const res = await axios.post(url + "login", details);
    msg.classList.add("alert");
    msg.innerHTML = res.data.msg;

    // setTimeout(() => msg.remove(), 3000)
    window.location.href = '/home'

  } catch (err) {
    errorMsg.classList.add("alert");
    errorMsg.innerHTML = "Login Failed, Please Check Your Credentials"

    setTimeout(() => errorMsg.remove(), 3000);
  }
  // emailInput.value = "";
  // passwordInput.value = "";
}
