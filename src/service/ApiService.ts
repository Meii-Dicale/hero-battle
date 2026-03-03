import axios from 'axios'

const token = import.meta.env.VITE_SUPERHERO_TOKEN 

const baseURL =   `https://superheroapi.com/api.php/${token}`

const api = axios.create({
  baseURL,
  timeout: 15_000,
})

export default api