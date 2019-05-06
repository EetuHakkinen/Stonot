import React, { useEffect } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { login } from '../services/userService';
import { connect } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const Login = ({ user, setUser }) => {

    useEffect(() => {
        var user = window.localStorage.getItem('stonot-user');
        var usrObj = JSON.parse(user);
        setUser(usrObj);
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        var res = await login({ username: e.target.username.value, password: e.target.password.value });
        if (res.status === 200) {
            // set user to reducer
            setUser(res.data);
            // save user data to localstorage
            window.localStorage.setItem('stonot-user', JSON.stringify(res.data));
            // redirect to main page
            window.location.replace('/');
        }
    }

    if (user.token) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => submit(e)}>
                <p>username: </p>
                <input type="text" name="username" />
                <p>password:</p>
                <input type="password" name="password" />
                <button type="submit">Log in</button><br />
                <Link to="/registeration">No user yet?</Link>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    setUser,
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);