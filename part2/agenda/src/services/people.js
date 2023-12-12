import axios from "axios";
const baseURL = 'http://localhost:3001/people'

const getAll = () => {
	const request = axios.get(baseURL)
	return request.then((response) => response.data)
}

const create = newPerson => {
	const request = axios.post(baseURL, newPerson)
  return request.then(response => response.data)
}

const deleteById = id => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then()
}

const update = person => {
  const request = axios.put(`${baseURL}/${person.id}`, {name: person.name, number: person.number})
  return request.then(response => response.data)
}

export default { getAll, create, deleteById, update }