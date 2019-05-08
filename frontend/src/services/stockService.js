import axios from 'axios';
import { baseUrl } from './userService';

const addStock = (ticker, name, user) => {
    return axios.post(baseUrl + 'stock', { name, ticker }, { headers: { authorization: 'bearer ' + user.token }});
}

const getStocks = (user) => {
    return axios.get(baseUrl + 'stock', { headers: { authorization: 'bearer ' + user.token }})
}

const deleteStock = (id, user) => {
    return axios.delete(baseUrl + 'stock/' + id, {headers: {authorization: 'bearer ' + user.token}})
}

export default { addStock, getStocks, deleteStock };