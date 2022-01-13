import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'jorg');
    const error = screen.getByText('Error: firstName must have at least 5 characters.')
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button')
    userEvent.click(button);

    const error1 = screen.getByText('Error: firstName must have at least 5 characters.')
    expect(error1).toBeInTheDocument();

    const error2 = screen.getByText('Error: email must be a valid email address.')
    expect(error2).toBeInTheDocument();

    const error3 = screen.getByText('Error: lastName is a required field.')
    expect(error3).toBeInTheDocument();
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'jorge');

    const lastname = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastname,'evan');

    const button = screen.getByRole('button')
    userEvent.click(button);

    const error = screen.getByText('Error: email must be a valid email address.')
    expect(error).toBeInTheDocument();


});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'jorge');

    const error = screen.getByText('Error: email must be a valid email address.');
    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button')
    userEvent.click(button);

    const error = screen.getByText('Error: lastName is a required field.')
    expect(error).toBeInTheDocument(); 

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'jorge');

    const lastname = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastname,'evan');

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'jorge@jorge.com');

    const button = screen.getByRole('button')
    userEvent.click(button);

    const output1 = screen.queryByText('jorge')
    const output2 = screen.queryByText('evan')
    const output3 = screen.queryByText('jorge@jorge.com')

    expect(output1).toBeInTheDocument();
    expect(output2).toBeInTheDocument();
    expect(output3).toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstname = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstname, 'jorge');

    const lastname = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastname,'evan');

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, 'jorge@jorge.com');

    const note = screen.getByLabelText(/Message/i);
    userEvent.type(note, 'This is a note')

    const button = screen.getByRole('button')
    userEvent.click(button);

    const output1 = screen.queryByText('jorge')
    const output2 = screen.queryByText('evan')
    const output3 = screen.queryByText('jorge@jorge.com')
    const output4 = screen.queryByText('This is a note')
    

    expect(output1).toBeInTheDocument();
    expect(output2).toBeInTheDocument();
    expect(output3).toBeInTheDocument();
    expect(output4).toBeInTheDocument();
});