  // Put DOM elements into variables
const myForm = document.querySelector('#my-form')
const descriptionInput = document.querySelector('#description')
const amountInput = document.querySelector('#amount')
const categoriesInput = document.querySelector('#category')
const msg = document.querySelector('.msg')
const list = document.querySelector('#list')
const updateBtn = document.querySelector('#update')

const url = "https://crudcrud.com/api/df87b5ba0fa64767aff198c242375301"

window.onload = getData

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  if (descriptionInput.value === '' || amountInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('alert')
    msg.innerHTML = 'Please enter all fields'

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000)
  } else {

    let details = {
      amount : amountInput.value,
      desc : descriptionInput.value,
      category: categoriesInput.value
    }
    try {
      const response = await axios.post(url + "/expenses" ,details)
      showUser(response.data)
    } catch (err) {
      msg.classList.add('alert')
        msg.innerHTML = err
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000)
    }
    amountInput.value = ''
    descriptionInput.value = ''

  }
}


async function deleteItem(id) {
  try {
    await axios.delete(`${url}/expenses/${id}`)
    list.removeChild(document.getElementById(id))
  } catch (err) {
    msg.classList.add('alert')
      msg.innerHTML = err
      setTimeout(() => msg.remove(), 3000)
  }

}

function edit(id) {
  let textArray = document.getElementById(id).firstElementChild.textContent.split('-')
  amountInput.value = textArray[0]
  descriptionInput.value = textArray[1]
  categoriesInput.value = textArray[2]

  updateBtn.disabled = false
  updateBtn.onclick = update(id)
 
}

async function update(id) {
 
  await axios.put(`${url}/expenses/${id}`, {
    amount : amountInput.value,
    desc : descriptionInput.value,
    category : categoriesInput.value 
  })
 getData()
}

async function getData() {

  try {
    const res = await axios.get(url + "/expenses")
    res.data.forEach(obj => showUser(obj))
    
  } catch (err) {
    msg.classList.add('alert')
    msg.innerHTML = err
    setTimeout(() => msg.remove(), 3000)
  }

}

function showUser(details) {
  list.innerHTML = list.innerHTML + `<li class="list-group-item" id=${details._id}>
  <span>${details.amount} - ${details.desc} - ${details.category}</span>
 <button class="btn btn-danger" onclick=deleteItem('${details._id}')>X</button>
 <button class="btn btn-success" onclick="edit('${details._id}')">Edit</button></li> `
 }