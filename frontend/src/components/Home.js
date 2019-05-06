import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const Home = ({ user, setUser }) => {
    if (!user || !user.token) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <h1>Welcome to Stonot, { user && user.name}!</h1>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { setUser })(Home);