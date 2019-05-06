import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { withRouter } from 'react-router-dom';

//**Page which handles user registeration */
const Registeration = (props) => {
    // when register-button was clicked
    const onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            name: e.target.name.value,
            password: e.target.password.value
        }
        // send user registeration for backend
        var regUser = await registerUser(user);
        if (regUser.status === 200) {
            // if registeration was OK, redirect to login form
            window.location.replace('/login');
        }
    }

    return (
        <div>
            <h1>Registeration form</h1>
            <form onSubmit={onSubmit}>
                <p>Username</p>
                <input type="text" name="username" />
                <p>Name</p>
                <input type="text" name="name" />
                <p>Password</p>
                <input type="password" name="password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registeration;