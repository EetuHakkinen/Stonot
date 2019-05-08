import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import '../css/home.css';
import stockService from '../services/stockService';
import { addStock, addAllStocks } from '../reducers/stockReducer';
import { Typography, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Home = ({ user, setUser, stocks, addAllStocks }) => {

    useEffect(() => {
        // get stocklist from server
        stockService.getStocks(user)
            .then(v => {
                addAllStocks(v.data);
            });
    }, []);

    // if user is not logged in, redirect to login page
    if (!user || !user.token) {
        return <Redirect to="/login" />
    }

    // handle stock adding form submit
    const submit = (e) => {
        e.preventDefault();
        addStock({ name: e.target.name.value, ticker: e.target.ticker.value }, user);
        e.target.name.value = '';
        e.target.ticker.value = '';
    }

    console.log(stocks);

    return (
        <div className="container">
            <p>moi</p>
            <h1>Welcome to Stonot, {user && user.name}!</h1>
            <h2>add a new stock</h2>
            <form onSubmit={submit}>
                <span>ticker:</span>
                <input name="ticker" />

                <span>name</span>
                <input name="name" />

                <button type="submit">add</button>
            </form>
            <Grid container spacing={16}>
                <Grid item xs={12} xs md={6}>
                    <Typography variant="h5">
                        Stocks
                    </Typography>
                    <List>
                        {stocks.map(s => <Stock key={s.id} {...s} user={user} />)}
                    </List>
                </Grid>
            </Grid>

        </div>
    );
}

/**Show stock component */
const Stock = ({ ticker, name, id, user }) => {
    return (
        <ListItem>
            <ListItemText>
                {ticker}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => deleteStock(id, user)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

/**Handle delete icon press */
const deleteStock = (id, user) => {
    stockService.deleteStock(id, user);
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        stocks: state.stock
    }
}

export default connect(mapStateToProps, { setUser, addStock, addAllStocks })(Home);