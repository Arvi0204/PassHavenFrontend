import React, { useState } from "react";
import PasswordContext from "./passwordContext";
import toast from "react-hot-toast";

const PasswordState = (props) => {
    const host = import.meta.env.VITE_BACKEND;
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        try {
            // API CALL
            const response = await fetch(`${host}/api/passwords/fetchallpass`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                }
            });
            const json = await response.json();

            // Mounting updated notes to react client side
            setPasswordArray(json);
        } catch (error) {
            console.error(error.message);
            toast.error(error.message)
        }
    }

    // Add a note
    const addPass = async (url, username, password) => {
        try {

            // API CALL
            const response = await fetch(`${host}/api/passwords/addpass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ url, username, password })
            });
            const pass = await response.json();
            setPasswordArray(passwordArray.concat(pass));
        } catch (error) {
            console.error("Error fetching" + error.message);
        }
    }

    // Edit a note
    const editPass = async (id, url, username, password) => {
        try {

            // // API CALL
            const response = await fetch(`${host}/api/passwords/updatepass/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ url, username, password })
            });
            await response.json();

            // Logic to edit in client side
            setPasswordArray(prevArray =>
                prevArray.map(pass => (pass._id === id ? { ...pass, url, username, password } : pass))
            );
        } catch (error) {
            console.error("Error fetching" + error.message);
        }
    }

    // Delete a note
    const deletePass = async (id) => {
        try {

            // API CALL
            const response = await fetch(`${host}/api/passwords/deletepass/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ id })
            });
            await response.json();

            // Logic to delete in client side
            setPasswordArray(prevArray => prevArray.filter(pass => pass._id !== id));
        } catch (error) {
            console.error("Error fetching" + error.message);
        }
    }
    return (
        // Using Context API and passing value of state and update function to all components that will use the Context API
        <PasswordContext.Provider value={{ passwordArray, setPasswordArray, addPass, getPasswords, editPass, deletePass }}>
            {props.children}
        </PasswordContext.Provider>
    )
}
export default PasswordState;