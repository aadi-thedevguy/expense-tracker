const myForm = document.querySelector("#my-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoriesInput = document.querySelector("#category");
const msg = document.querySelector(".msg");
const list = document.querySelector("#list");

const selectOptions = Array.from(categoriesInput.options);
const updateBtn = document.createElement("button");

updateBtn.addEventListener("click", (e) => {
  update(e.target.id);
});

const url = 'http://localhost:3000/expenses/'

window.onload = getData;

myForm.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  if (descriptionInput.value === "" || amountInput.value === "") {
    msg.classList.add("alert");
    msg.innerHTML = "Please enter all fields";

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    let details = {
      amount: amountInput.value,
      desc: descriptionInput.value,
      category: categoriesInput.value,
    };
    try {
      const response = await axios.post(url + "add-expense", details);
      showUser(response.data);
    } catch (err) {
      msg.classList.add("alert");
      msg.innerHTML = err;
      // Remove error after 3 seconds
      setTimeout(() => msg.remove(), 3000);
    }
    amountInput.value = "";
    descriptionInput.value = "";
  }
}

async function getData() {
  try {
    const res = await axios.get(url);
    res.data.forEach((obj) => showUser(obj));
  } catch (err) {
    msg.classList.add("alert");
    msg.innerHTML = err;
    setTimeout(() => msg.remove(), 3000);
  }
}

function showUser(details) {
  list.innerHTML += `<li class="list-group-item" id=${details.id}>
    <span>${details.amount} - ${details.desc} - ${details.category}</span>
   <button class="btn btn-danger" onclick=deleteItem('${details.id}')>X</button>`
  //  <button class="btn btn-success" onclick="edit('${details.id}')">Edit</button></li>
}

async function deleteItem(id) {
  try {
    await axios.delete(url + id)
    list.removeChild(document.getElementById(id));
  } catch (err) {
    msg.classList.add("alert");
    msg.innerHTML = err;
    setTimeout(() => msg.remove(), 3000);
  }
}

function edit(id) {
  const textArray = document
    .getElementById(id)
    .firstElementChild.textContent.split("-");

  amountInput.value = textArray[0].trim();
  descriptionInput.value = textArray[1].trim();
  const optionToSelect = selectOptions.find(
    (item) => item.value === textArray[2].trim()
  );
  optionToSelect.selected = true;

  updateBtn.id = id;
  updateBtn.className = "btn btn-success mt-3";
  updateBtn.innerText = "Update";
  myForm.appendChild(updateBtn);
}

async function update(id) {
  let details = {
    amount: amountInput.value,
    desc: descriptionInput.value,
    category: categoriesInput.value,
  };
  try {
    const res = await axios.put(url + id, details);
    // list.removeChild(document.getElementById(id));
    console.log(res.data);
    window.location = '/'
  } catch (err) {
    msg.classList.add("alert");
    msg.innerHTML = err;
    setTimeout(() => msg.remove(), 3000);
  }
}


