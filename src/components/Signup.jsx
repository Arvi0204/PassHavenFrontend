import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
        } else setPasswordError('');
        
        try {
            const response = await fetch(`http://localhost:2000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    email: form.email,
                    password: form.password
                })
            });

            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                navigate("/");
                toast.success("Created account successfully");
            } else {
                json.errors.forEach(error => {
                    toast.error(error.msg)
                });
            }
        } catch (error) {
            toast.error("An error occurred, please try again.");
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    return (
        <div className="flex-grow flex items-center justify-center p-4 m-20">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create your account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={form.username}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={form.email}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Master Password</label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={form.password}
                                onChange={onChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Master Password</label>
                        <div className="mt-1 relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                required
                                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={form.confirmPassword}
                                onChange={onChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>
                    {passwordError && <p className="font-bold text-red-500 text-sm">{passwordError}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
