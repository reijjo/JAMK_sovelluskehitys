/* eslint-disable no-undef */
const result = document.querySelector('.result')
const baseUrl = `${window.location.origin}/api/vehicles`
const fetchVehicles = async () => {
  try {
    const { data } = await axios.get(baseUrl)
    console.log(data)
    const vehicles = data.data.map((vehicle) => {
      return createVehicleCard(vehicle)
    })
    result.innerHTML = `<div class="row">
                         ${vehicles.join('')} 
                        </div>`
  } catch (error) {
    console.log(error)
    // eslint-disable-next-line quotes
    result.innerHTML = `<div class="alert alert-danger mt-3">Error fetching data</div>`
  }
}

const createVehicleCard = (vehicle) => {
  return `<div class="col-sm-4 pt-4">
            <div class="card">
              <div class="card-body">
              <h5 class="card-title">${vehicle.license_plate}</h5>
              <p class="card-text">${vehicle.make}</p>
              <p class="card-text">${vehicle.model}</p>
              <p class="card-text">${vehicle.commissioned}</p>
              
              </div>
            </div>
          </div>
          `
}

const emptyFields = (make, model) => {
  make.value = ''
  model.value = ''
}

const setNotification = (msg) => {
  formAlert = document.querySelector('.form-alert')
  formAlert.textContent = msg
  setTimeout(() => {
    formAlert.textContent = '' }, 5000)
}

// submit form
const btn = document.querySelector('.btn-primary')
const make = document.querySelector('#make')
const model = document.querySelector('#model')

btn.addEventListener('click', async (e) => {
  e.preventDefault()
  const makeValue = make.value
  const modelValue = model.value

  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await axios.post(baseUrl, { make: makeValue, model: modelValue })
    fetchVehicles()
    emptyFields(make, model)
  } catch (error) {
    const { msg } = error.response.data
    setNotification(msg)
  }
})

// Fetch vehicles on page load
fetchVehicles()