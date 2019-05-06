import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/'

//** Send user registeration post request to backend */
export async function registerUser(user) {
    var res = await axios.post(baseUrl + 'users', user);
    return res;
}

//**Handles user login */
export async function login(credentials) {
    return await axios.post(baseUrl + 'login', credentials);
}