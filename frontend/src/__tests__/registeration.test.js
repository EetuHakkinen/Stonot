import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent } from 'react-testing-library';
import Registeration from '../components/Registeration';

describe('registeration form', () => {
    test('Title text', () => {
        const component = render(<Registeration />);

        // register page should have text registeration
        expect(component.container).toHaveTextContent('Registeration');
        expect(component.container).toHaveTextContent('name');
    });

    test('register user', () => {
        const component = render(<Registeration />);

        // get form fields
        const usernameField = component.container.getElementsByTagName('username')
        const nameField = component.container.getElementsByTagName('name');
        const passwordField = component.container.getElementsByTagName('password');
        const submitButton = component.container.querySelector('button');

        fireEvent.change(usernameField, { target: { value: 'eetuh'}});
        fireEvent.change(nameField, { target: { value: 'Eetu Häkkinen'}});
        fireEvent.change(passwordField, { target: { value: 'helloWorldmoi123'}});
        fireEvent.click(submitButton);
    });
});