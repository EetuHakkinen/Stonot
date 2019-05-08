import stockService from '../services/stockService';

//**Stock reducer manages the stock list */
const stockReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD':
            return state.concat(action.data);
        case 'ADDALL':
            return action.data
        default:
            return state;
    }
}

//**stock adding action creator */
export const addStock = (stock, user) => {
    stockService.addStock(stock.ticker, stock.name, user);
    return {
        type: 'ADD',
        data: stock
    }
}

//**Adds list of stocks */
export const addAllStocks = (stocks) => {
    return {
        type: 'ADDALL',
        data: stocks
    }
}

export default stockReducer;