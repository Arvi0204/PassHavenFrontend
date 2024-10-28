import React, { useRef, useContext, useState } from "react";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import passwordContext from "../context/passwordContext";
import formContext from "../context/formContext";
import toast from 'react-hot-toast';

const PasswordForm = () => {
    const passwordRef = useRef();
    const iconRef = useRef();

    const { addPass, getPasswords } = useContext(passwordContext);
    const { form, setForm } = useContext(formContext);
    const [showPassword, setShowPassword] = useState(false);

    const savePassword = async () => {
        await addPass(form.url, form.username, form.password);
        toast.success("Password added successfully");
        setForm({ url: "", username: "", password: "" });
        getPasswords();
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="md:container md:mx-auto pb-4 md:pb-8 pt-8 md:pt-16 px-8 md:px-40">
            <h1 className="text-4xl font-bold text-center">
                <span className="text-blue-500">&lt;</span>
                Pass
                <span className="text-blue-700">Haven/&gt;</span>
            </h1>
            <p className="text-blue-800 text-lg text-center">Your secure password manager</p>
            <form className="flex flex-col p-4 w-full text-black gap-8 justify-center items-center">
                <input
                    className="rounded-full border border-blue-600 w-full px-4 py-1"
                    type="text"
                    value={form.url}
                    id="url"
                    name="url"
                    onChange={handleChange}
                    placeholder="Enter URL"
                />
                <div className="flex flex-col md:flex-row w-full gap-8">
                    <input
                        className="flex-grow rounded-full border border-blue-600 px-4 py-1"
                        type="text"
                        value={form.username}
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter username"
                        autoComplete="username"
                    />
                    <div className="relative flex-grow">
                        <input
                            className="rounded-full border border-blue-600 w-full px-4 py-1"
                            type={showPassword ? "text" : "password"}
                            ref={passwordRef}
                            value={form.password}
                            id="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter password"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                </div>
                <button
                    type="button"
                    disabled={!form.url || !form.username || !form.password}
                    onClick={savePassword}
                    className={`text-white flex justify-center items-center rounded-full w-fit gap-2 px-3 py-1 
                        ${!form.url || !form.username || !form.password ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'}`}
                >
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                    />
                    Save Password
                </button>
            </form>
        </div>
    );
};

export default PasswordForm;
