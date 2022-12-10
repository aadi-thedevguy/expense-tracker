  // Put DOM elements into variables
const myForm = document.querySelector('#my-form')
const descriptionInput = document.querySelector('#description')
const amountInput = document.querySelector('#amount')
const categoriesInput = document.querySelector('#category')
const msg = document.querySelector('.msg')
const list = document.querySelector('#list')

const selectOptions = Array.from(categoriesInput.options)
const updateBtn = document.createElement('button')


const url = "https://crudcrud.com/api/51686d69a5c3412ba267a1239af1999b"

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
  const textArray = document.getElementById(id).firstElementChild.textContent.split('-')

  amountInput.value = textArray[0].trim()
  descriptionInput.value = textArray[1].trim()
  const optionToSelect = selectOptions.find(item => item.value === textArray[2].trim());
  optionToSelect.selected = true

  updateBtn.id = id
  updateBtn.className = "btn btn-success mt-3" 
  updateBtn.innerText = "Update"
  myForm.appendChild(updateBtn)

}

async function update(id) {
  let details =  {
    amount : amountInput.value,
    desc : descriptionInput.value,
    category : categoriesInput.value
  }
 try {
  await axios.put(`${url}/expenses/${id}`, details)
  // document.removeChild()
  console.log(list.querySelector(`#${id}`))
  list.innerHTML = ""
  const res = await axios.get(`${url}/expenses/${id}`)
  showUser(res.data)

} catch (err) {
  msg.classList.add('alert')
  msg.innerHTML = err
  setTimeout(() => msg.remove(), 3000)
}
}

updateBtn.addEventListener('click', (e) => {
  update(e.target.id)
})

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

  list.innerHTML  += `<li class="list-group-item" id=${details._id}>
  <span>${details.amount} - ${details.desc} - ${details.category}</span>
 <button class="btn btn-danger" onclick=deleteItem('${details._id}')>X</button>
 <button class="btn btn-success" onclick="edit('${details._id}')">Edit</button></li>`
 }
